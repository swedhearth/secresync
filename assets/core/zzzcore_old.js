    Date.prototype.toUKstring = function(){
        return this.toLocaleString('en-GB', { timeZone: 'Europe/London' });
    };
    String.prototype.addTextLineBreaks = function(){
        return this.replaceAll("<br>", "\r\n");
    };
/* ****************************------------------------------------- DOM -------------------------------------***********************************/
    function Dom(doc){
    //const dom = (doc=>{
        function ElMethods(el) {
          const elMethods = {
            addClass: cssClass => {if(cssClass) el.classList.add(cssClass); return el;},
            killClass: cssClass => {if(cssClass) el.classList.remove(cssClass); return el;},
            toggleClass: cssClass => {if(cssClass) el.classList.toggle(cssClass); return el;},
            hasClass: cssClass => el.classList.contains(cssClass),
            cssName: cssClasses => {if(cssClasses) el.className = cssClasses; return el;},
            hide: _ => el.addClass("elNoDisplay"),
            toggleDisplay: _ => el.toggleClass("elNoDisplay"),
            show: _ => el.killClass("elNoDisplay"),
            isHidden: _ => el.hasClass("elNoDisplay"),
            slideOut: _ => el.addClass("elSlideOut"),
            slideIn: _ => el.killClass("elSlideOut"),
            ridKids: (idx = 0) => {while(el.children[idx]) el.removeChild(el.lastChild); return el;},
            on: (type, fn, opt) => {el.addEventListener(type, fn, opt); return el;},
            onClick: (fn, opt) => el.on("click", fn, opt),
            selfClick: _ => {el.click(); return el;},
            attachTo: parentEl => {parentEl.appendChild(el); return el;},
            attach: kidEl => {if(kidEl) el.appendChild(kidEl); return el;},
            attachAry: kidsAry => {if(kidsAry.length) el.append(...kidsAry); return el;},
            preattach: kidEl => {if(kidEl) el.prepend(kidEl); return el;},
            preattachAry: kidsAry => {if(kidsAry.length) el.prepend(...kidsAry); return el;},
            preattachTo: parentEl => {if(parentEl) parentEl.prepend(el); return el;},
            forebear: (level = 0) => [...Array(++level)].fill(el).reduce(acc => acc ? acc.parentElement : null), // array level 1 is the element itself, level 2 is a parent of the element, so el.forebear(1) is parent of element
            kids: _ => [...el.children],
            kid: (level = 0) => {if(el.children[level]) return el.children[level];}, // level 0 = firstChild
            siblings: _ => [...el.parentElement.children],
            sibling: (level = 0) => el.siblings()[level + el.siblings().findIndex(e => e === el)] || null, // level 0 is the element itself, level 1 is the nextSibling, -1 is the previous sibling
            kill: _ => {el.remove(); return el;},
            setAttr: (name, value) => {el.setAttribute(name, value); return el;},
            setAttrs: attrsObj => isObjectFilled(attrsObj) ? Object.keys(attrsObj).reduce((acc, key) => el.setAttr(key, attrsObj[key]), el) : el,
            killAttr: (name) => {el.removeAttribute(name); return el;},
            addId: idName => el.setAttr("id", idName),
            html: innerHtml => {el.innerHTML = innerHtml; return el;},
            txt: txt => {el.textContent = txt; return el;},
            clone: deep => dom(el.cloneNode(deep)),
            kidsByClass: cssClass => [...el.getElementsByClassName(cssClass)],
            addTxtNode: txt => el.attach(doc.createTextNode(txt)),
            observedBy: oberver => {oberver.observe(el); return el;},
            addTooltip: tooltipTxt => {el.tooltip = tooltipTxt; return el;}
          };
          Object.entries(elMethods).forEach(([name, method]) => this[name] = method); // to not create a object constructor e.g.: function ElMethods(el) { this.addClass = function(cssClass){this.classList.add(cssClass); return this;}; ...}
        }
      
        const dom = el => {
            const elMethods = new ElMethods(el);
            for (const method in elMethods) el[method] = elMethods[method]; //include prototypes
            const toolTipshow = showTooltip => {
                if(!el.tooltip) return;
                if(showTooltip){
                    el.attach(dom.adDiv("toolTip", el.tooltip));
                }else{
                    el.kids().forEach(kid => {if(kid.hasClass("toolTip")) kid.kill()});
                }
            }
            el.on("mouseenter", _ => toolTipshow(true));
            el.on("mouseout", _ => toolTipshow(false));
            return el;
        };
        
        const raw = ["div", "span", "legend", "fieldset", "input", "textarea"].reduce((obj, tag) => ({ ...obj, [tag]: doc.createElement(tag)}), {});
        const domClone = rawEl => dom(rawEl.cloneNode(true));

        dom.add = tag => dom(doc.createElement(tag));

        dom.adDiv = (classNamesString = "", innerHtmlString = "") => domClone(raw.div).cssName(classNamesString).txt(innerHtmlString);
        dom.addSpan = (classNamesString = "", innerHtmlString = "") => domClone(raw.span).cssName(classNamesString).txt(innerHtmlString);
        dom.addLegend = legendHtml => domClone(raw.legend).txt(legendHtml);
        dom.addFieldset = legendHtml => domClone(raw.fieldset).attach(dom.addLegend(legendHtml));
        dom.addInput = (classNamesString = "") => domClone(raw.input).cssName(classNamesString);
        dom.addTextarea = (classNamesString = "") => domClone(raw.textarea).cssName(classNamesString);

        dom.addSvg = attrsObj =>  dom(doc.createElementNS('http://www.w3.org/2000/svg', 'svg')).setAttrs(attrsObj);
        dom.addPath = attrsObj => dom(doc.createElementNS('http://www.w3.org/2000/svg', 'path')).setAttrs(attrsObj);
        dom.addSvgPath = (viewBox, d) => dom.addSvg({viewBox: viewBox}).attach(dom.addPath({d: d}));
        dom.extendElMethods = extendedElMethodsObj => Object.entries(extendedElMethodsObj).forEach(([name, method]) => ElMethods.prototype[name] = method);

        [...doc.querySelectorAll('*')].forEach(dom); // domify all the elements present in DOM at the start in the html document
        return dom;
    }
    //})(document);
    

    
/* ****************************------------------------------------- END DOM -------------------------------------***********************************/

/* ****************************------------------------------------- IDBX -------------------------------------***********************************/
  function IdxDb(dbName, version, storeName, keyPath = "name", returnValue = "value"){
      return new Promise(resolve => {
          const idxDbOpenReq = window.indexedDB.open(dbName, version);
          idxDbOpenReq.onupgradeneeded = e =>  e.target.result.createObjectStore(storeName, { keyPath: keyPath });// Create an objectStore for this database;
          idxDbOpenReq.onsuccess = e => {
              const db = e.target.result;
              db.onerror = function (e) {console.error("Database error: " + e.target.errorCode, e); resolve (null)}

              function idxDb(method, name, value = null){
                  const query = value ? {[keyPath]: name, [returnValue]: value} : name;
                  const tr = db.transaction(storeName, "readwrite").objectStore(storeName)[method](query);
                  return new Promise((res , rej) => {
                      tr.onsuccess = e => res(method === "get" ? e.target.result ? e.target.result.value : null : value);
                      tr.onerror = e => rej(e);
                  });
              }
              
              this.exists = true;
              this.get = name => idxDb("get", name);
              this.delete = name => idxDb("delete", name);
              this.add = (name, value) => idxDb("add", name, value);
              this.set = (name, value) => idxDb("put", name, value);
              this.clear = _ => idxDb("clear");
              this.destroySelf = _ => {
                  db.close();
                  const tr = window.indexedDB.deleteDatabase(dbName);
                  return new Promise((res , rej) => {
                      tr.onsuccess = e => res(true);
                      tr.onerror = e => rej(e);
                      tr.onblocked = e => res(true);
                  });
              }

              resolve(this);
          };
          idxDbOpenReq.onerror = e => {
            console.log("No IDXDB.", e);
            resolve(null);
          };
      });
  }
/* ****************************------------------------------------- END IDBX -------------------------------------***********************************/

/* ****************************------------------------------------- FETCH -------------------------------------***********************************/
    const fetchData = async (url = "", method, payload) => (
        await fetch(url, {
            method: method || "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {"content-type": "text/plain;charset=UTF-8"},
            body: method ? payload : null,
        })
    ).json();
    
    const getData = url => fetchData(url);
    const postData = (url, payload) => fetchData(url, "POST", payload);
    const postDataJson = (url, payloadObj) => postData(url, JSON.stringify(payloadObj));

/* ****************************------------------------------------- END FETCH -------------------------------------***********************************/

/* ****************************------------------------------------- isURL -------------------------------------***********************************/
    const isURL = str => {
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    };
    String.prototype.isURL = function(){
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(this);
    };
/* ****************************------------------------------------- END isURL -------------------------------------***********************************/
    const dom = new Dom(document);
    function Modules(thisApp){
        //  --------------------------------------------------------------- submodules  / HELPERS --------------------------------------------------------------- */scrollWrpOverflow
        function getSvgIcon(cssString = "", title, onClick){
            title = thisApp.txtBank.app.titles[title];
            const svgIcon = dom.addSpan("svgIcon " + (onClick ? "active " : "") + cssString);
            if(title) svgIcon.setAttr("title", title);
            if(onClick) svgIcon.onClick(onClick);
            return svgIcon;
        }
        
        function getInpEl(inpObj){
            const inpEl = dom.addInput("inpEl");
            if(inpObj._cssAry) inpObj._cssAry.forEach(css => inpEl.addClass(css));
            if(inpObj._onInput) inpEl.on("input", inpObj._onInput);
            Object.keys(inpObj).filter(attr => !attr.includes("_") && inpObj[attr]).forEach(attr => inpEl[attr] = inpObj[attr]);
            return inpEl;
        }
        
        const getPaddedFieldset = legendHtml => dom.addFieldset(legendHtml + ":").addClass("padded"); 
        
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
        
        const getClearInputIcon = clearFunction => getSvgIcon("deleteLeft", "deleteLeft", clearFunction)
        //  --------------------------------------------------------------- END submodules  / HELPERS --------------------------------------------------------------- */scrollWrpOverflow
        
        // Add Icons to thisApp.dbStore

        const getStoreLoadIcon = (thisStore, moduleFinish) => getSvgIcon("loadIcon " + thisStore.key + "Icon", thisStore.key + "Load", _ => moduleFinish(thisStore.load));
        for(const storeKey in thisApp.dbStore){
            const thisStore = thisApp.dbStore[storeKey];
            thisStore.syncIcon = getSvgIcon("syncIcon " + thisStore.key + "Icon", thisStore.key + "Sync", thisStore.syncToggle);
            thisStore.credIcon = getSvgIcon("credIcon " + thisStore.key + "Icon", thisStore.key + "Cred");
            //thisStore.syncIcon = getSvgIcon("syncIcon " + storeKey + "Icon", storeKey + "Sync", thisStore.syncToggle);
            //thisStore.loadIcon = getSvgIcon("loadIcon " + storeKey + "Icon", storeKey + "Load", thisStore.load);
        }
        
        const spinnerSection = dom.adDiv("spinnerSection");
        const moduleSection = dom.adDiv("moduleSection appSection zIndex0");
        const msgModule = dom.adDiv("msgModule");
        const appSectionForm = dom.adDiv("appSection appForm").hide();
        const appSectionList = dom.adDiv("appSection appList").hide();
        const dbModified = dom.adDiv("dbModified").hide();
        
        
        // draw spinner
        //const getSpinnerSection = _ => {
            const maxRings = 21;
            const minRingWitdh = 0.025;
            let ringParent = dom.adDiv("spinnerWrp").attachTo(dom.adDiv("spinnerContainer").attachTo(spinnerSection));
            
            for(let i = 0; i < maxRings; i++){
                const ringWidth = minRingWitdh + (i > maxRings / 2 ? (maxRings - 1 - i) : i) * minRingWitdh;
                ringParent = dom.adDiv().setAttr("style", "animation: spinnerRing 8s linear infinite; border-width: " + ringWidth +"em;").attachTo(ringParent);
            }
            spinnerSection.on = _ => spinnerSection.addClass("show");
            spinnerSection.off = _ => {
                console.log("Spinner OFF");
                spinnerSection.killClass("show");
            }
        //    return spinner;
       // }
        

        document.body.ridKids().attachAry([
                spinnerSection, appSectionList, appSectionForm, dbModified,
                moduleSection,
                msgModule
        ]).onClick(function(e){
            /* console.log(e, e.target); */
            if(e.target.hasClass("scrollWrp")) this.toggleClass("scrollBarVisible");
        });
        
        
        //console.log("MODULES INITIATED");

        let resolve = null;
        let promise = null;
        let closeIsDeny = true;
        let choice = null;
        
        function moduleFinish(e){ //e=true/ value/ function, e=false, e=null, e=popstate
        //console.log(" moduleFinish(e)", e);
        //console.log("choice", choice, "closeIsDeny", closeIsDeny)
        
            if(!promise) return;
            if(e && e.type === "popstate"){
                if(choice === null && closeIsDeny) choice = false;
                if (choice !== null){
                    resolve(choice);
                    //console.log(' moduleSection.killClass("zIndex2");');
                    
                    thisApp.spinner.on();
                }else{
                    
                }
                moduleSection.killClass("zIndex2");
                promise = null;
                choice = null;

            }else{
                choice = e;
                window.history.back();
            }
        }
        
        function moduleSectionShow(){
            moduleSection.addClass("zIndex2");
            thisApp.spinner.off();
        }

        window.addEventListener('popstate', moduleFinish);

        
            // --------------------------changeLanguage - langModule ---------------------------------------
        function langModule(thisApp, completeFunction){
            const langSelectWrp = dom.adDiv("langSelectWrp").attachAry(
                thisApp.languages.map(
                    lang => getSvgIcon("lang" + lang, lang, _ => {
                        if(lang !== thisApp.lang) thisApp.changeLangTo(lang).then(completeFunction);
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

        function Loader(){
            closeIsDeny = true;
            moduleSection.ridKids();
            const consentHtml = thisApp.txtBank.app.htmls["withConsent"] + thisApp.txtBank.app.htmls[thisApp.idxDb ? "withConsentNoIdxdb" : "removeConsent"];
            const consentDiv = {
                true: dom.adDiv("consent", consentHtml.addTextLineBreaks()).onClick(_ => moduleFinish(thisApp.makePrivate)),//"makePrivate" completeLoadWrp(thisApp.makePrivate)
                false: dom.adDiv("noConsent", thisApp.txtBank.app.htmls["noConsent"].addTextLineBreaks()).onClick(_ => moduleFinish(thisApp.setConsent)),//"setConsent"
                null: dom.adDiv("noConsent", thisApp.txtBank.app.htmls["noCookies"].addTextLineBreaks()),
            }[thisApp.consent]

            moduleSection.attach(
                dom.adDiv("scrollWrp").attachAry([
                    langModule(thisApp, _ =>  moduleFinish(_ => thisApp.start("language Changed to ... " + thisApp.lang))),
                    dom.adDiv("loadIconWrp").attachAry([
                        getStoreLoadIcon(thisApp.dbStore.dbxFile, moduleFinish),//loadDbxFile
                        getStoreLoadIcon(thisApp.dbStore.localFile, moduleFinish),//loadLocalFile
                        getSvgIcon("loadIcon newDbIcon", "newDbLoad", _ => moduleFinish(thisApp.createNewDb))//createNewDb
                    ]),
                    consentDiv
                ])
            );
            moduleSectionShow();
            window.history.pushState({moduleOpen: true}, '', '');
            return promise = new Promise(res => resolve = res)
        }


        function Credentials(){
            const txtAppHtmls = thisApp.txtBank.app.htmls;
            closeIsDeny = true;
            
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
                    getClearInputIcon(clearInput) //getSvgIcon("deleteLeft", "deleteLeft", clearInput)
                ]).addClass(inputObject._hint ? "withHint" : "");
            }
            
            function paintCredentials(canDelete, canPersist, msgObj, passInputObj, pinInputObj){
                moduleSection.ridKids();
                const pinOnly = !msgObj.passInputLabel;
                
                const getPersistCheckboxLabel = checked => dom.add("label").setAttr("for", "persistCheckbox").addClass("credInpWrp")
                    .attach(getSvgIcon(checked ? "checked" : "checked unchecked", checked ? "credChecked" : "credUnchecked", _=> null))
                    .attach(dom.addSpan("checkboxLabelSpan", txtAppHtmls[checked ? "credChecked" : "credUnchecked"]))
                    .attach(getSvgIcon());

                let persistCheckboxLabel = getPersistCheckboxLabel(pinOnly);
                
                const confirmDeletePersisted = async e => {
                    const tempPersistLabel = getPersistCheckboxLabel(e.target.checked);
                    persistCheckboxLabel.replaceWith(tempPersistLabel);
                    persistCheckboxLabel = tempPersistLabel;
                    if(pinOnly && !e.target.checked){ // (pinOnly && !e.target.checked) if not passInputLabel it means that it's only pin - so the key was persisted already, therefore select as default & Unchecked
                        const [credPromise, credResolve]  = [promise, resolve]; // Preserve Promise and the Resolve function
                        promise = null; // cancel promise to enable showing the new alert
                        const deletePersisted = await thisApp.alert.privateModeEnableClipboard();/// !!!!!!!!!!!!!!!!!!!!!! Replace with PROPER WORDING AND NEW ALETS FUNCTION
                        [promise, resolve] = [credPromise, credResolve]; // restore preserved Credentials Promise and the Resolve function
                        if(deletePersisted){ 
                            moduleFinish([null, true, false]); // Will throw error in the decodeToJson function and delete the
                        }else{
                            paintCredentials(canDelete, canPersist, msgObj, passInputObj, pinInputObj);
                        }
                    }
                    console.log(e.target.checked);
                };

                const persistCheckboxInputEl = getInpEl({
                    type: "checkbox",
                    id: "persistCheckbox",
                    checked: pinOnly, // if not passInputLabel it means that it's only pin - so the key was persisted already, therefore select as default
                    _onInput: confirmDeletePersisted 
                }).hide();
                
                const presistFieldset = canPersist ? getPaddedFieldset(msgObj.persistLabel).attachAry([
                    ...getHintAry(txtAppHtmls.credFormPersistHint),
                    persistCheckboxLabel,
                    persistCheckboxInputEl,
                    
                ]) : "";
                const sumbitInpEl = getInpEl({
                    id: "submitCredentials",
                    type: "submit"
                }).hide();
                
                const inputAry = pinOnly ? [getInputFieldset(pinInputObj)] : [getInputFieldset(passInputObj), getInputFieldset(pinInputObj)];
                const unlinkDbIcon = canDelete ? getSvgIcon("trashBin credTrashDB", "mpClose", _ => moduleFinish([])) : getSvgIcon("crosx", "btnCloseForm", _ => moduleFinish([]));
                const unlockDbAry = [dom.addSpan("", txtAppHtmls.unlockDb),  getSvgIcon("unlockDb", "unlockDb", _ => null)];
                const protectDbAry = [dom.addSpan("", txtAppHtmls.protectDb), getSvgIcon("protectDb", "protectDb", _ => null)];

                const submitCredentialsLabel =  dom.add("label").setAttr("for", "submitCredentials").cssName("credInpWrp submitCredentialsLabel").attachAry(canDelete ? unlockDbAry : protectDbAry);
                
                const submitCredentials = e =>{
                    e.preventDefault(); 
                    moduleFinish([passInputObj._value, pinInputObj._value, persistCheckboxInputEl.checked]);
                };
                
                dom.adDiv("credFormWrp").attach(
                    dom.add("form")
                        .attach(dom.adDiv("credTaskbar").attach(unlinkDbIcon))
                        .attach(dom.adDiv("credFormTitle", msgObj.title))
                        .attach(
                            dom.adDiv("credIconWrp").attachAry([
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
                moduleSectionShow();
            }
            
            function show(canDelete, canPersist, msgObj) {
                if(promise) return promise.then(_ => show(canDelete, canPersist, msgObj));
                paintCredentials(canDelete, canPersist, msgObj, new InputObject(false, msgObj), new InputObject(true, msgObj)); // getPass, getPin
                window.history.pushState({moduleOpen: true}, '', '');
                return promise = new Promise(res => resolve = res);
            }

            this.pinPassNewChange = (canDelete, canPersist) => show(canDelete, canPersist, {
                title: txtAppHtmls.credFormTitleNew, //"Create New Database",
                passInputLabel: txtAppHtmls.credFormPass, 
                pinInputLabel: txtAppHtmls.credFormPin, 
                persistLabel: txtAppHtmls.credFormPersist, //"Save the password in the database and enable unlocking the database using the pin only?"
                pinHint: txtAppHtmls.credFormPinHint,//"Please provide a new PIN. It can be between 4 and 32 characters long and contain any type of characters.",
                passHint: txtAppHtmls.credFormPassHint,//"Please enter a new Password. It can be between 10 and 32 characters long and contain any type of characters.",
            });
            this.pin = (canDelete, canPersist)  => show(canDelete, canPersist, {
                title: txtAppHtmls.credFormTitle, 
                pinInputLabel: txtAppHtmls.credFormPin //"Enter PIN:"
            });
            this.pinPass = (canDelete, canPersist)  => show(canDelete, canPersist, {
                title: txtAppHtmls.credFormTitle, //"Unlock Existing Database"
                passInputLabel: txtAppHtmls.credFormPass, //"Enter Password:",
                pinInputLabel: txtAppHtmls.credFormPin, //"Enter PIN:",
                persistLabel: txtAppHtmls.credFormPersist //"Save the password in the database and enable unlocking the database using the pin only?"
            });
        }
        
        function Alerts(){
            
            function show(msgObj, enableClose) {
                if(promise){
                    console.log("promise exists in Alerts");
                    return promise.then(_ => show(msgObj, enableClose));
                }
                
                closeIsDeny = !enableClose;
                moduleSection.ridKids();
                
                const addLineBreaks = msg => msg.replaceAll("<br>", "\r\n");

                
                const alertTableAry = [
                  getSvgIcon("loadIcon " + msgObj.i + "Icon", msgObj.i),
                  dom.adDiv("alertGeneraltMsg", addLineBreaks(msgObj.q))
                ];
                const alertChoiceAry = [];
                if(msgObj.y) alertChoiceAry.push(dom.adDiv("alertChoice", addLineBreaks(msgObj.y)).onClick(_ => moduleFinish(true)));
                if(msgObj.n) alertChoiceAry.push(dom.adDiv("alertChoice", addLineBreaks(msgObj.n)).onClick(_ => moduleFinish(false)));
                if(alertChoiceAry.length) alertTableAry.push(dom.adDiv("alertChoiceWrp").attachAry(alertChoiceAry));
                const alertWrp = dom.adDiv("alertWrp").attachAry(alertTableAry);
                dom.adDiv("alertTable").attach(alertWrp).attachTo(moduleSection);
                if(enableClose) getSvgIcon("crosx", "btnCloseForm", _ => moduleFinish(null)).attachTo(alertWrp); //trashBin
                window.history.pushState({moduleOpen: true}, '', '');
                //setTimeout(moduleSectionShow, 400);
                moduleSectionShow();
                return promise = new Promise(res => resolve = res).finally(thisApp.spinner.off);
            }
            
            function getParsedObj(txtObj, injObj){
                const txtObjCopy = { ...txtObj };
                for(const tmpStr in txtObjCopy){
                    txtObjCopy[tmpStr] = txtObjCopy[tmpStr] ? txtObjCopy[tmpStr].parseTemplate(injObj) : null;
                }
                return txtObjCopy;
            }
            
            this.offline = _ => show(thisApp.txtBank.alert.offline);
            this.deleteVendor = vendName => show(getParsedObj(thisApp.txtBank.alert.deleteVendor,{vName: vendName}),true);
            this.newVersion = _ => show(thisApp.txtBank.alert.newVersion);
            this.syncDbWith = storeKey => show(thisApp.txtBank.alert.syncDbWith[storeKey]);
            this.disconnectDbFrom = storeKey => show(thisApp.txtBank.alert.disconnectDbFrom[storeKey]);
            this.deleteExistingStore = storeKey => show(thisApp.txtBank.alert.deleteExistingStore[storeKey]);
            this.update = (storeObj, appObjMod) => {
                const storeName = thisApp.txtBank.alert.name[storeObj.key];
                const sAge = storeObj.dbMod < appObjMod ? "storeOlder" : "storeNewer";
                const isAlter = storeObj.cantAlter ? "noAlter" : "alter";
                return show(getParsedObj(thisApp.txtBank.alert.update, {
                    sName: storeName,
                    sMod: new Date(storeObj.dbMod).toUKstring(),
                    aMod: new Date(appObjMod).toUKstring(),
                    sAge: thisApp.txtBank.alert.update[sAge],
                    isAlter: thisApp.txtBank.alert.update[isAlter].parseTemplate({sName: storeName}),
                    sKey: storeObj.key
                }), true);
            };
            this.localFileLoadOrCreate = _ => show(thisApp.txtBank.alert.localFileLoadOrCreate, true);
            this.localFileLoadOrDownload = _ => show(thisApp.txtBank.alert.localFileLoadOrDownload, true);
            const catchObj = (storeKey, e) => ({sName: thisApp.txtBank.alert.name[storeKey], sKey: storeKey, cErr: e});
            this.catchLoad = storeKey => show(getParsedObj(thisApp.txtBank.alert.catchLoad, catchObj(storeKey)),true);
            this.catchSync = (storeKey, e) => show(getParsedObj(thisApp.txtBank.alert.catchSync, catchObj(storeKey, e)),true);
            this.catchUpdate = (storeKey, e) => show(getParsedObj(thisApp.txtBank.alert.catchUpdate, catchObj(storeKey, e)),true);
            this.privateModeEnableClipboard = _ => show(thisApp.txtBank.alert.privateModeEnableClipboard);
            this.privateModeUnableSync = _ => show(thisApp.txtBank.alert.privateModeUnableSync);
            this.appFailed = _ => show(thisApp.txtBank.alert.appFailed);
        }

         /* Messages -----------------------------------------------------------------------*/
        function  Messages() {
            function MsgObj(valAry){
                [this.txt, this.err, this.cLog, this.flash] = valAry;
            }
            
            let timerHide = 0;
            let msgPromise = null;
            let msgResolve = null;

            const  messageFinish = _ => new Promise(res =>{
                clearTimeout(timerHide);
                setTimeout(_=>{ // cancel popUp
                    msgModule.cssName("msgModule");
                    setTimeout(_=>{ // Resolve 
                        msgPromise = null;
                        res(msgResolve);
                    },300);
                },1000);
            });
            
            const msgTxt = txt => show(txt);
            const msgFlash = txt => show(txt, null, null, true);
            const msgErr = txt => show(txt, true);
            const msgFail = (txt, e) => show(txt, true, e);
            
            function show(...args) {
                if(msgPromise) return messageFinish().then(_ => show(...args));
                const msgObj = new MsgObj(args);
                msgModule.txt(msgObj.txt).addClass("popUp");
                if(msgObj.err) msgModule.addClass("error");
                if(msgObj.flash) msgModule.addClass("flash");
                if(msgObj.cLog) console.log(msgObj.cLog, msgObj.txt);
                timerHide = setTimeout(messageFinish, 2000);
                return msgPromise = new Promise(res => msgResolve = res);
            }

            this.digest = msg => msgTxt(msg);
            this.fail= (msg,e) => msgFail(msg,e);
            this.error =  (msg) => msgErr(msg);
            //this.existingOrNew = thisApp.txtBank.message.existingOrNew;
            this.existingDb = thisApp.txtBank.message.existingDb;
            this.loadBd = thisApp.txtBank.message.loadBd;
            
            //this.newDb = thisApp.txtBank.message.newDb;
            this.loggedOff = thisApp.txtBank.message.loggedOff;
            
            this.pickFileFR = _ => msgTxt(thisApp.txtBank.message.pickFileFR);
            this.pickFile = _ => msgTxt(thisApp.txtBank.message.pickFile);
            this.deleteVendorReject = vName => msgTxt(thisApp.txtBank.message.deleteVendorReject.parseTemplate({vName:vName}));
            this.vendorDeleted = vName => msgTxt(thisApp.txtBank.message.vendorDeleted.parseTemplate({vName:vName}));
            this.customPassCopied = _ => msgFlash(thisApp.txtBank.message.customPassCopied);
            this.passCopied = _ => msgFlash(thisApp.txtBank.message.passCopied);
            this.logCopied = _ => msgFlash(thisApp.txtBank.message.logCopied);

            this.exitAppConfirm = _ => msgFlash(thisApp.txtBank.message.exitAppConfirm);
            //this.passShort = _ => msgErr(thisApp.txtBank.message.passShort);
            
            this.logShort = _ => msgErr(thisApp.txtBank.message.logShort);
            this.nameShort = _ => msgErr(thisApp.txtBank.message.nameShort);
            this.vendorExists = vName => msgErr(thisApp.txtBank.message.vendorExists.parseTemplate({vName:vName}));
            this.noFilePickedErr = _ => msgErr(thisApp.txtBank.message.noFilePickedErr);
            //dbFailed: (count, e) => msgFail(joinMsg(txtBank.dbFailed, count), e),
            this.dbFailed = (count, e) => msgFail(thisApp.txtBank.message.dbFailed.parseTemplate({count:count}), e);
            //this.appFailed = e => msgFail(thisApp.txtBank.message.appFailed + thisApp.txtBank.message.loadBd, e);
            //deleteVendorFailed: (vName, e) => msgFail(joinMsg(txtBank.deleteVendorFailed, vName), e),
            this.deleteVendorFailed = (vName, e) => msgFail(thisApp.txtBank.message.deleteVendorFailed.parseTemplate({vName:vName}), e);
            //submitFormFailed: (vName, e) => msgFail(joinMsg(txtBank.submitFormFailed, vName), e),
            this.submitFormFailed = (vName, e) => msgFail(thisApp.txtBank.message.submitFormFailed.parseTemplate({vName:vName}), e);
            this.submitFormSucess = vName => msgFlash(thisApp.txtBank.message.submitFormSucess.parseTemplate({vName:vName}));
            //submitPassFailed: (vName, e) => msgFail(joinMsg(txtBank.submitPassFailed, vName), e),
            this.submitPassFailed = (vName, e) => msgFail(thisApp.txtBank.message.submitPassFailed.parseTemplate({vName:vName}), e);
            this.fileHandlerFailed = e => msgFail(thisApp.txtBank.message.fileHandlerFailed, e);
            this.offline = _ => msgErr(thisApp.txtBank.message.offline);
            this.online = _ => msgFlash(thisApp.txtBank.message.online);
            this.credFormPinTooLong = _ => msgErr(thisApp.txtBank.message.credFormPinTooLong);
            this.credFormPassTooLong = _ => msgErr(thisApp.txtBank.message.credFormPassTooLong);
            this.persistedDeleted = _ => msgErr(thisApp.txtBank.message.persistedDeleted);
            this.persistedBadPin = count => msgErr(thisApp.txtBank.message.persistedBadPin.parseTemplate({count:count}));
            this.dbCredentialsChangeSucess = _ => msgFlash(thisApp.txtBank.message.dbCredentialsChangeSucess);
            this.dbCredentialsChangeFail = _ => msgErr(thisApp.txtBank.message.dbCredentialsChangeFail);
            this.emergDbCreated = _ => msgFlash(thisApp.txtBank.message.emergDbCreated);
        };
        
        
        
/* UI -------- UI ---------- UI -------- UI ---------- UI -------- UI ---------- UI -------- UI ---------- UI -------- UI ----------*/
        
        
        function UI(){

            const ado = thisApp.displayOptions;
            const adoDetails = ado.details;
            const adoSorts = ado.sorts;

            let listScrollWrpPrevTopPosition = 0;
            
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                      //console.log( content );
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
                      //paintList();
                      console.log(amendedVendary);
                   }
                }
                input.click();
            }
            let count = null;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

            async function paintFormSection(addHistory, vendObj, edit, submitForm, toggleForm){
                const txtAppHtmls = thisApp.txtBank.app.htmls;

                let vFormScrollTop = 0;
                const vForm = dom.adDiv("scrollWrp").on("scroll", e => vFormScrollTop = e.target.scrollTop);
                if(addHistory) window.history.pushState({formOpen: true}, '', '');
                if (count) getCvs(); count = null;
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
                        thisApp.dbStoreUpdateAll(vendObj, true).then(success => thisApp.message.submitFormSucess(vendObj.name)).catch(err => thisApp.message.submitFormFailed(vendObj.name, err)); // Change The arguments - are they needed?
                        repaintUI();
                    }
                }
                
                vendObj = new thisApp.crypto.Vendor(vendObj, thisApp.dbObj.vendors); // 
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

/*                 function copyClipboard(value, msgName){
                    window.navigator.vibrate(50);
                    navigator.clipboard.writeText(value).then(_ => thisApp.message[msgName]());
                } */
                
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
                            getSvgIcon("minus", "minusBtn", _ => changeRangeInputValue(-1)),
                            rangeInputEl,
                            getSvgIcon("plus", "plusBtn", _ => changeRangeInputValue(1))
                        ]);
                    };
                    
                    const cplxInpFieldset = displayMode ? [] : getRangeInpFieldset(thisApp.crypto.vPass.minComplex, thisApp.crypto.vPass.maxComplex, vendObj.cplx || thisApp.crypto.vPass.dfltComplex, "cplx", txtAppHtmls.formLabelPassCplx + " (" + (vendObj.cplx || thisApp.crypto.vPass.dfltComplex) + ") ");
                    const lenInpFieldset =  displayMode ? [] : getRangeInpFieldset(thisApp.crypto.vPass.minLen, thisApp.crypto.vPass.maxLen, vendObj.len || thisApp.crypto.vPass.dfltLen, "len", txtAppHtmls.formLabelPassLen + " (" + (vendObj.len || thisApp.crypto.vPass.dfltLen) + ") ");
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
                        130:"excellent", // doskonale
                        200:"superior" // wybitne //celujace, wybitne, wysmienite, mistrzowskie, wyborne, wspaniale, znakomite, perfekcyjne, kapitalne
                    };
                    const vendorPassGrade = passwordStrengthGrades[Object.keys(passwordStrengthGrades).filter(grade => parseInt(grade) < vendorPassEntropy).pop()]
                    const passRating = displayMode ? [] : dom.adDiv("passRating " + vendorPassGrade).attachAry([
                        dom.adDiv("passRatingRow passRatingLabelRow").attachAry([
                            dom.adDiv("", txtAppHtmls.formLabelPassEntropy + ":"),
                            dom.adDiv("", txtAppHtmls.formLabelPassGrade + ":")
                        ]),
                        dom.adDiv("passRatingRow passRatingValueRow").attachAry([
                            dom.adDiv("", vendorPassEntropy),
                            dom.adDiv("", txtAppHtmls.vendorPassGradeVal[vendorPassGrade])
                        ])
                    ]);
                     
                    return vendObj.cPass && displayMode ? [] : passFieldset.attachAry([
                        getPassEyeIcon(passInpEl),
                        passInpEl,
                        displayMode ? getCopyIcon(passInpEl, "copyPassBtn", "passCopied") : getSvgIcon("newPassBtn", "newPassBtn", getNewPass),
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
                
                const boxNoteEl = dom.addTextarea("boxNote").setAttr("name", "note").setAttr("placeholder", txtAppHtmls.formLabelNote).setAttr(displayMode ? "disabled" : "enabled", true).on("input", e => { // Resize boxNote textarea
                    if(e.isTrusted) changeVprop(e); // only user input and not the dispatched event
                    const boxNoteEl = e.target;
                    boxNoteEl.style.height = "auto";
                    if(boxNoteEl.scrollHeight <= boxNoteEl.clientHeight){
                        boxNoteEl.killClass("max").rows = "2";
                    }else if(!boxNoteEl.hasClass("max")){
                        boxNoteEl.addClass("max").rows = "1";
                    }
                    boxNoteEl.style.height = boxNoteEl.scrollHeight + "px";
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
                        isURL(vendObj.url) && displayMode ? dom.add("a").setAttr("href", vendObj.url).setAttr("target", "_blank").setAttr("rel", "noreferrer").attach(getSvgIcon("openLinkBtn", "openLinkBtn")) : getClearInputIcon(_ => clearFormInput(urlInpEl))
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
                
                const formActionBtnName = displayMode ? "editFormBtn" : "submitFormBtn";
                const formHead = dom.adDiv("formHead").attachAry([
                    getSvgIcon(formActionBtnName, formActionBtnName, _ => paintFormSection(false, vendObj, displayMode, !displayMode)),
                    dom.adDiv("formTitle " + (vendObj.isNew && vendObj.isNote ? "newNote" : vendObj.isNew ? "newLog" : ""), vendObj.name || ""),
                    getSvgIcon("btnCloseForm", "btnCloseForm", _ => closeForm(displayMode)),
                    displayMode ? dom.adDiv("recordModWrp").attachAry([ // Show only if Display
                        dom.adDiv("recordDate").attachAry([
                            dom.addSpan("vCr8DateLabel"),
                            dom.addSpan("vCr8Date", new Date(vendObj.cr8).toUKstring()),
                        ]),
                        getSvgIcon(vendObj.isNote ? "formIconTypeNote" : "formIconTypeLog", "No Title"),
                        dom.adDiv("recordDate").attachAry([
                            dom.addSpan("vModDate", new Date(vendObj.mod).toUKstring()),
                            dom.addSpan("vModDateLabel"),
                        ]),
                    ]): []
                ]);
                
                const formSectionsAry = [//htmls
                    createStandardSection("name", txtAppHtmls.formLabelName),
                    vendObj.isNote ? [] : createLogSection(txtAppHtmls.formLabelLog),
                    vendObj.isNote ? [] : await createPassSection(txtAppHtmls.formLabelPass),
                    vendObj.isNote ? [] : createCustomPassSection(txtAppHtmls.formLabelCustomPass),
                    createNotesSection(txtAppHtmls.formLabelNote),
                    createUrlSection(txtAppHtmls.formLabelUrl),
                    createStandardSection("tags", txtAppHtmls.formLabelTags),
                ]
                
                const toggleIconName = vendObj.isNote ? "toggleToLog" : "toggleToNote";
                const formFoot = displayMode ? null : dom.adDiv("formFoot").attachAry([
                    vendObj.isNew ? [] : getSvgIcon("trashBin", "deleteVendorBtn", async _ => {
                        
                        if(!await thisApp.alert.deleteVendor(vendObj.name)) return thisApp.message.deleteVendorReject(vendObj.name);

                        thisApp.dbObj.vendors = thisApp.dbObj.vendors.filter(vObj => vObj.id !== vendObj.id);
                        thisApp.dbStoreUpdateAll(vendObj, true).then(success => {
                            console.log("successfully DELETED: ", vendObj); 
                            thisApp.message.vendorDeleted(vendObj.name);
                            repaintUI();
                        }); // Change The arguments - are they needed?
                        return closeForm(true);
                    }),
                    getSvgIcon(toggleIconName, toggleIconName, _ => {
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


    /////////////////////////////////////////////////MAIN - LIST APP SECTION!!!!!!! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            function paintListSection(){

                const getEmergencyHtml = async _ => {

                    function downloadFile(content, fName){
                        const dbUrl = window.URL.createObjectURL(new Blob([content], {type : 'text/html'}));
                        const a = document.createElement("a");
                        a.setAttribute("href", dbUrl);
                        a.setAttribute("download", fName);
                        a.click();
                        window.URL.revokeObjectURL(dbUrl);
                    }
                    
                    async function unlockDb(e){
                        e.preventDefault();
                        const dom = new Dom(document);
                        const dbCipherU8Ary = new Uint8Array(dbCipherString.split(",").map(x => +x)); // change the cipher string to array of integers, then to Uint8Array
                        const emgApp = {};// create a new App object
                        emgApp.crypto = new Crypto(emgApp);
                        const cryptoKeyObj = await emgApp.crypto.getCryptoKeyObjFromPlains(dbCipherU8Ary, inputBoxPass.value, inputBoxPin.value).catch(err => null);
                        const [dbObject] = await emgApp.crypto.getDbObjectFromCipher(dbCipherU8Ary, cryptoKeyObj).catch(err => ([null]));
                        document.body.ridKids();
                        if(!dbObject) return alert("Error");
                        
                        emgApp.dbObj = new emgApp.crypto.DatabaseObject(dbObject);
                        const vendAry = emgApp.dbObj.vendors;
                        emgApp.dbObj.vendors.forEach(async vendObj => {
                            vendObj.pass = await vendObj.getCurrentPassword().then(passObj => passObj.vendorPassString);
                            vendObj.cr8 = new Date(vendObj.cr8).toLocaleString('en-GB', { timeZone: 'Europe/London' });
                            vendObj.mod = new Date(vendObj.mod).toLocaleString('en-GB', { timeZone: 'Europe/London' });
                        });

                        dom.adDiv("btnWrp")
                        .attach(
                            dom.add("button").html("Download CVS").onClick(e => {
                                downloadFile(
                                    vendAry.map(vendObj => Object.keys(vendObj).map(prop => '\r\n' + prop + ':,' + ('' + vendObj[prop]).replace(/[,\t\n\r]/gm,' _ ')).join('') + '\r\n').join(''),
                                    'dbEmrg_' + new Date().toISOString().slice(0,19).replaceAll(':', '_') + '.csv'
                                );
                                e.target.kill();
                            })
                        )
                        .attach(
                            dom.add("button").html("Show Records").onClick(e => {
                                document.body.attachAry(vendAry.map(vendObj => dom.adDiv("account").attachAry(Object.keys(vendObj).map(key => dom.adDiv("prop").attachAry([dom.addSpan("key", key + ":"), dom.addSpan("val", vendObj[key])])))));
                                e.target.kill(); //account
                            })
                        ).attachTo(document.body);
                    }
                    
                    const constStr = "document.querySelector('form').addEventListener('submit', unlockDb); const dbCipherString= '" + await thisApp.getEncryptedDb()  + "';";
                    const scriptString = [Dom, Crypto, downloadFile, unlockDb, constStr].map(f => f.toString()).join('');
                    
                    const doc = document.implementation.createHTMLDocument("LPM Emergency");
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
                    downloadFile('<!DOCTYPE html>' + doc.documentElement.outerHTML, "lpm_" + new Date().toISOString().slice(0,19).replaceAll(':', '').replace('T', '_') + ".html");
                    thisApp.message.emergDbCreated();
                };
                

                
                /////////////////////////////////////////////////////////////////////////////////
                
                
                const getDonate = _ => {
                    
                     console.log("TO DO getDonate");
                    
                    let fileLoaded = false;
                    new Promise((resolve, reject) => {
                        function readFile(e){
                            const reader = new FileReader();
                            reader.onload = resolve;
                            reader.onerror = reject;
                            reader.readAsArrayBuffer(e.target.files[0]);
                        }
                        function checkFilePicked(){
                            document.body.onfocus = null;
                            thisApp.spinner.on();
                            setTimeout(_ => {
                                if(!fileLoaded) reject("File Not Loaded");
                            }, 10000);
                        }
                        document.body.onfocus = checkFilePicked;
                        thisApp.message.pickFileFR();
                        dom.add("input").setAttr("type", "file").on("input", readFile).click();
                    }).then(async loadEvent => {
                        fileLoaded = true;
                        const credentialsResponseAry = await thisApp.credentials.pinPass(true, false);
                        const importedDBJson = await thisApp.decodeToJson(loadEvent.target.result, credentialsResponseAry, 0, true).catch(err => console.log(err)).finally(_ => thisApp.spinner.off());
                        console.log(importedDBJson);
                    }).catch(err => {
                        thisApp.message.noFilePickedErr();
                        thisApp.spinner.off()
                    });


                    
                    
                    
                    

                    
                    
                }

                const getChangePassword = async _ => {
                     thisApp.changeCredentials().then(e => {thisApp.message.dbCredentialsChangeSucess();}).catch(err => {thisApp.message.dbCredentialsChangeFail();}).finally(thisApp.spinner.off); // if not in brackets the finally function does not fire!!!
                }
                
                // -------------------------- APP_TASKBAR and APP_MORETASKBAR -------------------------------/
                const getAppMoreTaskbar = _ => dom.adDiv("appMoreTaskbar").attachAry([
                    getSvgIcon("reloadApp", "reloadApp", thisApp.reload),
                    dom.adDiv("syncIconWrp").attachAry([
                        getSvgIcon("changeDbPass", "changeDbPass", getChangePassword),
                        getSvgIcon("donate", "No Title", getDonate),
                        getSvgIcon("syncIcon emergDb", "emergDb", getEmergencyHtml),
                        langModule(thisApp, repaintUI)
                    ]),
                    getSvgIcon("arrowUp", "hide", (e => e.target.forebear(1).toggleClass("appMoreTaskbarShow"))),
                ]);
                const searchInputEl = getInpEl({
                    type: "text",
                    name: "inputBoxSearch",
                    id: "inputBoxSearch",
                    placeholder: thisApp.txtBank.app.placeholders.inputBoxSearch
                    
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
                    getSvgIcon("inputBoxSearchBtn", "inputBoxSearchBtn", searchFormEl.showForm),
                    dom.adDiv("syncIconWrp").attachAry([
                        thisApp.dbStore.local.syncIcon,
                        thisApp.dbStore.dbxFile.syncIcon,
                        thisApp.dbStore.localFile.syncIcon
                    ]),
                    getSvgIcon("moreMenu", "moreMenu", e => e.target.forebear(1).sibling(1).toggleClass("appMoreTaskbarShow")),
                    searchFormEl
                ]);
                
                const vListMainBarWrp = dom.adDiv("vlistBarWrp vListMainBarWrp").attachAry([
                    getAppTaskbar(),
                    getAppMoreTaskbar()
                ]);
                
                // ---------------------------------- vListTaskBarWrp ----------------------------//
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
                
                // Attach List Section
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
                            Asc: ary => ary.sort((a,b) => a.id - b.id),
                            Desc: ary => ary.sort((a,b) => b.id - a.id)
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
                    vListBarLabel.html(hits ? "" : thisApp.txtBank.app.htmls.vListHeads.notFound.parseTemplate({searchStr: searchStr}));
                    
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

                    appendTovList(nameHitAry, thisApp.txtBank.app.htmls.vListHeads.nameFound, true);
                    appendTovList(tagHitAry, thisApp.txtBank.app.htmls.vListHeads.tagsFound.parseTemplate({searchStr: searchStr}));
                    appendTovList(noteHitAry, thisApp.txtBank.app.htmls.vListHeads.notesFound.parseTemplate({searchStr: searchStr}));
                    
                    //checkIfScroll();
                    requestAnimationFrame(_ => listScrollWrp.scrollHeight > listScrollWrp.clientHeight ? listScrollWrp.addClass("scrollWrpOverflow") : listScrollWrp.killClass("scrollWrpOverflow"));
                }

                appSectionList.ridKids().attachAry([
                    listScrollWrp,
                    getSvgIcon("addVendorBtn", "addVendorBtn", _=> paintFormSection(true, null)) // paint form and add to windows history
                ]);
                
                paintList();
                listScrollWrp.scrollTop = listScrollWrpPrevTopPosition
            } // END paintListSection

            function resetUI(){
                appSectionForm.hide();
                appSectionList.show();
            }

            function repaintUI(){
                dbModified.txt(new Date(thisApp.dbObj.mod).toUKstring()).show();
                paintListSection();
                thisApp.spinner.off();
            }
            
            const initUI = _ => {
                window.addEventListener('popstate', resetUI);
                repaintUI();
                resetUI();
            };
            
            this.init = initUI;
        }
        
        return [spinnerSection, Loader, new Credentials(), new UI(), new Alerts(), new Messages()];
    }



    

    
    
    
/*     Alerts (onpopstate) (No lang Change)
    Messages (independent) (No lang Change)
    Credentials (onpopstate) (No lang Change)
    LoadWrp (onpopstate) (Lang Change)
    UI: (onpopstate) (Lang Change)
        ListSection
        FormSection
    Working (independent) (No lang Change) */
    
    
    
    //message
    
    
    
    
    
    
    