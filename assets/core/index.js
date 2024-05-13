(function(){
"use strict";

/* 

TO DO:
- One Drive Integration
- Google Drive Integration
- Private Browsing - fix and make it sleeker
- fix multilanguage
- error catching test
- decide on payment/supportDonate 

*/

/* Names:

WhatPass!!!
WhatsMyPass
PassApp - USED!!!!!!
PasScret Password Secret Create Sync App CAPSS Create Account Private Secret Sync
PasSecret Password Secret Create Sync
PasSec Password Secret Create Sync
PassSec Password Secret Create Sync
Syncreat!!!
Sncreat
SecreSync
SecSync
SecretSync - USED!!!!!!!
PrivSync !!!
CryptSync
SynCrypt - used
SyncKey
SyncValult
PassSync

Entangled Secrets App

sec.snc
Secret

Acceess Everywhere


Private
Secret
Pass
Sync
App
Vault
key
crypt
ACCOUNT

Pass Private Account Secret Sync

Private Secrets Synced (Pss)

MAPS
My Account Private Secret

Mirror App Private Secrets Synced 
Mirror App Private Synced 
Sync Private Secrets

VASP
vault app sync pass

ASAPP AcesSecret App
PrivAccess

PrivSync
Private Passwords Secrets Synchronised

Protected Passwords
Restricted Records
Intimate Information
Vendors


Sensitive Notes

Accounts

Confidentail Records
Classified Data
Personal

Private Secrets Synchronised
Secured

countersign
key
parole
phrase
signal
ticket
watchword
word
*/

/* ****************************------------------------------------- APP -------------------------------------***********************************/
    function App(){
        console.log("App Initiated");
        this.longName = "Secrets Synchronised";
        this.name = "SecreSync";
        this.URL = window.location.origin + window.location.pathname;//"https://swedhearth.github.io/secresync/"
        this.consent = null; // null = in private mode(storage disabled, false = consent not given, true = storage available
        let encryptDatabase = null; // will be set in the decodeToJson function
        let decryptString = null; // will be set in the decodeToJson function
        this.pendingPromise = null;
        let _encryptedDb = null;
        
        this.getEncryptedDbU8Ary = async _ => (_encryptedDb = (_encryptedDb || encryptDatabase()));
        this.getDbFileBlob = _ => this.getEncryptedDbU8Ary().then(encryptedDbU8Ary => new Blob([encryptedDbU8Ary.buffer], {type:"application/octet-stream"}));
        this.setDbObj = dbObj => {
            this.dbObj = new this.crypto.DatabaseObject(dbObj);
            _encryptedDb = null;
        };
        this.urlReplace = url => {if(url) location.replace(url);};
        this.reload = _ => this.urlReplace(this.URL);
        this.reset = async function(){
            this.dbObj = null;
            encryptDatabase = _encryptedDb = null;
            decryptString = null;
            this.pendingPromise = null;
            return Promise.all(Object.values(this.dbStore).map(storeObj => storeObj.reset())); // or just return Promise.all(Object.values(this.dbStore).map(reset));
        };
        this.clearAllStorage = async function(){
            this.localStorage.clear();
            this.sessionStorage.clear();
            await this.idxDb.clear().catch(err => console.log("idxDb not cleared", err));
        };
        this.makePrivate = async _ =>{
            try{
                await this.clearAllStorage();
                await this.idxDb.destroySelf().catch(err => console.log("idxDb not destroyed", err));
            }catch(err){
                console.error("this.idxDb - not declared");
            }
            this.consent = null;
            app.setUp(this.dbStore).then(_ => app.start("No Consent", true));
        };
        this.setConsent = _ => {
            this.consent = true;
            this.localStorage.set("consent", Date.now());
            app.setUp(this.dbStore).then(_ => app.start("With Consent", false));
        };
        this.online = navigator.onLine;
        
        this.connectivitychange = e => {
            this.online = e.type !== "offline";
            this.dbStore.dbxFile.connectionSwitch();
            this.message[e.type](); // message.online : message.offline
        }

        this.resetLogOutTimer = (_ => {
            let inactivityTimer;
            return _ => {
                if(!this.dbObj) return;
                clearTimeout(inactivityTimer);
                inactivityTimer = setTimeout(_ => this.start(this.message.loggedOff()), 600000);//600000 ms = 10 minutes
            }
        })();
        
        
        /* -------------------------------  Get CryptoKey  -------------------------------  */
        const persistCryptoKey = (cryptoKeyObj, plainPinString) =>{
            this.crypto.getNewPlainPinNonceHashString().then(plainPinNonceHashString => {
                this.idxDb.set("cryptoKeyNonce", plainPinNonceHashString).then(res => {
                    this.crypto.getNewCryptoKeyHexCipherU8Ary(cryptoKeyObj, plainPinNonceHashString, plainPinString) // = getCryptoKeyHexCipherCryptoKey(plainPinString, plainPinNonceHashString, recconectCount = 1)
                    .then(newCryptoKeyHexCipherU8Ary => {
                        this.idxDb.set("cryptoKeyCipher", newCryptoKeyHexCipherU8Ary); 
                        this.message.persistedSucess();
                    })
                    .catch(err => {
                        if(err === "retry") return persistCryptoKey(cryptoKeyObj, plainPinString);// the most unlikely scenario that the 256 bit key repeats in the Server Database
                        this.message.persistedFail();// "die" (php) or "fatal" (recconectCount exceeded - server error)
                    });
                });
            })
        };

        const getPesistedCredentials = _ => Promise.all([this.idxDb.get("cryptoKeyCipher"), this.idxDb.get("cryptoKeyNonce")]);
        const deletePesistedCredentials = _ => Promise.all([this.idxDb.delete("cryptoKeyCipher"), this.idxDb.delete("cryptoKeyNonce")]);
        
        this.getCredentials = async newCredentials => {
            const canPersist = !!this.consent;
            const [cryptoKeyCipher, cryptoKeyNonce] = await getPesistedCredentials();
            let credentialsResponseAry;
            
            if(newCredentials){
                credentialsResponseAry = await this.ui.credentials.pinPassNewChange(false, canPersist); //Arguments: (canDelete <can delete an existing database - clear all storages>, canPersist <can persist the cryptoKey>)
            }else if(cryptoKeyCipher && cryptoKeyNonce){
                credentialsResponseAry = await this.ui.credentials.pin(true, canPersist);
            }else{
                credentialsResponseAry = await this.ui.credentials.pinPass(true, canPersist);
            }
            if(!credentialsResponseAry) throw "BackButtonPressed";
            if(!credentialsResponseAry.length) throw "DeleteDatabase";
            return credentialsResponseAry;
        };

        this.decodeToString = async (cipherU8Ary, credentialsResponseAry, badPin, isImport) => { //credentialsResponseAry only when using Local File and there is no decryptDatabase
            if(this.pendingPromise) return this.pendingPromise.then(_ => this.decodeToString(cipherU8Ary, credentialsResponseAry, badPin, isImport));
            const maxBadPin = 3;
            return this.pendingPromise = new Promise(async (res, rej) => {
                try{
                    const newCredentials = !cipherU8Ary;
                    let decryptedString, cryptoKeyObj, saltU8Ary;
                    if(decryptString && !isImport){
                        [decryptedString] = await decryptString(cipherU8Ary);
                        return res(decryptedString);
                    }
                    const [plainPassString, plainPinString, persistKey] = credentialsResponseAry || await this.getCredentials(newCredentials); //credentialsResponseAry only when using Local File
                    if(newCredentials){
                        [cryptoKeyObj, saltU8Ary] = await this.crypto.getNewCryptoKeyAndSalt(plainPassString, plainPinString);
                        decryptedString = "{}";
                    }else{
                        if(plainPassString && plainPinString){
                            cryptoKeyObj = await this.crypto.getCryptoKeyObjFromPlains(cipherU8Ary, plainPassString, plainPinString);
                            [decryptedString, saltU8Ary] = await this.crypto.getStringFromCipher(cipherU8Ary, cryptoKeyObj);
                            if(isImport) return res(decryptedString);
                        }else if(plainPinString){
                            try{
                                if(plainPinString === true) throw "deletePesistedCredentials"; // clicked Log with Pass and Pin
                                const [cryptoKeyCipher, cryptoKeyNonce] = await getPesistedCredentials();
                                cryptoKeyObj = await this.crypto.getCryptoKeyFromKeyHexCipherInBrowser(plainPinString, cryptoKeyCipher, cryptoKeyNonce);
                                [decryptedString, saltU8Ary] = await this.crypto.getStringFromCipher(cipherU8Ary, cryptoKeyObj);
                            }catch(err){ // "deletePesistedCredentials" or "die" or "fatal" (connection issue) or "retry"
                                badPin = badPin || 1;
                                if(badPin > maxBadPin || err === "deletePesistedCredentials"){
                                    await deletePesistedCredentials().catch(err => "deletePesistedCredentials total error");;
                                    credentialsResponseAry = null;
                                    this.message.persistedDeleted();
                                }else{
                                    this.message.persistedBadPin(1 + maxBadPin - badPin);
                                }
                                this.pendingPromise = null;
                                return res(this.decodeToString(cipherU8Ary, credentialsResponseAry, ++badPin));
                            }
                        }else{
                            return res(null); // this.credentialsResponseAry is empty  no plainPassString and no plainPinString
                        }
                    }
                    
                    this.encryptString = string => this.crypto.getCipherFromString(string, cryptoKeyObj, saltU8Ary); // used to encrypt plain handle in dbx, oneDrive and Google Drive
                    decryptString = cipherU8Ary => this.crypto.getStringFromCipher(cipherU8Ary, cryptoKeyObj);
                    encryptDatabase = _ => this.encryptString(JSON.stringify(this.dbObj)); // assign new function for decrypt using the retrieved cryptoKeyObj and saltU8Ary

                    console.log("saltU8Ary: ", saltU8Ary);

                    if(persistKey) persistCryptoKey(cryptoKeyObj, plainPinString);
                    res(decryptedString);
                }catch(err){
                    rej(err);
                }
            })
            .catch(err => {throw err;})
            .finally(_ => this.pendingPromise = null);
        };
        
        this.decodeToJson = (...args) => this.decodeToString(...args).then(decryptedString => JSON.parse(decryptedString));
        
        this.changeCredentials = async _ => {
            const [plainPassString, plainPinString, persistKey] = await this.getCredentials(true);
            const [cryptoKeyObj, saltU8Ary] = await this.crypto.getNewCryptoKeyAndSalt(plainPassString, plainPinString);
            
            const storesWithEncryptedHandles = Object.values(this.dbStore).filter(storeObj => storeObj.redirect && storeObj.handle); //handles for dbx, one drive, google stores
            const encryptedHandles = await Promise.all(storesWithEncryptedHandles.map(storeObj => this.idxDb.get(storeObj.key)));
            const decryptedHandles = await Promise.all(encryptedHandles.map(encryptedHandle => this.decodeToString(encryptedHandle))); // decrypted handles for dbx, one drive, google stored t
            await Promise.all(storesWithEncryptedHandles.map(storeObj => {
                storeObj.handle = null;
                return this.idxDb.delete(storeObj.key);
            })); // remove obsolete handle
            
            this.encryptString = string => this.crypto.getCipherFromString(string, cryptoKeyObj, saltU8Ary); // used to encrypt plain handle in dbx, oneDrive and Google Drive
            encryptDatabase = _ => this.encryptString(JSON.stringify(this.dbObj)); // assign new function for decrypt using the retrieved cryptoKeyObj and saltU8Ary
            
            await Promise.all(storesWithEncryptedHandles.map((storeObj, idx) => storeObj.handleUpdate(this.encryptString(decryptedHandles[idx])))); // restore newly encrypted handles
            
            if(persistKey) persistCryptoKey(cryptoKeyObj, plainPinString);//do it only once!!

            this.dbStoreUpdateAll(true).then(rejectedPromises => {
                if(rejectedPromises.length) this.message.dbCredentialsChangeModerateFail(rejectedPromises);
            }).catch(err => {
                this.idxDb.delete("cryptoKeyCipher"); 
                this.message.dbCredentialsChangeCriticalFail(err);
            });
        };
        /* -------------------------------  End Get CryptoKey  -------------------------------  */
        
        function Storage(storage, thisApp){
            Object.assign(this, storage);
            this.get = name => storage && thisApp.consent ? storage.getItem(name) : null;
            this.set = (name, value) => storage && thisApp.consent ? storage.setItem(name, value) : null;
            this.delete = name => storage && thisApp.consent ? storage.removeItem(name) : null;
            this.clear = _ => storage && thisApp.consent ? storage.clear() : null;
            this.destroySelf = _ => null; // if not consent
            this.exists = !!storage;
        }
        
        function DisplayOptions(dpObj, storage){
            Object.assign(this, dpObj);
            this.changeDetail = itemName => {
                const value = this.details[itemName] = !this.details[itemName];
                storage.set(itemName, value);
            }
            
            this.changeSort = itemName => {
                let {sortBy, sortOrder} = this.sorts;
                this.sorts.sortOrder = sortOrder = sortBy === itemName ? sortOrder === "Asc" ? "Desc" : "Asc" : sortOrder;
                this.sorts.sortBy = itemName;
                storage.set(`sortBy`, itemName);
                storage.set(`sortOrder`, sortOrder);
            }
        }
        
        function TextBank(lang){
            Object.assign(this, txtBankObj[lang]);
            this.languages = Object.keys(txtBankObj);
            this.getParsedText = (txtBankPropJoinString, templateObj) => {
                try{
                    return txtBankPropJoinString.split('.').reduce((o, k) => o[k], this).parseTemplate(templateObj);
                }catch(err){
                    console.error("Can't Parse: ", txtBankPropJoinString, templateObj); // Developer Mode
                    return "Text Parsing Error";
                }
            };
        }
        
        this.setUp = async function(dbStore){
            this.consent = !!window.localStorage.getItem("consent");
            this.localStorage = new Storage(window.localStorage, this);
            this.sessionStorage = new Storage(window.sessionStorage, this); // Unable to Use Dropbox if not available
            this.crypto = new Crypto();

            const {typeNote, typeLog, sortBy, sortOrder, detDates, detNotes, detTags} = this.localStorage;
            const dpObj = {
                sorts: {
                    sortBy: sortBy || 'vSortName',
                    sortOrder: sortOrder || 'Asc'
                },
                details: {
                    detDates: detDates === "true",
                    detNotes: detNotes === "true",
                    detTags: detTags === "true",
                    typeNote: !typeNote || typeNote === "true",
                    typeLog: !typeLog || typeLog === "true",
                }
            };

            this.displayOptions = new DisplayOptions(dpObj, this.localStorage);
            this.lang = this.lang || this.localStorage.get("lang") || "GB";
            this.txtBank = new TextBank(this.lang);
            this.ui = new Interface(this);
            this.alert = this.ui.alerts;
            this.message = this.ui.messages;
            
            this.dbStore = dbStore;
            this.ui.localiseDbStores();

            this.idxDb = this.consent ? await new IdxDb("SecreSync", 1, "assets") : new Storage(null);
        };
        
        this.changeLangTo = async lang => {
            this.lang = lang;
            this.txtBank = new TextBank(lang);
            this.ui.localiseDbStores();
            this.localStorage.set("lang", lang);
        };

        this.dbStoreUpdateAll = async function(dbAmended){
            if(dbAmended){
                this.dbObj.mod = Date.now();
                this.setDbObj(this.dbObj);
            }
            return new Promise((res, rej) => {
                Promise.allSettled(Object.values(this.dbStore).map(storeObj => storeObj.update().catch(storeObj.catchUpdate)))
                .then(results => {
                    const rejectedPromises = results.filter(res => res.status === "rejected")
                    const fulfilledPromisesLen = results.filter(res => res.value && res.status === "fulfilled").length;
                    if(fulfilledPromisesLen){
                        res(rejectedPromises); // array of rejectes promises
                    }else{
                        rej("ALL STORES UPDATE FAIL!!!");
                    }
                })
            });
        };
        
        this.checkExtraSync = async function() {
            //const syncPromises = [];
            const storeObjects = Object.values(this.dbStore);
            for(const storeObj of storeObjects){
                if(storeObj.handle || storeObj.dontSync || storeObj.syncPaused || !storeObj.canAlter()) continue;
                //await this.alert.syncDbWith(storeObj.key) ? syncPromises.push(await storeObj.sync().catch(storeObj.catchSync)) : await storeObj.handleRemove(true);
                await this.alert.syncDbWith(storeObj.key) ? await storeObj.sync().catch(storeObj.catchSync) : await storeObj.handleRemove(true);
            }
            //return Promise.all(syncPromises).then(_ => storeObjects.filter(storeObj => storeObj.handle).length || this.message.noWriteStores("noSyncHandles")); //&& this.message.storeConnectionTrue(storeObj.name)
            return storeObjects.filter(storeObj => storeObj.handle).length || this.message.noWriteStores("noSyncHandles");
        };

        this.paint = async _ =>  this.ui.initMain();
        
        this.createNewDb = async _ => {
            try{
                Object.values(this.dbStore).forEach(storeObj => storeObj.removeDontSync());
                await this.decodeToJson(false);
                console.log("await this.decodeToJson(false)");
                this.setDbObj(null);
                console.log(this.dbObj);
                this.paint();
                this.checkExtraSync().catch(e => this.start(e, true));
            }catch(err){
                console.log(err);
                this.start()
            }
        };
        
        
        this.start = async (msg, err, appStartFailCount = 0) =>{
            const maxAppStartFais = 4;
            const existingStores = (await this.reset()).filter(storeObj => storeObj !== false); // main delay (~30ms) is await thisApp.idxDb.get(storeObj.key) in the storeObj.reset function
            const [redirectedStoreObj] = existingStores.filter(store => store.handlePlain); // storeObject || undefined
            //msg = msg || (existingStores.length ? this.message.existingDb() : this.message.loadBd());
            
            msg = msg || (redirectedStoreObj ? this.message.remoteAuthorised() : existingStores.length ? this.message.existingDb() : this.message.loadBd());
            try{
                if (msg === "BackButtonPressed" || msg === "DeleteDatabase") throw msg;
                this.message[err ? "error" : "digest"](msg);
                if(existingStores.length){
                    const readPromiseAry = existingStores.map(storeObj => storeObj.read().catch(storeObj.catchLoad));
                    await Promise.race(readPromiseAry).then(this.paint);
                    if(!this.dbObj) throw "noDbObj"; // is this even possible?
                    this.checkExtraSync().catch(err => this.start(err, true, ++appStartFailCount));
                }else{ // no saved stores - load or create
                    await this.ui.loader().then(fn => fn()).catch(err => {throw "BackButtonPressed"});
                }
               // this.resetLogOutTimer();
            }catch(err){
                if(appStartFailCount > maxAppStartFais - 1) {
                    for (const storeObj of existingStores){
                        await storeObj.handleRemove(false);
                    }
                    return this.start(this.txtBank.app.values.badPass, true, 0);
                }

                if (err === "OperationError"){
                    this.message.dbFailed(maxAppStartFais - appStartFailCount)
                    return this.start(null, false, ++appStartFailCount);
                }
                if(err === "DeleteDatabase"){
                    for (const storeObj of existingStores){
                        if(!await this.alert.deleteExistingStore(storeObj.key)) return this.start();
                        await storeObj.handleRemove(false);
                    }
                    return this.start();
                }
                if(err === "BackButtonPressed") return this.start();
                this.alert.appFailed().finally(_ => document.documentElement.remove());
            }
        };
    }
/* ****************************------------------------------------- END APP -------------------------------------***********************************/

/* ****************************----------------------------------  App Stores  -----------------------------------***********************************/

    /* -------------------------------------------------------  Stores Extension ------------------------------------------------------------------ */
    function extendStore(storeObj, thisApp){
        function handleCatch(err){
            storeObj.syncStop();
            return  err.message || err;
        }
        storeObj.catchLoad = async err => {
            const errMsg = handleCatch(err);
            if (!thisApp.dbObj && err.name  === "OperationError") throw "OperationError";
            if(errMsg === "DeleteDatabase") throw "DeleteDatabase";
            if(errMsg === "BackButtonPressed") throw "BackButtonPressed";
            if(await thisApp.alert.catchLoad(storeObj.key, err)){
                await storeObj.handleRemove(false);
                return thisApp.start()
            }
            await storeObj.syncPause();
        }
        storeObj.catchSync = async err => {
            const errMsg = handleCatch(err);
            await thisApp.alert.catchSync(storeObj.key, errMsg);
            await storeObj.handleRemove(false);
            return errMsg;
        }
        storeObj.catchUpdate = async err => {
            const errMsg = handleCatch(err);
            await thisApp.alert.catchUpdate(storeObj.key, errMsg);
            await storeObj.handleRemove(true);
            throw storeObj.key + " Error";
        }
        storeObj.syncPause = async _ => {
            storeObj.iconOpacity(false);
            storeObj.syncPaused = true;
        }
        storeObj.removeDontSync = _ => {
            thisApp.localStorage.delete(storeObj.key + "DontSync");
            storeObj.dontSync = false;
        }
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
        };
        storeObj.handleRemove = async noMoreSync => {
            if(noMoreSync) thisApp.localStorage.set(storeObj.key + "DontSync", true);
            await thisApp.idxDb.delete(storeObj.key);
            await storeObj.reset();
            if(storeObj.connected) thisApp.message.storeConnectionFalse(storeObj.name);
            storeObj.connected = false;
        };
        storeObj.reset = async _ =>{
            storeObj.dbMod = 0;
            storeObj.syncStop();
            storeObj.dontSync = thisApp.consent && thisApp.localStorage.exists ? thisApp.localStorage.get(storeObj.key + "DontSync") : true;
            storeObj.handle = await thisApp.idxDb.get(storeObj.key);
            storeObj.handlePlain = storeObj.redirect ? await storeObj.redirect() : null;
            const thisStoreExists = (storeObj.handle || storeObj.handlePlain) && !storeObj.syncPaused;
            storeObj.iconOpacity(thisStoreExists);
            return thisStoreExists ? storeObj : false;
        };
        storeObj.connect = async storeDbObj =>{
            storeObj.dbMod = storeDbObj.mod; //0
            if(storeObj.dbMod !== thisApp.dbObj.mod){ //storeObj.dbMod and thisApp.dbObj are NOT the same
                if(storeObj.dbMod > thisApp.dbObj.mod){ //storeObj.dbMod is newer than thisApp.dbObj - Update the inApp database
                    thisApp.setDbObj(storeDbObj);
                }else if(storeObj.dbMod){ //storeObj exists and is older than thisApp.dbObj - localFile and / or Dbx File will be overwritten if accepted
                   const isSetOlderStore = await thisApp.alert.setOlderStore(storeObj.key);
                    if(isSetOlderStore) thisApp.setDbObj(storeDbObj);
                    if(isSetOlderStore === null) await storeObj.handleRemove(false); // cross presses
                    //else (false) - continue - the storeDbObj will be overwritten with the current thisApp.dbObj 
                }// if (storeObj.dbMod = undefined) - when connection new DB from dbx - update with thisApp.dbObj

                await thisApp.dbStoreUpdateAll(false).then(rejectedPromises => {
                    if(rejectedPromises.length) thisApp.message.storeConnectFail(storeObj.name);
                    thisApp.paint(true);
                }).catch(thisApp.message.noWriteStores);
            }
            if(!!storeObj.handle && !storeObj.connected) thisApp.message.storeConnectionTrue(storeObj.name);
            storeObj.syncPaused = false;
            storeObj.connected = !!storeObj.handle
            storeObj.iconOpacity(storeObj.connected);
            storeObj.syncStop();
            return storeObj.key;
        };
        storeObj.iconOpacity = (show) => {
            const method = show ? "killClass": "addClass";
            storeObj.credIcon[method]("elDimmed");
            storeObj.syncIcon[method]("elDimmed");
        };
        storeObj.syncToggle = async _ => {
            if(storeObj.syncing) return thisApp.message.storeIsSyncing(storeObj.name);
            if(storeObj.handle && !storeObj.syncPaused){
                if(await thisApp.alert.disconnectDbFrom(storeObj.key)) storeObj.handleRemove(true);
            }else{
                storeObj.syncPaused = false;
                await storeObj.sync().catch(storeObj.catchSync);
            }
        };
    }

    /* ---------------------------------------------------------  DBX File Store --------------------------------------------------------------------- */
    function DbxFile (thisApp){
        const CLIENT_ID = "1040klsqlfss2cv";
        const REDIRECT_URI = thisApp.URL; //"https://swedhearth.github.io/secresync/";
        const dbxFilePath = "/secre.snc";
        const timeoutMsec = 5000;
        const dbxAuth = new Dropbox.DropboxAuth({
            clientId: CLIENT_ID,
        });
        let dbx = null; //Dropbox object
        
/*         function promiseWithTimeout(timeoutMsec, promise) {
          const timeout = new Promise((resolve, reject) => {
            setTimeout(_ =>  reject(new Error("timeout")), timeoutMsec);
          });
          return Promise.race([timeout, promise]);
        }
        
        async function refreshToken(refresherToken){
            dbxAuth.setRefreshToken(refresherToken);
            await dbxAuth.refreshAccessToken();
            return new Dropbox.Dropbox({ auth: dbxAuth });
        } */
        
        
        const getEncodedDbxFileContent = async refresherToken => {
            console.log(refresherToken);
            dbx = await Promise.race([
                new Promise((resolve, reject) => setTimeout(_ =>  reject(new Error("timeout")), timeoutMsec)), 
                async _ => {
                    dbxAuth.setRefreshToken(refresherToken);
                    await dbxAuth.refreshAccessToken();
                    return new Dropbox.Dropbox({ auth: dbxAuth });
                }
            ]);
            console.log(dbx);
            //dbx = await promiseWithTimeout(timeoutMsec, refreshToken(refresherToken));
            return dbx.filesDownload({path: dbxFilePath}).then(res => res.result.fileBlob.arrayBuffer()).catch(_ => null);
        }

        const redirect = async _ => {
            if(!thisApp.online) return this.syncPause().then(thisApp.alert.offline); //will return false or null
            const urlSearchParams = Object.fromEntries(new URLSearchParams(window.location.search.substring(1)));
            window.history.replaceState({lastBackExists: true}, '', window.location.pathname); // removes the url parameters from the url without reloading the page
            
            let dbxCodeVerifier = null;
            if(urlSearchParams.code){
                if(thisApp.sessionStorage.exists){
                    dbxCodeVerifier = thisApp.sessionStorage.get('dbxCodeVerifier');
                    thisApp.sessionStorage.clear();
                }else{
                    dbxCodeVerifier = await navigator.clipboard.readText();
                }
                if(!dbxCodeVerifier) return thisApp.reload();
            }
            
            if(!dbxCodeVerifier || !urlSearchParams.code || urlSearchParams.error) return null; //thisApp.checkHistoryState(); //null;
            
            dbxAuth.setCodeVerifier(dbxCodeVerifier);
            const accessTokenResponse = await dbxAuth.getAccessTokenFromCode(REDIRECT_URI, urlSearchParams.code);
            return accessTokenResponse.result.refresh_token; // this.handlePlain
        }

        const loadDbxFile = async _ => { // function o connect to the login page of the DropBox, which then upon acceptance will redirect back to the app with the decodedDbxRefresher (accessTokenResponse.result.refresh_token) stored in the handlePlain
            if(!thisApp.online) return this.syncPause().then(thisApp.alert.offline);
            try{
                const authUrl = await dbxAuth.getAuthenticationUrl(REDIRECT_URI, undefined, 'code', 'offline', undefined, undefined, true);
                if(thisApp.sessionStorage.exists){
                    if(!await thisApp.alert.remoteRedirect(this.key)) throw "skipCloudSync";
                    thisApp.sessionStorage.set("dbxCodeVerifier", dbxAuth.codeVerifier);
                }else{
                    if(!await thisApp.alert.remoteRedirectWithClipboard(this.key)) throw "skipCloudSync";
                    navigator.clipboard.writeText(dbxAuth.codeVerifier);
                }
                if(thisApp.dbObj) await thisApp.idxDb.set("dbxSyncExisting", await thisApp.getEncryptedDbU8Ary()); // save current db in IDBX /// What if in private mode???????? //if thisApp.idxDb.exists?????
                // Set History State Here!!!!!!
                window.history.replaceState({authorising: true}, '', window.location.pathname);
                
                thisApp.urlReplace(authUrl);
            }catch(err){
                if(err === "skipCloudSync"){
                    return thisApp.dbObj ? false : thisApp.start(false, false);
                }
                this.catchSync(err).then(err => thisApp.start(err, true));// catch syncs are already in the chatchSync function - IS THIS NECESSARY?
            }
        }

        const readDbxFile = async _ => {
            if(!this.handlePlain && !this.handle) return;
            const dbxSyncExisting = await thisApp.idxDb.get("dbxSyncExisting"); // only exists with this.handlePlain
            await thisApp.idxDb.delete("dbxSyncExisting");
            
            if(!thisApp.online) return this.syncPaused ? null : this.syncPause().then(thisApp.alert.offline);
            this.syncStart();
            
            const encodedDbxFileContent =  await getEncodedDbxFileContent(this.handlePlain || await thisApp.decodeToString(this.handle)); // it will only ask for credentials when automatic connection

            if(this.handlePlain){ //fresh redirect - either from loader (no database) or through sync (existing database)
                const confirmSync = encodedDbxFileContent ? await thisApp.alert[dbxSyncExisting ? "remoteSyncOrOverwrite" : "remoteSyncOrNew"](this.key) : false; //true=(sync), false=(overwrite or create) || !encodedDbxFileContent, null=alert skipped
                //remoteSyncOrOverwrite: "There is already a database in the cloud. Would you like to Sychronise or Replace the data in the cloud with the current app database?"
                //remoteSyncOrNew: "There is already a database in the cloud. Create a new application database using data from the cloud or Replace the data in the cloud with a brand new database"

                // if alert confirmSync skipped (null) or No dbx file contents, No saved encrypted database (dbxSyncExisting) and no create new database alert response - return false
                if(confirmSync === null || (!encodedDbxFileContent && !dbxSyncExisting && !await thisApp.alert.remoteCreateNew(this.key))) return false; 
                
                thisApp.dbObj = await thisApp.decodeToJson(dbxSyncExisting); //requests credentials (or not if it is sync?)  - to decrypt existing or create a new DB - returns decrypted database(if dbxSyncExisting) or empty object {} if new
                await this.handleUpdate(thisApp.encryptString(this.handlePlain)); //saves encrypted handle in IDBX
                if(!dbxSyncExisting) thisApp.setDbObj(null); // creates new Database
                if(!confirmSync) return this.update(); //confirmSync === false //dbx file does not exist exists or needs to be overwritten. The dtatabase already exist (either dbxSyncExisting or new thisApp.dbObj)
            }

console.log(encodedDbxFileContent);
            //this.handle exists or sync is required after alerts
            if(!encodedDbxFileContent){ // unlikely scenario that the this.handle exists but not the dbx file (was manually deleted?)
                if(!thisApp.dbObj.mod) throw "Critical Error - No DBX File and No Database"; // is this correct??? - handle exists, no file, no db
                if(await thisApp.alert.remoteFileRestore(this.key)) return this.update(); //dbx file does not exist exists but the dtatabase already exist thisApp.dbObj
                return this.handleRemove(false); // will remove handle and return false
            }

            const dbxDbObj = await thisApp.decodeToJson(encodedDbxFileContent);
            if(!thisApp.dbObj) thisApp.dbObj = dbxDbObj;
            return this.connect(dbxDbObj);
        }

        const updateDbxFile = async _ => {
            const alreadyUpdated = this.dbMod === thisApp.dbObj.mod;
            if(!thisApp.online || this.dontSync || this.syncPaused || !dbx) return false;
            this.syncStart();
            if(!alreadyUpdated){
                await dbx.filesUpload(
                    {path: dbxFilePath, contents: await thisApp.getDbFileBlob(), mode: "overwrite", autorename: false}
                );
            }
            return this.connect(thisApp.dbObj);
        }

        const connectionSwitch = _ => {
            if(!thisApp.online || !this.handle) return this.syncPause();
            this.syncPaused = false;
            if(dbx){
                updateDbxFile().catch(this.catchLoad);
            }else{
                readDbxFile().then(thisApp.paint).catch(this.catchLoad);
            }
        }

        this.key = "dbxFile";
        //this.name = "Dropbox Database";
        this.load = loadDbxFile
        this.read = readDbxFile;
        this.sync = loadDbxFile;
        this.update = updateDbxFile;
        this.connectionSwitch = connectionSwitch;
        this.redirect = redirect;
        this.canAlter = _ => true; // TO DO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        extendStore(this, thisApp);
    }
    
    function OneDriveFile(thisApp){
/*         Permission: Files.ReadWrite.AppFolder
        
        Category	Application	Delegated
        Identifier	b47b160b-1054-4efd-9ca0-e2f614696086	8019c312-3263-48e6-825e-2b833497195b
        DisplayText	Have full access to the application's folder without a signed in user.	Have full access to the application's folder (preview)
        Description	Allows the app to read, create, update and delete files in the application's folder without a signed in user.	(Preview) Allows the app to read, create, update and delete files in the application's folder.
        AdminConsentRequired	Yes	No
        
        
        
        1. Ask for authorisation:
        HTTP Call: 
            GET https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize?
            client_id=11111111-1111-1111-1111-111111111111
            &response_type=code
            &redirect_uri=http%3A%2F%2Flocalhost%2Fmyapp%2F //encodeURIComponent("https://swedhearth.github.io/lpm/")
            &response_mode=query
            &scope=offline_access%20Files.ReadWrite.AppFolder
            &state=12345  HTTP/1.1 // Random verifier string that is going to be returned after verification */
            
            
/*         2. then Authorization response:
            const urlSearchParams = Object.fromEntries(new URLSearchParams(window.location.search.substring(1)));
            "https://localhost/myapp/?code=M0ab92efe-b6fd-df08-87dc-2c6500a7f84d&state=12345&session_state=fe1540c3-a69a-469a-9fa3-8a2470936421#"
            ={
                "code": "M0ab92efe-b6fd-df08-87dc-2c6500a7f84d", - 	The authorization code that the app requested. The app uses the authorization code to request an access token for the target resource. Authorization codes are short lived, typically they expire after about 10 minutes.
                "state": "12345", - If a state parameter is included in the request, the same value should appear in the response. The app should verify that the state values in the request and response are identical. This check helps to detect Cross-Site Request Forgery (CSRF) attacks against the client.
                "session_state": "fe1540c3-a69a-469a-9fa3-8a2470936421#" - A unique value that identifies the current user session. This value is a GUID, but should be treated as an opaque value that is passed without examination.
            } */
            
/*         3. Request an access token */
    }

    /* ---------------------------------------------------------  Local File Store --------------------------------------------------------------------- */
    function LocalFile (thisApp){
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
        
        const readDbUseFileHandle = async (existing, newRead) => { //FileSystemdbFileHandle API
            this.syncStart();
            let credentialsResponseAry = null;
            if(thisApp.pendingPromise){
                await thisApp.pendingPromise;
            }else if(!thisApp.dbObj || newRead){
                this.iconOpacity(true);
                credentialsResponseAry = await thisApp.getCredentials().catch(err => thisApp.start(err, true)); // No credentialsResponseAry (DeleteDatabase or BackButton was pressed);
            }
            if(!await verifyPermission(existing ? "readwrite" : "read")) throw thisApp.txtBank.app.values.userReject;
            return [await this.handle.getFile().then(file => file.arrayBuffer()), credentialsResponseAry];
        }

        const readDbUseFileReader = async _ =>{
            this.syncStart();
            await this.handleRemove(false);
            return [await pickFile(), null]; // Global Function
        }
        
        const getNewHandle = async _ => {
            this.syncStart();
            const [localFileHandle] = await window.showOpenFilePicker(fileOptions);
            await this.handleUpdate(localFileHandle);
        }
        
        const readNewFile = async _ => {
            thisApp.message.pickFile();
            return this.canAlter() ? getNewHandle().then(_ => readDbUseFileHandle(false, true)) : readDbUseFileReader();
        }

        const readFile = async _ => {
            const storeHasHandle = this.handle;
            const appDbObjExists = !!thisApp.dbObj;
            const [encodedLocalFileContent, credentialsResponseAry] = storeHasHandle ? await readDbUseFileHandle(true) : await readNewFile();
            const localFileDbObj = await thisApp.decodeToJson(encodedLocalFileContent, credentialsResponseAry, false, appDbObjExists && !storeHasHandle); // if !thisApp.dbObj && !hasHandle - must be false (to not trigger import)
            if(!appDbObjExists) thisApp.setDbObj(localFileDbObj);

            return this.connect(localFileDbObj).finally(_ => {
                if(appDbObjExists && !storeHasHandle) thisApp.paint();
            });
        }
        
        const loadLocalFile = _ =>{ //external from btnClick on initial Home Page with no remembered databases
            readFile().then(_ => thisApp.paint()).then(_ => thisApp.checkExtraSync()).catch(_ => thisApp.start(thisApp.txtBank.message.noFilePickedErr, true));
        }

        const downloadLocalFile = async _ => {
            const downloadedFileName = downloadFile(await thisApp.getDbFileBlob(), "secre.snc");
            await new Promise(res => setTimeout(res, 1000));
            thisApp.message.dbFileDownloaded(downloadedFileName);
        }

        const writeToFile = async (handle) => { //FileSystemdbFileHandle API
            const encodedDbBlob = await thisApp.getDbFileBlob();//await fileBlob promise from getEncodedAry
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
            const alreadyUpdated = this.dbMod === thisApp.dbObj.mod;
            if(!this.canAlter() || this.dontSync || this.syncPaused || alreadyUpdated) return alreadyUpdated ? true : false; //  if(!this.canAlter() || this.dontSync || this.syncPaused ||
            this.syncStart();
            return this.handle ? writeToFile(this.handle) : useNewdbFileHandle();
        };
        
        const syncLocalFile = async _ => {
            this.syncStart();
            if(this.canAlter()){
                return {
                    true: readFile,
                    false: updateLocalFile,
                    null: _ => {this.syncStop; return false;}
                }[ await thisApp.alert.localFileLoadOrCreate() ]();// This can have three outcomes (null - closed with cross or backbutton (this.syncStop) , false (updateLocalFile) or true (readFile)) then run function
            }
            if(await thisApp.alert.localFileDownload()) await downloadLocalFile();
            this.syncStop();// return nothing if !this.canAlter
        };
        
        this.key = "localFile";
        this.load = loadLocalFile
        this.read = readFile;
        this.sync = syncLocalFile;
        this.update = updateLocalFile;
        this.canAlter = _ => window.showSaveFilePicker; //Can db file be modified?
        this.download = downloadLocalFile
        extendStore(this, thisApp);
    }

    /* ---------------------------------------------------------  Local Store --------------------------------------------------------------------- */
    function Local (thisApp){
        const readLocal = async _ => {
            if(!this.handle || !this.canAlter()) return;
            this.syncStart();
            const localDbObj = await thisApp.decodeToJson(this.handle);
            thisApp.setDbObj(localDbObj);
            return this.connect(thisApp.dbObj);
        }
        const updateLocal = async _ => {
            const alreadyUpdated = this.dbMod === thisApp.dbObj.mod;
            if(!this.canAlter() || this.dontSync || this.syncPaused || alreadyUpdated) {
                this.syncStop();
                return alreadyUpdated;
            }
            this.syncStart();
            await this.handleUpdate(thisApp.getEncryptedDbU8Ary());
            return this.connect(thisApp.dbObj);
        }
        
        const syncLocal = async auto => {
            if(!this.canAlter()) return thisApp.alert.privateModeUnableSync();
            this.syncStart();
            return updateLocal();
        }

        this.key = "local";
        this.read = readLocal;
        this.sync = syncLocal;
        this.update = updateLocal;
        this.canAlter = _ => thisApp.idxDb.exists;
        extendStore(this, thisApp);
    }
/* ****************************--------------------------------- END App Stores  ---------------------------------***********************************/

/* ****************************---------------------------------- Initiate App -----------------------------------***********************************/

    /* ---------------------------------------------------------  Declare App --------------------------------------------------------------------- */
    const app = new App();

    /* --------------------------------------------------------- Check History State -------------------------------------------------------------- */
    if(!window.history.state) window.history.pushState({lastBackExists: true}, '', '');
    
    /* ------------------------------------------------------ Add Global window Event Listeners ---------------------------------------------------------- */
    window.addEventListener('popstate',  ev => {
        if(!app.message) return console.log("No App!!!!");
        if(!window.history.state){
            app.message.exitAppConfirm();
            setTimeout(_ => {
                window.history.pushState({lastBackExists: true}, '', '');
            }, 5000);
        }
    });
    window.addEventListener('online', app.connectivitychange);
    window.addEventListener('offline', app.connectivitychange);

/* ------------------------------------------------------------ Set up and start App -------------------------------------------------------------- */

     //installServiceWorker(); // Install Service Worker
    
     app.setUp({
        local: new Local(app),
        dbxFile: new DbxFile(app),
        localFile: new LocalFile(app)
    }).then(_ => app.start(false, false));
    

/*     function deleteCookies() {
        var allCookies = document.cookie.split(';');
        for (var i = 0; i < allCookies.length; i++) document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    } */

    function installServiceWorker(){
        console.log("are we installServiceWorker?");
        if(!navigator.serviceWorker || !navigator.onLine || !location.host) return console.log("navigator.serviceWorker: ", navigator.serviceWorker, " | navigator.onLine: ", navigator.onLine, " | location.host: ", location.host);
        console.log("YES we are installServiceWorker?");
        async function onstateChange(){
            switch (this.state) {// Has service worker state changed?
                case 'installed':
                    console.log('installed');
                    this.postMessage({ action: 'skipWaiting' });
                    break;
                case "activating":
                    console.log("Now newWorker is activating");
                    break;
                case "activated":
                    console.log('activated');
                    break;
            }
        }

        navigator.serviceWorker.register('service-worker.js', {scope: '/SecreSync/'}).then(reg => {
            reg.addEventListener('updatefound', _ => 
                reg.installing.addEventListener('statechange', onstateChange)
            );
            reg.update().catch(e => {
                    console.log(e);                
                if(window.confirm("Service Worker Update Failure. Reload App?")){
                    location.replace(app.URL);
                }
/*                 if(!window.location.search.substring(1).length < 6){
                    deleteCookies();
                    working.show();
                    app.message.error("Fixing bad redirect... Will be a moment....");
                    location.replace("https://www.havetogoto.co.uk/?i=1");
                }; */
            });
        }).catch(e => {
            console.log("catch register('service-worker.js')", e);
            //app.message.error(e); //that never shows! - it does when trying to install the worker on the LOCAL file
        });

    }
    /* ****************** !!!!!!!!!!!!!!!!!!!!  END Install Service Worker !!!!!!!!!!!!!!!!!!!!!!! ****************** */

    /* ****************** !!!!!!!!!!!!!!!!!!!!  Unregister Service Worker !!!!!!!!!!!!!!!!!!!!!!! ****************** */
    function uninstallServiceWorker(){
        try{
            caches.keys().then(keyList => {
                for (let key of keyList) caches.delete(key);
            });

            navigator.serviceWorker.getRegistrations()
            .then(regs => {
                for(let reg of regs) reg.unregister();
            });
        }catch(e){
            return;
        }
    }

    /* ****************** !!!!!!!!!!!!!!!!!!!!  END Unregister Service Worker !!!!!!!!!!!!!!!!!!!!!!! ****************** */


        
})();