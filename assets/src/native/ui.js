/* 'frequent_0.034_GitHub' */

function Interface(thisApp){
    let tempVer = "frequent_0.034_GitHub";
    "use strict";
    if(developerMode) console.log("initiate Interface");
    
    // Initiate DOM
    const dom = Dom(document);
    
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
    //if(developerMode) console.log(dom.getHandles());
    
    //  --------------------------------------------------------------- submodules  / HELPERS --------------------------------------------------------------- */scrollWrpOverflow
    // -------------- Helper to get from the TextBank ----------------------------------//
    const getTxtBankParsedTxt = txtBankPropTopDir => (txtBankPropJoinString, templateObj) => txtBankPropJoinString ? thisApp.txtBank.getParsedText(`${txtBankPropTopDir}.${txtBankPropJoinString}`, templateObj) : "";
    const getTxtBankHtmlTxt = getTxtBankParsedTxt("app.htmls");
    const getTxtBankMsgTxt = getTxtBankParsedTxt("message");
    const getTxtBankTitleTxt = getTxtBankParsedTxt("app.titles");
    const getTxtBankAlertTxt = getTxtBankParsedTxt("alert");
    
    // -------------- Helper to get app HTML elements ----------------------------------//
    const getFieldsetEl = (fieldsetCss, legendHtml, beforeIcon) => dom.addFieldset(fieldsetCss).attach(dom.addLegend(beforeIcon || "", legendHtml)).on("pointerdown", function(e){
        
        if(e.target !== this && e.target !== this.firstChild && !e.target.hasClass("credInpWrp") ) return;
        const isPinFieldset = this.hasClass("pinFieldset");
        this.killClass("pinFieldset");
        e.preventDefault();
        //e.stopPropagation();
            let firstEmptyInpEl = null;
            const inpEls = this.kidsByClass("inpEl");
            inpEls.forEach(el => {
                if(firstEmptyInpEl) return;
                if(!el.value || el.type === "range") firstEmptyInpEl = el;// || el.type === "range"
            });
            const focusInpEl = firstEmptyInpEl || inpEls[0];

            if(!focusInpEl.disabled) {
                focusInpEl.focus();
                window.requestAnimationFrame(_ => focusInpEl.focus()); // let the focus scroll to the element, then refocus after scroll will blur the input
            }

            if(isPinFieldset) this.addClass("pinFieldset");
        }, {capture: true});
    const getInpEl = inpObj => {
        const inpEl = dom.addInput("inpEl");
        inpObj._cssAry?.forEach(css => inpEl.addClass(css));
        inpObj._onInput && inpEl.on("input", inpObj._onInput);
        inpObj._onKeydown && inpEl.on("keydown", inpObj._onKeydown);
        Object.entries(inpObj).forEach(([attr, value]) => !attr.includes("_") && value && (inpEl[attr] = value));
        return inpEl;
    };
    const getSvgIcon = (cssString = "", title, onClick = null) => dom.addSpan("svgIcon " + (onClick ? "active " : "") + cssString).setAttr("title", getTxtBankTitleTxt(title === true ? cssString : title)).onClick(onClick);
    const getClearInputIcon = clearFunction => getSvgIcon("deleteLeft", true, clearFunction);
    const getPassEyeIcon = (passInpEl, toggleType) => {
        const passInpEls = passInpEl.type ? [passInpEl] : passInpEl.kids();
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
    const getScrollWrpClass = pastRevision => `scrollWrp${pastRevision ? "PastRevision" : thisApp.consent ? "" : 'Private'}`;
    const toggleScrollWrpOverflow = wrap => !TOUCH_DEVICE && wrap[(wrap.scrollHeight > wrap.clientHeight ? "add" : "kill") + "Class"]("scrollWrpOverflow");
    const toggleScrollBar = e => !TOUCH_DEVICE &&
        e.target === e.currentTarget && 
        e.currentTarget.hasClass("scrollWrpOverflow") && 
        Math.abs(e.offsetX - e.target.clientWidth) < 10 && 
        document.body.toggleClass("scrollBarVisible");

    //  --------------------------------------------------------------- END submodules  / HELPERS --------------------------------------------------------------- */
    
    //add history.state when modal section or mudule is open
    const addModalToHistory = forceAdd => { //forceAdd: boolean - if true adds another modalOpen state to history
        if(!forceAdd && window.history.state.modalOpen) console.log("window.history.state.modalOpen already there => will not add!!!");
        if(forceAdd || !window.history.state.modalOpen){
            window.history.pushState({modalOpen: true}, "", "");
        }
    };
    
    // Add Icons to thisApp.dbStore. Returnable (Part of this (Interface))
    const localiseDbStores = _ =>{
        thisApp.dbStore.getAllObjects().forEach(storeObject => {
            storeObject.syncIcon = getSvgIcon(storeObject.key + "Icon", storeObject.key + "Sync", storeObject.syncToggle).addClass(storeObject.handle ? "" : "elDimmed");
            storeObject.credIcon = getSvgIcon("credIcon " + storeObject.key + "Icon", storeObject.key + "Cred");
            storeObject.name = getTxtBankTitleTxt(storeObject.key);
        });
    };

    // create User Interface Sections
    const modalSection = dom.addDiv("modalSection appSection zIndex0"); // Shared appSection: Loader, Credentials and Alarms sections
    const msgModule = dom.addDiv("msgModule");
    const appSectionForm = dom.addDiv("appSection appForm").slideOut();
    const appSectionList = dom.addDiv("appSection appList");//.hide();
    const dbModifiedBar = dom.addDiv("dbModifiedBar").hide(); // DB Modified bar
    const spinner = (_ => {// create spinner Section
        const spinnerSection = dom.addDiv("spinnerSection show").attach(dom.addDiv("spinnerWrp"));// make it visible at the start of app
        spinnerSection.on("transitionend", _ => spinnerSection.cssName("spinnerSection"));
        spinnerSection.start = where => {
            //if(developerMode) console.log("spinner.start: ", where);
            spinnerSection.addClass("show"); 
        };
        spinnerSection.stop = where => {
            //if(developerMode) console.log("spinner.stop: ", where);
            spinnerSection.hasClass("show") && requestAnimationFrame(_ => requestAnimationFrame(_ => spinnerSection.addClass("fade")));
        };
        return spinnerSection;
    })();
    const uiBlur = dom.addDiv("uiBlur").hide().on("pointerdown", e => e.target.hide());

    // Add modalSection Promise handler and Show
    const modalSectionPromise = ((resolve, choice, promise) => ({ //returns modalSectionPromise object
            ///isPending: _ => promise, // remove if not alert happens
            make: async modalSectionBody => {
                if(promise){
                    modalSectionPromise.fulfill(null); // cancel previout promise
                    await promise;
                }
                addModalToHistory();
                modalSection.attach(modalSectionBody).addClass("zIndex2").slideIn();
                spinner.stop("in modalSectionPromise.make");
                return promise = new Promise(res => resolve = res);
            },
            fulfill: async e => { //e=true, value, function, false, null, popstate
                if(!promise) return;

                if(e?.type === "popstate"){
                    modalSection.ridKids().killClass("zIndex2").slideOut();
                    await new Promise(res => setTimeout(res, 100));
                    resolve(choice);
                    resolve = choice = promise = null;
                }else{
                    choice = e;
                    window.history.back();
                }
            },
            clear: _ => {
                modalSection.ridKids().killClass("zIndex2").slideOut();
                promise = resolve = choice = null;
            }
        })
    )(null, null,null);

    // --------------------------changeLanguage - langModule ---------------------------------------
    const langModule = (thisApp, callback) => {
        const getLangIcon = (lang, onClickFn) => getSvgIcon("lang" + lang, lang, onClickFn);
        const changeLang = lang => _ => lang !== thisApp.lang && thisApp.changeLangTo(lang).then(callback).finally(_ => thisApp.message.langChanged());
        const langSelectWrp = dom.addDiv("langSelectWrp").attachAry( thisApp.languages.map(lang => getLangIcon(lang, changeLang(lang))) );
        const showLangSelectWrp = _ => {
            appLangIcon.replaceWith(langSelectWrp);
            requestAnimationFrame(_ => document.body.onClick(_ => langSelectWrp.replaceWith(appLangIcon), {once: true}));
        };
        const appLangIcon = getLangIcon(thisApp.lang, showLangSelectWrp);
        return dom.addSpan("langWrp").attach(appLangIcon);
    }
    
    // -------------- App Loader ----------------------------------//
    const appLoader = _ => {
        const getStoreLoadIcon = thisStore => getSvgIcon("loadIcon " + thisStore.key + "Icon", thisStore.key + "Load", _ => {
            spinner.start("in appLoader - LOAD: " + thisStore.key); 
            modalSectionPromise.fulfill(_ => thisStore.load().catch(err => thisStore.catchLoad(err))); // Catch catchLoad is OK!!!!!!!!! catchLoad CAN THROW but will be caught by the try - catch in thisApp.start
        });
        const paintLoader = result => {
            if(result.isPrivate) thisApp.consent = null;
            if(result.error) console.error(result.error); // Not sure of what to do really...
            const consentHtml = getTxtBankHtmlTxt("withConsent") + getTxtBankHtmlTxt(thisApp.idxDb ? "removeConsent": "withConsentNoIdxdb");
            const consentDiv = {
                true: dom.addDiv("consent", consentHtml).onClick(_ => modalSectionPromise.fulfill(thisApp.makePrivate)),
                false: dom.addDiv("noConsent", getTxtBankHtmlTxt("noConsent")).onClick(_ => modalSectionPromise.fulfill(thisApp.setConsent)),
                null: dom.addDiv("noConsent", getTxtBankHtmlTxt("browserIsPrivate")),
            }[thisApp.consent];
            const titleSpanArray = _ => thisApp.longName.split("").map((ch, idx) => dom.addSpan((idx > 4 && idx < 8) || idx > 11 ? "appTitleFadeOut" : "", ch));
            const loaderBody = dom.addDiv(getScrollWrpClass()).attachAry([
                    langModule(thisApp, _ =>  modalSectionPromise.fulfill(thisApp.start)),
                    dom.addDiv("appTitle").attachAry([
                        getSvgIcon("secreSyncIcon", "secreSync"),
                        dom.addDiv("appTitleLongWrp").attachAry(titleSpanArray()),
                        dom.addDiv("appTitleShortWrp").attachAry(titleSpanArray())
                    ]),
                    dom.addDiv("loadIconWrp").attachAry([
                        getStoreLoadIcon(thisApp.dbStore.dbxFile),//loadDbxFile, dbxFileIcon, dbxFileLoad
                        getStoreLoadIcon(thisApp.dbStore.oneDriveFile),//loadOneDriveFile, oneDriveFileIcon, oneDriveFileLoad
                        getStoreLoadIcon(thisApp.dbStore.localFile),//loadLocalFile
                        getSvgIcon("loadIcon newDbIcon", "newDbLoad", _ => modalSectionPromise.fulfill(thisApp.createNewDb))//createNewDb
                    ]),
                    consentDiv
                ])
            return modalSectionPromise.make(loaderBody);
        };
        return detectIncognito().then(paintLoader).catch(error => paintLoader({error: error}));
    }

    function Credentials(){
        function InputObject(isPin, msgObj){
            this._isPin = isPin,
            this._value = "";
            this._cssAry = isPin ? ["pinInput"] : ["passInput"];
            this._fieldsetCss = "padded" + (isPin ? " pinFieldset" : "");
            this._legendHtml = isPin ? msgObj.pinInputLabel : msgObj.passInputLabel;
            this._inputsCount = isPin ? 4 : 1;
            this._inputsMaxCount = isPin ? 32 : 1;
            this._hint = isPin ? msgObj.pinHint : msgObj.passHint;
            this.type = "password";
            this.minLength = isPin ? 1 : 10;
            this.maxLength = isPin ? 1 : 32;
        }
        
        const getHintAry = hint => {
            const credHintWrp = dom.addDiv("credHintWrp").attach(dom.addSpan("credHintSpan", hint)).hide();
            const credHintIcon = getSvgIcon("credHintIcon", "",e => {
                credHintWrp.toggleDisplay();
                e.target.toggleClass("credHintHideIcon");
            });
            return hint ? [credHintIcon, credHintWrp] : []
        };

        const getInputFieldset = inputObject => {
            const pinWrp = inputObject => {
                const processPastePin = (pinString, pinInputEl, idx = 0) => {
                    if(idx >= inputObject._inputsMaxCount) return thisApp.message.credFormPinTooLong();
                    const thisPinInpEl = pinInputEl.siblings()[idx];
                    thisPinInpEl.value = pinString[idx];
                    thisPinInpEl.dispatchEvent(new Event('input'));
                    if(pinString[++idx]) processPastePin(pinString, pinInputEl, idx);
                };
                
                const inputPin = e => {
                    let pinInputEl = e.target;
                    if(pinInputEl.value.length > 1) return processPastePin(pinInputEl.value, pinInputEl);
                    
                    const updatePin = _ => {
                        pinInputEl[pinInputEl.value ? "addClass" : "killClass"]("pinCharValue");
                        inputObject._value = pinInputEl.siblings().map(pinInpEl => pinInpEl.value).join("");
                        !pinInputEl.value && 
                        pinInputEl.siblings().length > inputObject._inputsCount 
                        && pinInputEl.siblings().forEach(kid => !kid.value && kid !== pinInputEl && kid.kill());
                    };

                    if(!pinInputEl.value && e.type === "keydown" && e.key === 'Backspace'){
                        pinInputEl = pinInputEl.sibling(-1);
                        if(!pinInputEl) return;
                        pinInputEl.value = "";
                        pinInputEl.focus();

                        updatePin();

                    }else if(e.type === "input"){
                        
                        updatePin();

                        if(inputObject._value.length === inputObject._inputsMaxCount) return;
                        
                        inputObject.type = pinInputEl.forebear(1).sibling(-1).hasClass("passEyeHide") ?  "text" : "password";

                        (pinInputEl.siblings().find(pinInpEl => !pinInpEl.value) || getPinInputEl(false, inputObject._value.length).attachTo(pinInputEl.parentElement)).focus();
                    }
                };
                
                const getPinInputEl = (required, idx) => getInpEl({...inputObject, ...{required: required, _onInput: inputPin, _onKeydown: inputPin, id: "pinChar_" + idx, placeholder: "X"}}); // !!!!!!!!!!!!!!!!!!!!!!!!!!!! add Label maybe? !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                const basePinInputElAry = new Array(inputObject._inputsCount).fill(0).map((el, idx) => getPinInputEl(true, idx));
                const pastePin = (e) => {
                    e.preventDefault(); // Prevent input triggered on the last element
                    const pastePinString = (e.clipboardData || window.clipboardData).getData("text");
                    processPastePin(pastePinString, e.target);
                };
                return dom.addDiv("credInpWrp pinWrp").attachAry(basePinInputElAry).on("paste", pastePin);
            };
            const passWrp = inputObject => dom.addDiv("credInpWrp passWrp").attach(getInpEl({...inputObject, ...{required: true, _onInput: e => inputObject._value = e.target.value, placeholder: "* * * * * * * * * * * * * * * * * * * *"}})).on("paste", e => {
                if((e.clipboardData || window.clipboardData).getData("text").length > inputObject.maxLength) thisApp.message.credFormPassTooLong();
            });
            const inpWrp = inputObject._isPin ? pinWrp(inputObject) : passWrp(inputObject);
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

            return getFieldsetEl(inputObject._fieldsetCss, inputObject._legendHtml).attachAry([ //, inputObject._isPin ? "pinInp" : ""
                ...getHintAry(inputObject._hint),
                getPassEyeIcon(inpWrp),
                inpWrp,
                getClearInputIcon(clearInput)
            ]).addClass(inputObject._hint ? "withHint" : "");
        };
        
        const getCredentialsBody = (canDelete, canPersist, isPersisted, isPinOnly, isUnlock, msgObj, passInputObj, pinInputObj) => {
            const getPersistCheckboxLabel = checked => 
                dom.add("label").setAttr("for", "persistCheckbox").addClass("credInpWrp")
                .attach(getSvgIcon(checked ? "checkedIcon" : "uncheckedIcon", checked ? "credChecked" : "credUnchecked", _=> null)) //checked
                .attach(dom.addSpan("checkboxLabelSpan", getTxtBankHtmlTxt(
                    checked
                        ? isPersisted 
                            ? "credCheckedPersisted" 
                            : "credChecked"
                            
                        : isPersisted
                            ? "credUncheckedPersisted" 
                            : "credUnchecked"
                )))
                .attach(getSvgIcon());
            let persistCheckboxLabel = getPersistCheckboxLabel(isPersisted);
            const repaintPersistLabel = e => {
                const tempPersistLabel = getPersistCheckboxLabel(e.target.checked);
                persistCheckboxLabel.replaceWith(tempPersistLabel);
                persistCheckboxLabel = tempPersistLabel;
            };
            const persistCheckboxInputEl = getInpEl({
                type: "checkbox",
                id: "persistCheckbox",
                checked: isPersisted, // if not passInputLabel it means that it's only pin - so the key was persisted already, therefore select as default
                _onInput: repaintPersistLabel 
            }).hide();
            const presistFieldset = canPersist ? getFieldsetEl("padded", msgObj.persistLabel).attachAry([
                ...getHintAry(getTxtBankHtmlTxt(isPersisted ? "credFormPersistRemoveHint" : "credFormPersistHint")),
                persistCheckboxLabel,
                persistCheckboxInputEl,
                
            ]) : "";
            const sumbitInpEl = getInpEl({
                id: "submitCredentials",
                type: "submit"
            }).hide();
            const inputAry = isPinOnly ? [getInputFieldset(pinInputObj)] : [getInputFieldset(passInputObj), getInputFieldset(pinInputObj)];
            const unlinkDbIcon = getSvgIcon(canDelete ? "trashBin" : "crosx", canDelete ? "unlinkDb" : "btnCloseForm", _ => modalSectionPromise.fulfill([]));
            const unlockDbAry = [dom.addSpan("", getTxtBankHtmlTxt("unlockDb")),  getSvgIcon("unlockDbIcon active", "unlockDb")];
            const protectDbAry = [dom.addSpan("", getTxtBankHtmlTxt("protectDb")), getSvgIcon("protectDb active", "protectDb")];
            const submitCredentialsLabel =  dom.add("label").setAttr("for", "submitCredentials").cssName("credInpWrp submitCredentialsLabel").attachAry(isUnlock ? unlockDbAry : protectDbAry);
            const submitCredentials = e =>{
                e.preventDefault(); 
                modalSectionPromise.fulfill([passInputObj._value, pinInputObj._value, persistCheckboxInputEl.checked]); // instead of passing the persistCheckboxInputEl.checked - return persistType // TO DO!!!!!!!!!!!!!!!
                spinner.start("in submitCredentials");
            };

            return dom.addDiv("credFormWrp").attach(
                dom.addForm("credForm")
                    .attach(dom.addDiv("credTaskbar").attach(unlinkDbIcon))
                    .attach(dom.addDiv("credFormTitle", msgObj.title))
                    .attach(
                        dom.addDiv("credIconWrp").attachAry(
                            thisApp.dbStore.objectsExist(true) ? thisApp.dbStore.getAllObjects().map(storeObj => storeObj.credIcon) : [getSvgIcon("credIcon newDbIcon", "newDb")] //newDbIcon
                        )
                    )
                    .attachAry(inputAry)
                    .attach(presistFieldset)
                    .attach(submitCredentialsLabel)
                    .attach(sumbitInpEl)
                    .on("submit", submitCredentials)
            );
        };

        const showCredentials = (canDelete, canPersist, isPersisted, isPinOnly, isUnlock, msgObj) => {
            const credentialsBody = getCredentialsBody(canDelete, canPersist, isPersisted, isPinOnly, isUnlock, msgObj, new InputObject(false, msgObj), new InputObject(true, msgObj)); // getPass, getPin
            return modalSectionPromise.make(credentialsBody);
        }
        

/* title = credFormTitleNew || credFormTitle || credFormTitleImport //all _new || _pi
passInputLabel = credFormPass || credFormImpPass // not in PIN
pinInputLabel = credFormPin // ALL
persistLabel = credFormPersist || credFormPersistRemove // not in inpott
pinHint = credFormPinHint // only new
passHint = credFormPassHint // only new
 */

        this.pinPassNewChange = (canDelete, canPersist) => showCredentials(canDelete, canPersist, false, false, false,{ //canDelete, canPersist, isPersisted, isPinOnly, isUnlock
            title: getTxtBankHtmlTxt("credFormTitleNew"), //"Create New Database",
            passInputLabel: getTxtBankHtmlTxt("credFormPass"), 
            pinInputLabel: getTxtBankHtmlTxt("credFormPin"), 
            persistLabel: getTxtBankHtmlTxt("credFormPersist"), //"Save the password in the database and enable unlocking the database using the pin only?"
            pinHint: getTxtBankHtmlTxt("credFormPinHint"),//"Please provide a new PIN. It can be between 4 and 32 characters long and contain any type of characters.",
            passHint: getTxtBankHtmlTxt("credFormPassHint"),//"Please enter a new Password. It can be between 10 and 32 characters long and contain any type of characters.",
        });
        this.pin = (canDelete, canPersist)  => showCredentials(canDelete, canPersist, true, true, true,{ //canDelete, canPersist, isPersisted, isPinOnly, isUnlock
            title: getTxtBankHtmlTxt("credFormTitle"), 
            pinInputLabel: getTxtBankHtmlTxt("credFormPin"), //"Enter PIN:"
            persistLabel: getTxtBankHtmlTxt("credFormPersistRemove"), //"Save the password in the database and enable unlocking the database using the pin only?"
        });
        this.pinPass = (canDelete, canPersist, isPersisted)  => showCredentials(canDelete, canPersist, isPersisted, false, true, { //canDelete, canPersist, isPersisted, isPinOnly, isUnlock
            title: getTxtBankHtmlTxt("credFormTitle"), //"Unlock Existing Database"
            passInputLabel: getTxtBankHtmlTxt("credFormPass"), //"Enter Password:",
            pinInputLabel: getTxtBankHtmlTxt("credFormPin"), //"Enter PIN:",
            persistLabel: getTxtBankHtmlTxt("credFormPersist") //"Save the password in the database and enable unlocking the database using the pin only?"
        });
        this.importDb = _  => showCredentials(false, false, false, false, true, { //canDelete, canPersist, isPersisted, isPinOnly, isUnlock
            title: getTxtBankHtmlTxt("credFormTitleImport"), //""Unlock Database for Import"
            passInputLabel: getTxtBankHtmlTxt("credFormImpPass"), //"Enter Password:", TODO!!!!!!!!!!!!!!!!!!!!!
            pinInputLabel: getTxtBankHtmlTxt("credFormImportPin"), //"Enter PIN:",  TODO!!!!!!!!!!!!!!!!!!!!!
        });
    }

    function Alerts(){
        const appAlert = (alertObjName, templateObj) => {
            const alertObj = ['q', 'y', 'n', 'i'].reduce((obj, prop) => ({...obj, [prop]: getTxtBankAlertTxt(`${alertObjName}.${prop}`, templateObj)}), {});
            const alertWrpAry = [
              getSvgIcon("loadIcon " + alertObj.i + "Icon", alertObj.i),
              dom.addDiv("alertGeneraltMsg", alertObj.q),
              getSvgIcon("crosx", "btnCloseForm", _ => modalSectionPromise.fulfill(null))
            ];
            const alertChoiceAry = ['y', 'n'].reduce((ary, prop) => alertObj[prop] ? [...ary, dom.addDiv("alertChoice", alertObj[prop]).onClick(_ => modalSectionPromise.fulfill(prop === 'y'))] : ary, []);
            alertChoiceAry.length && alertWrpAry.push(dom.addDiv("alertChoiceWrp").attachAry(alertChoiceAry));
            const alertBody = dom.addDiv("alertWrp").attachAry(alertWrpAry);
            return modalSectionPromise.make(alertBody);
        };
        
        this.offline = storeKey => appAlert("offline", {sKey: storeKey});
        //this.offlineCredNoVerify = _ => appAlert("fromMessage", {sMsg: getTxtBankMsgTxt("offlineCredNoVerify"), sKey: "secreSync"});
        //this.offlineCredNoSave = _ => appAlert("fromMessage", {sMsg: getTxtBankMsgTxt("offlineCredNoSave"), sKey: "secreSync"});
        this.IdxDbError = _ => appAlert("fromMessage", {sMsg: getTxtBankMsgTxt("IdxDbError"), sKey: "secreSync"});
        this.appFailed = _ => appAlert("fromMessage", {sMsg: getTxtBankMsgTxt("appFailed"), sKey: "secreSync"});
        
        this.remoteFileMissing = storeKey => appAlert("fromMessage", {sMsg: getTxtBankMsgTxt("remoteFileMissing", {sName: getTxtBankTitleTxt(storeKey)}), sKey: storeKey});
        
        this.noSessionStorage = _ => appAlert("fromMessage", {sMsg: getTxtBankMsgTxt("noSessionStorage"), sKey: "secreSync"});
        this.remoteRedirectError = sKey => appAlert("fromMessage", {sMsg: getTxtBankMsgTxt("remoteRedirectError"), sKey});
        
        this.noDbObjError = _ => appAlert("noDbObjError");
        this.deleteVendor = vendName => appAlert("deleteVendor", {vName: vendName});
        this.deleteVendorPermanent = vendName => appAlert("deleteVendorPermanent", {vName: vendName});
        this.newVersion = _ => appAlert("newVersion");
        this.syncDbWith = storeKey => appAlert(`syncDbWith.${storeKey}`);
        this.disconnectDbFrom = storeKey => appAlert(`disconnectDbFrom.${storeKey}`);
        this.deleteExistingStore = storeKey => appAlert(`deleteExistingStore.${storeKey}`);
        this.localFileLoadOrCreate = _ => appAlert("localFileLoadOrCreate");
        this.localFileDownload = _ => appAlert("localFileDownload");
        this.downloadDbCopy = _ => appAlert("downloadDbCopy", {localFileName: getTxtBankTitleTxt("localFile")});
        this.importDb = _ => appAlert("importDb");
        this.importDbPickFile = _ => appAlert("importDbPickFile");
        this.emergDbDownload = _ => appAlert("emergDbDownload");
        this.changePassword = _ => appAlert("changePassword");

        const catchObj = (storeKey, err) => ({sName: getTxtBankTitleTxt(storeKey), sKey: storeKey, cErr: err});
        this.catchLoad = storeKey => appAlert("catchLoad", catchObj(storeKey)); // no err for load
        this.catchSync = (storeKey, err) => appAlert("catchSync", catchObj(storeKey, err));
        this.catchUpdate = (storeKey, err) => appAlert("catchUpdate", catchObj(storeKey, err));

        this.remoteRedirect = storeKey => appAlert("remoteRedirect", {sKey: storeKey});
        this.remoteRedirectPrivateMode = storeKey => appAlert("remoteRedirectPrivateMode", {sKey: storeKey});
        this.removePersisted = _ => appAlert("removePersisted");
        this.removePersistedLastStoreDisconnect = _ => appAlert("removePersistedLastStoreDisconnect");
        this.privateModeUnablePreserveLocalFile = (sLocalKey, sLocalName, sCloudName) => appAlert("privateModeUnablePreserveLocalFile", {sLocalKey, sLocalName, sCloudName});
        
        this.privateModeOneCloudConnectionAllowed = (sKeyCurrent, sCloudNameCurrent, sCloudNameNew) => appAlert("privateModeOneCloudConnectionAllowed", {sKeyCurrent, sCloudNameCurrent, sCloudNameNew});
        this.privateModeUnableSyncLocal = _ => appAlert("privateModeUnableSyncLocal");
        
        this.setOlderStore = storeKey => appAlert("setOlderStore", {sName: getTxtBankTitleTxt(storeKey), sKey: storeKey});
        
        this.remoteSyncOrOverwrite = storeKey => appAlert("remoteSyncOrOverwrite", {sName: getTxtBankTitleTxt(storeKey), sKey: storeKey});
        this.remoteLoadOrNew = storeKey => appAlert("remoteLoadOrNew", {sName: getTxtBankTitleTxt(storeKey), sKey: storeKey});
        this.remoteFileRestore = storeKey => appAlert("remoteFileRestore", {sName: getTxtBankTitleTxt(storeKey), sKey: storeKey});
        this.remoteFileDelete = sKey => appAlert("remoteFileDelete", {sKey});
        
        
        this.registerAuth = _ => appAlert("registerAuth");
        this.persistOnline = _ => appAlert("persistOnline");
        this.oneDriveRefreshAccess = _ => appAlert("oneDriveRefreshAccess");
    }
 
     /* Messages -----------------------------------------------------------------------*/
    function  Messages() {
        const msgVisibleTime = 2000; //(2s)
        const msgTransitionTime = 300; //(300ms) // css 
        let timerHide = 0;
        let msgPromise = null;
        let msgHistory = {};
        let msgIsFullArchive = false;
        
        const msgTitleIcon = dom.addDiv("beforeMsgModule").setAttr("title", getTxtBankHtmlTxt("msgHistory")).onClick(_ => this.openFullArchive()).attachTo(msgModule);
        
        const msgModulePopUp = (css, txt) => msgModule.addClass("popUp").attach(dom.addDiv(`msgHistoryRow ${css}`, txt)); //popUp 
        const msgModuleSlideDown = _ => msgModule.addClass("slideDown");

        const msgClearPromise = _ => {
            clearTimeout(timerHide);
            msgPromise = null;
        };
        const msgMakePromise = (css, txt) => {
            msgModulePopUp(css, txt)
            msgPromise = new Promise(res => {
                timerHide = setTimeout(_=>{ 
                    msgModuleSlideDown();// start sliding down
                    timerHide = setTimeout(_ => res(msgClearPromise()), msgTransitionTime)// finish sliding down
                }, msgVisibleTime)
            }).then(_ => this.resetFullArchive());
        };
        
        this.resetFullArchive = _ => {
            msgIsFullArchive = false;
            return msgModule.cssName("msgModule").ridKids(1); //.killAttr("style")
        };
        
        this.fullArchiveHasClosed = _ => { //property of the Messages object, triggered on the global popstate event
            if(!msgIsFullArchive) return false;
            msgClearPromise();
            msgModuleSlideDown();
            setTimeout(_ => this.resetFullArchive(), msgTransitionTime);
            return true; //msg Full Archive has been cleared
        };
        
        this.paintFullArchive = _ => this.resetFullArchive()
            .attach(
                dom.addDiv("msgHistoryRow title", getTxtBankHtmlTxt("msgHistory") + ":")
                .attach(dom.addDiv("closeFullArchive").onClick(_ => window.history.back()))
            )
            .attach(
                dom.addDiv("msgHistoryContentWrp")
                .attachAry(Object.keys(msgHistory).map(timestamp => 
                    dom.addDiv(`msgHistoryRow ${msgHistory[timestamp].css}`)
                    .attach(
                        dom.addDiv("msgBody")
                        .attach(dom.addSpan("msgDate", new Date(parseInt(timestamp)).toUKstring()))
                        .attach(dom.addSpan("msgText", msgHistory[timestamp].txt))
                    )
                ))
                .attachAry(mobileDebugAry.map(msgAry => 
                    dom.addDiv("msgHistoryRow dev")
                    .attach(
                        dom.addDiv("msgBody")
                        .attach(dom.addSpan("msgDate", msgAry[0]))
                        .attach(dom.addSpan("msgText", msgAry[1]))
                    )
                ))
            );

        this.openFullArchive = _ => {
            msgClearPromise();
            addModalToHistory(true); //force adding to history
            this.paintFullArchive().addClass("fullArchive");
            msgIsFullArchive = true;
        };
        
        this.isFullArchive = _ => msgIsFullArchive;
        this.isHidden = _ => msgModule.className === "msgModule"

        const msgShow = (msgObj, logged) => {
            if(!logged){
                msgHistory[Date.now()] = msgObj;
                if(msgObj.cLog && developerMode) console.error(msgObj.cLog, msgObj.txt);
            }
            if(msgPromise) return msgPromise.then(_ => msgShow(msgObj, true));
            msgMakePromise(msgObj.css, msgObj.txt);
            return true;
        }
        
        function MsgObj(...valAry){
            [this.txt, this.css, this.cLog] = valAry;
        }
        
        const showInfo = txtMsg => msgShow(new MsgObj(txtMsg.cleanHtmlTags(), "info"));
        const showFlash = txtMsg => msgShow(new MsgObj(txtMsg.cleanHtmlTags(), "flash"));
        const showError = (txtMsg, err) => msgShow(new MsgObj(txtMsg.cleanHtmlTags(), "error", err));
        
        const msgTxt = (tbp, to) => showInfo(getTxtBankMsgTxt(tbp, to));
        const msgFlash = (tbp, to) => showFlash(getTxtBankMsgTxt(tbp, to));
        const msgErr = (tbp, to, err) => showError(getTxtBankMsgTxt(tbp, to), err);
        
        this.digest = showInfo;
        this.error = showError;
        this.existingDb = _ => getTxtBankMsgTxt("existingDb");
        this.loadDb = constent => getTxtBankMsgTxt(constent ? "loadDbStandard" : "loadDbPrivate");
        this.remoteAuthorised = _ => getTxtBankMsgTxt("remoteAuthorised");
        
        this.loggedOff = _ => {
            modalSectionPromise.fulfill(null);
            return getTxtBankMsgTxt("loggedOff");
        };
        this.pickFileFR = _ => msgTxt("pickFileFR");
        this.pickFile = _ => msgTxt("pickFile");
        this.pickImportFile = _ => msgTxt("pickImportFile");
        this.deleteVendorReject = vName => msgTxt("deleteVendorReject", {vName});
        this.vendorDeleted = vName => msgTxt("vendorDeleted", {vName});
        this.customPassCopied = _ => msgFlash("customPassCopied");
        this.passCopied = _ => msgFlash("passCopied");
        this.logCopied = _ => msgFlash("logCopied");
        this.exitAppConfirm = _ => msgFlash("exitAppConfirm");
        this.logShort = _ => msgErr("logShort");
        this.nameShort = _ => msgErr("nameShort");
        this.vendorExists = vName => msgErr("vendorExists", {vName});
        this.noFilePickedErr = _ => msgErr("noFilePickedErr");
        this.dbFailed = (count) => msgErr("dbFailed", {count:count});
        this.deleteVendorFailed = (vName, err) => msgErr("deleteVendorFailed", {vName}, err);
        this.submitFormFailed = (vName, err) => msgErr("submitFormFailed", {vName}, err);
        this.submitFormSucess = vName => msgFlash("submitFormSucess", {vName});
        this.submitFormSucessModerateFail = vName => msgErr("submitFormSucessModerateFail", {vName});
        this.submitPassFailed = (vName, err) => msgErr("submitPassFailed", {vName}, err);
        this.offline = _ => msgErr("offline");
        this.online = _ => msgFlash("online");
        this.credFormPinTooLong = _ => msgErr("credFormPinTooLong");
        this.credFormPassTooLong = _ => msgErr("credFormPassTooLong");
        this.persistedSucess = _ => msgFlash("persistedSucess");
        this.persistedFail = _ => msgErr("persistedFail");
        this.persistedDeleted = _ => msgErr("persistedDeleted");
        this.persistedBadPin = count => msgErr("persistedBadPin", {count});
        this.dbCredentialsChangeSucess = _ => msgFlash("dbCredentialsChangeSucess");
        this.dbCredentialsChangeFail = _ => msgErr("dbCredentialsChangeFail");
        this.dbCredentialsChangeModerateFail = _ => msgErr("dbCredentialsChangeModerateFail");
        this.dbCredentialsChangeCriticalFail = err => msgErr("dbCredentialsChangeCriticalFail", null, err);
        this.emergDbCreated = fName => msgFlash("emergDbCreated", {fName});
        this.importDbFail = _ => msgErr("importDbFail");
        this.importDbSuccess = _ => msgFlash("importDbSuccess");
        this.importDbCancel = _ => msgTxt("importDbCancel");
        this.langChanged = _ => msgFlash("langChanged");
        this.storeConnectionTrue = sName => msgTxt("storeConnectionTrue", {sName});
        this.storeConnectionFalse = sName => msgTxt("storeConnectionFalse", {sName});
        this.storeConnectFail = sName => msgErr("storeConnectFail", {sName});
        this.noWriteStores = err => msgErr("noWriteStores", null, err);
        this.dbFileDownloaded = fName => msgFlash("dbFileDownloaded", {fName});
        this.storeIsSyncing = sName => msgTxt("storeIsSyncing", {sName});
        this.remoteConnectFail = (sName, err) => msgErr("remoteConnectFail", {sName}, err);
        this.remoteConnectionCancelled = _ => msgErr("remoteConnectionCancelled");
        this.newPassGenerated = vName => msgFlash("newPassGenerated", {vName});
        
        this.noSessionStorage = _ => msgErr("noSessionStorage");//appAlert("fromMessage", {sMsg: getTxtBankMsgTxt("noSessionStorage"), sKey: "secreSync"});
        this.remoteRedirectError = err => msgErr("remoteRedirectError", null, err);//appAlert("fromMessage", {sMsg: getTxtBankMsgTxt("remoteRedirectError"), sKey});
        
        
        //temps
        this.tempAppInstalled = _ => msgShow(new MsgObj("_TEMP_ Application has already been installed on this device", "flash"));
        this.tempPleaseDoInstallApp = doInstal => msgShow(new MsgObj("_TEMP_ Application has not yet been installed on this device. Will the install prompt be displayed?: " + doInstal.toString(), "flash"));
        this.tempOnlineChangeWhileAppHidden = appOnline => msgShow(new MsgObj("_TEMP_ Application connectivity has changed while the app was hidden. Is the app online?: " + appOnline.toString(), "flash"));
        this.tempVisibilityChange = appHidden => msgShow(new MsgObj("_TEMP_ Application visibility has changed. Is the app hidden?: " + appHidden.toString(), "flash"));

    };

    /* MainGUI -------- MainGUI ---------- MainGUI -------- MainGUI ---------- MainGUI -------- MainGUI ---------- MainGUI -------- MainGUI ---------- MainGUI -------- MainGUI ----------*/
    const mainGui = (_ => {
        const ado = thisApp.displayOptions;
        const adoDetails = ado.details;
        const adoSorts = ado.sorts;

        let listScrollWrpPrevTopPosition = 0;
        


        /////////////////////////////////////////////////MAIN - FORM APP SECTION paintFormSection!!!!!!! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const paintFormSection = async (addHistory, vendObj, edit, submitForm, toggleForm, revAry = [], revisionIdx = 0) => { //paintFormSection(false, vendObj, false, false, false, revAry, revisionIdx)

            const nameLogMinLen = 3;
            const boxNoteElMaxLen = 10000;
            const maxRevisions = 10;// UserSettings?
            let vFormScrollTop = 0;
            const vForm = dom.addDiv(getScrollWrpClass(revisionIdx)).onClick(toggleScrollBar).on("scroll", e => {
               // console.log("vFormScrollTop", vFormScrollTop, "e.target.scrollTop", e.target.scrollTop);
                vFormScrollTop = e.target.scrollTop;
                
                if(!vFormScrollTop) document.activeElement.blur(); // lose focus on input or textarea input element (hide virtual keyboard)
            });
            if(addHistory) addModalToHistory();
            
            let isNew = !vendObj || vendObj.isNew || false;
            
            if(submitForm){
                if(!vendObj.name || vendObj.name.length < nameLogMinLen) return thisApp.message.nameShort();
                if(vendObj.log && vendObj.log.length < nameLogMinLen) return thisApp.message.logShort();
                
                const existingVendor = thisApp.dbObj.vendors.find(vObj => !vObj.isTrash && vObj.name.toLowerCase() === vendObj.name.toLowerCase());
                if(existingVendor && existingVendor.id !== vendObj.id) return thisApp.message.vendorExists(vendObj.name);
                
                const hasChanged = !vendObj.mod || isNew; // if mode is null then the stores need updating
                if(isNew) vendObj.mod = vendObj.cr8 = null;

                vendObj = new thisApp.crypto.Vendor(vendObj); // if vendObj was new is not new anymore
                if(hasChanged) {
                    if(isNew){
                        isNew = false;
                        thisApp.dbObj.vendors.push(vendObj);
                    }else{
                        thisApp.dbObj.vendors = thisApp.dbObj.vendors.map(vObj => vObj.id !== vendObj.id ? vObj : updateRevision(vObj));
                    }

                    updateStoresAfterChange(vendObj);
                    repaintUI(); // update Vendor List (paintList)
                }
            }
            
            const displayMode = !isNew && !edit;
            vendObj = new thisApp.crypto.Vendor(vendObj, thisApp.dbObj.vendors);
            if(isNew) vendObj.isNew = true;
            if(toggleForm) vendObj.mod = null;
            
            // populate Revisions Array if vendObj has revisions and Revisions Array has not already been populated
            if(displayMode && vendObj.rev && !revAry.length){
                revAry = vendObj.rev.map(revObj => new thisApp.crypto.Vendor(JSON.parse(revObj))).reverse();
                revAry.unshift(vendObj);
                revAry = revAry;
            }

            function updateStoresAfterChange(vendObj) {
                thisApp.dbStore.updateAll(thisApp).then(rejectedPromises => {
                    thisApp.message.submitFormSucess(vendObj.name);
                    if(rejectedPromises.length) thisApp.message.submitFormSucessModerateFail(vendObj.name);
                }).catch(err => thisApp.message.submitFormFailed(vendObj.name, err));
            };
            
            const updateStoresAfterRemoval = vendObj => {
                thisApp.dbStore.updateAll(thisApp).then(rejectedPromises => {
                    thisApp.message.vendorDeleted(vendObj.name);
                    if(developerMode) if(rejectedPromises.length) console.log("The following stores have not been updated", rejectedPromises); // TO DO
                }).catch(err => {
                    thisApp.message.deleteVendorFailed(vendObj.name, err);
                });
                
                repaintUI(); // update Vendor List (paintList)
            };
            
            function updateRevision (vendObjPrevious) {
                vendObj.rev = vendObj.rev || []; // create revisions array if doesnt't exist
                vendObj.rev.push(JSON.stringify(vendObjPrevious.prepareForSend(true)));
                if(vendObj.rev.length > maxRevisions) vendObj.rev.shift();
                return vendObj;
            };
            
            const restoreRevision = _ => {
                //vendObj is the past revision to be restored, revAry[0] was the most current vendObj to become a past revision
                vendObj.rev = revAry[0].rev; //assign revisions Array of the current vendObj to the past revision of the vendObj to be restored
                vendObj.mod = null;
                paintFormSection(false, vendObj, false, true); //save the changes
            };
            
            const deleteRevision = async _ => {
                //vendObj is the past revision to be deleted, revAry[0] is the most current vendObj to have the revision removed from .rev array
                vendObj = revAry[0]; // reassign the most current vendObj to the active vendObj for minification purpose
                const removeIndex = vendObj.rev.length - revisionIdx;
                vendObj.rev.splice(removeIndex, 1); // remove revision
                thisApp.dbObj.vendors = thisApp.dbObj.vendors.map(vObj => vObj.id !== vendObj.id ? vObj : vendObj);
                updateStoresAfterChange(vendObj);//save the changes without changing the mod and creating another revision
                paintFormSection(true, vendObj); // repaint form with the most current vendObj and add to history afret the alert
            };

            const restoreTrashed = _ => {
                const existingVendor = thisApp.dbObj.vendors.find(vObj => vObj.id === vendObj.id);
                existingVendor.name = existingVendor.name + "  _ x _  " + new Date(vendObj.isTrash).toUKstring();
                existingVendor.isTrash = null;// remove isTrash from the original array as to not saving the vObj.isTrash in the revisions array
                vendObj.name = vendObj.name + "  _ + _  " + new Date().toUKstring();
                vendObj.isTrash = null;
                vendObj.mod = null;
                paintFormSection(false, vendObj, false, true);
            };
            
            const deleteTrashed = async _ => {
                if(!await thisApp.alert.deleteVendorPermanent(vendObj.name)) return thisApp.message.deleteVendorReject(vendObj.name);
                thisApp.dbObj.vendors = thisApp.dbObj.vendors.filter(vObj => vObj.id !== vendObj.id);
                updateStoresAfterRemoval(vendObj);
            };
            
            const deleteVendor = async _ => {
                if(!await thisApp.alert.deleteVendor(vendObj.name)) return thisApp.message.deleteVendorReject(vendObj.name);
                vendObj.isTrash = Date.now();
                thisApp.dbObj.vendors = thisApp.dbObj.vendors.map(vObj => vObj.id === vendObj.id ? vendObj : vObj);
                updateStoresAfterRemoval(vendObj);
            };

            const toggleVendor = _ => {
                vendObj.isNote = !vendObj.isNote;
                vendObj.mod = null;
                paintFormSection(false, vendObj, true, false, true)
            };
            

            const closeForm = _ => {
                if(displayMode || isNew){
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
                e.target.value = e.target.value.replace(/"/g, "'"); // Replace double quotations as they mess up export to CVS
                vendObj[e.target.name] = e.target.value;
                vendObj.mod = null;
            };

            const clearFormInput = inpEl => {
                inpEl.value = ""; 
                inpEl.dispatchEvent(new Event('input')); 
                inpEl.focus();
            };

            const shareVendor = async _ => { //shareCredentials
                console.log("----------------SHARE MODULE-------------------TO DO-----------------------------SHARE MODULE-------------------TO DO-----------------------------");
                return alert("TO DO!");

                const plainPinString = prompt("PIN");
                const [persistIdHexString, trimmedB64cipher] = await vendObj.prepareForShare(plainPinString);

                        // Canvas
                const canvas = document.createElement('canvas');
                canvas.width = 500;
                canvas.height = 500;
                const ctx = canvas.getContext("2d");

                ctx.beginPath();
                ctx.rect(20, 40, 50, 50);
                ctx.fillStyle = "#FF0000";
                ctx.fill();
                ctx.closePath();

                const b = canvas.toBlob(async blob => {
                    console.log(blob);

                    const pinIndicator = plainPinString ? 1 : 0;
                    const tempLocalUrl = "file:///C:/Users/hs0606/Dropbox%20(Personal)/codes/Local%20Password%20Manager/SecreSync_AssetsWorking/_Share_Vendor/index.html";
                    const shareUrl = tempLocalUrl + "?i=" + persistIdHexString + pinIndicator + "&c=" + trimmedB64cipher; //encodeURIComponent(cipherB64;)
                    console.log(shareUrl.length);
                    console.log(shareUrl);
                    if(shareUrl.length > 2000) return alert("ShareString is TOO LONG!");
                    //return;
                    const shareData = {
                      title: "SecreSync",
                      //text: "Lets Share Secret",
                      //url: shareUrl,
                      //file:[new File([blob], "file.png", {type: blob.type})]
                    };
                    if (!navigator.canShare) {
                      console.log("navigator.canShare() not supported.");
                    } else if (navigator.canShare(shareData)) {
                      console.log("navigator.canShare() supported. We can use navigator.share() to send the data.",  navigator.canShare(shareData));
                      await navigator.share(shareData);
                    } else {
                      console.log("Specified data cannot be shared.");
                    }
                });
            };

            
            // Sections
            const passSection = async (labelHtml, inpType = "password") => {
                const vPass = await vendObj.getCurrentPassword();
                const passFieldset = getFieldsetEl("padded", labelHtml, "pass");
                const passInpEl = getInpEl({
                    type: inpType,
                    name: "vPass",
                    disabled: true,
                    value: vPass.plainString
                });

                const getNewPass = async _ => {
                    vendObj.base = null;
                    vendObj = new thisApp.crypto.Vendor(vendObj);
                    vendObj.mod = null;
                    //passFieldset.replaceWith(await passSection(labelHtml, passInpEl.type));
                    const newPassFieldset = await passSection(labelHtml, passInpEl.type);
                    passFieldset.replaceWith(newPassFieldset);
                    newPassFieldset.dispatchEvent(new Event('pointerdown')); // focus new fieldset
                    thisApp.message.newPassGenerated(vendObj.name);
                };

                const getRangeInpFieldset = (min, max, value, rangeNameId, rangeLabelHtml) => {
                    const changeRangeInput = async e => {
                        e.target.value = parseInt(e.target.value);
                        changeVprop(e);
                        const newPassFieldset = await passSection(labelHtml, passInpEl.type);
                        passFieldset.replaceWith(newPassFieldset);
                        //passFieldset.replaceWith(await passSection(labelHtml, passInpEl.type));
                        newPassFieldset.dispatchEvent(new Event('pointerdown')); // focus new fieldset
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
                    //return dom.addFieldset().attach(dom.addLegend("", rangeLabelHtml))
                    return getFieldsetEl("", rangeLabelHtml, false).attachAry([
                        getSvgIcon("decrease", true, _ => changeRangeInputValue(-1)),
                        rangeInputEl,
                        getSvgIcon("increase", true, _ => changeRangeInputValue(1))
                    ]);
                };

                const cplxInpFieldset = displayMode 
                    ? [] 
                    : getRangeInpFieldset(
                        vPass.minComplex,
                        vPass.maxComplex,
                        vendObj.cplx || vPass.dfltComplex,
                        "cplx", getTxtBankHtmlTxt("formLabelPassCplx") + " (" + (vendObj.cplx || vPass.dfltComplex) + ") "
                    );

                const lenInpFieldset =  displayMode 
                    ? [] 
                    : getRangeInpFieldset(
                        vPass.minLen,
                        vPass.maxLen,
                        vendObj.len || vPass.dfltLen,
                        "len",
                        getTxtBankHtmlTxt("formLabelPassLen") + " (" + (vendObj.len || vPass.dfltLen) + ") "
                    );

                const passGrade = displayMode 
                    ? [] 
                    : dom.addDiv("passGrade").attachAry([
                        dom.addDiv("passGradeRow passGradeLabelRow").attachAry([
                            dom.addDiv("", getTxtBankHtmlTxt("formLabelPassEntropy")), //+ ":"
                            dom.addDiv("", getTxtBankHtmlTxt("formLabelPassGrade")) // + ":"
                        ]),
                        dom.addDiv("passGradeRow").attachAry([
                            dom.addDiv("", vPass.entropy),
                            dom.addDiv("", getTxtBankHtmlTxt("vendorPassGradeVal." + vPass.grade))
                        ]),
                        dom.addDiv("passGradeBarWrp").attach(dom.addDiv().setAttr("style", "background:" + vPass.color + ";width:" + ((100 * vPass.entropy) / 256) + "%;"))
                    ]);

                return vendObj.cPass && displayMode 
                    ? [] 
                    : passFieldset.attachAry([
                        getPassEyeIcon(passInpEl),
                        passInpEl,
                        displayMode ? getCopyIcon(passInpEl, "copyPassBtn", "passCopied") : getSvgIcon("newPassBtn", true, getNewPass),
                        cplxInpFieldset,
                        lenInpFieldset,
                        passGrade
                    ]);
            };

            const logSection = labelHtml => {
                const logInpEl = getInpEl({
                    type: "text",
                    name: "log",
                    value: vendObj.log,
                    placeholder: labelHtml,
                    disabled: displayMode,
                    _onInput: changeVprop
                });

                return vendObj.log || !displayMode ? getFieldsetEl("padded", labelHtml, "log").attachAry([
                    getSvgIcon(),
                    logInpEl,
                    displayMode ? getCopyIcon(logInpEl, "copyLogBtn", "logCopied") : getClearInputIcon(_ => clearFormInput(logInpEl))
                ]) : [];
            };

            const customPassSection = labelHtml => {
                const passInpEl = getInpEl({
                    type: "password",
                    name: "cPass",
                    disabled: displayMode,
                    value: vendObj.cPass,
                    placeholder: labelHtml,
                    _onInput: changeVprop
                });

                return vendObj.cPass || !displayMode ? getFieldsetEl("padded", labelHtml, "pass").attachAry([
                    getPassEyeIcon(passInpEl),
                    passInpEl,
                    displayMode ? getCopyIcon(passInpEl, "copyPassBtn", "customPassCopied") : getClearInputIcon(_ => clearFormInput(passInpEl))
                 ]) : "";
            };
            
            const boxNoteFitContent = _ => {
                boxNoteEl.style.height = "auto"; // Resize boxNote textarea
                boxNoteEl.style.height = (boxNoteEl.scrollHeight + 5 ) + "px";
                vForm.scrollTop = vFormScrollTop;
            };
            const boxNoteEl = dom.addTextarea("inpEl boxNote")
                .setAttrs({
                    name: "note",
                    maxlength: boxNoteElMaxLen,
                    placeholder: getTxtBankHtmlTxt("formLabelNote")
                })
                .setAttr(displayMode ? "disabled" : "enabled", true)
                .on("input", e => {

                    boxNoteEl.style.height = "auto"; // Resize boxNote textarea
                    if(boxNoteEl.scrollHeight <= boxNoteEl.clientHeight){
                        boxNoteEl.killClass("max").rows = "2";
                    }else if(!boxNoteEl.hasClass("max")){
                        boxNoteEl.addClass("max").rows = "1";
                    }
                    
                    if(e.isTrusted){
                        changeVprop(e); // only user input and not the dispatched event
                        if(boxNoteEl.value.length > boxNoteElMaxLen - 1) alert("you reached the limit");
                        window.requestAnimationFrame(_ => boxNoteEl.focus()); // refocus if the input event will trigger the scroll event, which blurs the boxNoteEl
                    }
                    
                    boxNoteFitContent();
                })
                .on("transitionend", boxNoteFitContent); // fit after initioal paint of the box when triggered from dispatched Event when the max is being applied for 300ms //, {once: true}
            
            boxNoteEl.value = vendObj.note || "";

            const notesSection = labelHtml => displayMode && !vendObj.note ? [] : getFieldsetEl("padded", labelHtml, "note").attach(boxNoteEl);

            const urlSection = labelHtml => {
                const urlInpEl = getInpEl({
                    type: "text",
                    name: "url",
                    placeholder: "https://example.com/login",
                    value: vendObj.url,
                    disabled: displayMode,
                    //size: "30",
                    pattern: "https://.*",
                    _onInput: changeVprop
                });

                return  displayMode && !vendObj.url ? [] : getFieldsetEl("padded", labelHtml, "url").attachAry([
                    getSvgIcon(),
                    urlInpEl,
                    isURL(vendObj.url) && displayMode 
                        ? dom.add("a").setAttr("href", vendObj.url).setAttr("target", "_blank").setAttr("rel", "noreferrer").attach(getSvgIcon("openLinkBtn", true))
                        : displayMode 
                            ? getSvgIcon()
                            : getClearInputIcon(_ => clearFormInput(urlInpEl))
                ]);
            };

            const standardSection = (prop, labelHtml) => {
                const inpEl = getInpEl({
                    type: "text",
                    name: prop,
                    placeholder: labelHtml,
                    value: vendObj[prop],
                    disabled: displayMode,
                    _onInput: changeVprop
                });

                return displayMode && !vendObj[prop] ? [] :  getFieldsetEl("padded", labelHtml, prop).attachAry([
                    getSvgIcon(),
                    inpEl,
                    displayMode ? getSvgIcon() : getClearInputIcon(_ => clearFormInput(inpEl))
                ]);
            };

            const formHead = dom.addDiv("formHead").attachAry([
                revisionIdx || vendObj.isTrash
                    ? revisionIdx ? getSvgIcon("restoreRevisionBtn", true, restoreRevision) : getSvgIcon("restoreTrashedBtn", true, restoreTrashed)
                    : getSvgIcon(displayMode ? "editFormBtn" : "submitFormBtn", true, _ => paintFormSection(false, vendObj, displayMode, !displayMode)),
                displayMode
                    ? dom.addDiv("formTitle", vendObj.name || "")
                    : getSvgIcon(vendObj.isNew ? vendObj.isNote ? "formIconTypeNoteNew" : "formIconTypeLogNew" : vendObj.isNote ? "formIconTypeNote" : "formIconTypeLog", true),
                getSvgIcon("btnCloseForm", true, closeForm)
            ]);

            const recordModWrp = !displayMode // Show only if Display
                ? null
                : dom.addDiv("recordModWrp").attachAry([ 
                    dom.addDiv("recordDate").attachAry([
                        getSvgIcon("vCr8DateLabel", true),
                        dom.addSpan("vCr8Date", new Date(vendObj.cr8).toUKstring())
                    ]),
                    getSvgIcon(vendObj.isNote ? "formIconTypeNote" : "formIconTypeLog", true),
                    dom.addDiv("recordDate").attachAry([
                        dom.addSpan("vModDate", new Date(vendObj.mod).toUKstring()),
                        getSvgIcon("vModDateLabel", true)
                    ]),
                ]);

            const revisionWrp = !displayMode || !revAry.length || vendObj.isTrash// Show only if Display mode and Revisions Array is populated and vendObj is not in trash
                ? null
                : dom.addDiv("revisionWrp").attachAry([ 
                    //revisionIdx ? dom.addDiv("revisionCaption", getTxtBankHtmlTxt("revision", {revisionDate: new Date(vendObj.mod).toUKstring()})) : [],
                    revisionIdx ? dom.addDiv("revisionCaption", new Date(vendObj.mod).toUKstring()) : [],
                    dom.addDiv("revisionScroll").attachAry([
                        revisionIdx && revAry[revisionIdx + 1]
                            ? getSvgIcon("previousVersion", true, _ => paintFormSection(false, revAry[revisionIdx + 1], false, false, false, revAry, revisionIdx + 1)) 
                            : getSvgIcon(),
                        getSvgIcon("revisionHistory", true, revisionIdx 
                            ? _ => paintFormSection(false, revAry[0], false, false, false, revAry, 0)
                            :_ => paintFormSection(false, revAry[1], false, false, false, revAry, 1)
                        ),
                        revAry[revisionIdx - 1]
                            ? getSvgIcon("nextVersion", true, _ => paintFormSection(false, revAry[revisionIdx - 1], false, false, false, revAry, revisionIdx - 1)) 
                            : getSvgIcon()
                    ])
                ]);
                
            const formSectionsAry = [ //htmls
                standardSection("name", getTxtBankHtmlTxt("formLabelName")),
                vendObj.isNote ? [] : logSection(getTxtBankHtmlTxt("formLabelLog")),
                vendObj.isNote ? [] : await passSection(getTxtBankHtmlTxt("formLabelPass")),
                vendObj.isNote ? [] : customPassSection(getTxtBankHtmlTxt("formLabelCustomPass")),
                notesSection(getTxtBankHtmlTxt("formLabelNote")),
                urlSection(getTxtBankHtmlTxt("formLabelUrl")),
                standardSection("tags", getTxtBankHtmlTxt("formLabelTags")),
            ];

            const formFoot = dom.addDiv("formFoot").attachAry(
                displayMode
                ? [
                    vendObj.isTrash ? getSvgIcon() : getSvgIcon("share", true, shareVendor),
                    revisionIdx ?
                        getSvgIcon("trashBin", "deleteRevisionBtn", deleteRevision)
                        : vendObj.isTrash 
                            ? getSvgIcon("trashBin", "deleteTrashedBtn", deleteTrashed) 
                            : []
                ] 
                : [
                    getSvgIcon(vendObj.isNote ? "toggleToLog" : "toggleToNote", true, toggleVendor),
                    vendObj.isNew ? [] : getSvgIcon("trashBin", "deleteVendorBtn", deleteVendor)
                ]
            );

            vForm.attach(formHead).attach(recordModWrp).attach(revisionWrp).attachAry(formSectionsAry).attach(formFoot).attachTo(appSectionForm.ridKids().slideIn());
            appSectionForm.isDisplay = displayMode;
            //boxNoteEl.value = vendObj.note || "";
            boxNoteEl.dispatchEvent(new Event('input')); // resize after attaching to the form section
            toggleScrollWrpOverflow(vForm);
            //if(vForm.scrollHeight > vForm.clientHeight) vForm.addClass("scrollWrpOverflow");
        };
        /////////////////////////////////////////////////END MAIN - FORM APP SECTION paintFormSection!!!!!!! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////MAIN - LIST APP SECTION paintListSection!!!!!!! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function paintListSection(){
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Emergency Database - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const downloadEmergencyHtmlDB = async _ => {
                if(! await thisApp.alert.emergDbDownload()) return;
                async function unlockDb(e){
                    e.preventDefault();
                    const dom = Dom(document);
                    const thisCrypto = new Crypto();
                    const dbCipher = await thisCrypto.bufferFromSafeB64(dbCipherSafeB64);
                    const cryptoKey = await thisCrypto.getCryptoKeyFromPlains(dbCipher, inputBoxPass.value, inputBoxPin.value).catch(err => null);
                    const [decryptedString] = await thisCrypto.getStringFromCipher(dbCipher, cryptoKey).catch(err => ([null]));
                    if(!decryptedString) return alert("Error");
                    const dbObject = JSON.parse(decryptedString);
                    document.body.ridKids();
                    const dbObj = new thisCrypto.DatabaseObject(dbObject);
                    const vendAry = dbObj.vendors;

                    const vendAryWithPass = await Promise.all(vendAry.map(async vendObj => (vendObj.pass = await vendObj.getCurrentPassword().then(vPass => vPass.plainString), vendObj)));

                    const headerKeys = ["id", "name", "log", "pass", "cPass", "note", "url", "tags", "cr8", "mod"];
                    const headersLocal = ["id", formLabelName, formLabelLog, formLabelPass, formLabelCustomPass, formLabelNote, formLabelUrl, formLabelTags, vCr8DateLabel, vModDateLabel];

                    const getCvsTContents = _ => vendAryWithPass.map(vendObj => 
                        headerKeys.map(key => 
                            vendObj[key] 
                            ? '"' + ("cr8mod".includes(key) ? (vendObj[key] / (24 * 60 * 60 * 1000)) + 25569 : vendObj[key]) + '"'
                            : ""
                        ).join(',')
                    ).toSpliced(0, 0, headersLocal).join('\r\n');
                    
                    const getBodyContents = _ => vendAryWithPass.map(vendObj => 
                        dom.addDiv("account").attachAry(headerKeys.map((key, idx) => 
                            vendObj[key]
                            ? dom.addDiv("prop").attachAry([
                                dom.addSpan("key", `${headersLocal[idx]}:`),
                                dom.addSpan("val",
                                    "cr8mod".includes(key) 
                                    ? new Date(vendObj[key]).toLocaleString('en-GB', { timeZone: 'Europe/London' }) 
                                    : vendObj[key]
                                )
                            ])
                            :""
                        ))
                    );

                    dom.addDiv("btnWrp").attachAry([
                        dom.addButton("btn", showBtnTxt).onClick(e => { //"Show Records"
                            document.body.attachAry(getBodyContents());
                            e.target.kill();
                        }),
                        dom.addButton("btn", dowloadJson).onClick(e => { //"Download Unprotected Database JSON"
                            downloadFile(new Blob([JSON.stringify(vendAryWithPass)], {type : 'application/json'}), 'SecreSync_Emergency_Unprotected.JSON');
                            e.target.kill();
                        }),
                        dom.addButton("btn", downloadCsv).onClick(e => { //"Download Unprotected Database CVS"
                            downloadFile(new Blob([getCvsTContents()], {type : 'text/html'}), 'SecreSync_Emergency_Unprotected.csv');
                            e.target.kill();
                        }),
                        dom.addButton("btn", downloadSnc).onClick(e => { //"Download Protected Database SecreSync File"
                            downloadFile(new Blob([dbCipher], {type:"application/octet-stream"}), 'SecreSync_Emergency_Protected.snc'); //.buffer
                            e.target.kill();
                        })
                    ]).attachTo(document.body);
                }

                const constAry = [
                    getTxtBankHtmlTxt("formLabelName"),
                    getTxtBankHtmlTxt("formLabelLog"),
                    getTxtBankHtmlTxt("formLabelPass"),
                    getTxtBankHtmlTxt("formLabelCustomPass"),
                    getTxtBankHtmlTxt("formLabelNote"),
                    getTxtBankHtmlTxt("formLabelUrl"),
                    getTxtBankHtmlTxt("formLabelTags"),

                    getTxtBankTitleTxt("vCr8DateLabel"),
                    getTxtBankTitleTxt("vModDateLabel"),
                
                    getTxtBankHtmlTxt("showBtnTxt"),
                    getTxtBankHtmlTxt("dowloadJson"),
                    getTxtBankHtmlTxt("downloadCsv"),
                    getTxtBankHtmlTxt("downloadSnc"),

                    await thisApp.crypto.safeB64From(await thisApp.cryptoHandle.getDbCipher())
                    
                ];

                const constStr = `const [formLabelName, formLabelLog, formLabelPass, formLabelCustomPass, formLabelNote,
                formLabelUrl, formLabelTags, vCr8DateLabel, vModDateLabel, showBtnTxt, dowloadJson, downloadCsv,
                downloadSnc, dbCipherSafeB64] = [${constAry.map(txt => `'${txt}'`).join(",")}];`
                const listenerStr = "document.querySelector('form').addEventListener('submit', unlockDb);";
                const scriptString = [Dom, Crypto, downloadFile, unlockDb, constStr, listenerStr].map(f => f.toString()).join('');
                
                const doc = document.implementation.createHTMLDocument("SecreSync Emergency");
                
                const styleHtml = "body{position: absolute;margin: 0;padding: 0;width: 100%;font-family: monospace;font-size: 16px;}body *{max-width: 900px;}form{outline: 1px solid grey;margin: 1vmin auto;padding: 1vmin;}form *{text-align: center;}label{display:block;padding:1em;}input{font-family: monospace;font-size: 0.9em;line-height: 1.5em;border: 0;border-bottom: 1px solid rgb(240, 240, 240);transition: all 0.3s ease;padding: 0.5em 2.5em;display: block;margin: 0em auto 10vh;min-width: 50%;}input:focus-visible{outline:0;border-bottom: 1px solid black;color: black;}.btnWrp{display: flex;margin: auto;position: sticky;top: 0px;justify-content: center;}button{margin: 1em;padding:1em;}.account{margin: 1em auto;padding:1em;outline: 1px solid grey;background: #fafafa;}.prop{display: table-row;}.prop *{padding:0.5em;display: table-cell;}.key{font-weight: bold;}.val{color:black;}";
                dom.add("style").html(styleHtml).attachTo(doc.head);

                dom.addForm().attachAry([
                    dom.addLabel(null, getTxtBankHtmlTxt("credFormPass")).setAttr("for", "inputBoxPass"),
                    dom.addInput().setAttrs({type: "password", id: "inputBoxPass"}),
                    dom.addLabel(null, getTxtBankHtmlTxt("credFormPin")).setAttr("for", "inputBoxPin"),
                    dom.addInput().setAttrs({type: "password", id: "inputBoxPin"}),
                    dom.addInput().setAttrs({type: "submit", value: getTxtBankHtmlTxt("unlockDb")})
                ]).attachTo(doc.body);

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
            const importDb = async _ => {
                if(!await thisApp.alert.importDbPickFile()) return;
                thisApp.message.pickImportFile();
                spinner.start("in importDB");
                try{
                    const fileContentsBuffer = await pickFile();
                    const dbRawCredentials = await thisApp.ui.credentials.importDb();
                    if(!dbRawCredentials || !dbRawCredentials.length) return thisApp.message.importDbCancel();
                    const [plainPassString, plainPinString] = dbRawCredentials;
                    const importedDBJson = await thisApp.cryptoHandle.decryptToJson(fileContentsBuffer, { plainPassString, plainPinString }, 0, true);
                    if (!await thisApp.alert.importDb()) return thisApp.message.importDbCancel();
                    importedDBJson.vendors.forEach(importVendObj => {
                        importVendObj.id = null; // nextID
                        importVendObj.imp = new Date().getTime();
                        let importCount = 1;
                        const getImportName = _ => `${importVendObj.name} (i_${importCount})`;
                        while (thisApp.dbObj.vendors.some(vendObj => vendObj.name === getImportName())) importCount++;
                        importVendObj.name = getImportName();
                        thisApp.dbObj.vendors.push(new thisApp.crypto.Vendor(importVendObj, thisApp.dbObj.vendors));
                    });
                    await thisApp.dbStore.updateAll(thisApp);
                    thisApp.message.importDbSuccess();
                    repaintUI();
                }catch(err){
                    thisApp.message.importDbFail();
                    spinner.stop("in importDb -> catch");
                }
            };
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Download a copy of the snc database file  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const downloadCopyDB = async _ => await thisApp.alert.downloadDbCopy() && thisApp.dbStore.localFile.download();

            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Change Database Credentials - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const getChangePassword = async _ => await thisApp.alert.changePassword() && thisApp.credentials.change().then(e => {thisApp.message.dbCredentialsChangeSucess();}).catch(err => {thisApp.message.dbCredentialsChangeFail();}).finally(_ => spinner.stop("in getChangePassword")); // if not in curly brackets the finally function does not fire!!!

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- BARS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const getListBarWrp = css => dom.addDiv(`vlistBarWrp ${css}`);
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - APP_TASKBAR and APP_MORETASKBAR - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const getAppMoreTaskbar = _ => dom.addDiv("appMoreTaskbar").attachAry([
                getSvgIcon("reloadApp", true, thisApp.reload),
                dom.addDiv("flexIconWrp").attachAry([
                    //getSvgIcon("changeDbPass", true, getChangePassword),
                    //getSvgIcon("donate", "donate", getDonate),
                    getSvgIcon("downDbIcon", "downDb", downloadCopyDB),
                    getSvgIcon("impDbIcon", "impDb", importDb),
                    getSvgIcon("emergDbIcon", "emergDb", downloadEmergencyHtmlDB),
                    
                    //langModule(thisApp, repaintUI),
                    getSvgIcon("settings", true, settings.open)
                ]),
                getSvgIcon("arrowUp", "hide", (e => e.target.forebear(1).toggleClass("appMoreTaskbarShow")))
            ]);

            const getSearchForm = _ => {
                let lastSearchString = "";
                let inputTimeout;
                const inputDelay = 500; //500ms
                const searchFormEl = dom.addForm("searchForm searchFormHide");
                const searchInputEl = getInpEl({
                    type: "text",
                    name: "inputBoxSearch",
                    id: "inputBoxSearch",
                    placeholder: getTxtBankHtmlTxt("inputBoxSearch")
                });
                const searchEvent = e => {
                    e.preventDefault();
                    if(lastSearchString !== searchInputEl.value){
                        lastSearchString = searchInputEl.value;
                        paintList();
                    }
                    //searchInputEl.blur()
                    searchInputEl.focus();
                };
                const clearSearch = e => {
                    searchInputEl.value = "";
                    searchEvent(e)
                };
                const hideForm = e => {
                    searchFormEl.addClass("searchFormHide");
                    clearSearch(e);
                    searchInputEl.blur();
                };
                const hideFormEl = getSvgIcon("arrowUp", "hide", hideForm);
                const searchResetBtn = getClearInputIcon(e => {
                    clearSearch(e);
                    //searchInputEl.focus();
                });
                const delayInput = e => {
                    clearTimeout(inputTimeout);
                    inputTimeout = setTimeout(_ => searchEvent(e), inputDelay);
                };
                
                searchFormEl.showForm = _ => {
                    searchFormEl.killClass("searchFormHide");
                    searchInputEl.focus();
                };
                searchFormEl.getValue = _ => searchInputEl.value;
                
                return searchFormEl.attachAry([
                    hideFormEl,
                    searchInputEl,
                    searchResetBtn
                ]).on("input", delayInput).on("reset", clearSearch).on("submit", searchEvent);
            };

            const searchFormEl = getSearchForm();

            const getAppTaskbar = _ => dom.addDiv("appTaskbar").attachAry([
                getSvgIcon("inputBoxSearchBtn", true, searchFormEl.showForm),
                dom.addDiv("flexIconWrp").attachAry(Object.values(thisApp.dbStore).map(storeObj => storeObj.syncIcon)),
                getSvgIcon("moreMenu", true, e => e.target.forebear(1).sibling(1).toggleClass("appMoreTaskbarShow")),
                searchFormEl
            ]);
            
            const vListMainBarWrp = getListBarWrp("vListMainBarWrp").attachAry([
                getAppTaskbar(),
                getAppMoreTaskbar()
            ]);


            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - vListTaskBarWrp - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

            const getListBarLabel = html => dom.addDiv("vListBarLabel").html(html);
            const getListTaskBar = _ => {
                const vListSortBar = dom.addDiv("vListSortBar");
                const vListChangeBar = dom.addDiv("vListChangeBar");
                console.log(ado.sortTypes);
                const getSortIcons = _ => ado.sortTypes.map(iconName => 
                    getSvgIcon("sortIcon " + (iconName + adoSorts.sortOrder) + (adoSorts.sortBy === iconName ? "" : " elDimmed"), iconName, e => changeSorts(e.target, iconName))
                );
                
                const changeSorts = (iconEl, iconName) => {
                    iconEl.forebear(3).scrollTo(0,0); // vListScrollWrp - scroll to top
                    ado.changeSort(iconName);
                    vListSortBar.ridKids().attachAry(getSortIcons());
                    paintList();
                };

                
                const getChangeIcons = _ => {
                    const changeDetails = (iconEl, iconName) => {
/*                         const types = ["typeLog", "typeNote"];
                        const visibleTypes = types.includes(iconName) && Object.keys(adoDetails).filter(detailName => types.includes(detailName) && adoDetails[detailName]);
                        if(adoDetails[iconName] && visibleTypes.length < 2){ // 
                            ado.changeDetail(iconName); // make this type false 
                            iconName = types.find(icoName => icoName !== iconName); //change this iconName to the other icon's name - so this type will be set to true after the if bracket
                            iconEl.forebear(1).kidsByClass(iconName)[0].toggleClass("elDimmed");// show the other icon
                        }
                        ado.changeDetail(iconName);
                        iconEl.toggleClass("elDimmed").forebear(3).scrollTo(0,0); // vListScrollWrp - scroll to top
                        
                        paintList(); */

                        ado.changeDetail(iconName);
                        iconEl.toggleClass("elDimmed").forebear(3).scrollTo(0,0); // vListScrollWrp - scroll to top
                        
                        paintList();
                        
                        
                    };
                    const changeTask = e => {
                        const el = e.target;
                        if(el.hasClass("vTaskChangeDetais")){
                            el.replaceWith(taskChangeSortIcon);
                            vListSortBar.slideIn();
                        }else{
                            el.replaceWith(taskChangeDetaisIcon);
                            vListSortBar.slideOut();
                        }
                    };
                    const taskChangeSortIcon = getSvgIcon("vTaskChangeSort", "vTaskChangeDetais", changeTask);
                    const taskChangeDetaisIcon = getSvgIcon("vTaskChangeDetais", "vTaskChangeSort", changeTask);
                    const changeIcons = Object.keys(adoDetails).map( iconName => getSvgIcon(iconName + (adoDetails[iconName] ? "": " elDimmed"), iconName, e => changeDetails(e.target, iconName)));
                    changeIcons.splice(3, 0, dom.addSpan("divider"));
                    changeIcons.push(dom.addSpan("divider"));
                    changeIcons.push(taskChangeSortIcon);
                    
                    return changeIcons;
                };
                return [vListChangeBar.attachAry(getChangeIcons()), vListSortBar.attachAry(getSortIcons())];
            };

            const vListBarLabel = getListBarLabel();
            const vListTaskBarWrp = getListBarWrp("vListTaskBarWrp").attach(vListBarLabel).attachAry(getListTaskBar());
            const vListWrp = dom.addDiv("vListWrp");
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - vListScrollWrp - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const vListScrollWrp = dom.addDiv(getScrollWrpClass())
                .onClick(toggleScrollBar)
                .on("scroll", e => {
                    document.activeElement.blur(); // lose focus on search input element
                    const cssMethods = ["killClass", "addClass"];
                    const scrollDifference = listScrollWrpPrevTopPosition - e.target.scrollTop;
                    const [appTaskCssMethod, listTaskCssMethod] = scrollDifference > 0 ? cssMethods.reverse() : cssMethods;
                    vListMainBarWrp[appTaskCssMethod]("taskBarWrpZeroTop"); 
                    vListTaskBarWrp[listTaskCssMethod]("taskBarWrpZeroTop");
                    vListWrp.kidsByClass("vListAuxBarWrp").forEach(auxBarWrp => auxBarWrp[appTaskCssMethod]("taskBarWrpDoubleTop")); // For Bars when Note or Tags are found
                    listScrollWrpPrevTopPosition = e.target.scrollTop;
                }).attachAry([
                        vListMainBarWrp,
                        vListTaskBarWrp,
                        vListWrp
                ]);
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Attach List Section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            
            const paintList = (searchStr = searchFormEl.getValue()) => {
                const sortList = {
                    vSortName: {
                        Asc: ary => ary.sort((a, b) => a.name.localeCompare(b.name)),
                        Desc: ary => ary.sort((a, b) => b.name.localeCompare(a.name))
                    },
                    vSortCr8: {
                        Asc: ary => ary.sort((a, b) => a.cr8 - b.cr8),
                        Desc: ary => ary.sort((a, b) => b.cr8 - a.cr8)
                    },
                    vSortMod: {
                        Asc: ary => ary.sort((a, b) => a.mod - b.mod),
                        Desc: ary => ary.sort((a, b) => b.mod - a.mod)
                    },
                }[adoSorts.sortBy][adoSorts.sortOrder];

                
                const vendAllowAry = sortList(thisApp.dbObj.vendors.filter(obj => 
                  obj.isTrash && !adoDetails.typeNote && !adoDetails.typeLog || 
                  !obj.isTrash && ((adoDetails.typeNote && obj.isNote) || (adoDetails.typeLog && !obj.isNote))
                ));

                const highlightSrchStr = txt => searchStr ? txt.replace(new RegExp(searchStr, 'gi'), match => dom.addSpan("hit", match).outerHTML) : txt; // add highlights to text of found searchStr
                
                let elIdx = 0;
                let stopSpinnerTimout;
                const stopSpinnerDelay = 200; //200ms give enough time after vListElement is attached to the vListWrp to trigger the next IntersectionObserver
                const attachListElement = _ => {
                    if(!vListElements[elIdx]) return;
                    vListWrp.attach(vListElements[elIdx]);
                    requestAnimationFrame(_ => {
                        clearTimeout(stopSpinnerTimout);
                        stopSpinnerTimout = setTimeout(_ => {
                            toggleScrollWrpOverflow(vListScrollWrp);
                            spinner.stop("in paintList - requestAnimationFrame");
                        }, stopSpinnerDelay);
                    });
                    elIdx++;
                };
                
                
                
                const vEntry = vendObj => dom.addDiv("vEmpty")
                    .onClick(_ => paintFormSection(true, vendObj))
                    .observedBy(new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if(entry.isIntersecting && entry.target.hasClass("vEmpty")){
                                entry.target.cssName("vEntry").attach(
                                    dom.addDiv(vendObj.isTrash ? "vTrash" : vendObj.isNote ? "vNote" : "vLog")
                                    .attach(dom.addDiv("inpEl vName").html(highlightSrchStr(vendObj.name)))
                                    .attachAry([
                                        adoDetails.detDates && dom.addDiv("inpEl vDates")
                                        .attach(dom.addDiv("inpEl vCr8", new Date(vendObj.cr8).toUKstring()))
                                        .attach(dom.addDiv("inpEl vMod", new Date(vendObj.mod).toUKstring())),
                                        adoDetails.detNotes && dom.addDiv("inpEl vNotes").html(highlightSrchStr(vendObj.note || "---")),
                                        adoDetails.detTags && dom.addDiv("inpEl vTags").html(highlightSrchStr(vendObj.tags || "---"))
                                    ].filter(div => div))
                                );
                                attachListElement();
                            }
                        });
                    }, {}));
                    
                const vListAuxBarWrp = html => dom.addDiv("vEmpty")
                    .observedBy(new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if(entry.isIntersecting && entry.target.hasClass("vEmpty")){
                                entry.target.replaceWith(getListBarWrp("vListAuxBarWrp").attach(getListBarLabel(html))); // will have taskBarWrpDoubleTop class when scrollUp
                                attachListElement();
                            }
                        });
                    }, {}));

                const vListElements = ((nameHitAry, tagHitAry, noteHitAry) => {
                    if(searchStr){
                        const lowerSearchStr = searchStr.toLowerCase();
                        const hasText = oValue => oValue && oValue.toLowerCase().includes(lowerSearchStr);
                        vendAllowAry.forEach(vendObj => {
                            if(hasText(vendObj.name)) nameHitAry.push(vEntry(vendObj));
                            else if(hasText(vendObj.tags)) tagHitAry.push(vEntry(vendObj));
                            else if(hasText(vendObj.note)) noteHitAry.push(vEntry(vendObj));
                        });
                    }else{
                        vendAllowAry.forEach(vendObj => nameHitAry.push(vEntry(vendObj)));
                    }

                    const getLabelHtml = (vListHeadsProp, hits) => getTxtBankHtmlTxt(`vListHeads.${hits ? vListHeadsProp : "notFound"}`, {searchStr, hits});
                    const allHits = nameHitAry.length + tagHitAry.length + noteHitAry.length;
                    
                    vListBarLabel.html(searchStr ? getLabelHtml("nameFound", allHits) : allHits ? getLabelHtml("name", allHits) : getLabelHtml("empty", true));
                    if(tagHitAry.length) tagHitAry.unshift(vListAuxBarWrp(getLabelHtml("tagsFound", tagHitAry.length))); 
                    if(noteHitAry.length) noteHitAry.unshift(vListAuxBarWrp(getLabelHtml("notesFound", noteHitAry.length)));
                    return [nameHitAry, tagHitAry, noteHitAry].flat();
                })([], [], []);

                vListWrp.ridKids();
                vListElements.length ? attachListElement() : spinner.stop("in paintList - vListElements is empty");;
            }

            appSectionList.ridKids().attachAry([
                vListScrollWrp,
                getSvgIcon("addVendorBtn", true, _=> paintFormSection(true, null)) // paint form and add to windows history
            ]);
            
            paintList();
            vListScrollWrp.scrollTop = listScrollWrpPrevTopPosition;
        }
        /////////////////////////////////////////////////END MAIN - LIST APP SECTION paintListSection!!!!!!! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        const repaintUI = _ => {
            dbModifiedBar.txt(new Date(thisApp.dbObj.mod).toUKstring() + " - " + tempVer).show();
            paintListSection();
        };
        
        const resetUI = _ => {
            appSectionForm.slideOut();
            appSectionList.show();
        };
        
        const blurUI = doBlur => {
            console.log("blurUI -> doBlur = ", doBlur);
            doBlur ? thisApp.dbObj && uiBlur.show() : uiBlur.hide();
        }
        
        const clearUI = _ => {
            appSectionForm.ridKids();
            appSectionList.ridKids();
            blurUI(false);
            modalSectionPromise.clear();
        };

        const initUI = _ => {
            repaintUI();
            resetUI();
        };
        
        return {
            reset: resetUI,
            init: initUI,
            clear: clearUI,
            blur: blurUI
        };
    })();
    /* END MainGUI ------------------ END MainGUI ------------------ END MainGUI ------------------ END MainGUI ------------------ END MainGUI ------------------ END MainGUI*/
    
    //const mainGui = new MainGUI();
    this.init = mainGui.init;
    this.clear = mainGui.clear;
    this.blur = mainGui.blur;
    this.loader = appLoader;
    this.credentials = new Credentials();
    this.alerts = new Alerts();
    this.messages = new Messages();
    this.spinner = spinner;
    this.localiseDbStores = localiseDbStores;
    
    this.installApp = isUpdate => new Promise(res => {
        const title = isUpdate ? "updateApp" : "installApp";
        const killInstallApp = e => {
            e.preventDefault();
            e.stopPropagation();
            installAppEl.addClass("out").on("transitionend", installAppEl.kill);
            res(e.target === installAppEl);
        };
        const installAppEl = dom.addDiv(title + " svgIcon").setAttr("title", getTxtBankTitleTxt(title)).onClick(killInstallApp).attachTo(document.body);
        document.body.onClick(killInstallApp, {once: true});
        window.requestAnimationFrame(_ => window.requestAnimationFrame(_ => installAppEl.addClass("in")));
    });

    const touchHandler = (() => {
        const leeway = 50; // Tolerance for perpendicular movement (px)
        const threshold = 100; // Minimum swipe distance (px)
        const allowedTime = 300; // Maximum swipe time (ms)
        let isVerticalSwipe = false;
        let isHorizontalSwipe = false;
        let touchStart = { x: 0, y: 0, time: 0 };

        const resetSwipe = () => {
            msgModule.killAttr("style");
            appSectionForm.killAttr("style");
            isVerticalSwipe = isHorizontalSwipe = false;
            touchStart = { x: 0, y: 0, time: 0 };
        };

        const startSwipe = (e) => {
            const { clientX, clientY } = e.touches[0];
            touchStart = { x: clientX, y: clientY, time: Date.now() };

            if (this.messages.isHidden() && clientY + REM * 2 > document.body.clientHeight) {
                isVerticalSwipe = true;
                this.messages.paintFullArchive();
            } else if (this.messages.isFullArchive() && !msgModule.lastChild.scrollTop) {
                isVerticalSwipe = true;
            } else if (!appSectionForm.hasClass("elSlideOut") && appSectionForm.isDisplay) {
                isHorizontalSwipe = true;
            }
        };

        const swiping = (e) => {
            const { clientX, clientY } = e.touches[0];

            if (isVerticalSwipe) {
                const deltaY = touchStart.y - clientY;
                const translateBy = 100 - (Math.abs(deltaY) * 100) / document.body.clientHeight;

                if (this.messages.isHidden() && deltaY > 0) {
                    // Swipe up to open full archive
                    if (translateBy < 50) {
                        resetSwipe();
                        this.messages.openFullArchive();
                    } else {
                        msgModule.setAttr("style", `transition: unset; height: 100%; transform: translateY(${translateBy}%);`);
                    }
                } else if (this.messages.isFullArchive() && deltaY < 0) {
                    // Swipe down to close full archive
                    const translateBy = (Math.abs(deltaY) * 100) / document.body.clientHeight;
                    if (translateBy > 50) {
                        resetSwipe();
                        history.back();
                    } else {
                        msgModule.setAttr("style", `transition: unset; height: 100%; transform: translateY(${translateBy}%);`);
                    }
                }
            }

            if (isHorizontalSwipe && !e.target.placeholder && clientX < touchStart.x) {
                // Swipe left for back navigation
                if (Math.abs(clientY - touchStart.y) >= leeway) {
                    resetSwipe();
                    return;
                }
                const translateBy = ((touchStart.x - clientX) * 100) / document.body.clientWidth;
                if (translateBy > 50) {
                    resetSwipe();
                    history.back();
                } else {
                    appSectionForm.setAttr("style", `transition: unset; transform: translateX(${-translateBy}%);`);
                }
            }
        };

        const endSwipe = (e) => {
            // Extract touch coordinates or fallback to undefined
            const { clientX, clientY } = e.changedTouches?.[0] || {};

            // If no valid touch data, reset and exit
            if (!touchStart.time || !clientX || !clientY) return resetSwipe();

            // Helper to validate swipe
            const isValidSwipe = (closeArchive) => {
                const mainDelta = isVerticalSwipe ? clientY - touchStart.y : clientX - touchStart.x;
                const perpDelta = isVerticalSwipe ? clientX - touchStart.x : clientY - touchStart.y;
                const withinTime = Date.now() - touchStart.time < allowedTime;

                return (
                    withinTime &&
                    Math.abs(perpDelta) <= leeway &&
                    (closeArchive ? mainDelta > threshold : -mainDelta > threshold)
                );
            };

            // Handle vertical or horizontal swipe based on the state
            if (isVerticalSwipe) {
                if (this.messages.isFullArchive()) {
                    if (isValidSwipe(true)) history.back();
                } else if (isValidSwipe(false)) {
                    this.messages.openFullArchive();
                } else {
                    this.messages.resetFullArchive();
                }
            } else if (isHorizontalSwipe && isValidSwipe(false)) {
                history.back();
            }

            // Reset swipe state
            resetSwipe();
        };

        return {
            startSwipe,
            swiping,
            endSwipe,
        };
    })();
    
    
    
    /* **************************************************** */
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Change Database Credentials - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const getChangePassword = async _ => await thisApp.alert.changePassword() && thisApp.credentials.change().then(e => {thisApp.message.dbCredentialsChangeSucess();}).catch(err => {thisApp.message.dbCredentialsChangeFail();}).finally(_ => spinner.stop("in getChangePassword")); // if not in curly brackets the finally function does not fire!!!
            
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Donate - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const getDonate = _ => {
                 console.log("TO DO getDonate");
            }
            
            
    const settings = (_ => {
        let settingsSection = null;

        const openSetting = e =>{
            e.preventDefault();
            if(settingsSection) return;
            
            const contextIcons = [getSvgIcon("changeDbPass", true, thisApp.dbObj ? getChangePassword : null), getSvgIcon("donate", "donate", getDonate), [], langModule(thisApp, this.init)];
            
            settingsSection = dom.addDiv("settingsSection").attach(
                dom.addDiv("settingsWrp").attachAry(
                    contextIcons
                )
            ).onClick(function(e){
                if(e.target === e.currentTarget) history.back();
            }).attachTo(document.body);

            addModalToHistory(true); //force adding to history
        
        };
        
        const hasClosed = _ =>{
            if(!settingsSection) return false;
            settingsSection.kill();
            settingsSection = null;
            return true;
        };
        
        return {
            open: openSetting,
            hasClosed: hasClosed,
        };
    })();

/*************************************/
    // Add Popstate Listener
    window.addEventListener('popstate', e => {
        if(settings.hasClosed()) return;
        if(this.messages.fullArchiveHasClosed()) return; // hide the Messages Full Archive if is fullscreen, then return

        mainGui.reset(); //resetUI - hide form, show list
        modalSectionPromise.fulfill(e); // hide the currently opened modal section (Alerts || Loader || Credentials)

    });
    
    // Attach Sections
    document.body.ridKids()
    .attachAry([
        appSectionList, appSectionForm, dbModifiedBar,
        modalSection,
        msgModule,
        spinner,
        uiBlur
    ])
    .on("touchstart", touchHandler.startSwipe)
    .on("touchmove", touchHandler.swiping)
    .on("touchend", touchHandler.endSwipe)
    .on("touchcancel", touchHandler.endSwipe)
    //.on("contextmenu", contextHandler.open);
    
    document.body.attach(
        dom.addDiv("removeDrop").onClick(_ => {
            document.body.kidsByClass("svgIcon").forEach(el => { el.toggleClass("noDrop");});
            document.body.kidsByClass("pinInput").forEach(el => { el.toggleClass("alt"); });
            document.body.kidsByClass("padded").forEach(el => { el.toggleClass("alt"); });
            document.body.kidsByClass("submitCredentialsLabel").forEach(el => { el.toggleClass("alt"); });
            document.body.kidsByClass("unlockDbIcon").forEach(el => { el.toggleClass("alt"); });
            document.body.kidsByClass("protectDb").forEach(el => { el.toggleClass("alt"); });
            document.body.kidsByClass("vEntry").forEach(el => { el.toggleClass("alt"); });
            document.body.kidsByClass("vName").forEach(el => { el.toggleClass("alt"); });
        })
    );
}

    // --------------------------supportDonate TO DO!!!--------------------------------------- 
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
    