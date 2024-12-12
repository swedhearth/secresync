/* 'frequent_0.052_GitHub */
function App(urlSearchParams){
    "use strict";
    /*  -----------------------------------  **************************** App Objects Constructors **************************** -----------------------------------  */
    //----------------------- Cryto Handle Object Constructor-----------------------//
    function CryptoHandle(thisApp){
        
        const getFileBlob = (...iterables) => new Blob(iterables, {type:"application/octet-stream"});
        
        thisApp.dbObj = null; // reset application's Database Object
        let cryptoKey = null;
        let salt = null;
        let dbCipher = null;
        let decryptString = null;

        this.updateCryptoCredentials = (newCryptoKey, newSalt) => {
            cryptoKey = newCryptoKey;
            salt = newSalt;
            if(!cryptoKey || !salt) return;
            this.encryptString = string => thisApp.crypto.getCipherFromString(string, cryptoKey, salt); // used to encrypt plain handle in dbx, oneDrive and Google Drive
            decryptString = cipher => thisApp.crypto.getStringFromCipher(cipher, cryptoKey);
        };
        
        this.getDbCipher = async _ => (dbCipher = (dbCipher || this.encryptString(thisApp.dbObj.prepare())));
        this.getDbFileBlob = _ => this.getDbCipher().then(getFileBlob);
        
        this.getFilteredDbFileBlobForExport = filteredVendors => this.encryptString(thisApp.dbObj.prepare(filteredVendors)).then(getFileBlob);
        
        this.setDbObj = (dbObj, doUpdateMod) => {
            dbCipher = null;
            thisApp.dbObj = new thisApp.crypto.DatabaseObject(dbObj, doUpdateMod); 
        };
        
        this.saveOpfsFile = async(opfsFileName, fileContent) => {
            const opfsFileBlob = getFileBlob(fileContent);
            const opfsRoot = await navigator.storage.getDirectory();
            const opfsFileHandle = await opfsRoot.getFileHandle(opfsFileName, { create: true });
            const writable = await opfsFileHandle.createWritable();
            await writable.write(opfsFileBlob);
            await writable.close();
        };
        
        this.getOpfsFileContent = async(opfsFileName, removeFile) => { // returns Array Buffer
            const opfsRoot = await navigator.storage.getDirectory();
            const opfsFileHandle = await opfsRoot.getFileHandle(opfsFileName);
            const opfsFileFileBlob = await opfsFileHandle.getFile();
            const opfsFileContent = await opfsFileFileBlob.arrayBuffer();
            if(removeFile) await opfsFileHandle.remove();
            return opfsFileContent;
        };
        
        this.clearOpfs = async _ => {
            const opfsRoot = await navigator.storage.getDirectory();
            opfsRoot.remove({ recursive: true }); // clear entire opfs
        };
        
        this.setRedirectCredentials = async (codeVerifier, redirectState) => { //await thisApp.cryptoHandle.setRedirectCredentials(codeVerifier, state);
            // consent is present or use of session storage was approved by the user in redirectToOAuth
            // redirectState and a random 128 bit sessionStoragePin string become a temporary password to encrypt the appState
            const sessionStoragePin = thisApp.crypto.randomHex(16); 
            const appStateCredentials = {
                plainPassString: redirectState,
                plainPinString: sessionStoragePin
            };
            const [appStateCryptoKey, appStateSalt] = await thisApp.crypto.getNewCryptoKeyAndSalt(appStateCredentials);

            const appStateObject = {
                codeVerifier: codeVerifier,
                dbExpCryptoKey: cryptoKey ? await thisApp.crypto.safeB64From(await window.crypto.subtle.exportKey("raw", cryptoKey)) : null,/// make a part of thisApp.crypto object // array buffer 32 length
                dbSalt: salt ? await thisApp.crypto.safeB64From(salt) : null,
                appDbObj: thisApp.dbObj ? await thisApp.crypto.safeB64From(await this.getDbCipher()) : null,
            };
            
            const appStateString = JSON.stringify(appStateObject);

            window.sessionStorage.setItem("historyLength", history.length);
            window.sessionStorage.setItem("lang", thisApp.lang); // save language for the Private Mode redirect
            window.sessionStorage.setItem("sessionStoragePin", sessionStoragePin);

            const opfsFileName = (await thisApp.crypto.safeB64From(redirectState, sessionStoragePin)).slice(-16);
            const appStateCipher = await thisApp.crypto.getCipherFromString(appStateString, appStateCryptoKey, appStateSalt);
            await this.saveOpfsFile(opfsFileName, appStateCipher);
        };
        
        this.getRedirectCredentials = async redirectState => {
            // consent is present or use of session storage was approved by the user in redirectToOAuth
            const sessionStoragePin = window.sessionStorage.getItem('sessionStoragePin');
            window.sessionStorage.clear();
            
            const opfsFileName = (await thisApp.crypto.safeB64From(redirectState, sessionStoragePin)).slice(-16);
            const appStateCipher = await this.getOpfsFileContent(opfsFileName, true);
            
            const appStateCryptoKey = await thisApp.crypto.getCryptoKeyFromPlains(appStateCipher, redirectState, sessionStoragePin);
            const [appStateString] = await thisApp.crypto.getStringFromCipher(appStateCipher, appStateCryptoKey);
            const appStateObject = JSON.parse(appStateString);
            const codeVerifier = appStateObject.codeVerifier;
            const dbExpCryptoKey = appStateObject.dbExpCryptoKey ?  await thisApp.crypto.bufferFromSafeB64(appStateObject.dbExpCryptoKey) : null;
            
            const dbCryptoKey = dbExpCryptoKey ? await thisApp.crypto.importKey(dbExpCryptoKey) : null;

            const dbSalt = appStateObject.dbSalt ?  await thisApp.crypto.bufferFromSafeB64(appStateObject.dbSalt) : null;
            const appDbObj = appStateObject.appDbObj ?  await thisApp.crypto.bufferFromSafeB64(appStateObject.appDbObj) : null;
            this.updateCryptoCredentials(dbCryptoKey, dbSalt);
            return [codeVerifier, appDbObj];
        };
        
        this.decryptToString = async (cipher, dbCredentials, badPin, isImport) => { //dbCredentials only when using Local File and there is no decryptDatabase // decodeToString
            const maxBadPin = 3;
            return new Promise(async (res, rej) => {
                try{
                    const newCredentials = !cipher;
                    let decryptedString, cryptoKey, salt;
                    if(decryptString && !isImport){
                        [decryptedString] = await decryptString(cipher);
                        return res(decryptedString);
                    }

                    dbCredentials = dbCredentials || await thisApp.credentials.get(newCredentials,); //dbCredentials only when using Local File 
                    if(newCredentials){ // means that wasPersisted === false
                        [cryptoKey, salt] = await thisApp.crypto.getNewCryptoKeyAndSalt(dbCredentials);
                        decryptedString = "{}";
                    }else{
                        if(dbCredentials.plainPassString && dbCredentials.plainPinString){
                            cryptoKey = await thisApp.crypto.getCryptoKeyFromPlains(cipher, dbCredentials.plainPassString, dbCredentials.plainPinString);
                            [decryptedString, salt] = await thisApp.crypto.getStringFromCipher(cipher, cryptoKey);
                            if(isImport) return res(decryptedString);
                        }else if(dbCredentials.plainPinString){ // means that wasPersisted === true and persistId is present
                            try{
                                if(dbCredentials.plainPinString === true || !dbCredentials.persistType) throw "deletePersistedCredentials"; // clicked Log with Pass and Pin
                                const getDecryptedCryptoKey = {
                                    online: thisApp.crypto.getDecryptedCryptoKeyUseOnline,
                                    auth: thisApp.crypto.getDecryptedCryptoKeyUseAuth,
                                    device: thisApp.crypto.getDecryptedCryptoKeyUseDevice
                                }[dbCredentials.persistType];
                                if(!getDecryptedCryptoKey) throw "deletePersistedCredentials";
                                cryptoKey = await getDecryptedCryptoKey(dbCredentials);
                                [decryptedString, salt] = await thisApp.crypto.getStringFromCipher(cipher, cryptoKey);

                            }catch(err){ // "deletePersistedCredentials" or "die" or "fatal" (connection issue) or "retry"
                                badPin = badPin || 1;
                                if(badPin > maxBadPin || err === "deletePersistedCredentials"){
                                    await thisApp.credentials.persisted.delete(); // delete persisted credentials
                                }else{
                                    thisApp.message.persistedBadPin(1 + maxBadPin - badPin);
                                }

                                return res(this.decryptToString(cipher, null, ++badPin));
                            }
                        }else{
                            return res(null); // this.dbRawCredentials is empty  no plainPassString and no plainPinString
                        }
                    }

                    this.updateCryptoCredentials(cryptoKey, salt);

                    await thisApp.credentials.persist(dbCredentials, cryptoKey);
                    res(decryptedString);
                }catch(err){
                    rej(err);
                }
            })
            .catch(err => {
                if(developerMode) console.log("Caught error: ",err);
                throw err;
            });
        };
        
        this.decryptToJson = (...args) => this.decryptToString(...args).then(decryptedString => JSON.parse(decryptedString)); //decodeToJson

    }

    //----------------------- Credentials Object Constructor-----------------------//
    function Credentials(thisApp){
        
        //-- Persisted Credentials Object Constructor --//
        function Persisted(persistedObj){
            for(const key in persistedObj){
                this[key] = { 
                    set: value => thisApp.idxDb.set(persistedObj[key], value),
                    get: _ => thisApp.idxDb.get(persistedObj[key]),
                    delete: _ => thisApp.idxDb.delete(persistedObj[key])
                };
            }
        }

        Persisted.prototype.get = function() {
            return Promise.all(Object.values(this).map(methods => methods.get()));
        };
        Persisted.prototype.exist = function(){
            return this.get().then(persistedCredentials => persistedCredentials.filter(Boolean).length);
        };
        Persisted.prototype.delete = async function() {
            await thisApp.cryptoHandle.clearOpfs().catch(err => console.error(err));
            thisApp.localStorage.delete("persistPepper");
            
            return this.exist().then(len => len && Promise.all(Object.values(this).map(methods => methods.delete())).then(thisApp.message.persistedDeleted))
        };
        
        //persisting credentials
        this.persisted = new Persisted({type: "persistType", cryptoKey: "persistCryptoKey", id: "persistId"});
        this.persist = async (dbCredentials, cryptoKey) => {
            if(!dbCredentials.persistType) return; // Do not persist if no persistType
            try{
                if(dbCredentials.persistType === "online"){ // Persist again if online (even if wasPersisted, persist again!)
                    if(!thisApp.online){
                        console.log("Credentials persisted online, but app is offline - can't connect to the cloud");
                        return;
                    }
                    const [persistId, cryptoKeyCipher] = await thisApp.crypto.getEncryptedCryptoKeyUseOnline(cryptoKey, dbCredentials.plainPinString); //[ArrayBuffer, ArrayBuffer]
                    await this.persisted.id.set(persistId);
                    await this.persisted.cryptoKey.set(cryptoKeyCipher);
                }

                if(dbCredentials.persistType === "auth" && !dbCredentials.wasPersisted){ //Register Web Auth if type is "auth" and was not previously persisted
                    const [persistId, cryptoKeyCipher] = await thisApp.crypto.getEncryptedCryptoKeyUseAuth(cryptoKey, dbCredentials.plainPinString); //[ArrayBuffer, ArrayBuffer]
                    await this.persisted.id.set(persistId);
                    await this.persisted.cryptoKey.set(cryptoKeyCipher);
                }

                if(dbCredentials.persistType === "device" && !dbCredentials.wasPersisted){
                    const [persistId, cryptoKeyCipher, pinSaltCipher, persistPepper] = await thisApp.crypto.getEncryptedCryptoKeyUseDevice(cryptoKey, dbCredentials.plainPinString); //[ArrayBuffer, ArrayBuffer]
                    await this.persisted.id.set(persistId);
                    await this.persisted.cryptoKey.set(cryptoKeyCipher);
                    
                    thisApp.localStorage.set("persistPepper", persistPepper);

                    await thisApp.cryptoHandle.clearOpfs();
                    await thisApp.cryptoHandle.saveOpfsFile(persistPepper.slice(-16), pinSaltCipher);
                }
                
                if(!dbCredentials.wasPersisted){
                    await this.persisted.type.set(dbCredentials.persistType);
                    thisApp.message.persistedSucess();
                }
            }catch(err){
                if(developerMode) console.error("Error in persistCredentials:", err); // Developer
                if(err === "retry") return this.persist(dbCredentials, cryptoKey);// the most unlikely scenario that the 256 bit key repeats in the Server Database
                thisApp.message.persistedFail();// "die" (php) or "fatal" (recconectCount exceeded - server error)
                await this.persisted.delete(); // delete persisted credentials
            }
        };
        
        //credentials getter
        this.get = async isNewCredentials => {
            const canPersist = !!thisApp.consent;
            const [persistedType, cryptoKeyCipher, persistId] = await this.persisted.get();
            const isPersisted = !!(canPersist && persistedType && cryptoKeyCipher && persistId && !isNewCredentials);

            let persistPepper, pinSaltCipher;
            if(isPersisted && persistedType === "device"){
                persistPepper = thisApp.localStorage.get("persistPepper");
                pinSaltCipher = await thisApp.cryptoHandle.getOpfsFileContent(persistPepper.slice(-16), false);
            }
            
            //Arguments - this.ui.credentials: (canDelete <can delete an existing database - clear all storages>, canPersist <can persist the cryptoKey>, isPersisted <is it already persisted = isPersisted const>)
            const dbRawCredentials = isNewCredentials
                ? await thisApp.ui.credentials.pinPassNewChange(false, canPersist)
                : isPersisted
                    ? (persistedType === "online" && !thisApp.online)
                        ? (await thisApp.alert.offlineCredNoVerify(), await thisApp.ui.credentials.pinPass(true, canPersist, true))
                        : await thisApp.ui.credentials.pin(true, canPersist) // isPersisted must be true - not forwarded
                    : await thisApp.ui.credentials.pinPass(true, canPersist, false);

            if(!dbRawCredentials) throw "BackButtonPressed";
            if(!dbRawCredentials.length) throw "DeleteDatabase";
            
            const [plainPassString, plainPinString, doPersist] = dbRawCredentials;

            const getPersistType = async _ => {
                let persistType = null;
                const userVerificationAvailable = window.PublicKeyCredential && await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(); // uncomment when online available
                const registerAuth = userVerificationAvailable && await thisApp.alert.registerAuth();//"Would you like to Enable Web Authentication / Pin / Biometric? Or Device?";
                if(registerAuth) persistType = "auth";
                if(registerAuth === false){
                    const persistOnline = await thisApp.alert.persistOnline();
                    console.log(persistOnline);

                    if(persistOnline === false) {
                        persistType = developerMode && !location.host ? "online" : "device";
                    }
                }
                return persistType;//if registerAuth === null (user cancelled) then persistType = null - will mean not persists at all

            };

            const persistType = isPersisted 
                ? persistedType
                : doPersist
                    ? await getPersistType()
                    : null;

            if(isPersisted && !doPersist && await thisApp.alert.removePersisted()){// (isPersisted && !doPersist) Was persisted - now delete
                await this.persisted.delete(); // delete persisted credentials
                
                return this.get(false); // Reload get credentials
            }   //else =  (!doPersist && !isPersisted) - log with Pass and pin - persistType = dbRawCredentials[2] = false

            const dbCredentials = { // dbCredentials
                wasPersisted: isPersisted,
                persistType: persistType,
                persistId: persistId,
                cryptoKeyCipher: cryptoKeyCipher,
                plainPassString: plainPassString,
                plainPinString: plainPinString,
                persistPepper: persistPepper,
                pinSaltCipher: pinSaltCipher
            };
            return dbCredentials;
        };
        
        //changing credentials
        this.change = async _ => {
            const dbCredentials = await this.get(true);
            const [cryptoKey, salt] = await thisApp.crypto.getNewCryptoKeyAndSalt(dbCredentials);
            const storesWithEncryptedHandles =  thisApp.dbStore.getObjectsWithHandles(true); //handles for dbx, one drive, google stores (dbStore.handleIsCryptoKey = true;)
            const encryptedHandles = await Promise.all(storesWithEncryptedHandles.map(storeObj => thisApp.idxDb.get(storeObj.key)));
            const decryptedHandles = await Promise.all(encryptedHandles.map(encryptedHandle => thisApp.cryptoHandle.decryptToString(encryptedHandle))); // decrypted handles for dbx, one drive, google stored t
            await Promise.all(storesWithEncryptedHandles.map(storeObj => {
                storeObj.handle = null;
                return thisApp.idxDb.delete(storeObj.key);
            })); // remove obsolete handle
            await this.persisted.delete(); // delete persisted credentials

           //thisApp.cryptoHandle.setEncryptStringFunction(cryptoKey, salt); // used to encrypt plain handle in dbx, oneDrive and Google Drive
            thisApp.cryptoHandle.updateCryptoCredentials(cryptoKey, salt); // used to encrypt plain handle in dbx, oneDrive and Google Drive
            
            await Promise.all(storesWithEncryptedHandles.map((storeObj, idx) => storeObj.handleUpdate(thisApp.cryptoHandle.encryptString(decryptedHandles[idx])))); // restore newly encrypted handles
            thisApp.dbStore.updateAll(thisApp).then(rejectedPromises => {
                if(rejectedPromises.length) thisApp.message.dbCredentialsChangeModerateFail(rejectedPromises);
                this.persist(dbCredentials, cryptoKey);
            }).catch(err => {
                thisApp.message.dbCredentialsChangeCriticalFail(err);
            });
        };
    }
    
    function Storage(storage, thisApp){
        Object.assign(this, storage);
        this.get = name => storage && thisApp.consent ? storage.getItem(name) : null;
        this.set = (name, value) => storage && thisApp.consent ? storage.setItem(name, value) : null;
        this.delete = name => storage && thisApp.consent ? storage.removeItem(name) : null;
        this.clear = _ => storage && thisApp.consent ? storage.clear() : null;
        this.destroySelf = _ => null; // if not consent
        this.exists = storage && thisApp.consent;
    }
    
    function DisplayOptions(storage){
        const {typeNote, typeLog, sortBy, sortOrder, detDates, detNotes, detTags} = storage;

        this.sortTypes = ["vSortCr8", "vSortMod", "vSortName"];
        this.sortOrders = ["Asc", "Desc"];
        this.sorts = {
            sortBy: this.sortTypes.find(type => type === sortBy) || 'vSortName',
            sortOrder: this.sortOrders.find(order => order === sortOrder) || 'Asc'
        };
        
        this.details = {
            detTags: detTags === "true",
            detNotes: detNotes === "true",
            detDates: detDates === "true",
            typeNote: !typeNote || typeNote === "true",
            typeLog: !typeLog || typeLog === "true",
        };

        this.changeDetail = itemName => {
            const value = this.details[itemName] = !this.details[itemName];
            storage.set(itemName, value);
        };
        
        this.changeSort = itemName => {
            let {sortBy, sortOrder} = this.sorts;
            this.sorts.sortOrder = sortOrder = sortBy === itemName ? sortOrder === "Asc" ? "Desc" : "Asc" : sortOrder;
            this.sorts.sortBy = itemName;
            storage.set(`sortBy`, itemName);
            storage.set(`sortOrder`, sortOrder);
        };
    }
    
    function TextBank(lang){
        Object.assign(this, txtBankObj[lang]);
        this.getParsedText = (txtBankPropJoinString, templateObj) => {
            try{
                return txtBankPropJoinString.split('.').reduce((o, k) => o[k], this).parseTemplate(templateObj);
            }catch(err){
                if(developerMode) console.error("Can't Parse: ", txtBankPropJoinString, templateObj); // Developer
                return "Text Parsing Error";
            }
        };
    }
    
    const uninstallServiceWorker = async thisApp => {
        try {
            const keys = await caches.keys();
            const cacheDeleteResults = await Promise.all(keys.map(caches.delete));
            if(developerMode) console.log('Caches have been deleted.', cacheDeleteResults, keys);

            const regs = await navigator.serviceWorker.getRegistrations();
            const unregisterResults = await Promise.all(regs.map(reg => reg.unregister()));
             if(developerMode) console.log("Service worker unregister results.", unregisterResults);
        } catch (err) {
             if(developerMode) console.error("Error during service worker unregistration:", err);
             // do nothing? or message that not all have been cleared
        }
    };
    
    const installServiceWorker = async thisApp => {
        
        // Install Service Worker
        if (!navigator.serviceWorker || !navigator.onLine || !location.host || !thisApp.consent) {
            if (developerMode) {
                console.log("navigator.serviceWorker:", navigator.serviceWorker);
                console.log("navigator.onLine:", navigator.onLine);
                console.log("thisApp.consent:", thisApp.consent);
                console.log("location.host:", location.host, "RETURNING");
            }
            return;
        }
        
        navigator.serviceWorker.register('service-worker.js', { scope: '/secresync/' })
        .then(reg => {
            reg.addEventListener('updatefound', function() {
                if (developerMode) console.log("service-worker.js update found");
                reg.installing.addEventListener('statechange', async function () {
                    switch (this.state) {
                        case 'installed':
                            if (developerMode) console.log('Service worker installed');
                            this.postMessage({ action: 'skipWaiting' });
                            break;
                        case "activating":
                            if (developerMode) console.log("Service worker activating");
                            break;
                        case "activated":
                            if (developerMode) console.log('Service worker activated');
                            const doUpdate = await thisApp.ui.installApp(true);
                            if(doUpdate) thisApp.reload();
                    }
                });
            });
            return reg.update();
        })
        .then(_ => {
            //this.serviceWorkerInstalled = true;
            developerMode && console.log("service-worker.js registered and fetched. Will check if update available.")
        })
        .catch(err => {
            if (developerMode) console.error("Service worker registration error:", err);
            mobileDebug("In Index. navigator.serviceWorker.register catch error: ", JSON.stringify(err));
            
            if(confirm("Service Worker update failed. Reload app?. TRUE = Reload. FALSE = Do not reload, I will examin the error.")){
                thisApp.reload();
            }
            
        });
    };

/**  -----------------------------------  ****----  ****----  **************************** END Objects Constructors ****************************----  ****----  ****----  **** -----------------------------------  */
/**  -----------------------------------  ****----  ****----  **************************** END Objects Constructors ****************************----  ****----  ****----  **** -----------------------------------  */
/**  -----------------------------------  ****----  ****----  **************************** END Objects Constructors ****************************----  ****----  ****----  **** -----------------------------------  */

    this.name = "SecreSync";
    this.longName = "Secrets Synchronised";
    this.urlSearchParams = urlSearchParams;
    this.URL = window.location.origin + window.location.pathname;//"https://swedhearth.github.io/secresync/"
    this.consent = null; // null = in private mode(storage disabled, false = consent not given, true = storage available

    this.urlReplace = url => url && location.replace(url);
    this.reload = _ => this.urlReplace(this.URL);
    const resetAndReloadApp = _ => this.dbStore.removeAllHandles(true).then(this.reload);// force removal of storeObj handles
    


    //let lastActiveTime = 0;
    
/*     const logOffApp = async type => {
        this.reload();
    }; */

    this.online = navigator.onLine;
    

    this.connectivitychange = e => {

        const wasOnline = this.online;
        
        this.online = e.type !== "offline";
        
         mobileDebug("connectivitychange. e.type = ", e.type);
/*        mobileDebug("connectivitychange. Is this.dbObj? = ", !!this.dbObj);
        mobileDebug("connectivitychange. document.visibilityState = ", document.visibilityState); */

        this.dbStore.getRemoteObjects().forEach(storeObj => storeObj.switchConnection()); 
        if(wasOnline !== this.online && !this.hidden && this.dbObj) this.message[e.type](); // message.online : message.offline
    };

    this.visibilityChange = e => {
        if(!this.dbObj) return;
        const reloadBy = "reloadAppBy";
        
        this.hidden = document.visibilityState === "hidden";

        if(this.hidden){
            this.ui.blur(true);
            this.sessionStorage.set(reloadBy, Date.now() + this.settings.logOffTime.current * 1000); //60000 ms = 1 minute
        }else{
            if(this.sessionStorage.get(reloadBy) < Date.now()){
                this.reload();
            }else{
                setTimeout(_ => {
                    this.ui.blur(false);
                }, 500);
            }
            this.sessionStorage.delete(reloadBy);
        }
    };

    this.resetLogOutTimer = (_ => { // self invoking
        let inactivityTimer = 0
        return _ => {
            if(!this.dbObj) return;
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(_ => this.reload(), 600000);//600000 ms = 10 minutes
        }
    })();


    
/*     this.clearAllStorage = _ => {
        this.localStorage.clear();
        this.sessionStorage.clear();
        return this.idxDb.clear();
    }; */

    this.makePrivate = async _ =>{
        //await this.clearAllStorage();
        
        this.localStorage.clear();
        this.sessionStorage.clear();
        
        await uninstallServiceWorker(this);
        
        await this.idxDb.clear();
        
        await this.idxDb.destroySelf();
        this.consent = null;
        this.init();
    };

    this.setConsent = async _ => {
        this.consent = true;
        this.localStorage.set("consent", Date.now());
        this.init();
    };

    /* idxDbErrorHandler*/
    const idxDbErrorHandler = async (errMsg, error) => {
        if(developerMode) console.error(errMsg, error); // Developer
        await this.alert.IdxDbError();
        this.idxDb = new Storage(null);
        await this.makePrivate();
    };
    
    function Setting(thisApp, name, min, max, def, step = 1){
        this.min = min;
        this.max = max;
        this.def = def;
        this.step = step;

        this.get = _ => parseInt(thisApp.localStorage.get(name)) || this.current || this.def;
        this.set = string => {
            thisApp.localStorage.set(name, string);
            this.current = parseInt(string);
        };
        this.current = this.get();
    }
    
    function AppSettings(thisApp){
        this.logOffTime = new Setting(thisApp, "logOffTime", 0, 600, 60); //Infinity
        this.maxRevisions = new Setting(thisApp, "maxRevisions", 0, 20, 10);
        this.appWidth = new Setting(thisApp, "appWidth", 340, document.body.clientWidth, 900, 5);
        this.darkTheme = thisApp.localStorage.get("darkTheme") === "true";
        this.appLayout = new Setting(thisApp, "appLayout", 0, 2, this.appWidth.current < 800 ? 2 : 1, 1); // 0: auto, 1: normal, 2: mobile //&& window.TOUCH_DEVICE
        this.isMobileLayout = _ => {
            const userLayoutInt = parseInt(thisApp.localStorage.get("appLayout"));
            if(userLayoutInt){
                 if(userLayoutInt === 2) return true;
                 if(userLayoutInt === 1) return false;
            }
            return this.appWidth.current < 800;
        };
        this.appBlur = thisApp.localStorage.get("appBlur") === "false" ? false : true;
    }

    /* Initiate App*/
    this.init = async function(){
        this.consent = !!window.localStorage.getItem("consent");
        this.localStorage = new Storage(window.localStorage, this);;//new Storage(window.localStorage, this);
        this.sessionStorage = new Storage(window.sessionStorage, this); // Unable to use Cloud if not available
        this.displayOptions = new DisplayOptions(this.localStorage);
        this.languages = Object.keys(txtBankObj);
        this.lang = this.languages.find(validLang => validLang === (this.lang || this.localStorage.get("lang") || window.sessionStorage.getItem("lang") || navigator.language.split("-")[0].toUpperCase())) || "EN";
        
        this.txtBank = new TextBank(this.lang); //txtBankObj
        this.crypto = new Crypto();
        this.credentials = new Credentials(this);
        this.idxDb = this.consent ? await new IdxDb("SecreSync", 1, "assets", "name", "value", idxDbErrorHandler) : new Storage(null);
        
        installServiceWorker(this);
        
        this.settings = new AppSettings(this);
        
/*         const appLayout = parseInt(this.localStorage.get("appLayout")); // '1' , '2' or nan
        this.hasMobileLayout = _ => appLayout ? appLayout === 2 : this.settings.appWidth.current < 800 && window.TOUCH_DEVICE; */

        this.dbStore = new AppDbStore(this); //appDbStore;
        this.ui = new Interface(this);
        this.alert = this.ui.alerts;
        this.message = this.ui.messages;
        this.spinner = this.ui.spinner;
        this.ui.localiseDbStores();
        

        
        this.start(null, false);
        return this;
    };

    this.paint = async _ =>  this.ui.init();
    
    this.changeLangTo = async lang => {
        this.lang = lang;
        this.txtBank = new TextBank(lang);
        this.ui.localiseDbStores();
        this.localStorage.set("lang", lang);
    };

    this.createNewDb = async _ => {
        this.dbStore.restoreObjectsSync();
        await this.cryptoHandle.decryptToJson(false);
        this.cryptoHandle.setDbObj(null);
        this.paint();
       //throw "where does it throw when create a new db?"
        this.dbStore.checkExtraSync(this);
    };

    this.start = async (msg, err, appStartFailCount = 0) =>{
        const maxAppStartFails = 4;
        this.cryptoHandle = new CryptoHandle(this);
        try{
            mobileDebug("In this.start. Will await this.dbStore.getResetObjects()");
            const {savedStoreObjs, redirectedStoreObj, refreshExpiredStoreObjs} = await this.dbStore.getResetObjects();
            //if stores have expired handles refresh them. Exception is when they have expired in a extremaly short time while redirection happens for another remote store (prioritise processing of the redirected store)
            if(refreshExpiredStoreObjs.length && !redirectedStoreObj){ 
                for (const storeObj of refreshExpiredStoreObjs){ // refresh this.handle by sending for re-authorisation before asking for credentials
                    //if refresh is accepted by the user, it will only refresh the first storeObj in the refreshExpiredStoreObjs array (currently only OneDrive StoreObject can have this property) by sending the app to the auth website of the provider for re-authorisation. If declined - it will remove the handle
                    await storeObj.refreshExpiredToken(); 
                }
                return this.start(null, false); // this will only be reached if the redirect to auth is declined and the this.hadle of the storeObject is removed
            }
            msg = msg || (msg === null ? (redirectedStoreObj ? this.message.remoteAuthorised() : savedStoreObjs.length ? this.message.existingDb() : this.message.loadDb(this.consent)) : false);
            try{
                if (msg === "BackButtonPressed" || msg === "DeleteDatabase") {
                    alert('msg === "BackButtonPressed" || msg === "DeleteDatabase" in the APP START (this.start)');
                    throw msg;
                }
                if(msg) this.message[err ? "error" : "digest"](msg);
                if(savedStoreObjs.length){
                    let painted;
                    
                    for(const storeObj of savedStoreObjs){
                        if(storeObj.testOutside) storeObj.testOutside();
                        await storeObj.read().catch(storeObj.catchLoad); // Catch catchLoad is OK!!!!!!!!! catchLoad CAN THROW but will be caught by the try - catch in this.start
                        if(this.dbObj && !painted) {
                            painted = true;
                            this.paint();
                        }
                    }
                    
                    if(!painted){
                        if(this.dbStore.objectsExist()) throw "noDbObj";
                        throw "remoteConnectionCancelled"; // when was handlePlain and (back || close button pressed)
                    }
                   
                    setTimeout(_ => this.dbStore.checkExtraSync(this), 500); // delay check sync
                }else{ // no saved stores - load or create
                    this.dbStore.restoreObjectsSync();
                    const returnedFunction = await this.ui.loader();
                    if(!returnedFunction) return this.start(null, false, 0);
                    await returnedFunction();
                }
            }catch(err){
                if (developerMode) console.log(err);
                if (appStartFailCount > maxAppStartFails - 1)  return resetAndReloadApp();
                switch (err) {
                    case "OperationError":
                        if(!this.dbStore.objectsExist()) redirectedStoreObj.tempHandlePlain = redirectedStoreObj.handlePlain; // assign Object's tempHandlePlain as the handlePlain would be reset when getResetObjects
                        this.message.dbFailed(maxAppStartFails - appStartFailCount);
                        return this.start(false, false, ++appStartFailCount);
                    case "DeleteDatabase":
                        for (const storeObj of savedStoreObjs) {
                            if (!await this.alert.deleteExistingStore(storeObj.key)) return this.start(null, false);
                            await storeObj.handleRemove(false, false);
                        }
                        return this.start(null, false);
                    case "BackButtonPressed":
                        return this.start(null, false, ++appStartFailCount);
                    case "noDbObj":
                        return await this.alert.noDbObjError() ? resetAndReloadApp() : this.reload();
                    case "noFilePickedErr":
                        this.message.noFilePickedErr();
                        return this.start(false, false);
                    case "remoteConnectionCancelled":
                        this.message.remoteConnectionCancelled();
                        return this.start(false, false);
                    default:
                        throw err;
                }
            }
        }catch(globalError){
            if(globalError === "IdxDbError") {
                await this.alert.IdxDbError();
                this.idxDb = new Storage(null);
                return this.makePrivate();
            }
            if(developerMode) console.error(globalError);
            //this.fail();
            this.alert.appFailed().then(_ => document.documentElement.remove());
        }
    };
}