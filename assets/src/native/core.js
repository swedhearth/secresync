/* 'frequent_0.035_GitHub' */
"use strict";

const developerMode = true; // Global constant for printing console

const mobileDebugAry = [];
const mobileDebug = (...msg) => {
    mobileDebugAry.push([new Date().toISOString(), msg.join(", ")]);
};

// Native prototypes
Date.prototype.toUKstring = function(){
    return this.toLocaleString('en-GB');
};

String.prototype.parseTemplate = function(injectObj, fallback = '~_~') {
    const str = this.replace(/<br>/g, "\r\n");
    return injectObj ? str.replace(/\${[^{]+}/g, (match) => match.slice(2, -1).trim().split('.').reduce((res, key) => res[key] || fallback, injectObj)).replaceAll("<br>", "\r\n") : str;
};

String.prototype.cleanHtmlTags = function(){
   return this.replace(/(<([^>]+)>)/ig, " ").replace(/\s+/g, " "); //string.replaceAll(/(<([^>]+)>)/i, " ").replaceAll(/\s+/, " ");
}

/* ****************************------------------------------------- End Prototypes  -------------------------------------***********************************/

/* ****************************-------------------------- Global downloadFile and PickFile functions ---------------------***********************************/
function downloadFile(fileBlob, fileName) {
    const a = document.createElement("a");
    const dbUrl = URL.createObjectURL(fileBlob);
    const [fName, fExt] = fileName.split('.');
    const [ukDate, ukTime] = new Date().toLocaleString('en-GB').split(', ');
    const [day, month, year] = ukDate.split('/');
    const fTimeStamp = `${year}-${month}-${day}_${ukTime.replace(/:/g, '-')}`;

    a.href = dbUrl;
    a.download = `${fName}_${fTimeStamp}.${fExt}`;
    document.body.appendChild(a); // Append to body to ensure visibility in all browsers
    a.click();
    document.body.removeChild(a); // Clean up
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
        document.body.appendChild(input); // Ensure input is in the DOM
        input.click();
        document.body.removeChild(input); // Clean up immediately after click
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

/* ****************************------------------------------------- DOM v_1.2 -------------------------------------***********************************/
!function(e, t) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS (Node.js) environment
        if(developerMode) console.log("Dom is CommonJS (Node.js) environment");
        module.exports = t();
    } else if (typeof define === 'function' && define.amd) {
        // AMD environment
        if(developerMode) console.log("Dom is AMD environment");
        define([], t);
    } else if (typeof exports === 'object') {
        // CommonJS (browserify) environment
        if(developerMode) console.log("Dom is CommonJS (browserify) environment");
        exports.Dom = t();
    } else {
        // Global variable (browser)
        if(developerMode) console.log("Dom is Global variable (browser)");
        e.Dom = t();
    }
}(this, function() {
    return function Dom(doc) {
        "use strict";
        if(doc !== document) return null;
        
        const isObject = variable => variable && typeof variable === 'object' && variable.constructor === Object;
        const isObjectFilled = object => isObject(object) && Object.keys(object).length;
        
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
            onClick: (fn, opt) => el.on("click", e => !el.clickCancel && fn && fn(e), opt),
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
            html: innerHtml => {el.innerHTML = innerHtml || ""; return el;},
            txt: txt => {el.textContent = txt; return el;},
            kidsByClass: cssClass => [...el.getElementsByClassName(cssClass)],
            addTxtNode: txt => el.attach(doc.createTextNode(txt)),
            observedBy: oberver => {oberver.observe(el); return el;},
            addTooltip: tooltipTxt => {el.tooltip = tooltipTxt; return el;}
          };
          Object.entries(elMethods).forEach(([name, method]) => this[name] = method); // to not create a object constructor e.g.: function ElMethods(el) { this.addClass = function(cssClass){this.classList.add(cssClass); return this;}; ...}
        }
        
        const handleToolTip = (_ => {
            let toolTipShowTimer;
            let toolTipCloseTimer;
            let toolTip;
            const toolTipDelay = 800;
            const toolTipUpdatePosition = (left, top) => toolTip.setAttr("style", `left: ${left}px; top: ${top}px;`);
            
            return function(e) {
                if (!this.title) return;
                
                clearTimeout(toolTipCloseTimer);
                clearTimeout(toolTipShowTimer);

                if (e.type === "pointerdown") {
                    if(toolTip) toolTip.kill();
                    let {clientX, clientY} = e;
                    
                    toolTip = dom.addDiv("toolTip").attachTo(doc.body);
                    toolTipUpdatePosition(clientX, clientY).txt(this.title).show();
                    
                    const { top, height, left, width } = toolTip.getBoundingClientRect();
                    const bottomOut = top + height + REM > doc.body.clientHeight;
                    const leftOut = left + width + REM > doc.body.clientWidth;

                    if (bottomOut) clientY -= height + REM;
                    if (leftOut) clientX -= width + REM;
                    if (bottomOut || leftOut) toolTipUpdatePosition(clientX, clientY);
                    
                    toolTip.hide();
                    
                    toolTipShowTimer = setTimeout(() => {
                        this.clickCancel = true;
                        window.navigator.vibrate([100, 100, 100]);
                        toolTip.show();
                    }, toolTipDelay);
                } else {
                    setTimeout(() => { this.clickCancel = false; }, toolTipDelay);

                    toolTipCloseTimer = setTimeout(() => {
                        if(toolTip) toolTip.kill();
                    }, toolTipDelay * 3);
                }
            };
        })();
        
        const dom = el => {
            const elMethods = new ElMethods(el);
            const protoObj = Object.getPrototypeOf(elMethods); // Object of ElMethods prototypes (as a result of dom.extendElMethods function)
            const protoIsSet = Object.keys(protoObj).length;

            for (const method in elMethods) el[method] = protoObj[method] || elMethods[method]; //include prototypes - prototypes take priority

            el.on("pointerdown", handleToolTip);
            el.on("pointerup", handleToolTip);
            el.on("pointerleave", handleToolTip);
            el.on("pointercancel", handleToolTip);
            return el;
        };
        const create = tag => doc.createElement(tag);
        const coreRawTags = ["div", "span", "button", "form", "fieldset", "legend", "input", "textarea", "label"];
        const rawElObj = coreRawTags.reduce((obj, tag) => ({ ...obj, [tag]: create(tag)}), {}); // object containing raw, empty HTML element (div, form, button, etc)
        const domClone = (rawEl, css, txt) => dom(rawEl.cloneNode(true)).cssName(css || "").txt(txt || "");

        const getHandleName = tag => "add" + tag.charAt(0).toUpperCase() + tag.slice(1);// e.g. addDiv, addInput, etc.
        
        // Add a specific tags handle to the dom object, e.g. dom.addDiv will become: (css, txt) => domClone(rawElObj[tag] (an empty HTML element), css, txt);
        const addDomHandle = tag => { 
            const handleName = getHandleName(tag);
            dom[handleName] = (classNames, textContent) => domClone(rawElObj[tag], classNames, textContent); //classNames & textContent : String
        };
        
        const getDomHandles = tags => tags.reduce((acc,  tag) => {
            const isCoreTag = coreRawTags.includes(tag);
            return {...acc, 
                [getHandleName(tag)] : {
                   f: dom[getHandleName(tag)],
                   custom: !isCoreTag
                }
            }
        }, {});

        dom.setCustomHandles = customRawTags => {
            customRawTags.forEach(tag => {
                rawElObj[tag] = create(tag);
                addDomHandle(tag);
            });
            return getDomHandles(customRawTags);
        };

        dom.addSvg = attrsObj =>  dom(doc.createElementNS('http://www.w3.org/2000/svg', 'svg')).setAttrs(attrsObj);
        dom.addPath = attrsObj => dom(doc.createElementNS('http://www.w3.org/2000/svg', 'path')).setAttrs(attrsObj);
        dom.addSvgPath = (viewBox, d) => dom.addSvg({viewBox: viewBox}).attach(dom.addPath({d: d}));
        
        dom.extendElMethods = extendedElMethodsObj => Object.entries(extendedElMethodsObj).forEach(([name, method]) => ElMethods.prototype[name] = method);
        dom.getHandles = _ => getDomHandles(Object.keys(rawElObj)); 

        dom.add = tag => dom(create(tag));
        coreRawTags.forEach(rawTag => addDomHandle(rawTag));
        
        [...doc.querySelectorAll('*')].forEach(dom); // domify all the elements present in DOM at the start in the html document
        
        window.REM = parseInt(getComputedStyle(document.documentElement).fontSize);
        window.TOUCH_DEVICE = !!navigator.maxTouchPoints || (doc.body.on("touchstart", _ => window.TOUCH_DEVICE = true, {once: true}), false);
        
        return dom;
    };
});
    
/* ****************************------------------------------------- END DOM -------------------------------------***********************************/
    
/* ****************************------------------------------------- IDBX v_1.1-------------------------------------***********************************/
!function(e, t) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS (Node.js) environment
        if(developerMode) console.log("IdxDb is CommonJS (Node.js) environment");
        module.exports = t();
    } else if (typeof define === 'function' && define.amd) {
        // AMD environment
        if(developerMode) console.log("IdxDb is AMD environment");
        define([], t);
    } else if (typeof exports === 'object') {
        // CommonJS (browserify) environment
        if(developerMode) console.log("IdxDb is CommonJS (browserify) environment");
        exports.IdxDb = t();
    } else {
        // Global variable (browser)
        if(developerMode) console.log("IdxDb is Global variable (browser)");
        e.IdxDb = t();
    }
}(this, function() {
    return function IdxDb(dbName, version, storeName, keyPath = "name", returnValue = "value", idxDbErrorHandler){
        
        /* Example idxDb Error Handler:
            const idxDbErrorHandler = async (errMsg, error) => {
                console.error(errMsg, error); // Developer
                await this.alert.IdxDbError(); Alert of IDBX Failure
                this.idxDb = new Storage(null); // Clear all the idxDbMethod (e.g. this.set = (name, value) => null);
                await this.makePrivate(); // disable IDBX and reload app
            };
        */
        
        return new Promise(resolve => {
            const idxDbOpenReq = window.indexedDB.open(dbName, version);
            idxDbOpenReq.onupgradeneeded = e =>  e.target.result.createObjectStore(storeName, { keyPath });// Create an objectStore for this database;
            idxDbOpenReq.onsuccess = e => {
                const db = e.target.result;
                const idxDbMethod = async (method, name, value = null) => {
                    const query = value ? {[keyPath]: name, [returnValue]: value} : name;
                    try{
                        const tr = db.transaction(storeName, "readwrite");
                        tr.onerror = err => {
                            throw {errMsg: "IdxDb Transaction Error", err: err};
                        };
                        return await new Promise((res , rej) => {
                            const req = tr.objectStore(storeName)[method](query);
                            req.onsuccess = e => res(method === "get" ? e.target.result ? e.target.result.value : null : value);
                            req.onerror = err => rej(err);
                        }).catch(err =>{
                            throw {errMsg: "IdxDb Request Error", err: err};
                        });
                    }catch(err){
                        return idxDbErrorHandler("IdxDb Method Error:", err);
                    }
                };
                
                db.onerror = async err => {
                    await idxDbErrorHandler("Database error:", err);
                };
                
                db.onabort = async err => {
                    await idxDbErrorHandler("Database abort:", err);
                };
                
                db.onclose = async e => {
                    if(developerMode) console.log("Database closed: " + e); //Developer
                    this.exists = false;
                };
                
                this.exists = true;
                this.get = name => idxDbMethod("get", name);
                this.delete = name => idxDbMethod("delete", name);
                this.add = (name, value) => idxDbMethod("add", name, value);
                this.set = (name, value) => idxDbMethod("put", name, value);
                this.clear = _ => idxDbMethod("clear");
                this.destroySelf = _ => {
                    db.close();
                    const tr = window.indexedDB.deleteDatabase(dbName);
                    return new Promise((res , rej) => {
                        tr.onsuccess = e => res(true);
                        tr.onerror = err => rej(err);
                        tr.onblocked = e => res(true);
                    }).catch(async err => {
                        return idxDbErrorHandler("IdxDb destroySelf Error", err);
                    });
                };
                resolve(this);
            };
            
            idxDbOpenReq.onerror = async err => {
                await idxDbErrorHandler("idxDbOpenReq error - No IDXDB.", err);
            };
        }).catch(async err => {
            await idxDbErrorHandler("IdxDb return Promise Global Error", err);
        });
    }
});
/* ****************************------------------------------------- END IDBX -------------------------------------***********************************/
