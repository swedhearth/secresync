/* 'core_0.017_GitHub' */
function AppDbStore(thisApp){
    "use strict";
    /* -------------------------------------------------------  Stores Extension ------------------------------------------------------------------ */
    const extendStore = storeObj => {
        const handleCatch = err => {
            console.log(err);
            console.log(err.name);
            console.log(err.message);

            let errMsg = null;
            if(err.name === "OperationError") errMsg = "OperationError";
            if(err === "DeleteDatabase") errMsg = "DeleteDatabase";
            if(err === "BackButtonPressed") errMsg = "BackButtonPressed";
            if(err === "noFilePickedErr" || err.name === "AbortError") errMsg = "noFilePickedErr";
            storeObj.syncStop();
            return  errMsg || err.message || err;
        };
        storeObj.catchLoad = async err => {
            const errMsg = handleCatch(err);
            switch (errMsg) {//all throws will be caught by the the try - catch in thisApp.start
                case "OperationError":
                    throw "OperationError";
                case "DeleteDatabase":
                    throw "DeleteDatabase";
                case "BackButtonPressed":
                    throw "BackButtonPressed";
                case "noFilePickedErr":
                    throw "noFilePickedErr";
            }
            // if not known error:
            if(await thisApp.alert.catchLoad(storeObj.key)){
                await storeObj.handleRemove(false, true);
                return thisApp.dbObj || thisApp.start(null, false);
            }
            await storeObj.syncPause();
        };
        storeObj.catchSync = async err => {
            const errMsg = handleCatch(err); 

            switch (errMsg) {
                case "OperationError":
                    thisApp.message.storeConnectFail(storeObj.name)
                    break;
                case "BackButtonPressed":
                    break;
                case "noFilePickedErr":
                    thisApp.message.noFilePickedErr();
                    break;
                default:
                    await thisApp.alert.catchSync(storeObj.key, errMsg);
            }
            
            await storeObj.handleRemove(false, true);
        };
        storeObj.catchUpdate = async err => {
            const errMsg = handleCatch(err); 
            await thisApp.alert.catchUpdate(storeObj.key, errMsg);
            await storeObj.handleRemove(false, true);
            throw storeObj.key + " Error";
        };
        storeObj.syncPause = async _ => {
            storeObj.iconOpacity(false);
            storeObj.syncPaused = true;
            return storeObj.key;
        };
        storeObj.removeDontSync = _ => {
            thisApp.localStorage.delete(storeObj.key + "DontSync");
            storeObj.dontSync = false;
        };
        storeObj.syncStart = _ => {
            storeObj.removeDontSync();
            storeObj.syncing = true;
            storeObj.syncIcon.addClass("storeSyncing"); 
        };
        storeObj.syncStop = _ => {
            storeObj.syncing = false;
            storeObj.syncIcon.killClass("storeSyncing"); 
        };
        storeObj.handleUpdate = async data => {
            storeObj.handle = await data;
            await thisApp.idxDb.set(storeObj.key, storeObj.handle);
            storeObj.handlePlain = null;
        };
        storeObj.handleRemove = async (noMoreSync, forceRemove) => {
            if(await thisApp.credentials.persisted.exist() && this.objectsExist() === 1 && this.getObjectsWithHandles()[0] === storeObj){
                if(forceRemove || await thisApp.alert.removePersistedLastStoreDisconnect()){
                    await thisApp.credentials.persisted.delete();
                }else{
                    return null; //do not remove the handle
                }
            };
            if(noMoreSync) thisApp.localStorage.set(storeObj.key + "DontSync", true);
            await thisApp.idxDb.delete(storeObj.key);
            storeObj.tempHandlePlain = null;
            await storeObj.reset();
            if(storeObj.connected) thisApp.message.storeConnectionFalse(storeObj.name);
            storeObj.connected = false;
            return null;
        };
        storeObj.reset = async _ => {
            storeObj.dbMod = 0;
            storeObj.syncStop();
            storeObj.dontSync = thisApp.consent && thisApp.localStorage.exists ? thisApp.localStorage.get(storeObj.key + "DontSync") : true;
            storeObj.handle = await thisApp.idxDb.get(storeObj.key); //privateRedirectHandle when redirect in private mode with preserved handles
            storeObj.handlePlain = storeObj.getHandleFromRedirect ? storeObj.tempHandlePlain || await storeObj.getHandleFromRedirect() : null;
            // tempHandlePlain - temporary handlePlain assigned when OperationError when Loading from loader and wrong password. .redirect() returns obtained refresh token || null (for One Drive also checks if the OAuth Refresh Token expired - and will send for re-authorisation if necessary)
            storeObj.tempHandlePlain = null;
            const thisStoreExists = (storeObj.handle || storeObj.handlePlain) && !storeObj.syncPaused;
            storeObj.iconOpacity(thisStoreExists);
            return thisStoreExists ? storeObj : false;
        };

        storeObj.connect = async storeDbObj => {
            storeObj.dbMod = storeDbObj.mod; //0
            if(storeObj.dbMod !== thisApp.dbObj.mod){ //storeObj.dbMod and thisApp.dbObj are NOT the same
                if(storeObj.dbMod > thisApp.dbObj.mod){ //storeObj.dbMod is newer than thisApp.dbObj - Update the inApp database
                    thisApp.cryptoHandle.setDbObj(storeDbObj);
                }else if(storeObj.dbMod){ //storeObj exists and is older than thisApp.dbObj - localFile and / or Dbx File will be overwritten if accepted
                   const isSetOlderStore = await thisApp.alert.setOlderStore(storeObj.key);
                    if(isSetOlderStore) thisApp.cryptoHandle.setDbObj(storeDbObj);
                    if(isSetOlderStore === null) await storeObj.handleRemove(false, true); // cross presses
                    //else (false) - continue - the storeDbObj will be overwritten with the current thisApp.dbObj 
                }// if (storeObj.dbMod = undefined) - when connection new DB from dbx - update with thisApp.dbObj

                await this.updateAll(false).then(rejectedPromises => {
                    if(rejectedPromises.length) thisApp.message.storeConnectFail(storeObj.name);
                    thisApp.paint(true);
                }).catch(thisApp.message.noWriteStores);
            }
            if(!!storeObj.handle && !storeObj.connected) thisApp.message.storeConnectionTrue(storeObj.name);
            storeObj.syncPaused = false;
            storeObj.connected = !!storeObj.handle
            storeObj.iconOpacity(storeObj.connected, true);
            storeObj.syncStop();
            return storeObj.key;//used to confirm the successful update (and for dev reason to see which of the stores have been updated)
        };
        storeObj.iconOpacity = (show, afterConnection) => {
            let method = show ? "killClass": "addClass";
            storeObj.credIcon[method]("elDimmed");
            method = afterConnection ? method : "addClass";
            storeObj.syncIcon[method]("elDimmed");
        };
        storeObj.syncToggle = async _ => {
            if(storeObj.syncing) return thisApp.message.storeIsSyncing(storeObj.name);
            if(storeObj.handle && !storeObj.syncPaused){
                if(await thisApp.alert.disconnectDbFrom(storeObj.key)) storeObj.handleRemove(true, false);
            }else{
                storeObj.syncPaused = false;
                await storeObj.sync().catch(storeObj.catchSync);
            }
        };

        if(!storeObj.getHandleFromRedirect) return;
        
        // storeObj is remote
        let dbObjExistingSync = null;

        storeObj.redirectToOAuth = async (getAuthCredentials, skipAlert) => {
            if(!thisApp.online) return storeObj.syncPause().then(thisApp.alert.offline);

            if(!window.sessionStorage){
                await thisApp.alert.noSessionStorage();
                thisApp.message.noSessionStorage();
                return thisApp.dbObj || thisApp.start(null, false);
            }
            
            if(!skipAlert){ //skipAlert is false when load or sync the storeObj. skipAlert is true when automatic redirect to refresh oneDrive handle
                const redirectMessage = thisApp.sessionStorage.exists ? "remoteRedirect" : "remoteRedirectPrivateMode";
                if(!await thisApp.alert[redirectMessage](storeObj.key)){
                    //If !allowRedirect and thisApp.dbObj - do nothing. 
                    //If !allowRedirect and no thisApp.dbObj - Restart the app.
                    return thisApp.dbObj || thisApp.start(null, false);
                }
                if(!thisApp.sessionStorage.exists){
                    let objsWithHandle = this.getObjectsWithHandles();
                    const isLocalFile = objsWithHandle.find(storeObj => storeObj.key  ==="localFile");
                    if(isLocalFile){
                        await  thisApp.alert.privateModeUnablePreserveLocalFile(isLocalFile.key, isLocalFile.name, storeObj.name);
                        objsWithHandle = objsWithHandle.filter(storeObj => storeObj.key  !=="localFile");
                    }
                    const [currentCloudObjectWithHandle] = objsWithHandle;
                    if(currentCloudObjectWithHandle){
                        if(!await thisApp.alert.privateModeOneCloudConnectionAllowed(currentCloudObjectWithHandle.key, currentCloudObjectWithHandle.name, storeObj.name)) return;
                    }
                }
            }

            thisApp.spinner.start();
            
            const redirectState = storeObj.key + thisApp.crypto.randomHex(16);
            const [authUrl, codeVerifier] = await getAuthCredentials(redirectState);
            try{
                await thisApp.cryptoHandle.setRedirectCredentials(codeVerifier, redirectState);
            }catch(err){
                thisApp.spinner.stop();
                window.sessionStorage.clear();
                
                await thisApp.alert.remoteRedirectError(storeObj.key);
                thisApp.message.remoteRedirectError({errMsg: "redirectToOAuth -> setRedirectCredentials Error", err: err});
                
                return thisApp.dbObj || thisApp.start(null, false);
            }
            
            thisApp.urlReplace(authUrl);
            return new Promise(res => setTimeout(res, 10000)).then(_ => null); // give plenty of time to replace the document's url and then return null (it probably will never reach the caller function anyway)
        };
        
        storeObj.getTokenFromRedirect = async (getTokenFromCode, refreshExpiredToken) => {
            if(!thisApp.online) return storeObj.syncPause().then(thisApp.alert.offline); //will return false or null

            const redirectObject = {...thisApp.urlSearchParams}; // will make a copy of object - even from null value ({}); 
            const isMatchingState = redirectObject.state?.startsWith(storeObj.key); //thisApp.urlSearchParams is a global variable collected at the load of the app
            if(isMatchingState){ // it is the correct storeObj
                try{
                    if(redirectObject.error) throw "redirectHasError"; //thisApp.message.remoteConnectFail(storeObj.name);
                    if(!redirectObject.code) throw "redirectCodeMissing"; //thisApp.message.remoteConnectFail(storeObj.name);
                    
                    const [codeVerifier, appDbObj] = await thisApp.cryptoHandle.getRedirectCredentials(redirectObject.state);
                    // The state must be correct as it was used to decrypt the codeVerifier
                    dbObjExistingSync = appDbObj;
                    
                    return getTokenFromCode(redirectObject.code, codeVerifier);
                }catch(err){
                    if(developerMode) console.error("storeObj.getTokenFromRedirect error: ", err);
                    thisApp.message.remoteConnectFail(storeObj.name, {errMsg: "storeObj.getTokenFromRedirect Error", err: err});
                    return null;
                }finally{
                    thisApp.urlSearchParams = null; //clear the urlSearchParams if it matches thisStoreObj.key regardless of 
                }
            }else{// this is not the correct storeObj, but check if this storeObj requires a refresh maybe
                if(refreshExpiredToken && storeObj.handle && thisApp.localStorage.get(storeObj.key + "RefreshBy") < Date.now()){
                    storeObj.refreshExpiredToken = refreshExpiredToken; // add a new storeObj method assigning function that will enable refresh of the handle in the thisApp.start
                }
                return null;
            }
        };

        storeObj.remoteRead = async (getEncryptedFileData, handlePlainMustBeRefreshed) => {
            if (!storeObj.handlePlain && !storeObj.handle) return;
            if (!thisApp.online) return storeObj.syncPaused ? null : storeObj.syncPause().then(thisApp.alert.offline);
            storeObj.syncStart();

            // Retrieve encrypted file content using the plain handle from redirecion or the decrypted IDBX handle using a freshly obtained credentials
            const encryptedCloudFileData = await getEncryptedFileData( storeObj.handlePlain || await thisApp.cryptoHandle.decryptToString(storeObj.handle) );
            if(handlePlainMustBeRefreshed && !storeObj.handlePlain) return storeObj.syncStop(); // when sent to refreshExpiredToken for oneDriveFile

            // Fresh redirect, handle is not set yet
            if (!storeObj.handle) {
                if(dbObjExistingSync){ // Session Storage DB was set before sendToOAuth for cloud authorisation
                    const existingDbObject = await thisApp.cryptoHandle.decryptToJson(dbObjExistingSync);
                    dbObjExistingSync = null; //clear the dbObjExistingSync
                    if (!thisApp.dbObj) thisApp.cryptoHandle.setDbObj(existingDbObject); // Ensure that the application database object is set before proceeding
                    
                    if(encryptedCloudFileData){ // Existing Session Storage DB and remote file both present
                        const confirmSync = await thisApp.alert.remoteSyncOrOverwrite(storeObj.key);
                        if (confirmSync === null) return false; // User canceled
                        if (confirmSync) {
                            // Sync cloud file with the application database
                            const cloudDbObj = await thisApp.cryptoHandle.decryptToJson(encryptedCloudFileData);
                            await storeObj.handleUpdate(thisApp.cryptoHandle.encryptString(storeObj.handlePlain));
                            return storeObj.connect(cloudDbObj); // Sync cloud data with the application database object
                        }
                    }

                    // confirmSync is false = will overwrite cloud file with existing thisApp.dbObj 
                    // || (dbObjExistingSync && !encryptedCloudFileData) = will create cloud file with existing thisApp.dbObj 
                    
                }else{ // No dbObjExistingSync
                    if(encryptedCloudFileData){// Case 3: No dbObjExistingSync(and by extention no thisApp.dbObj) but cloud file exists
                        const confirmLoad = await thisApp.alert.remoteLoadOrNew(storeObj.key);

                        if (confirmLoad === null) return false; // User canceled
                        if (confirmLoad) {
                            const cloudDbObj = await thisApp.cryptoHandle.decryptToJson(encryptedCloudFileData);
                            thisApp.cryptoHandle.setDbObj(cloudDbObj);// Set cloud file as thisApp.dbObj (application database object)
                            await storeObj.handleUpdate(thisApp.cryptoHandle.encryptString(storeObj.handlePlain));
                            return storeObj.connect(cloudDbObj);
                        } else {// confirmLoad === false = Create new empty thisApp.dbObj and overwrite the existing cloud file
                            if(!await thisApp.alert.remoteFileDelete(storeObj.key)) return false; // confirm removal of data from the existing cloud file before overwrite
                        }
                    }
                    // (confirmLoad is false && remoteFileDelete is true) = will overwrite cloud file with empty thisApp.dbObj 
                    // || (!dbObjExistingSync && !encryptedCloudFileData) = will create cloud file with empty thisApp.dbObj
                    
                    await thisApp.cryptoHandle.decryptToJson(null); // get credentials for new database
                    thisApp.cryptoHandle.setDbObj(null); // Create new empty application database object (thisApp.dbObj)
                }

                await storeObj.handleUpdate(thisApp.cryptoHandle.encryptString(storeObj.handlePlain));
                return storeObj.update(); //A cloud file is created, or the existing file is overwritten with either the existing or an empty thisApp.dbObj
            }

            // Handle is set, sync required after alerts
            if (!encryptedCloudFileData) { // Handle exists, but file is missing in cloud
                if (
                    (!thisApp.dbObj?.mod && !await thisApp.alert.remoteFileMissing(storeObj.key)) ||
                    !(await thisApp.alert.remoteFileRestore(storeObj.key))
                ) {
                    return storeObj.handleRemove(false, true); // Handle removal if the cloud file is missing and cannot be restored (!thisApp.dbObj) or is declined to be restored by the user
                }
                return storeObj.update(); // File restored, create cloud file with with the existing thisApp.dbObj
            }

            // Cloud file exists, decrypt and sync with the application database
            const cloudDbObj = await thisApp.cryptoHandle.decryptToJson(encryptedCloudFileData);
            if (storeObj.handlePlain) await storeObj.handleUpdate(thisApp.cryptoHandle.encryptString(storeObj.handlePlain));
            if (!thisApp.dbObj) thisApp.cryptoHandle.setDbObj(cloudDbObj); // If application database object doesn't exists, the cloud file data is set as the application database object (thisApp.dbObj)
            return storeObj.connect(cloudDbObj); // Sync cloud data with the application database object
        };
        
        storeObj.remoteUpdate = async updateStore => {
            const alreadyUpdated = storeObj.dbMod === thisApp.dbObj.mod;
            if(!thisApp.dbObj || !thisApp.online || !storeObj.canAlter() || storeObj.dontSync || storeObj.syncPaused || alreadyUpdated){
                storeObj.iconOpacity(alreadyUpdated, true);
                return alreadyUpdated;
            }
            storeObj.syncStart();
            await updateStore(await thisApp.cryptoHandle.getDbFileBlob());
            return storeObj.connect(thisApp.dbObj);
        };
        
        storeObj.switchConnection = async _ => {
            if(!thisApp.online || !storeObj.handle) return storeObj.syncPause();
            
            storeObj.syncPaused = false;
            if(storeObj.canAlter()){
                storeObj.update().catch(storeObj.catchUpdate);
            }else{
                try{
                    await storeObj.read().then(thisApp.paint).catch(storeObj.catchLoad); 
                }catch(err){ //would be one of the following: "OperationError", "DeleteDatabase", "BackButtonPressed","noFilePickedErr" - neither can really happen
                    await storeObj.catchSync(err);
                }
            }
        };
    };

    /* ---------------------------------------------------------  DBX File Store --------------------------------------------------------------------- */
    function DbxFile(){
        const CLIENT_ID = "1040klsqlfss2cv";
        const REDIRECT_URI = thisApp.URL; //"https://swedhearth.github.io/secresync/";
        const dbxFilePath = "/secre.snc";
        const timeoutMsec = 5000;
        const dbxAuth = new Dropbox.DropboxAuth({
            clientId: CLIENT_ID,
        });

        let dbx = null; //Dropbox object
        
        const putDbxFile = dbFileBlob => dbx.filesUpload( {path: dbxFilePath, contents: dbFileBlob, mode: "overwrite", autorename: false} );
        const getDbxFile = _ => dbx.filesDownload({path: dbxFilePath});
        
        const getAuthCredentials = async state => {
            const dbxAuthUrl = await dbxAuth.getAuthenticationUrl(REDIRECT_URI, state, 'code', 'offline', null, undefined, true)
            return [
                dbxAuthUrl,
                dbxAuth.codeVerifier
            ]
        };
        
        const getTokenFromCode = async (redirectCode, codeVerifier) => {
            dbxAuth.setCodeVerifier(codeVerifier);
            const tokenResponse = await dbxAuth.getAccessTokenFromCode(REDIRECT_URI, redirectCode);
            return tokenResponse.result.refresh_token; // this.handlePlain
        };
        
        const getEncryptedFileData = async refresherToken => {
            const refreshToken = async _ => {
                dbxAuth.setRefreshToken(refresherToken);
                await dbxAuth.refreshAccessToken();
                return new Dropbox.Dropbox({ auth: dbxAuth });
            };
            dbx = await Promise.race([
                new Promise((resolve, reject) => setTimeout(_ =>  reject(new Error("timeout")), timeoutMsec)), 
                refreshToken()
            ]);
            const dbxFileResponse = await getDbxFile().catch(_ => null);
            return dbxFileResponse?.result?.fileBlob?.arrayBuffer() || null;
        };

        this.key = "dbxFile";
        this.load = this.sync = _ => this.redirectToOAuth(getAuthCredentials, false); //this.remoteLoad(getAuthCredentials);
        this.read = _ => this.remoteRead(getEncryptedFileData, false);
        this.update = _ => this.remoteUpdate(putDbxFile);
        this.canAlter = _ => !!dbx;
        this.canSync = _ => !!window.sessionStorage;
        this.getHandleFromRedirect = async _ => this.getTokenFromRedirect(getTokenFromCode, false);

        extendStore(this);
    }

    /* ---------------------------------------------------------  OneDrive File Store --------------------------------------------------------------------- */
    function OneDriveFile(){
        const TENANT_ID = 'common';
        const CLIENT_ID = "2c383240-d95d-4a31-be57-1406dbcbfbc6";
        const REDIRECT_URI = thisApp.URL; //"https://swedhearth.github.io/secresync/";
        const oneDriveFilePath = "/secre.snc";
        const graphUserScopes = ['offline_access', 'Files.ReadWrite'].join(" ");
        const authLeadUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0`;
        const getAuthUrl = (state, codeChallenge) => `${authLeadUrl}/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${graphUserScopes}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
        const oneDriveFileUrl = `https://graph.microsoft.com/v1.0/me/drive/special/approot:${oneDriveFilePath}:/content`

        const getRefreshTokenTime = _ => Date.now() + 1000 * 60 * 60 * 23; // Refresher lasts only 24 hours - refresh after more than 23 hours
        const timeoutMsec = 5000;

        let oneDriveAccessToken = null; // holder of the tokenResponse.access_token - obtained throgh the getAccessToken, used in putOneDriveFile, getOneDriveFile and the switchConnection

        /* helpers */
        const putOneDriveFile = dbFileBlob =>  fetch(oneDriveFileUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${oneDriveAccessToken}`,
                'Content-Type': 'application/octet-stream'
            },
            body: dbFileBlob
        });

        const getOneDriveFile = _ => fetch(oneDriveFileUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${oneDriveAccessToken}`
            }
        });

        const getAccessToken = async tokenRequestObj => {
            const tokenResponse = await fetch(`${authLeadUrl}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(tokenRequestObj)
            }).then(response => response.json());

            oneDriveAccessToken = tokenResponse.access_token; // undefined if not obtained?
            console.log("OneDrive tokenResponse = ", tokenResponse);
            return tokenResponse;
        };
        
        const authTokenRequestObj = (redirectCode, codeVerifier) => {
            return{
                client_id: CLIENT_ID,
                code: redirectCode,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
                code_verifier: codeVerifier
            };
        };
        
        const refreshTokenRequestObj = refreshToken => {
            return{
                client_id: CLIENT_ID,
                refresh_token: refreshToken,
                redirect_uri: REDIRECT_URI,
                grant_type: 'refresh_token'
            };
        };
        /*End helpers*/
        
        const getAuthCredentials = async state => {
            const oneDriveCodeVerifier = thisApp.crypto.randomHex(16); // Generate a code verifier for PKCE
            const codeChallenge = await thisApp.crypto.safeB64DigestFromIterable(oneDriveCodeVerifier);// Generate a code challenge for PKCE
            const oneDriveAuthUrl = getAuthUrl(state, codeChallenge)

            return [
                oneDriveAuthUrl,
                oneDriveCodeVerifier
            ];
        };
        
        const getTokenFromCode = async (redirectCode, codeVerifier) => {
            const tokenResponse = await getAccessToken(authTokenRequestObj(redirectCode, codeVerifier));
            return tokenResponse.refresh_token; // this.handlePlain
        };
        
        const refreshExpiredToken = async forceAsk => !forceAsk || await thisApp.alert.oneDriveRefreshAccess() ? this.redirectToOAuth(getAuthCredentials, true) : this.handleRemove(true, true); //will sendToOAuthOneDrive and return null || forcibly remove handle and return null;
        //const refreshExpiredToken = async _ => await thisApp.alert.oneDriveRefreshAccess() ? this.redirectToOAuth(getAuthCredentials, true) : this.handleRemove(true, true); //will sendToOAuthOneDrive and return null || forcibly remove handle and return null

        const getEncryptedFileData = async refreshToken => { // refreshToken: either this.handlePlain || decrypted this.handle if this.handle exists
            this.handlePlain = null; // reset the handlePlain to avoid having its value in the unlike scenario that the tokenResponse doesn't contain the refresh_token when refreshed from the this.handlePlain
            const tokenResponse = await Promise.race([
                new Promise((resolve, reject) => setTimeout(_ =>  reject(new Error("timeout")), timeoutMsec)), 
                getAccessToken(refreshTokenRequestObj(refreshToken))
            ]);

            if(tokenResponse.access_token){
                this.handlePlain = tokenResponse.refresh_token;
                thisApp.localStorage.set("oneDriveFileRefreshBy", getRefreshTokenTime(tokenResponse.expires_in));
                const oneDriveFileResponse = await getOneDriveFile().catch(_ => null); //now the OneDriveFile Store Object's global variable:'oneDriveAccessToken' equals the 'tokenResponse.access_token';
                return oneDriveFileResponse?.ok ? oneDriveFileResponse.arrayBuffer() : null;
            }else if(tokenResponse.error === "invalid_grant"){
                alert("No OneDrive .access_token - will send to refreshExpiredToken - this should not happen as it should be caught earlier through the redirect");
                return refreshExpiredToken(true); // will ask for sendToOAuthOneDrive for re-authorisation (and/or will return null)
            }else{
                throw {msg:"MS Graph Unidentified Authorisation Error in Token Response", err: tokenResponse};
            }
        };

        this.key = "oneDriveFile";
        this.load = this.sync = _ => this.redirectToOAuth(getAuthCredentials, false); //this.remoteLoad(getAuthCredentials);
        this.read = _ => this.remoteRead(getEncryptedFileData, true); // true = handlePlain must be refreshed
        this.update = _ => this.remoteUpdate(putOneDriveFile);
        this.canAlter = _ => !!oneDriveAccessToken;
        this.canSync = _ => !!window.sessionStorage;
        this.getHandleFromRedirect = async _ => this.getTokenFromRedirect(getTokenFromCode, refreshExpiredToken);

        extendStore(this);
    }


    /* ---------------------------------------------------------  Local File Store --------------------------------------------------------------------- */
    function LocalFile(){
        const fileOptions = { // File Options - save and read names and types
            suggestedName: 'secre',
            types: [{
                description: 'SecreSync Database',
                accept: {
                    'application/snc': ['.snc']
                }
            }],
            excludeAcceptAllOption: true,
            multiple: false
        };
        
        const verifyPermission = async mode => {
            return "granted" === await this.handle.queryPermission({ mode }) || 
                   "granted" === await this.handle.requestPermission({ mode });
        };
        
        const readDbUseFileHandle = async existing => { //FileSystemdbFileHandle API
            this.syncStart();
            let dbCredentials = null;
            if(!thisApp.dbObj){ //|| !existing
                this.iconOpacity(true);
                dbCredentials = await thisApp.credentials.get(false);// if throws then 2 possibilities: No dbRawCredentials (DeleteDatabase or BackButton was pressed);
            }
            if(!await verifyPermission(existing ? "readwrite" : "read")) throw thisApp.txtBank.app.values.userReject;
            return [await this.handle.getFile().then(file => file.arrayBuffer()), dbCredentials];
        }

        const readDbUseFileReader = async _ =>{
            //thisApp.message.pickFileFR();
            this.syncStart();
            await this.handleRemove(false, true);
            const fileContents = await pickFile().catch(err => {
                throw "noFilePickedErr";
            });
            this.iconOpacity(true);
            this.handlePlain = true; // to display the highlighted LocalFile icon in the credentials screen
            return [fileContents, null]; // Global Function
        }
        
        const getNewHandle = async _ => {
            this.syncStart();
            const [localFileHandle] = await window.showOpenFilePicker(fileOptions).catch(err => {
                throw "noFilePickedErr";
            });
            await this.handleUpdate(localFileHandle);
        }
        
        const readNewFile = async _ => {
            thisApp.message[this.canAlter() ? "pickFile" : "pickFileFR"]();
            return this.canAlter() ? getNewHandle().then(_ => readDbUseFileHandle(false)) : readDbUseFileReader();
        }

        const readFile = async _ => {
            if(this.handle && !this.canAlter()){ //Extremely unlikely scenario where the handle existed on the device but now the showSaveFilePicker is unavailable
                await this.handleRemove(false, true);
                throw "noFilePickedErr";
            }

            const [encodedLocalFileContent, dbCredentials] = this.handle ? await readDbUseFileHandle(true) : await readNewFile();

            const appDbObjExists = !!thisApp.dbObj;
            const localFileDbObj = await thisApp.cryptoHandle.decryptToJson(encodedLocalFileContent, dbCredentials, false, false); 
            if(!appDbObjExists) thisApp.cryptoHandle.setDbObj(localFileDbObj);

            return this.connect(localFileDbObj).finally(_ => {
                // REMOVE IF NO ALERT!
                if(appDbObjExists && !this.handle){ // this can happen when there was a fileHandle, then the error was thrown in updateLocalFile and subsequently the handle was removed
                    thisApp.paint();
                }
            });
        }
        
        const loadLocalFile = async _ =>{ //external from btnClick on initial Home Page with no remembered databases
            await readFile();
            await thisApp.paint();
            await thisApp.dbStore.checkExtraSync(thisApp);
        }

        const downloadLocalFile = async _ => {
            const downloadedFileName = downloadFile(await thisApp.cryptoHandle.getDbFileBlob(), "secre.snc");
            await new Promise(res => setTimeout(res, 1000));
            thisApp.message.dbFileDownloaded(downloadedFileName);
        }

        const writeToFile = async (handle) => { //FileSystemdbFileHandle API
            const encodedDbBlob = await thisApp.cryptoHandle.getDbFileBlob();//await fileBlob promise from getEncodedAry
            const writable = await handle.createWritable();// Create a FileSystemWritableFileStream to write to.
            await writable.write(encodedDbBlob);// Write the contents of the file to the stream.
            await writable.close();  // Close the file and write the contents to disk.
            return this.connect(thisApp.dbObj);
        };

        const useNewdbFileHandle = async _ => {
            const localFileHandle = await window.showSaveFilePicker(fileOptions);
            await this.handleUpdate(localFileHandle);
            await writeToFile(localFileHandle); // use new fileHadle
        };
        
        const updateLocalFile = async _ => {
            if(this.handle && !this.canAlter()) await this.handleRemove(false, true);// virtually impossible that the device would loose the ability of the showSaveFilePicker while having the this.handle
            const alreadyUpdated = this.dbMod === thisApp.dbObj.mod;
            if(!this.canAlter() || this.dontSync || this.syncPaused || alreadyUpdated) return alreadyUpdated;
            this.syncStart();
            return this.handle ? writeToFile(this.handle) : useNewdbFileHandle();
        };
        
        const syncLocalFile = async _ => {
            this.syncStart();
            if(this.canAlter()){
                return {
                    true: readFile,
                    false: updateLocalFile,
                    null: _ => {this.syncStop(); return false;}
                }[ await thisApp.alert.localFileLoadOrCreate() ]();// This can have three outcomes (null - closed with cross or backbutton (this.syncStop) , false (updateLocalFile) or true (readFile)) then run function
            }
            if(this.handle) await this.handleRemove(false, true);
            if(await thisApp.alert.localFileDownload()) await downloadLocalFile();
            this.syncStop();// return nothing if !this.canAlter
        };
        
        this.key = "localFile";
        this.load = loadLocalFile
        this.read = readFile;
        this.sync = syncLocalFile;
        this.update = updateLocalFile;
        this.canAlter = this.canSync = _ => !!window.showSaveFilePicker; //Can db file be modified? 
        this.download = downloadLocalFile;

        extendStore(this);
    }

    /* ---------------------------------------------------------  Local Store --------------------------------------------------------------------- */
    function Local (){
        const readLocal = async _ => {
            if(!this.handle || !this.canAlter()) return;
            this.syncStart();
            const localDbObj = await thisApp.cryptoHandle.decryptToJson(this.handle);
            thisApp.cryptoHandle.setDbObj(localDbObj);
            return this.connect(thisApp.dbObj);
        }
        const updateLocal = async _ => {
            const alreadyUpdated = this.dbMod === thisApp.dbObj.mod;
            if(!this.canAlter() || this.dontSync || this.syncPaused || alreadyUpdated) return alreadyUpdated; //was also this.syncStop(); ??????
            this.syncStart();
            await this.handleUpdate(thisApp.cryptoHandle.getDbCipher());
            return this.connect(thisApp.dbObj);
        }
        
        const syncLocal = async auto => {
            if(!this.canAlter()) return thisApp.alert.privateModeUnableSyncLocal();
            this.syncStart();
            return updateLocal();
        }

        this.key = "local";
        this.read = readLocal;
        this.sync = syncLocal;
        this.update = updateLocal;
        this.canAlter = this.canSync = _ => thisApp.idxDb.exists;

        extendStore(this);
    }
/* ****************************--------------------------------- END App Stores  ---------------------------------***********************************/

    this.local = new Local();
    this.dbxFile = new DbxFile(); //dbxFileLoad
    this.oneDriveFile = new OneDriveFile(); //oneDriveFileLoad
    this.localFile = new LocalFile();

}

    AppDbStore.prototype.getAllObjects = function(){
        return Object.values(this);
    };
    AppDbStore.prototype.getRemoteObjects = function(){
        return this.getAllObjects().filter(storeObj => storeObj.getHandleFromRedirect);
    };
    AppDbStore.prototype.getObjectsWithHandles = function(remoteOnly){ //encryptedOnly (Boolean) - returns only Stores with encrypted handles (for dbx, one drive, google stores...)
         return this.getAllObjects().filter(storeObj => remoteOnly ? storeObj.getHandleFromRedirect && storeObj.handle : storeObj.handle);// this.redirect
    };
    AppDbStore.prototype.objectsExist = function(includingPlain){
        return this.getAllObjects().filter(storeObj => storeObj.handle || (includingPlain && storeObj.handlePlain)).length;
    };
    AppDbStore.prototype.restoreObjectsSync = function(){
        this.getAllObjects().forEach(storeObj => storeObj.removeDontSync());
    };
    AppDbStore.prototype.removeAllHandles = function(force){
        return Promise.all(this.getAllObjects().map(storeObj => storeObj.handleRemove(false, force)))
    };
    AppDbStore.prototype.getResetObjects = async function(){ // getResetObjects
        const savedStoreObjs = await Promise.all(this.getAllObjects().map(storeObj => storeObj.reset())).then(storeObjAry => storeObjAry.filter(Boolean));
        return {
            savedStoreObjs: savedStoreObjs,
            redirectedStoreObj: savedStoreObjs.find(store => store.handlePlain), // storeObject || undefined
            refreshExpiredStoreObjs: savedStoreObjs.filter(store => store.refreshExpiredToken) // find all that require handle refresh (will only refresh first in array if confirmed)
        }
    };
    AppDbStore.prototype.updateAll = async function(thisApp){ //this.dbStore.updateAll
        if(thisApp) thisApp.cryptoHandle.setDbObj(thisApp.dbObj, true); // update thisApp.dbObj and change dbObj.mod
        return new Promise((res, rej) => {
            Promise.allSettled(this.getAllObjects().map(storeObj => storeObj.update().catch(storeObj.catchUpdate)))
            .then(results => {
                console.log("UpdatePromisses: ", results);
                const rejectedPromises = results.filter(res => res.status === "rejected");
                const fulfilledPromisesLen = results.filter(res => res.value && res.status === "fulfilled").length;
                if(fulfilledPromisesLen){
                    res(rejectedPromises); // array of rejectes promises
                }else{
                    rej("ALL STORES UPDATE FAIL!!!");
                }
            })
        });
    };
    AppDbStore.prototype.checkExtraSync = async function(thisApp){ //this.dbStore.checkExtraSync
        const storeObjects = this.getAllObjects();
        for(const storeObj of storeObjects){
            if(storeObj.handle || storeObj.dontSync || storeObj.syncPaused || !storeObj.canSync()) continue;
            const doSync = await thisApp.alert.syncDbWith(storeObj.key);
            if(doSync){
                await storeObj.sync().catch(storeObj.catchSync);
            }else{
                await storeObj.handleRemove(doSync === false, true); // if doSync === null, do not put dontSync in Local Storage
                if(doSync === null) storeObj.syncPause();
            }
            //doSync ?  : await storeObj.handleRemove(doSync === false, true); // if doSync === null, do not put dontSync in Local Storage
        }
        return this.objectsExist() || thisApp.message.noWriteStores("noSyncHandles");
    };
