function Interface(thisApp){
console.log("initiate Interface");
    // Initiate DOM
    const dom = new Dom(document);
    
    //Hijack and overwrite the dom's "el.on" function to reset the Log Out Timer on every assigned event handler for the not yet created elements
    dom.extendElMethods({
        on: function(type, fn, opt) {
            if(type && fn){
                this.addEventListener(type, fn, opt);
                this.addEventListener(type, thisApp.resetLogOutTimer, opt);
            }
            return this;
        }
    });
    
    //  --------------------------------------------------------------- submodules  / HELPERS --------------------------------------------------------------- */scrollWrpOverflow
    // -------------- Helper to get from the TextBank ----------------------------------//
    const getTxtBankParsedTxt = (txtBankPropTopDir, txtBankPropJoinString, templateObj) => txtBankPropJoinString ? thisApp.txtBank.getParsedText(`${txtBankPropTopDir}.${txtBankPropJoinString}`, templateObj) : "";
    const getTxtBankHtmlTxt = (txtBankPropJoinString, templateObj) => getTxtBankParsedTxt("app.htmls", txtBankPropJoinString, templateObj);
    const getTxtBankMsgTxt = (txtBankPropJoinString, templateObj) => getTxtBankParsedTxt("message", txtBankPropJoinString, templateObj);
    const getTxtBankTitleTxt = (txtBankPropJoinString, templateObj) => getTxtBankParsedTxt("app.titles", txtBankPropJoinString, templateObj);
    const getTxtBankAlertTxt = (txtBankPropJoinString, templateObj) => getTxtBankParsedTxt("alert", txtBankPropJoinString, templateObj);
    // -------------- Helper to get app HTML elements ----------------------------------//
    const getPaddedFieldset = legendHtml => dom.addFieldset(legendHtml + ":").addClass("padded"); 
    const getInpEl = inpObj => {
        const inpEl = dom.addInput("inpEl");
        inpObj._cssAry?.forEach(css => inpEl.addClass(css));
        inpObj._onInput && inpEl.on("input", inpObj._onInput);
        Object.entries(inpObj).forEach(([attr, value]) => !attr.includes("_") && value && (inpEl[attr] = value));
        return inpEl;
    }
    const getSvgIcon = (cssString = "", title, onClick = null) => dom.addSpan("svgIcon " + (onClick ? "active " : "") + cssString).setAttr("title", getTxtBankTitleTxt(title === true ? cssString : title)).onClick(onClick);
    const getClearInputIcon = clearFunction => getSvgIcon("deleteLeft", true, clearFunction)
    const getPassEyeIcon = (passInpEl, toggleType) => {
        const passInpEls = passInpEl.type ? [passInpEl] : passInpEl.kids(); // Input or input/s wrap
        let inpType = passInpEls[0].type;
        if(toggleType){
            inpType = inpType === "text" ? "password" : "text";
            passInpEls.forEach(passInpEl => passInpEl.type = inpType);
        }
        
        return getSvgIcon(
            "passEye",
            "showPassToggleBtn",
            e => e.target.replaceWith(getPassEyeIcon(passInpEl, true))
        ).addClass(inpType === "text" ? "passEyeHide" : "");
    };
    //  --------------------------------------------------------------- END submodules  / HELPERS --------------------------------------------------------------- */scrollWrpOverflow
    
    // Add Icons to thisApp.dbStore Returnable (Part of this (Interface))
    const localiseDbStores = _ =>{
        for(const storeKey in thisApp.dbStore){
            const thisStore = thisApp.dbStore[storeKey];
            thisStore.syncIcon = getSvgIcon("syncIcon " + thisStore.key + "Icon", thisStore.key + "Sync", thisStore.syncToggle).addClass(thisStore.handle ? "" : "elDimmed");
            thisStore.credIcon = getSvgIcon("credIcon " + thisStore.key + "Icon", thisStore.key + "Cred");
            thisStore.name = getTxtBankTitleTxt(thisStore.key);
        }
    }

    // create User Interface Sections
    const moduleSection = dom.adDiv("moduleSection appSection zIndex0"); // Shared: Loader, Credentials and Alarms sections
    const msgModule = dom.adDiv("msgModule");//.setAttr("title", getTxtBankHtmlTxt("msgHistory")); // Message module bar expandable to full screen // Change Language of the title when changing Language!!! getTxtBankTitleTxt("msgModule")
    const appSectionForm = dom.adDiv("appSection appForm").hide();
    const appSectionList = dom.adDiv("appSection appList").hide();
    const dbModifiedBar = dom.adDiv("dbModifiedBar").hide(); // DB Modified bar
    const spinner = (_ => {// create spinner Section
        const spinnerSection = dom.adDiv("spinnerSection show");// make it visible at the start of app
        const maxRings = 21;
        const minRingWitdh = 0.025;
        let ringParent = dom.adDiv("spinnerWrp").attachTo(dom.adDiv("spinnerContainer").attachTo(spinnerSection));
        
        for(let i = 0; i < maxRings; i++){
            const ringWidth = minRingWitdh + (i > maxRings / 2 ? (maxRings - 1 - i) : i) * minRingWitdh;
            ringParent = dom.adDiv().setAttr("style", "animation: spinnerRing 8s linear infinite; border-width: " + ringWidth +"em;").attachTo(ringParent);
        }
        spinnerSection.on("transitionend", _ => spinnerSection.cssName("spinnerSection"));
        
        spinnerSection.start = _ => spinnerSection.addClass("show");
        spinnerSection.stop = _ => spinnerSection.hasClass("show") && requestAnimationFrame(_ => requestAnimationFrame(_ => spinnerSection.addClass("fade")));
        return spinnerSection;
    })();

    // Attach Sections
    document.body.ridKids().attachAry([
            appSectionList, appSectionForm, dbModifiedBar,
            moduleSection,
            msgModule,
            spinner
    ]).onClick(function(e){
        e.target.hasClass && e.target.hasClass("scrollWrp") && this.toggleClass("scrollBarVisible");
    });
    
    // Add moduleSection Finish and Show
    let resolve = null;
    let promise = null;
    let choice = null;
    
    const showModuleSection = _ => {
        moduleSection.addClass("zIndex2");
        spinner.stop();
    };
    const killModuleSection = _ => {
        promise = choice = resolve = null;
        moduleSection.killClass("zIndex2");
    }; 
    
    function moduleFinish(e){ //e=true, value, function, false, null, popstate
        if(!promise) return;
        if(e?.type === "popstate"){
            resolve(choice); 
            spinner.start();
            killModuleSection();
        }else{
            choice = e;
            window.history.back();
        }
    }
    window.addEventListener('popstate', moduleFinish);
    
        // --------------------------changeLanguage - langModule ---------------------------------------
    function langModule(thisApp, completeFunction){
        const langSelectWrp = dom.adDiv("langSelectWrp").attachAry(
            thisApp.txtBank.languages.map(
                lang => getSvgIcon("lang" + lang, lang, _ => {
                    if(lang !== thisApp.lang) thisApp.changeLangTo(lang).then(_ => completeFunction()).finally(_ => thisApp.message.langChange());
                })
            )
        );
        const langIcon = getSvgIcon("lang" + thisApp.lang, thisApp.lang, changeLang)

        function changeLang(){
            langIcon.replaceWith(langSelectWrp);
            setTimeout(_=> document.body.onClick(_ => langSelectWrp.replaceWith(langIcon), { once : true }), 100);
        }
        return dom.addSpan("langWrp").attach(langIcon);
    }
    
    // -------------- App Loader ----------------------------------//
    function appLoader(){
        const getStoreLoadIcon = (thisStore, moduleFinish) => getSvgIcon("loadIcon " + thisStore.key + "Icon", thisStore.key + "Load", _ => moduleFinish(thisStore.load));
        const paintLoader = result => {
            if(result.isPrivate) thisApp.consent = null;
            if(result.error) console.error(result.error); // Not sure of what to do really...
            const consentHtml = getTxtBankHtmlTxt("withConsent") + getTxtBankHtmlTxt(thisApp.idxDb ? "removeConsent": "withConsentNoIdxdb");
            const consentDiv = {
                true: dom.adDiv("consent", consentHtml).onClick(_ => moduleFinish(thisApp.makePrivate)),//"makePrivate" completeLoadWrp(thisApp.makePrivate)
                false: dom.adDiv("noConsent", getTxtBankHtmlTxt("noConsent")).onClick(_ => moduleFinish(thisApp.setConsent)),//"setConsent"
                null: dom.adDiv("noConsent", getTxtBankHtmlTxt("browserIsPrivate")),
            }[thisApp.consent];
            const titleSpanArray = _ => thisApp.longName.split("").map((ch, idx) => dom.addSpan((idx > 4 && idx < 8) || idx > 11 ? "fading" : "", ch));
            moduleSection.ridKids().attach(
                dom.adDiv("scrollWrp").attachAry([
                    langModule(thisApp, _ =>  moduleFinish(thisApp.start)),
                    dom.adDiv("appTitle").attachAry([dom.adDiv("appTitleLongWrp").attachAry(titleSpanArray()), dom.adDiv("appTitleShortWrp").attachAry(titleSpanArray())]),
                    dom.adDiv("loadIconWrp").attachAry([
                        getStoreLoadIcon(thisApp.dbStore.dbxFile, moduleFinish),//loadDbxFile
                        getStoreLoadIcon(thisApp.dbStore.localFile, moduleFinish),//loadLocalFile
                        getSvgIcon("loadIcon newDbIcon", "newDbLoad", _ => moduleFinish(thisApp.createNewDb))//createNewDb
                    ]),
                    consentDiv
                ])
            );
            showModuleSection();
            window.history.pushState({moduleOpen: true}, '', '');
            return promise = new Promise(res => resolve = res);
        };
        return detectIncognito().then(paintLoader).catch(error => paintLoader({error: error}));
    }

    function Credentials(){
        const getHintAry = hint => {
            const credHintWrp = dom.adDiv("credHintWrp").attach(dom.addSpan("credHintSpan", hint)).hide();
            const credHintIcon = dom.addSpan("credHintIcon").onClick(e => {
                credHintWrp.toggleDisplay();
                e.target.toggleClass("credHintHideIcon");
            })
            return hint ? [credHintIcon, credHintWrp] : []
        };
            
        function InputObject(isPin, msgObj){
            this._isPin = isPin,
            this._value = "";
            this._cssAry = isPin ? ["pinInput"] : ["passInput"];
            this._labelHtml = isPin ? msgObj.pinInputLabel : msgObj.passInputLabel;
            this._inputsCount = isPin ? 4 : 1;
            this._inputsMaxCount = isPin ? 32 : 1;
            this._hint = isPin ? msgObj.pinHint : msgObj.passHint;
            this.type = "password";
            this.minLength = isPin ? 1 : 10;
            this.maxLength = isPin ? 1 : 32;
        }
        
        function getInputFieldset(inputObject){
            const getPinWrp = inputObject => {
                const inputPin = e => {
                    const pinInputEl = e.target;
                    pinInputEl.value ? pinInputEl.addClass("pinCharValue") : pinInputEl.killClass("pinCharValue");
                    inputObject._value = pinInputEl.siblings().map(pinInpEl => pinInpEl.value).join("");
                    if(pinInputEl.siblings().length === inputObject._value.length && inputObject._value.length < inputObject._inputsMaxCount){
                        pinInputEl.parentElement.attach(getPinInputEl(false));
                    }
                    if(!pinInputEl.value && pinInputEl.siblings().length > inputObject._inputsCount){
                        pinInputEl.siblings().forEach(kid => {if(!kid.value && kid !== pinInputEl) kid.kill()});
                    }
                    if(inputObject._value.length < inputObject._inputsMaxCount){
                        pinInputEl.siblings().filter(pinInpEl => !pinInpEl.value)[0].focus();
                    }
                }
                const getPinInputEl = required => getInpEl({...inputObject, ...{required: required, _onInput: inputPin}});
                const basePinInputElAry = new Array(inputObject._inputsCount).fill(0).map(_ => getPinInputEl(true));
                const pastePin = (e, idx = 0) => {
                    e.preventDefault(); // Prevent input triggered on the last element
                    if(idx >= inputObject._inputsMaxCount) return thisApp.message.credFormPinTooLong();//alert ("Pin is too long");
                    const pastePinString = (e.clipboardData || window.clipboardData).getData("text");
                    const pinInpEl = e.target.siblings()[idx];
                    pinInpEl.value = pastePinString[idx];
                    pinInpEl.dispatchEvent(new Event('input')); 
                    if(pastePinString[++idx]) pastePin(e, idx);
                };
                return dom.adDiv("credInpWrp pinWrp").attachAry(basePinInputElAry).on("paste", pastePin);
            };

            const getPassWrp = inputObject => dom.adDiv("credInpWrp passWrp").attach(getInpEl({...inputObject, ...{required: true, _onInput: e => inputObject._value = e.target.value}})).on("paste", e => {
                if((e.clipboardData || window.clipboardData).getData("text").length > inputObject.maxLength) thisApp.message.credFormPassTooLong();
            });
            const inpWrp = inputObject._isPin ? getPinWrp(inputObject) : getPassWrp(inputObject);
            const clearInput = e => {
                inputObject._value = "";
                inpWrp.kids().forEach((pinInpEl,idx) => {
                    if(idx + 1 > inputObject._inputsCount){
                        pinInpEl.kill();
                    }else{
                        pinInpEl.value = "";
                        pinInpEl.killClass("pinCharValue");
                    }
                });
                inpWrp.kid(0).focus();
            };

            return getPaddedFieldset(inputObject._labelHtml).attachAry([
                ...getHintAry(inputObject._hint),
                getPassEyeIcon(inpWrp),
                inpWrp,
                getClearInputIcon(clearInput)
            ]).addClass(inputObject._hint ? "withHint" : "");
        }
        
        function paintCredentials(canDelete, canPersist, isUnlock, msgObj, passInputObj, pinInputObj){
            moduleSection.ridKids();
            const pinOnly = !msgObj.passInputLabel;
            
            const getPersistCheckboxLabel = checked => 
                dom.add("label").setAttr("for", "persistCheckbox").addClass("credInpWrp")
                .attach(getSvgIcon(checked ? "checked" : "checked unchecked", checked ? "credChecked" : "credUnchecked", _=> null))
                .attach(dom.addSpan("checkboxLabelSpan", getTxtBankHtmlTxt(checked ? "credChecked" : "credUnchecked")))
                .attach(getSvgIcon());

            let persistCheckboxLabel = getPersistCheckboxLabel(pinOnly);
            
            const confirmDeletePersisted = async e => {
                const tempPersistLabel = getPersistCheckboxLabel(e.target.checked);
                persistCheckboxLabel.replaceWith(tempPersistLabel);
                persistCheckboxLabel = tempPersistLabel;
                if(pinOnly && !e.target.checked){ // (pinOnly && !e.target.checked) if not passInputLabel it means that it's only pin - so the key was persisted already, therefore select as default & Unchecked
                    const [credPromise, credResolve]  = [promise, resolve]; // Preserve Promise and the Resolve function
                    promise = null; // cancel promise to enable showing the new alert
                    const removePersisted = await thisApp.alert.removePersisted();
                    [promise, resolve] = [credPromise, credResolve]; // restore preserved Credentials Promise and the Resolve function
                    if(removePersisted){ 
                        moduleFinish([null, true, false]); // Will throw error in the decodeToJson function and delete the persisted Database
                    }else{
                        paintCredentials(canDelete, canPersist, isUnlock, msgObj, passInputObj, pinInputObj);
                    }
                }
            };

            const persistCheckboxInputEl = getInpEl({
                type: "checkbox",
                id: "persistCheckbox",
                checked: pinOnly, // if not passInputLabel it means that it's only pin - so the key was persisted already, therefore select as default
                _onInput: confirmDeletePersisted 
            }).hide();
            
            const presistFieldset = canPersist ? getPaddedFieldset(msgObj.persistLabel).attachAry([
                ...getHintAry(getTxtBankHtmlTxt(pinOnly ? "credFormRemovePersistHint" : "credFormPersistHint")),
                persistCheckboxLabel,
                persistCheckboxInputEl,
                
            ]) : "";
            
            const sumbitInpEl = getInpEl({
                id: "submitCredentials",
                type: "submit"
            }).hide();
            
            const inputAry = pinOnly ? [getInputFieldset(pinInputObj)] : [getInputFieldset(passInputObj), getInputFieldset(pinInputObj)];
            const unlinkDbIcon = canDelete ? getSvgIcon("trashBin credTrashDB", "mpClose", _ => moduleFinish([])) : getSvgIcon("crosx", "btnCloseForm", _ => moduleFinish([]));
            
            const unlockDbAry = [dom.addSpan("", getTxtBankHtmlTxt("unlockDb")),  getSvgIcon("unlockDb", true)];
            const protectDbAry = [dom.addSpan("", getTxtBankHtmlTxt("protectDb")), getSvgIcon("protectDb", true)];

            const submitCredentialsLabel =  dom.add("label").setAttr("for", "submitCredentials").cssName("credInpWrp submitCredentialsLabel").attachAry(isUnlock ? unlockDbAry : protectDbAry);
            
            const submitCredentials = e =>{
                e.preventDefault(); 
                moduleFinish([passInputObj._value, pinInputObj._value, persistCheckboxInputEl.checked]);
            };
            
            dom.adDiv("credFormWrp").attach(
                dom.add("form")
                    .attach(dom.adDiv("credTaskbar").attach(unlinkDbIcon))
                    .attach(dom.adDiv("credFormTitle", msgObj.title))
                    .attach(
                        dom.adDiv("credIconWrp").attachAry([ //getCredIcons
                            thisApp.dbStore.local.credIcon,
                            thisApp.dbStore.dbxFile.credIcon,
                            thisApp.dbStore.localFile.credIcon
                        ])
                    )
                    .attachAry(inputAry)
                    .attach(presistFieldset)
                    .attach(submitCredentialsLabel)
                    .attach(sumbitInpEl)
                    .on("submit", submitCredentials)
            ).attachTo(moduleSection);
            showModuleSection();
        }
        
        function show(canDelete, canPersist, isUnlock, msgObj) {
            if(promise) return promise.then(_ => show(canDelete, canPersist, isUnlock, msgObj));
            paintCredentials(canDelete, canPersist, isUnlock, msgObj, new InputObject(false, msgObj), new InputObject(true, msgObj)); // getPass, getPin
            window.history.pushState({moduleOpen: true}, '', '');
            return promise = new Promise(res => resolve = res);
        }

        this.pinPassNewChange = (canDelete, canPersist) => show(canDelete, canPersist, false, {
            title: getTxtBankHtmlTxt("credFormTitleNew"), //"Create New Database",
            passInputLabel: getTxtBankHtmlTxt("credFormPass"), 
            pinInputLabel: getTxtBankHtmlTxt("credFormPin"), 
            persistLabel: getTxtBankHtmlTxt("credFormPersist"), //"Save the password in the database and enable unlocking the database using the pin only?"
            pinHint: getTxtBankHtmlTxt("credFormPinHint"),//"Please provide a new PIN. It can be between 4 and 32 characters long and contain any type of characters.",
            passHint: getTxtBankHtmlTxt("credFormPassHint"),//"Please enter a new Password. It can be between 10 and 32 characters long and contain any type of characters.",
        });
        this.pin = (canDelete, canPersist)  => show(canDelete, canPersist, true, {
            title: getTxtBankHtmlTxt("credFormTitle"), 
            pinInputLabel: getTxtBankHtmlTxt("credFormPin"), //"Enter PIN:"
            persistLabel: getTxtBankHtmlTxt("credFormRemovePersist"), //"Save the password in the database and enable unlocking the database using the pin only?"
        });
        this.pinPass = (canDelete, canPersist)  => show(canDelete, canPersist, true, {
            title: getTxtBankHtmlTxt("credFormTitle"), //"Unlock Existing Database"
            passInputLabel: getTxtBankHtmlTxt("credFormPass"), //"Enter Password:",
            pinInputLabel: getTxtBankHtmlTxt("credFormPin"), //"Enter PIN:",
            persistLabel: getTxtBankHtmlTxt("credFormPersist") //"Save the password in the database and enable unlocking the database using the pin only?"
        });
        this.importDb = _  => show(false, false, true, {
            title: getTxtBankHtmlTxt("credFormImportTitle"), //""Unlock Database for Import"
            passInputLabel: getTxtBankHtmlTxt("credFormImpPass"), //"Enter Password:", TODO!!!!!!!!!!!!!!!!!!!!!
            pinInputLabel: getTxtBankHtmlTxt("credFormImportPin"), //"Enter PIN:",  TODO!!!!!!!!!!!!!!!!!!!!!
        });
    }

    function Alerts(){
        const appAlert = (alertObjName, templateObj) => {
            if(promise) return promise.then(_ => appAlert(alertObjName, templateObj));

            const alertObj = ['q', 'y', 'n', 'i'].reduce((obj, prop) => ({...obj, [prop]: getTxtBankAlertTxt(`${alertObjName}.${prop}`, templateObj)}), {});
            const alertTableAry = [
              getSvgIcon("loadIcon " + alertObj.i + "Icon", alertObj.i),
              dom.adDiv("alertGeneraltMsg", alertObj.q),
              getSvgIcon("crosx", "btnCloseForm", _ => moduleFinish(null))
            ];
            const alertChoiceAry = ['y', 'n'].reduce((ary, prop) => alertObj[prop] ? [...ary, dom.adDiv("alertChoice", alertObj[prop]).onClick(_ => moduleFinish(prop === 'y'))] : ary, []);
            alertChoiceAry.length && alertTableAry.push(dom.adDiv("alertChoiceWrp").attachAry(alertChoiceAry));
            moduleSection.ridKids().attach(dom.adDiv("alertTable").attach(dom.adDiv("alertWrp").attachAry(alertTableAry)));
            window.history.pushState({moduleOpen: true}, '', '');
            showModuleSection();
            return promise = new Promise(res => resolve = res).finally(spinner.stop);
        }
        
        this.offline = _ => appAlert("offline"); 
        this.deleteVendor = vendName => appAlert("deleteVendor", {vName: vendName}); 
        this.newVersion = _ => appAlert("newVersion"); // ?????????????????????????????????????????????????????????????????????????????
        this.syncDbWith = storeKey => appAlert(`syncDbWith.${storeKey}`);
        this.disconnectDbFrom = storeKey => appAlert(`disconnectDbFrom.${storeKey}`);
        this.deleteExistingStore = storeKey => appAlert(`deleteExistingStore.${storeKey}`);
        this.localFileLoadOrCreate = _ => appAlert("localFileLoadOrCreate");
        this.localFileDownload = _ => appAlert("localFileDownload");
        this.importDb = _ => appAlert("importDb");
        
        const catchObj = (storeKey, err) => ({sName: getTxtBankTitleTxt(storeKey), sKey: storeKey, cErr: err});
        this.catchLoad = (storeKey, err) => appAlert("catchSync", catchObj(storeKey, err)); // no err for load
        this.catchSync = (storeKey, err) => appAlert("catchSync", catchObj(storeKey, err));
        this.catchUpdate = (storeKey, err) => appAlert("catchUpdate", catchObj(storeKey, err));

        this.remoteRedirect = storeKey => appAlert("remoteRedirect", {sKey: storeKey});
        this.remoteRedirectWithClipboard = storeKey => appAlert("remoteRedirectWithClipboard", {sKey: storeKey});
        this.removePersisted = _ => appAlert("removePersisted");
        this.privateModeUnableSync = _ => appAlert("privateModeUnableSync");
        this.appFailed = _ => appAlert("appFailed");
        
        this.setOlderStore = storeKey => appAlert("setOlderStore", {sName: getTxtBankTitleTxt(storeKey), sKey: storeKey});
        
        this.remoteSyncOrOverwrite = storeKey => appAlert("remoteSyncOrOverwrite", {sName: getTxtBankTitleTxt(storeKey), sKey: storeKey});
        this.remoteSyncOrNew = storeKey => appAlert("remoteSyncOrNew", {sName: getTxtBankTitleTxt(storeKey), sKey: storeKey});
        this.remoteCreateNew = storeKey => appAlert("remoteCreateNew", {sName: getTxtBankTitleTxt(storeKey), sKey: storeKey});
        this.remoteFileRemoved = storeKey => appAlert("remoteFileRemoved", {sName: getTxtBankTitleTxt(storeKey), sKey: storeKey});
    }

     /* Messages -----------------------------------------------------------------------*/
    function  Messages() {
        const msgVisibleTime = 2000; //(2s)
        const msgTransitionTime = 300; //(300ms)
        let timerHide = 0;
        let msgPromise = null;
        let msgHistory = {};

        const resetMsgModule = _ => msgModule.ridKids().cssName("msgModule").setAttr("title", getTxtBankHtmlTxt("msgHistory"));

        msgModule.onClick(_ =>{
            clearTimeout(timerHide);
            msgPromise = null;
            if(msgModule.hasClass("fullHistory")) return resetMsgModule();
            msgModule.addClass("fullHistory").killAttr("title").txt(getTxtBankHtmlTxt("msgHistory")).attachAry(Object.keys(msgHistory).map(nowDate => dom.adDiv(`msgHistoryRow ${msgHistory[nowDate].css}`, `${new Date(parseInt(nowDate)).toUKstring()} - ${msgHistory[nowDate].txt}`)));
        });

        const show = (msgObj, logged) => {
            if(!logged){
                msgHistory[Date.now()] = msgObj;
                if(msgObj.cLog) console.log(msgObj.cLog, msgObj.txt);
            }
            if(msgPromise) return msgPromise.then(_ => show(msgObj, true));
            msgModule.txt(msgObj.txt).addClasses("popUp", msgObj.css);
            msgPromise = new Promise(res => {
                timerHide = setTimeout(_=>{ 
                    resetMsgModule();// start hide
                    timerHide = setTimeout(_=> res(msgPromise = null), msgTransitionTime)// finish hide
                }, msgVisibleTime)
            });
            return true;
        }
        
        function MsgObj(...valAry){
            [this.txt, this.css, this.cLog] = valAry;
        }
        const showInfo = txtMsg => show(new MsgObj(txtMsg, "info"));
        const showFlash = txtMsg => show(new MsgObj(txtMsg, "flash"));
        const showError = (txtMsg, err) => show(new MsgObj(txtMsg, "error", err));
        
        const msgTxt = (tbp, to) => showInfo(getTxtBankMsgTxt(tbp, to));
        const msgFlash = (tbp, to) => showFlash(getTxtBankMsgTxt(tbp, to));
        const msgErr = (tbp, to, err) => showError(getTxtBankMsgTxt(tbp, to), err);
        
        this.digest = showInfo;
        this.error = showError;
        this.existingDb = _ => getTxtBankMsgTxt("existingDb");
        this.loadBd = _ => getTxtBankMsgTxt("loadBd");
        this.remoteAuthorised = _ => getTxtBankMsgTxt("remoteAuthorised");
        
        this.loggedOff = _ => {
            killModuleSection();
            return getTxtBankMsgTxt("loggedOff");
        }
        this.pickFileFR = _ => msgTxt("pickFileFR");
        this.pickFile = _ => msgTxt("pickFile");
        this.pickImportFile = _ => msgTxt("pickImportFile");
        this.deleteVendorReject = vName => msgTxt("deleteVendorReject", {vName:vName});
        this.vendorDeleted = vName => msgTxt("vendorDeleted", {vName:vName});
        this.customPassCopied = _ => msgFlash("customPassCopied");
        this.passCopied = _ => msgFlash("passCopied");
        this.logCopied = _ => msgFlash("logCopied");
        this.exitAppConfirm = _ => msgFlash("exitAppConfirm");
        this.logShort = _ => msgErr("logShort");
        this.nameShort = _ => msgErr("nameShort");
        this.vendorExists = vName => msgErr("vendorExists", {vName:vName});
        this.noFilePickedErr = _ => msgErr("noFilePickedErr");
        this.dbFailed = (count) => msgErr("dbFailed", {count:count});
        this.deleteVendorFailed = (vName, e) => msgErr("deleteVendorFailed", {vName:vName}, e);
        this.submitFormFailed = (vName, e) => msgErr("submitFormFailed", {vName:vName}, e);
        this.submitFormSucess = vName => msgFlash("submitFormSucess", {vName:vName});
        this.submitFormSucessModerateFail = vName => msgErr("submitFormSucessModerateFail", {vName:vName});
        this.submitPassFailed = (vName, e) => msgErr("submitPassFailed", {vName:vName}, e);
        this.offline = _ => msgErr("offline");
        this.online = _ => msgFlash("online");
        this.credFormPinTooLong = _ => msgErr("credFormPinTooLong");
        this.credFormPassTooLong = _ => msgErr("credFormPassTooLong");
        this.persistedSucess = _ => msgFlash("persistedSucess");
        this.persistedFail = _ => msgErr("persistedFail");
        this.persistedDeleted = _ => msgErr("persistedDeleted");
        this.persistedBadPin = count => msgErr("persistedBadPin", {count:count});
        this.dbCredentialsChangeSucess = _ => msgFlash("dbCredentialsChangeSucess");
        this.dbCredentialsChangeFail = _ => msgErr("dbCredentialsChangeFail");
        this.dbCredentialsChangeModerateFail = _ => msgErr("dbCredentialsChangeModerateFail");
        this.dbCredentialsChangeCriticalFail = err => msgErr("dbCredentialsChangeCriticalFail", null, err);
        this.emergDbCreated = fName => msgFlash("emergDbCreated", {fName});
        this.importDbFail = _ => msgErr("importDbFail");
        this.importDbSuccess = _ => msgFlash("importDbSuccess");
        this.importDbCancel = _ => msgTxt("importDbCancel");
        this.langChange = _ => msgFlash("langChange");
        this.storeConnectionTrue = sName => msgTxt("storeConnectionTrue", {sName:sName});
        this.storeConnectionFalse = sName => msgTxt("storeConnectionFalse", {sName:sName});
        this.storeConnectFail = sName => msgErr("storeConnectFail", {sName:sName});
        this.noWriteStores = err => msgErr("noWriteStores", null, err);
        this.dbFileDownloaded = fName => msgFlash("dbFileDownloaded", {fName:fName});
        this.dbFile = _ => msgFlash("langChange");
        this.storeIsSyncing = sName => msgTxt("storeIsSyncing", {sName:sName});
        
    };
    

/* MainGUI -------- MainGUI ---------- MainGUI -------- MainGUI ---------- MainGUI -------- MainGUI ---------- MainGUI -------- MainGUI ---------- MainGUI -------- MainGUI ----------*/
    function MainGUI(){
        const ado = thisApp.displayOptions;
        const adoDetails = ado.details;
        const adoSorts = ado.sorts;

        let listScrollWrpPrevTopPosition = 0;
        
/////////////////////////////////////////////////////////////////////TEMP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function getCvs(){
            var input = document.createElement('input');
            input.type = 'file';
            input.onchange = e => { 
               // getting a hold of the file reference
               var file = e.target.files[0]; 
               // setting up the reader
               var reader = new FileReader();
               reader.readAsText(file,'UTF-8');
               // here we tell the reader what to do when it's done reading...
               reader.onload = readerEvent => {
                  var content = readerEvent.target.result; // this is the content!
                  const vendAry = JSON.parse(content);
                  const amendedVendary = vendAry.map((vobj, idx) => {
                      
                      const amendedVendObj = {
                          id: idx + 1,
                          name: vobj.name,
                          log: vobj.log,
                          note: vobj.note,
                          url: vobj.url,
                          tags: vobj.tags,
                          cr8: new Date(vobj.cr8).getTime(),
                          mod: new Date(vobj.mod).getTime(),
                          cPass: vobj.plainPass,
                          isNote: vobj.isNote,
                      }
                      
                      return new thisApp.crypto.Vendor(amendedVendObj);
                         
                  });
                  thisApp.dbObj.vendors = amendedVendary;
                  paintList();
                  console.log(amendedVendary);
               }
            }
            console.log("isInput clicked?");
            input.click();
        }
        let count = false;
////////////////////////////////////////////////////////////////////END TEMP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

        /////////////////////////////////////////////////MAIN - FORM APP SECTION paintFormSection!!!!!!! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        async function paintFormSection(addHistory, vendObj, edit, submitForm, toggleForm){
            let vFormScrollTop = 0;
            const vForm = dom.adDiv("scrollWrp").on("scroll", e => vFormScrollTop = e.target.scrollTop);
            if(addHistory) window.history.pushState({formOpen: true}, '', '');
            if (count) getCvs(); count = null; // REMOVE FROM FINAL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            let isNew = !vendObj || vendObj.isNew;
            
            if(submitForm){
                if(!vendObj.name || vendObj.name.length < 3) return thisApp.message.nameShort();
                if(vendObj.log && vendObj.log.length < 3) return thisApp.message.logShort();
                const vendNames = thisApp.dbObj.vendors.filter(vObj => vObj.name.toLowerCase() === vendObj.name.toLowerCase());
                if(vendNames.length && vendNames[0].id !== vendObj.id) return thisApp.message.vendorExists(vendObj.name);
                const hasChanged = !vendObj.mod || isNew; // if mode is null then the stores need updating
                if(isNew) vendObj.mod = vendObj.cr8 = null;
                vendObj = new thisApp.crypto.Vendor(vendObj); // if was new is not new anymore
                if(hasChanged) {
                    if(isNew){
                        isNew = false;
                        thisApp.dbObj.vendors.push(vendObj);
                    }else{
                        thisApp.dbObj.vendors = thisApp.dbObj.vendors.map(vObj => vObj.id === vendObj.id ? vendObj : vObj);
                      }
                    thisApp.dbStoreUpdateAll(true).then(rejectedPromises => {
                        thisApp.message.submitFormSucess(vendObj.name);
                        if(rejectedPromises.length) thisApp.message.submitFormSucessModerateFail(vendObj.name);
                    }).catch(err => thisApp.message.submitFormFailed(vendObj.name, err)); // Change The arguments - are they needed? thisApp.message.noWriteStores(err);
                    repaintUI();
                }
            }
            
            vendObj = new thisApp.crypto.Vendor(vendObj, thisApp.dbObj.vendors);
            if(isNew) vendObj.isNew = true;
            const displayMode = !vendObj.isNew && !edit;
            if(toggleForm) vendObj.mod = null;

            const closeForm = exitForm => {
                if(exitForm || isNew){
                    window.history.back();
                }else{
                    const [vo] = thisApp.dbObj.vendors.filter(vObj => vObj.id === vendObj.id);
                    paintFormSection(false, vo, false, false);
                }
            };
            
            const getCopyIcon = (inpEl, iconTitle, msgName) => getSvgIcon("copyClipboard", iconTitle, _ => {
                window.navigator.vibrate(50);
                navigator.clipboard.writeText(inpEl.value).then(_ => thisApp.message[msgName]());
            });
            
            const changeVprop = e => {
                vendObj[e.target.name] = e.target.value;
                vendObj.mod = null;
            };
            const clearFormInput = inpEl => {
                inpEl.value = ""; 
                inpEl.dispatchEvent(new Event('input')); 
                inpEl.focus()
            }

            const createPassSection = async (labelHtml, inpType = "password") => {
                const {vendorPassString, vendorPassEntropy} = await vendObj.getCurrentPassword();
                const passFieldset = getPaddedFieldset(labelHtml);
                const passInpEl = getInpEl({
                    type: inpType,
                    name: "vPass",
                    disabled: true,
                    value: vendorPassString
                });

                const getNewPass = async _ => {
                    vendObj.salt = null;
                    vendObj = new thisApp.crypto.Vendor(vendObj);
                    vendObj.mod = null;
                    passFieldset.replaceWith(await createPassSection(labelHtml, passInpEl.type));
                };

                const getRangeInpFieldset = (min, max, value, rangeNameId, rangeLabelHtml) => {
                    const changeRangeInput = async e => {
                        changeVprop(e);
                        passFieldset.replaceWith(await createPassSection(labelHtml, passInpEl.type));
                    };
                    const rangeInputEl = getInpEl({
                        type: "range",
                        name: rangeNameId,
                        min: min,
                        max: max,
                        value: value,
                        _onInput: changeRangeInput
                    });
                    const changeRangeInputValue = val => {
                        rangeInputEl.value = parseInt(rangeInputEl.value) + val;
                        rangeInputEl.dispatchEvent(new Event('input'));
                    };
                    return dom.addFieldset(rangeLabelHtml).attachAry([
                        getSvgIcon("minusBtn", "minusBtn", _ => changeRangeInputValue(-1)),
                        rangeInputEl,
                        getSvgIcon("plusBtn", "plusBtn", _ => changeRangeInputValue(1))
                    ]);
                };
                
                const vPass = thisApp.crypto.vPass;
                const cplxInpFieldset = displayMode ? [] : getRangeInpFieldset(vPass.minComplex, vPass.maxComplex, vendObj.cplx || vPass.dfltComplex, "cplx", getTxtBankHtmlTxt("formLabelPassCplx") + " (" + (vendObj.cplx || vPass.dfltComplex) + ") ");
                const lenInpFieldset =  displayMode ? [] : getRangeInpFieldset(vPass.minLen, vPass.maxLen, vendObj.len || vPass.dfltLen, "len", getTxtBankHtmlTxt("formLabelPassLen") + " (" + (vendObj.len || vPass.dfltLen) + ") ");
                const passwordStrengthGrades = {
                    0:"inadequate", // Nie adekwatne, nieodpowiednie, niezadowalajace, ponizej normy
                    40:"extremelyWeak", //Mierne
                    50:"veryWeak", // Bardzo Slabe
                    60:"weak", // Mizerne, //Kiepskie
                    70:"fair", // Znosne
                    80:"fine", // Przecietne,// Wystarczajace, //zadawalajace, do przyjecia, poprawne, przecietne, satysfakcjonujace, srednie,wzgledne, znosne
                    90:"good", // Dobre
                    100:"strong", // Silne
                    110:"veryStrong", // Bardzo silne
                    120:"great", // swietne
                    127:"excellent", // doskonale
                    200:"superior" // wybitne //celujace, wybitne, wysmienite, mistrzowskie, wyborne, wspaniale, znakomite, perfekcyjne, kapitalne
                };
                const vendorPassGrade = passwordStrengthGrades[Object.keys(passwordStrengthGrades).filter(grade => parseInt(grade) < vendorPassEntropy).pop()]
                const passRating = displayMode ? [] : dom.adDiv("passRating").attachAry([ // + vendorPassGrade
                    dom.adDiv("passRatingRow passRatingLabelRow").attachAry([
                        dom.adDiv("", getTxtBankHtmlTxt("formLabelPassEntropy")+ ":"),
                        dom.adDiv("", getTxtBankHtmlTxt("formLabelPassGrade") + ":")
                    ]),
                    dom.adDiv("passRatingRow passRatingValueRow").attachAry([
                        dom.adDiv("", vendorPassEntropy),
                        dom.adDiv("", getTxtBankHtmlTxt("vendorPassGradeVal." + vendorPassGrade))
                    ]),
                    dom.adDiv("passRatingIndicatorWrp").attach(dom.adDiv("passRatingIndicator " + vendorPassGrade).setAttr("style", "width:" + ((100 * vendorPassEntropy) / 256) + "%;"))
                ]); 
                 
                return vendObj.cPass && displayMode ? [] : passFieldset.attachAry([
                    getPassEyeIcon(passInpEl),
                    passInpEl,
                    displayMode ? getCopyIcon(passInpEl, "copyPassBtn", "passCopied") : getSvgIcon("newPassBtn", true, getNewPass),
                    cplxInpFieldset,
                    lenInpFieldset,
                    passRating
                ]);
            };

            const createLogSection = labelHtml => {
                const logInpEl = getInpEl({
                    type: "text",
                    name: "log",
                    value: vendObj.log,
                    placeholder: labelHtml,
                    disabled: displayMode,
                    _onInput: changeVprop
                });
                return vendObj.log || !displayMode ? getPaddedFieldset(labelHtml).attachAry([
                    getSvgIcon(),
                    logInpEl,
                    displayMode ? getCopyIcon(logInpEl, "copyLogBtn", "logCopied") : getClearInputIcon(_ => clearFormInput(logInpEl))
                ]) : [];
            }

            const createCustomPassSection = (labelHtml) => {
                const passInpEl = getInpEl({
                    type: "password",
                    name: "cPass",
                    disabled: displayMode,
                    value: vendObj.cPass,
                    placeholder: labelHtml,
                    _onInput: changeVprop
                });
                return vendObj.cPass || !displayMode ? getPaddedFieldset(labelHtml).attachAry([
                    getPassEyeIcon(passInpEl),
                    passInpEl,
                    displayMode ? getCopyIcon(passInpEl, "copyPassBtn", "customPassCopied") : getClearInputIcon(_ => clearFormInput(passInpEl))
                 ]) : "";
            };
            
            const boxNoteEl = dom.addTextarea("boxNote").setAttr("name", "note").setAttr("maxlength", "10000").setAttr("placeholder", getTxtBankHtmlTxt("formLabelNote")).setAttr(displayMode ? "disabled" : "enabled", true).on("input", e => { // Resize boxNote textarea
                if(e.isTrusted) changeVprop(e); // only user input and not the dispatched event
                const boxNoteEl = e.target;
                boxNoteEl.style.height = "auto";
                if(boxNoteEl.scrollHeight <= boxNoteEl.clientHeight){
                    boxNoteEl.killClass("max").rows = "2";
                }else if(!boxNoteEl.hasClass("max")){
                    boxNoteEl.addClass("max").rows = "1";
                }
                boxNoteEl.style.height = boxNoteEl.scrollHeight + "px"
                vForm.scrollTop = vFormScrollTop;
            });

            const createNotesSection = labelHtml => displayMode && !vendObj.note ? [] : getPaddedFieldset(labelHtml).attach(boxNoteEl);
            
            const createUrlSection = labelHtml => {
                const urlInpEl = getInpEl({
                    type: "text",
                    name: "url",
                    placeholder: "https://example.com/login",
                    value: vendObj.url,
                    disabled: displayMode,
                    size: "30",
                    pattern: "https://.*",
                    _onInput: changeVprop
                });
                return  displayMode && !vendObj.url ? [] : getPaddedFieldset(labelHtml).attachAry([
                    getSvgIcon(),
                    urlInpEl,
                    isURL(vendObj.url) && displayMode ? dom.add("a").setAttr("href", vendObj.url).setAttr("target", "_blank").setAttr("rel", "noreferrer").attach(getSvgIcon("openLinkBtn", true)) : getClearInputIcon(_ => clearFormInput(urlInpEl))
                ]);
            }

            const createStandardSection = (prop, labelHtml) => {
                const inpEl = getInpEl({
                    type: "text",
                    name: prop,
                    placeholder: labelHtml,
                    value: vendObj[prop],
                    disabled: displayMode,
                    _onInput: changeVprop
                });
                return displayMode && !vendObj[prop] ? [] :  getPaddedFieldset(labelHtml).attachAry([
                    getSvgIcon(),
                    inpEl,
                    displayMode ? getSvgIcon() : getClearInputIcon(_ => clearFormInput(inpEl))
                ]);
            }
            

            const formHead = dom.adDiv("formHead").attachAry([
                getSvgIcon(displayMode ? "editFormBtn" : "submitFormBtn", true, _ => paintFormSection(false, vendObj, displayMode, !displayMode)),
                dom.adDiv("formTitle " + (vendObj.isNew && vendObj.isNote ? "newNote" : vendObj.isNew ? "newLog" : ""), vendObj.name || ""),
                getSvgIcon("btnCloseForm", true, _ => closeForm(displayMode)),
                displayMode ? dom.adDiv("recordModWrp").attachAry([ // Show only if Display
                    dom.adDiv("recordDate").attachAry([
                        dom.addSpan("vCr8DateLabel"),
                        dom.addSpan("vCr8Date", new Date(vendObj.cr8).toUKstring()),
                    ]),
                    getSvgIcon(vendObj.isNote ? "formIconTypeNote" : "formIconTypeLog", true),
                    dom.adDiv("recordDate").attachAry([
                        dom.addSpan("vModDate", new Date(vendObj.mod).toUKstring()),
                        dom.addSpan("vModDateLabel"),
                    ]),
                ]): []
            ]);
            
            const formSectionsAry = [//htmls
                createStandardSection("name", getTxtBankHtmlTxt("formLabelName")),
                vendObj.isNote ? [] : createLogSection(getTxtBankHtmlTxt("formLabelLog")),
                vendObj.isNote ? [] : await createPassSection(getTxtBankHtmlTxt("formLabelPass")),
                vendObj.isNote ? [] : createCustomPassSection(getTxtBankHtmlTxt("formLabelCustomPass")),
                createNotesSection(getTxtBankHtmlTxt("formLabelNote")),
                createUrlSection(getTxtBankHtmlTxt("formLabelUrl")),
                createStandardSection("tags", getTxtBankHtmlTxt("formLabelTags")),
            ]
            
            const formFoot = displayMode ? null : dom.adDiv("formFoot").attachAry([
                vendObj.isNew ? [] : getSvgIcon("trashBin", "deleteVendorBtn", async _ => {
                    if(!await thisApp.alert.deleteVendor(vendObj.name)) return thisApp.message.deleteVendorReject(vendObj.name);
                    thisApp.dbObj.vendors = thisApp.dbObj.vendors.filter(vObj => vObj.id !== vendObj.id);
                    await thisApp.dbStoreUpdateAll(true).then(rejectedPromises => {
                        if(rejectedPromises.length) console.log("The following stores have not been updated", rejectedPromises);
                        thisApp.message.vendorDeleted(vendObj.name);
                        repaintUI();
                    }).catch(err => {
                        //thisApp.dbObj.vendors.push(vendObj);
                        thisApp.message.deleteVendorFailed(vendObj.name, err);
                    }); 
                    
                    closeForm(true); // Go History Back
                }),
                getSvgIcon(vendObj.isNote ? "toggleToLog" : "toggleToNote", true, _ => {
                    vendObj.isNote = !vendObj.isNote;
                    vendObj.mod = null;
                    paintFormSection(false, vendObj, true, false, true)
                })
            ]);

            vForm.attach(formHead).attachAry(formSectionsAry).attach(formFoot).attachTo(appSectionForm.ridKids().show());
            boxNoteEl.value = vendObj.note || "";
            boxNoteEl.dispatchEvent(new Event('input')); // resize after attaching to the form section
            if(vForm.scrollHeight > vForm.clientHeight) vForm.addClass("scrollWrpOverflow");
        }
        /////////////////////////////////////////////////END MAIN - FORM APP SECTION paintFormSection!!!!!!! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////MAIN - LIST APP SECTION paintListSection!!!!!!! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function paintListSection(){
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Emergency Database - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const downloadEmergencyHtmlDB = async _ => {
                async function unlockDb(e){
                    e.preventDefault();
                    const dom = new Dom(document);
                    const dbCipherU8Ary = new Uint8Array(dbCipherString.split(",").map(x => +x)); // change the cipher string to array of integers, then to Uint8Array
                    const thisCrypto = new Crypto();
                    const cryptoKeyObj = await thisCrypto.getCryptoKeyObjFromPlains(dbCipherU8Ary, inputBoxPass.value, inputBoxPin.value).catch(err => null);
                    const [dbObject] = await thisCrypto.getDbObjectFromCipher(dbCipherU8Ary, cryptoKeyObj).catch(err => ([null]));
                    document.body.ridKids();
                    if(!dbObject) return alert("Error");
                    const dbObj = new thisCrypto.DatabaseObject(dbObject);
                    const vendAry = dbObj.vendors;
                    vendAry.forEach(async vendObj => {
                        vendObj.pass = await vendObj.getCurrentPassword().then(passObj => passObj.vendorPassString);
                        vendObj.cr8 = new Date(vendObj.cr8).toLocaleString('en-GB', { timeZone: 'Europe/London' });
                        vendObj.mod = new Date(vendObj.mod).toLocaleString('en-GB', { timeZone: 'Europe/London' });
                    });
                    const getCvsTContents = _ => vendAry.map(vendObj => Object.keys(vendObj).map(prop => '\r\n' + prop + ':,' + ('' + vendObj[prop]).replace(/[,\t\n\r]/gm,' _ ')).join('') + '\r\n').join('');
                    dom.adDiv("btnWrp")
                        .attach(
                            dom.add("button").html("Download Unprotected Database CVS").onClick(e => {
                                downloadFile(
                                    new Blob([getCvsTContents()], {type : 'text/html'}),
                                    'SecreSync_Emergency_Unprotected.csv'
                                );
                                e.target.kill();
                            })
                        )
                        .attach(
                            dom.add("button").html("Show Records").onClick(e => {
                                document.body.attachAry(vendAry.map(vendObj => dom.adDiv("account").attachAry(Object.keys(vendObj).map(key => dom.adDiv("prop").attachAry([dom.addSpan("key", key + ":"), dom.addSpan("val", vendObj[key])])))));
                                e.target.kill(); //account
                            })
                        )
                        .attachTo(document.body);
                }
                
                const constStr = "document.querySelector('form').addEventListener('submit', unlockDb); const dbCipherString= '" + await thisApp.getEncryptedDbU8Ary()  + "';";
                const scriptString = [Dom, Crypto, downloadFile, unlockDb, constStr].map(f => f.toString()).join('');
                
                const doc = document.implementation.createHTMLDocument("SecreSync Emergency");
                const styleHtml = "body{position: absolute;margin: 0;padding: 0;width: 100%;font-family: monospace;font-size: 16px;}body *{max-width: 900px;}form{outline: 1px solid grey;margin: 1vmin auto;padding: 1vmin;}form *{text-align: center;}label{display:block;padding:1em;}input{font-family: monospace;font-size: 0.9em;line-height: 1.5em;border: 0;border-bottom: 1px solid rgb(240, 240, 240);transition: all 0.3s ease;padding: 0.5em 2.5em;display: block;margin: 0em auto 10vh;min-width: 50%;}input:focus-visible{outline:0;border-bottom: 1px solid black;color: black;}.btnWrp{display: flex;margin: auto;position: sticky;top: 0px;justify-content: center;}button{margin: 1em;padding:1em;}.account{margin: 1em auto;padding:1em;outline: 1px solid grey;background: #fafafa;}.prop{display: table-row;}.prop *{padding:0.5em;display: table-cell;}.key{font-weight: bold;}.val{color:black;}";
                dom.add("style").html(styleHtml).attachTo(doc.head);
                dom.add("form")
                .attach(dom.add("label").setAttr("for", "inputBoxPass").html("Password:"))
                .attach(dom.add("input").setAttr("type", "password").setAttr("id", "inputBoxPass").html("Password:"))
                .attach(dom.add("label").setAttr("for", "inputBoxPin").html("PIN:"))
                .attach(dom.add("input").setAttr("type", "password").setAttr("id", "inputBoxPin").html("Pin:"))
                .attach(dom.add("input").setAttr("type", "submit").setAttr("value", "Unlock..."))
                .attachTo(doc.body);
                const preliminaryScriptHtml = "window.addEventListener('DOMContentLoaded', function() {const preliminaryScript = document.getElementById('preliminaryScript'); const mainScript = document.createElement('script'); const targetScriptText = document.createTextNode(preliminaryScript.dataset.scriptstring); mainScript.appendChild(targetScriptText); document.body.appendChild(mainScript);})";
                dom.add("script").setAttr("id", "preliminaryScript").setAttr("data-scriptstring", scriptString).html(preliminaryScriptHtml).attachTo(doc.body); // add string content of the main script (scriptString) to dataset.scriptstring of the preliminaryScript in order to prevent parsing large HTML, evaluating and compiling script on the document loading (it slows down the display of the form). The main script (scriptString) is added, parsed and compiled after DOMContentLoaded
                const emrgDbName = downloadFile(
                    new Blob(['<!DOCTYPE html>' + doc.documentElement.outerHTML], {type : 'text/html'}),
                    "SecreSync_Emergency.html"
                );
                thisApp.message.emergDbCreated(emrgDbName);
            };
            

            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Donate - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const getDonate = _ => {
                 console.log("TO DO getDonate");
            }
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Import Database from another lpm Database file - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const importDb = _ => {
                thisApp.message.pickImportFile();
                spinner.start();
                pickFile().then(async fileContentsAryBuffer => {
                    const messageFail = "importDbFail";
                    const credentialsResponseAry = await thisApp.ui.credentials.importDb();
                    if(!credentialsResponseAry || !credentialsResponseAry.length) throw messageFail;
                    const importedDBJson = await thisApp.decodeToJson(fileContentsAryBuffer, credentialsResponseAry, 0, true).catch(err => {throw messageFail;});
                    if (!await thisApp.alert.importDb()) return thisApp.message.importDbCancel();
                    importedDBJson.vendors.forEach(importVendObj => {
                        importVendObj.id = null; // nextID
                        importVendObj.imp = new Date().getTime();
                        let importCount = 1;
                        const getImportName = _ => `${importVendObj.name} (i_${importCount})`; //importVendObj.name + " (i_"+ importCount +")";
                        while (thisApp.dbObj.vendors.some(vendObj => vendObj.name === getImportName())) importCount++;
                        importVendObj.name = getImportName();
                        thisApp.dbObj.vendors.push(new thisApp.crypto.Vendor(importVendObj, thisApp.dbObj.vendors));
                    });
                    await thisApp.dbStoreUpdateAll(true).catch(err => {throw messageFail;}); // Change The arguments - are they needed?

                    thisApp.message.importDbSuccess();
                    repaintUI();
                }).catch(err => {
                    thisApp.message[err](); //noFilePickedErr
                    spinner.stop()
                });
            }
            const downloadCopyDB = thisApp.dbStore.localFile.download;

            const getChangePassword = async _ => {
                 thisApp.changeCredentials().then(e => {thisApp.message.dbCredentialsChangeSucess();}).catch(err => {thisApp.message.dbCredentialsChangeFail();}).finally(spinner.stop); // if not in brackets the finally function does not fire!!!
            }
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - APP_TASKBAR and APP_MORETASKBAR - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const getAppMoreTaskbar = _ => dom.adDiv("appMoreTaskbar").attachAry([
                getSvgIcon("reloadApp", true, thisApp.reload),
                dom.adDiv("syncIconWrp").attachAry([
                    getSvgIcon("changeDbPass", true, getChangePassword),
                    getSvgIcon("donate", "donate", getDonate),
                    getSvgIcon("syncIcon impDb", "impDb", importDb),
                    getSvgIcon("syncIcon downDb", "downDb", downloadCopyDB),
                    getSvgIcon("syncIcon emergDb", "emergDb", downloadEmergencyHtmlDB),
                    langModule(thisApp, repaintUI)
                ]),
                getSvgIcon("arrowUp", "hide", (e => e.target.forebear(1).toggleClass("appMoreTaskbarShow"))),
            ]);
            const searchInputEl = getInpEl({
                type: "text",
                name: "inputBoxSearch",
                id: "inputBoxSearch",
                placeholder: getTxtBankHtmlTxt("inputBoxSearch")
                
            });
            const getSearchForm = _ => {
                const searchFormEl = dom.add("form").cssName("searchForm searchFormHide");
                const searchEvent = e => {
                    e.stopPropagation();
                    e.preventDefault();
                    paintList();
                }
                const clearSearch = e => {
                    searchInputEl.value = "";
                    searchInputEl.focus();
                    searchEvent(e)
                };
                const hideForm = e => {
                    searchFormEl.addClass("searchFormHide");
                    clearSearch(e);
                };
                const hideFormEl = getSvgIcon("arrowUp", "hide", hideForm);
                const searchResetBtn = getClearInputIcon(clearSearch);//getSvgIcon("deleteLeft", "deleteLeft", clearSearch);
                
                searchFormEl.showForm = _ => {
                    searchFormEl.killClass("searchFormHide");
                    searchInputEl.focus();
                };
                
                return searchFormEl.attachAry([
                    hideFormEl,
                    searchInputEl,
                    searchResetBtn
                ]).on("input", searchEvent).on("reset", clearSearch).on("submit", searchEvent);
            }

            const searchFormEl = getSearchForm();
            const getAppTaskbar = _ => dom.adDiv("appTaskbar").attachAry([
                getSvgIcon("inputBoxSearchBtn", true, searchFormEl.showForm),
                dom.adDiv("syncIconWrp").attachAry([
                    thisApp.dbStore.local.syncIcon,
                    thisApp.dbStore.dbxFile.syncIcon,
                    thisApp.dbStore.localFile.syncIcon
                ]),
                getSvgIcon("moreMenu", true, e => e.target.forebear(1).sibling(1).toggleClass("appMoreTaskbarShow")),
                searchFormEl
            ]);
            
            const vListMainBarWrp = dom.adDiv("vlistBarWrp vListMainBarWrp").attachAry([
                getAppTaskbar(),
                getAppMoreTaskbar()
            ]);
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - vListTaskBarWrp - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const getListTaskBarWrp = _ => {
                const getListSortBar = _ => {
                    const vListSortBar = dom.adDiv("vListSortBar");
                    const changeSorts = iconName => {
                        ado.changeSort(iconName);
                        vListSortBar.ridKids().attachAry(getSortIcons());
                        paintList();
                    };
                    const getSortIcons = _ => ["vSortCr8", "vSortMod", "vSortName"].map(iconName => 
                        getSvgIcon("sortIcon " + (iconName + adoSorts.sortOrder) + (adoSorts.sortBy === iconName ? "" : " elDimmed"), iconName, 
                        _ => changeSorts(iconName)
                        )
                    );
                    return vListSortBar.attachAry(getSortIcons());
                };
                
                const getListTaskBar = vListSortBar => {
                    const vListTaskBar = dom.adDiv("vListTaskBar");
                    const getTaskIcons = _ => {
                        const changeDetails = (iconEl, iconName) => {
                            ado.changeDetail(iconName);
                            iconEl.toggleClass("elDimmed");
                            paintList();
                        };
                        const switchTask = e => {
                            const el = e.target;
                            if(el.hasClass("taskSwitchDetais")){
                                el.replaceWith(taskSwitchSortIcon);
                                vListSortBar.slideIn();
                            }else{
                                el.replaceWith(taskSwitchDetaisIcon);
                                vListSortBar.slideOut();
                            }
                        };
                        const taskSwitchSortIcon = getSvgIcon("vTaskSwitch taskSwitchSort", "vTaskSwitch", switchTask);
                        const taskSwitchDetaisIcon = getSvgIcon("vTaskSwitch taskSwitchDetais", "vTaskSwitchSort", switchTask);
                        const taskIcons = Object.keys(adoDetails).map( iconName => getSvgIcon(iconName + (adoDetails[iconName] ? "": " elDimmed"), iconName, e => changeDetails(e.target, iconName)));
                        taskIcons.splice(3, 0, dom.addSpan("divider"));
                        taskIcons.push(dom.addSpan("divider"));
                        taskIcons.push(taskSwitchSortIcon);
                        return taskIcons;
                    };
                    return vListTaskBar.attachAry(getTaskIcons());
                };

                const listSortBar = getListSortBar();
                const listTaskBar = getListTaskBar(listSortBar);

                return dom.adDiv("vlistBarWrp listTaskBarWrp").attachAry([
                    dom.adDiv("vListBarLabel"),
                    listTaskBar,
                    listSortBar
                ]);
            }
            const listTaskBarWrp = getListTaskBarWrp();
            const vListWrp = dom.adDiv("vListWrp");
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Attach List Section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const listScrollWrp = dom.adDiv("scrollWrp").on("scroll", e => {
                const cssMethods = ["killClass", "addClass"];
                const [appTaskCssMethod, listTaskCssMethod] = listScrollWrpPrevTopPosition - e.target.scrollTop > 0 ? cssMethods.reverse() : cssMethods;
                vListMainBarWrp[appTaskCssMethod]("taskBarWrpZeroTop"); 
                listTaskBarWrp[listTaskCssMethod]("taskBarWrpZeroTop");
                listScrollWrpPrevTopPosition = e.target.scrollTop;
            }).attachAry([
                    vListMainBarWrp,
                    listTaskBarWrp,
                    vListWrp
            ]);
            const checkIfScroll = async _ => setTimeout(_ => requestAnimationFrame(_ => listScrollWrp.scrollHeight > listScrollWrp.clientHeight ? listScrollWrp.addClass("scrollWrpOverflow") : listScrollWrp.killClass("scrollWrpOverflow")), 0);
            
            function paintList(searchStr = searchInputEl.value){
                const sortList = {
                    vSortName: {
                        Asc: ary => ary.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0)),
                        Desc: ary => ary.sort((a,b) => (b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : ((a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 0))
                    },
                    vSortCr8: {
                        Asc: ary => ary.sort((a,b) => a.cr8 - b.cr8),
                        Desc: ary => ary.sort((a,b) => b.cr8 - a.cr8)
                    },
                    vSortMod: {
                        Asc: ary => ary.sort((a,b) => a.mod - b.mod),
                        Desc: ary => ary.sort((a,b) => b.mod - a.mod)
                    },
                }[adoSorts.sortBy][adoSorts.sortOrder];
                
                const vendAllowAry = sortList(thisApp.dbObj.vendors.filter(obj => (adoDetails.typeNote && obj.isNote) || (adoDetails.typeLog && !obj.isNote)));
                const filterBy = prop => vendAllowAry.filter(obj => obj[prop] && obj[prop].toLowerCase().includes(searchStr.toLowerCase()));
                const nameHitAry = searchStr ? filterBy("name") : vendAllowAry;
                const tagHitAry = filterBy("tags").filter(obj => !nameHitAry.map(({ id }) => id).includes(obj.id));
                const noteHitAry = filterBy("note").filter(obj => !nameHitAry.map(({ id }) => id).includes(obj.id) && !tagHitAry.map(({ id }) => id).includes(obj.id));
                const hits = nameHitAry.length || tagHitAry.length || noteHitAry.length;
                
                vListWrp.ridKids();
                const vListBarLabel = listTaskBarWrp.kid(0);
                vListBarLabel.html(hits ? "" : getTxtBankHtmlTxt("vListHeads.notFound", {searchStr: searchStr}));
                
                const appendTovList = (vendorsHitAry, vListBarLabelHtml, foundInNames) => {
                    if(!vendorsHitAry.length) return;

                    if(foundInNames){ // change main vlistBarWrp's vListBarLabel 
                        vListBarLabel.txt(vListBarLabelHtml);
                    }else{ // add separate vlistBarWrp
                        vListWrp.attach(dom.adDiv("vlistBarWrp listTaskBarWrp").attach(dom.adDiv("vListBarLabel").html(vListBarLabelHtml)));
                    }
                    
                    const vNameStr = vName => searchStr ? vName.replace(new RegExp(searchStr, 'gi'), match => dom.addSpan("hit", match).outerHTML) : vName; // add highlights to text of found searchStr 
                    const detDates = vendObj => adoDetails.detDates ? dom.adDiv("inpEl vDates")
                        .attach(dom.adDiv("inpEl vCr8", new Date(vendObj.cr8).toUKstring()))
                        .attach(dom.adDiv("inpEl vMod", new Date(vendObj.mod).toUKstring())) : null;
                        
                    vListWrp.attachAry(
                        vendorsHitAry.map(vendObj =>
                            dom.adDiv(vendObj.isNote ? "note" : "log")
                            .attach(dom.adDiv("inpEl vName").html(vNameStr(vendObj.name)))
                            .attach(detDates(vendObj))
                            .attach(adoDetails.detNotes ? dom.adDiv("inpEl vNotes").html(vNameStr(vendObj.note || "---")) : null)
                            .attach(adoDetails.detTags ? dom.adDiv("inpEl vTags").html(vNameStr(vendObj.tags || "---")) : null)
                            .onClick(_ => paintFormSection(true, vendObj))
                        )
                    );
                }

                appendTovList(nameHitAry, getTxtBankHtmlTxt("vListHeads.nameFound"), true);
                appendTovList(tagHitAry, getTxtBankHtmlTxt("vListHeads.tagsFound", {searchStr: searchStr}), false);
                appendTovList(noteHitAry, getTxtBankHtmlTxt("vListHeads.notesFound", {searchStr: searchStr}), false);

                requestAnimationFrame(_ => listScrollWrp.scrollHeight > listScrollWrp.clientHeight ? listScrollWrp.addClass("scrollWrpOverflow") : listScrollWrp.killClass("scrollWrpOverflow"));
            }

            appSectionList.ridKids().attachAry([
                listScrollWrp,
                getSvgIcon("addVendorBtn", true, _=> paintFormSection(true, null)) // paint form and add to windows history
            ]);
            
            paintList();
            listScrollWrp.scrollTop = listScrollWrpPrevTopPosition
        }
        /////////////////////////////////////////////////END MAIN - LIST APP SECTION paintListSection!!!!!!! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /// Wrap-up Interface, add this.init and return components
        function resetUI(){
            appSectionForm.hide();
            appSectionList.show();
        }

        function repaintUI(){
            dbModifiedBar.txt(new Date(thisApp.dbObj.mod).toUKstring()).show();
            paintListSection();
            spinner.stop();
        }
        
        let appInitiated = false;
        


        //Initiate UI
        return _ => {

            !appInitiated && window.addEventListener('popstate', resetUI); //Add popstate if app not yet initiated
            repaintUI();
            resetUI();
            appInitiated = true;

        };
        
        //this.init = initUI;
        //this.localiseDbStores = localiseDbStores;
    }
    
    this.loader = appLoader;
    this.credentials = new Credentials();
    this.alerts = new Alerts();
    this.messages = new Messages()
    this.localiseDbStores = localiseDbStores;
    
    this.initMain = MainGUI();
    //return [appLoader, new Credentials(), new MainGUI(), new Alerts(), new Messages()]; 
}

    // --------------------------supportDonate---------------------------------------
/*     const supportDonate = (_ => {
        
        function closeDonate(){
            donateWrp.ridKids().hide();
        }
        
        function showDonateList(){
            const donateWith = {
                currency: {
                    "paypal":{
                        "barcode": "paypal_barcode=01019122892",
                        "walletAddress": "paypal_address=q397937512935729"
                    },
                    "revolut":{
                        "barcode": "revolut_barcode=01019122892",
                        "walletAddress": "revolut_address=q397937512935729"
                    }
                },
                crypto: {
                    "lunc": {
                        "barcode": "lunc_barcode=01019122892",
                        "walletAddress": "lunc_address=q397937512935729"
                    },
                    "rose": {
                        "barcode": "barcode_barcode=01019122892",
                        "walletAddress": "oasis1 qrl7 c4hh jzfj kwqa l5e5 r0u7 jd6x y2xk y5g4 waqg"
                    },
                    "btt": {
                        "barcode": "btt_barcode=01019122892",
                        "walletAddress": "btt_address=q397937512935729"
                    },
                    "doge": {
                        "barcode": "doge_barcode=01019122892",
                        "walletAddress": "doge_address=q397937512935729"
                    },
                    "shibainu": {
                        "barcode": "shibainu_barcode=01019122892",
                        "walletAddress": "shibainu_address=q397937512935729"
                    }
                }
            };
            
            function payMethodDetails(payType, payMethod){
                const frgmPayDetail = new DocumentFragment();
                frgmPayDetail.append(
                    dom.add("div").cssName("barcode barcode_" + payMethod)
                );
                frgmPayDetail.append(
                    dom.add("div").cssName("walletAddress walletAddress_" + payMethod).on("click", async _ => {
                        navigator.clipboard.writeText(donateWith[payType][payMethod].walletAddress).then(app.message.logCopied);
                        //alert(donateWith[payType][payMethod].walletAddress);
                        const shareData = {
                          title: 'LPM - Donate ' + payMethod,
                          text: donateWith[payType][payMethod].walletAddress,
                        }
                          try {
                            await navigator.share(shareData);
                            console.log('MDN shared successfully');
                          } catch(err) {
                            resultPara.textContent = 'Error: ' + err
                          }
                        
                        
                    }).html(donateWith[payType][payMethod].walletAddress)
                )
                return frgmPayDetail;
            }

            function payMethodList(payType){
                const frgmPayMethod = new DocumentFragment();
                frgmPayMethod.append(...Object.keys(donateWith[payType])
                    .map(payMethod => dom.add("div")
                        .cssName("donateUse donateUse_" + payMethod)
                        .setAttr("title", payMethod)
                        .on("click", _ => {
                            showScreen(payMethodDetails(payType, payMethod));
                        })
                    )
                );
                return frgmPayMethod;
            }
            
            function payTypeList(){
                const frgmPayType = new DocumentFragment();
                frgmPayType.append(...Object.keys(donateWith)
                    .map(payType => dom.add("div")
                        .cssName("donateWith donateWith_" + payType)
                        .setAttr("title", payType)
                        .on("click", _ => {
                            showScreen(payMethodList(payType));
                        })
                    )
                );
                return frgmPayType;
            }
            
            function showScreen(docFragment){
                donateWrp.ridKids().attach(
                    dom.add("div").cssName('donateList').attach(
                        dom.add("div").cssName('svgIcon closeDonate').on("click", closeDonate)
                    ).attach(
                        docFragment
                    )
                ).show();
            }

            showScreen(payTypeList())
            
        }

        return{
            open:showDonateList,
            close: closeDonate,
        };
    })(); */
    