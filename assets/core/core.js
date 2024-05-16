    Date.prototype.toUKstring = function(){
        return this.toLocaleString('en-GB');//, { timeZone: 'Europe/London' }
    };

    String.prototype.parseTemplate = function(injectObj, fallback = '~_~') {
        const str = this.replaceAll("<br>", "\r\n");
        return injectObj ? str.replace(/\${[^{]+}/g, (match) => match.slice(2, -1).trim().split('.').reduce((res, key) => res[key] || fallback, injectObj)).replaceAll("<br>", "\r\n") : str;
    };
/* ****************************------------------------------------- End Prototypes  -------------------------------------***********************************/

/* ****************************-------------------------- Global downloadFile and PickFile functions ---------------------***********************************/
    function downloadFile(fileBlob, fileName) {
        const a = document.createElement("a");
        const dbUrl = URL.createObjectURL(fileBlob);
        const [fName, fExt] = fileName.split('.');
        const [ukDate, ukTime] = new Date().toUKstring().split(', ');
        const [day, month, year] = ukDate.split('/');
        const fTimeStamp = `${year}-${month}-${day}_${ukTime.replace(/:/g, '-')}`;

        a.href = dbUrl;
        a.download = `${fName}_${fTimeStamp}.${fExt}`;
        //document.body.appendChild(a); // Append to body to ensure visibility in all browsers
        a.click();
        //document.body.removeChild(a); // Clean up
        URL.revokeObjectURL(dbUrl);
        return a.download;
    }

    function pickFile(delay = 5000){
        return new Promise((resolve, reject) => {
            const input = document.createElement("input");
            let file;
            input.type = "file";
            input.onchange = e => {
                file = e.target.files[0];
                if (!file) return reject("noFilePickedErr");
                const reader = new FileReader();
                reader.onload = _ => resolve(reader.result);
                reader.onerror = _ => reject("noFilePickedErr");
                reader.readAsArrayBuffer(file);
            };
            input.oncancel = _ => reject("noFilePickedErr");
            input.onerror = _ => reject("noFilePickedErr");
            //document.body.appendChild(input); // Ensure input is in the DOM
            input.click();
            //document.body.removeChild(input); // Clean up immediately after click
        });
    };
/* ****************************------------------------- END Global downloadFile and PickFile functions --------------------***********************************/

/* ****************************------------------------------------------ isURL --------------------------------------------***********************************/
    function isURL(string){
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(string);
    };
/* ****************************------------------------------------- END isURL -------------------------------------***********************************/

/* ****************************------------------------------------- DOM -------------------------------------***********************************/
    function Dom(doc){
        function ElMethods(el) {
          const elMethods = {
            addClass: cssClass => {cssClass && el.classList.add(cssClass); return el;},
            addClasses: (...cssClasses) => {cssClasses.length && cssClasses.forEach(cssClass => el.classList.add(cssClass)); return el;},
            killClass: cssClass => {cssClass && el.classList.remove(cssClass); return el;},
            toggleClass: cssClass => {cssClass && el.classList.toggle(cssClass); return el;},
            hasClass: cssClass => el.classList.contains(cssClass),
            cssName: cssClasses => {cssClasses && (el.className = cssClasses); return el;},
            hide: _ => el.addClass("elNoDisplay"),
            toggleDisplay: _ => el.toggleClass("elNoDisplay"),
            show: _ => el.killClass("elNoDisplay"),
            isHidden: _ => el.hasClass("elNoDisplay"),
            slideOut: _ => el.addClass("elSlideOut"),
            slideIn: _ => el.killClass("elSlideOut"),
            ridKids: (idx = 0) => {while(el.children[idx]) el.removeChild(el.lastChild); return el;},
            on: (type, fn, opt) => {type && fn && el.addEventListener(type, fn, opt); return el;},
            onClick: (fn, opt) => el.on("click", fn, opt),
            selfClick: _ => {el.click(); return el;},
            attachTo: parentEl => {parentEl?.appendChild(el); return el;},
            attach: kidEl => {kidEl && el.appendChild(kidEl); return el;},
            attachAry: kidsAry => {kidsAry.length && el.append(...kidsAry); return el;},
            preattach: kidEl => {kidEl && el.prepend(kidEl); return el;},
            preattachAry: kidsAry => {kidsAry.length && el.prepend(...kidsAry); return el;},
            preattachTo: parentEl => {parentEl?.prepend(el); return el;},
            forebear: (level = 0) => [...Array(++level)].fill(el).reduce(acc => acc ? acc.parentElement : null), // array level 1 is the element itself, level 2 is a parent of the element, so el.forebear(1) is parent of element
            kids: _ => [...el.children],
            kid: (level = 0) => el.children[level], // level 0 = firstChild
            siblings: _ => [...el.parentElement.children],
            sibling: (level = 0) => el.siblings()[level + el.siblings().findIndex(e => e === el)] || null, // level 0 is the element itself, level 1 is the nextSibling, -1 is the previous sibling
            kill: _ => {el.remove(); return el;},
            setAttr: (name, value) => {el.setAttribute(name, value); return el;},
            setAttrs: attrsObj => isObjectFilled(attrsObj) ? Object.keys(attrsObj).reduce((acc, key) => el.setAttr(key, attrsObj[key]), el) : el,
            killAttr: (name) => {el.removeAttribute(name); return el;},
            addId: idName => el.setAttr("id", idName),
            html: innerHtml => {el.innerHTML = innerHtml; return el;},
            txt: txt => {el.textContent = txt; return el;},
            //clone: deep => dom(el.cloneNode(deep)),
            kidsByClass: cssClass => [...el.getElementsByClassName(cssClass)],
            addTxtNode: txt => el.attach(doc.createTextNode(txt)),
            observedBy: oberver => {oberver.observe(el); return el;},
            addTooltip: tooltipTxt => {el.tooltip = tooltipTxt; return el;}
          };
          Object.entries(elMethods).forEach(([name, method]) => this[name] = method); // to not create a object constructor e.g.: function ElMethods(el) { this.addClass = function(cssClass){this.classList.add(cssClass); return this;}; ...}
        }
      
        const dom = el => {
            const elMethods = new ElMethods(el);
            const protoObj = Object.getPrototypeOf(elMethods); // Object of ElMethods prototypes (as a result of dom.extendElMethods function)
            const protoIsSet = Object.keys(protoObj).length;
            for (const method in elMethods) el[method] = protoObj[method] || elMethods[method]; //include prototypes - prototypes take priority
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
    
/* ****************************------------------------------------- END DOM -------------------------------------***********************************/
    
/* ****************************------------------------------------- IDBX -------------------------------------***********************************/
    function IdxDb(dbName, version, storeName, keyPath = "name", returnValue = "value"){
        return new Promise(resolve => {
            const idxDbOpenReq = window.indexedDB.open(dbName, version);
            idxDbOpenReq.onupgradeneeded = e =>  e.target.result.createObjectStore(storeName, { keyPath: keyPath });// Create an objectStore for this database;
            idxDbOpenReq.onsuccess = e => {
                const db = e.target.result;
                const idxDb = (method, name, value = null) => {
                    const query = value ? {[keyPath]: name, [returnValue]: value} : name;
                    const tr = db.transaction(storeName, "readwrite").objectStore(storeName)[method](query);
                    return new Promise((res , rej) => {
                        tr.onsuccess = e => res(method === "get" ? e.target.result ? e.target.result.value : null : value);
                        tr.onerror = e => rej(e);
                    });
                }
                db.onerror = e => {console.error("Database error: " + e.target.errorCode, e); resolve (null)}

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


    /* --------------------------------------------------------- History State Manipulation and Location Search retrieval if redirected from cloud -------------------------------------------------------------- */

/*     const addModuleOpenToHistory = _ =>{
        if(window.history.state.moduleOpen){
            console.log("history.state Was moduleOpen do nothing");
        }else if(window.history.state.formOpen){
            console.log("history.state Was formOpen changed to moduleOpen");
            window.history.replaceState({moduleOpen: true},"","");
        }else{
            console.log("adding another moduleOpen history.state");
            window.history.pushState({moduleOpen: true}, "", "");
        }
    } */

/*     const getUrlSearchParams = _ =>{
        let locationSearch = window.location.search; // if redirected, the location should be: "?code=code&state=state" || "?error=error&state=state" OR empty string
        if(locationSearch){ //set locationSearch in sessionStorage and go back in history or (if in private mode) replace the empty state at redirection to 'redirect' state - will be used in popstate event.
            if(window.sessionStorage && window.localStorage.getItem("consent")){
                window.sessionStorage.setItem("locationSearch", locationSearch);
                setTimeout(_ => history.go(-2), 200); //wait until disk is flushed, then go 2 pages back in history to avoid going to the cloud authorisation page
                const end = Date.now() + 300;
                while (Date.now() < end); //synchronously block execution of the code to avoid unnecessary rendering of the app until back in history
                return {}; // not really needed - it will go back before it returns
            }else{
                window.history.replaceState({redirect: true}, "", window.location.pathname); //replace empty state with the 'redirect' state
            }
        }
        
        if(!window.history.state || window.history.state.redirect){ // add lastBackExists state if empty state or empty was replaced by the "redirect" state
            window.history.pushState({lastBackExists: true}, "", "");
        }
        if(window.history.state.formOpen){
            window.history.replaceState({moduleOpen: true},"","");
        }
        
        if(window.sessionStorage){
            locationSearch = locationSearch || window.sessionStorage.getItem("locationSearch") || ""; //could have been sessionStorage but no consent
            window.sessionStorage.removeItem("locationSearch");
        }
        return Object.fromEntries(new URLSearchParams(locationSearch));
    };
    
    const urlSearchParams = getUrlSearchParams();
    console.log("urlSearchParams:", urlSearchParams); */
    
/* ****************************------------------------------------- FETCH -------------------------------------***********************************/
/*     const fetchData = async (url = "", method, payload) => (
        await fetch(url, {
            method: method || "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {"content-type": "text/plain;charset=UTF-8"},
            body: method ? payload : null,
        })
    ).json();
    
    const getData = url => fetchData(url);
    const postData = (url, payload) => fetchData(url, "POST", payload);
    const postDataJson = (url, payloadObj) => postData(url, JSON.stringify(payloadObj)); */

/* ****************************------------------------------------- END FETCH -------------------------------------***********************************/

/* ****************************------------------------------------- Old Pick File - remove if no issues with the current -------------------------------------***********************************/
/*     const pickFile = async (delay = 5000) => {
        let fileContent = null;
        return new Promise((resolve, reject) => {
            function readFile(e){
                const reader = new FileReader();
                reader.onload = resolve;
                reader.onerror = reject;
                reader.readAsArrayBuffer(e.target.files[0]);
            }
            function checkFilePicked(){
                document.body.onfocus = null;
                setTimeout(_ => {
                    if(!fileContent) reject("noFilePickedErr");
                }, delay);
            }
            document.body.onfocus = checkFilePicked;
            const inp = document.createElement("input");
            inp.setAttribute("type", "file");
            inp.addEventListener("input", readFile);
            inp.click();
        })
        .then(loadEvent => (fileContent = loadEvent.target.result))
        .catch(err => {console.log(err); throw "noFilePickedErr";});
    }; */
/* ****************************------------------------------------- END Old Pick File - remove if no issues with the current -------------------------------------***********************************/
    
    
    