/* 'frequent_0.75_GitHub' */
"use strict";
console.log("index core_0.075_GitHub");
/* 
TO DO:
- Google Drive Integration - Will not do
- decide on payment/supportDonate - To do
 
 UserSettings - and or AppDBObjUserSettiings l(for app before loading the the db object - then another for after the DBObj has been loaded - e.g. number of revisions stored)make?
 catchSync vs catchLoad vs catchUpdate make correct
 
DONE - alert before getChangePassword !!!!
 
 
DONE - Theme to white.
DONE - Link section out of order
DONE - Log-off tied to visibility change
DONE - Local file database change textBank
DONE!!!  -Icons before sections headers - icons ::before name, log, link, note, etc

DONE - Scroll event tied to el.focus() - search input to lose focus
DONE - Maximum revisions - overwrite the oldest - is it done?

DONE!!!  -history - swipe from bottom to display all history messages
DONE!!! - Tooltips in mobile view for icons
DONE!!! - spinner - change


DONE!!! - redo the vdertical alignment in typeLog and typeNote

DONE!!! revisions - shorten the descryption to just date or v: xx/xx/xxxx tt:tt:tt

DONE!!! Change the remember password hint and the checkbox text to: remember password. Password is remembered. / Remove the remembered password.... maybe make it in the unrolled hint

DONE!!! Make hint for new Password 

Settings: 
 - history versions
 - app max width (if not mobile)
 - AppLogOff seconds
 - app colour mode
 

Export Database filtered - ui.js - downloadCopyDB function -  make add to history. Make History popstate to remove all class="killablePopUp". Remove Trash from the list to export!!!!!!!
*/

// get url search parameters
mobileDebug("In Index. Start the History Check. window.history.state = ", JSON.stringify(window.history.state));
(async _ =>{
    let locationSearch = window.location.search; // if redirected, the location should be: "?code=code&state=state" || "?error=error&state=state" OR empty string
    if(locationSearch){
        //mobileDebug("In Index. locationSearch is present. window.location.search = ", locationSearch);
        const wasHistoryLength = window.sessionStorage?.getItem("historyLength");
        //mobileDebug("In Index. wasHistoryLength = ", wasHistoryLength);
        //mobileDebug("In Index. window.history.length = ", window.history.length);
        
        if(wasHistoryLength){ // Maybe if no history - then don;t do it?
        
           
            
            //mobileDebug("In Index. will go back by = ", wasHistoryLength - window.history.length -2);
            window.sessionStorage.setItem("locationSearch", locationSearch);
            await new Promise(res => setTimeout(res, 300));//wait until disk is flushed 500ms,
            let goBackBy = wasHistoryLength - window.history.length -2;
            
             alert("wasHistoryLength: " + wasHistoryLength + ". Now History Length = " + window.history.length + ". Will go back:  " + goBackBy);
            if(window.history.length + goBackBy < 1){
                alert("wasHistoryLength minus goBackBy was less than 1. Will go back by: 1 - window.history.length =  " + (1 - window.history.length));
                
                window.history.go(1 - window.history.length);
            }else{
                window.history.go(wasHistoryLength - window.history.length -2); //then go 2 pages back in history to avoid going to the cloud authorisation page
            }
            // maybe it should be (wasHistoryLength - window.history.length - 1) e.g 5 - 2  + 1 = 3 + 1 = go(-4)
            return null;
        }
        locationSearch = "";
    }
    mobileDebug("In Index. after if(locationSearch). window.history.state = ", JSON.stringify(window.history.state));
    window.history.state || window.history.pushState({lastBackExists: true}, "", "");// add lastBackExists state if empty state
    
    let loop = 0;
    while (!window.history.state.lastBackExists) {
         mobileDebug("In Index. Promise number:", loop++, "window.history.state = ", JSON.stringify(window.history.state));
/*        console.log("In Index. Promise number: " + loop + ". window.history.state = " + JSON.stringify(window.history.state))
        await new Promise(res => setTimeout(res, 300)); // Allow  History to reload. 300ms should be enough */
        await new Promise(res => {
            window.addEventListener("popstate", res, {once:true}); //must add popstate as history back is delayed
            window.history.back();
        });
    }
    mobileDebug("In Index. after while loop - the final current history.state", JSON.stringify(window.history.state));
    locationSearch = window.sessionStorage?.getItem("locationSearch") || "";
    window.sessionStorage?.removeItem("locationSearch");
    
    return Object.fromEntries(new URLSearchParams(locationSearch));
    
})().then(urlSearchParams => {

    console.log("urlSearchParams", urlSearchParams);
    if(!urlSearchParams){
        setTimeout(_ =>{
            if(confirm("IN INDEX - !!! This has been caught when no urlSearchParams and 2 seconds ellapsed. WILL RELOAD. history.state: " + JSON.stringify(window.history.state) + " - window.history.length = " + window.history.length)){
                window.location.replace(window.location.origin + window.location.pathname);
            }
        }, 2000);
        return;
    }

    /* ------------------------------------------------------------ Initiate and start App -------------------------------------------------------------- */
    new App(urlSearchParams).init().then(thisApp => {
        if(developerMode) console.log(thisApp);
        window.addEventListener('popstate',  e => {
            if(!window.history.state){
                thisApp.message.exitAppConfirm();
                window.history.pushState({lastBackExists: true}, '', '');
            }
        });
        window.addEventListener('online', thisApp.connectivitychange);
        window.addEventListener('offline', thisApp.connectivitychange);
        
        document.addEventListener('visibilitychange', thisApp.visibilityChange);

        if( thisApp.URL !== "http://localhost:8080/" && location.host )window.addEventListener('blur', e => e.target === this && thisApp.ui.blur(true), {capture: true});
        
        const origViewPortHeightInt = parseInt(window.visualViewport.height);
        let virtualKeyboardIsDisplayed = false;
        
        mobileDebug("window.visualViewport.height:", window.visualViewport.height, "eventViewPortHeightInt: ", origViewPortHeightInt);
let viewPortDelay;
let shrunkDelay;
let unshrinkDelay;
let shrunkViewPortHeightInt;
let isShrunk = false;

let viewPortDelayb;


        const viewportHandler = e => {
            const eventViewPortHeightInt = parseInt(e.target.height);
            if(e.type === "resize"){
                mobileDebug("viewportHandler resize. e.target.height", e.target.height, "eventViewPortHeightInt: ", eventViewPortHeightInt);
               if(!isShrunk && origViewPortHeightInt > eventViewPortHeightInt){ //Not shrunk -> body is shrinking // keyboard shows 813 > 538
                    
                    clearTimeout(shrunkDelay);
                    shrunkDelay = setTimeout(_ => {
                        isShrunk = true;
                        shrunkViewPortHeightInt = eventViewPortHeightInt;
                        mobileDebug("isShrunk is true. shrunkViewPortHeightInt: ", shrunkViewPortHeightInt);
                    }, 100);
                    
                    mobileDebug("Shrinking to: ", e.target.height);
                    document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
                    
               }else if(isShrunk){ // height now is 400 or 500 //first unshrink -> can be to 500 or to 800 (if 500 it will be to 800) if 400 it will be to 500
                    clearTimeout(unshrinkDelay);
                    if(origViewPortHeightInt === eventViewPortHeightInt){ //ushrink to 500 to 800 (original)
                        isShrunk = false;
                        document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
                        mobileDebug("isShrunk was true. restored full screen: ");
                    }else if(eventViewPortHeightInt > shrunkViewPortHeightInt){ // unshrink 400 to 500
                    
                        mobileDebug("isShrunk is true. eventViewPortHeightInt > shrunkViewPortHeightInt. Will delay. eventViewPortHeightInt - shrunkViewPortHeightInt =  ", eventViewPortHeightInt - shrunkViewPortHeightInt);
                        unshrinkDelay = setTimeout(_ => { //wait as it may be


                            mobileDebug("unshrinkDelay fired. current eventViewPortHeightInt: ", eventViewPortHeightInt);
                            document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
                        }, 500);
                        
                    }else{ // shrinking 500 to 400
                        
                        mobileDebug("isShrunk is true. shrinking back (500 to 400)- : ");
                        
                        document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
                    }
                   
               }else if(origViewPortHeightInt === eventViewPortHeightInt){ //keyboard hides totally
                    mobileDebug("Back to full height: ", e.target.height);
                   document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
               }else{
                   clearTimeout(viewPortDelay);
                   viewPortDelay = setTimeout(_ => {
                    mobileDebug("Else e.target.height: ", e.target.height, "origViewPortHeightInt: ", origViewPortHeightInt, "origViewPortHeightInt === e.target.height: ", origViewPortHeightInt === e.target.height);
                   }, 50)
               }
            }
            
/*             if(origHeight === e.target.height){
                virtualKeyboardIsDisplayed = true;
            } */
            
/*             if(virtualKeyboardIsDisplayed){
                clearTimeout(viewPortDelay)
                viewPortDelay = setTimeout(_ => {
                    virtualKeyboardIsDisplayed = false;
                    
                    document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
                    document.documentElement.style.setProperty("--body-top-translateY", `${e.target.offsetTop}px`); 
                    
                },1000);
                
                
            }else{ */
                
                
/*                 mobileDebug("viewportHandler e type = ", e.type, "e.target.offsetTop: ", e.target.offsetTop, "e.target.height", e.target.height);
                
                document.documentElement.style.setProperty("--body-top-translateY", `${e.target.offsetTop}px`); 
                document.documentElement.style.setProperty("--body-height", `${e.target.height}px`); */
                
            //}
        };
        const viewportHandlerb = e => {
            clearTimeout(viewPortDelayb);
            
           viewPortDelayb = setTimeout(_ => {
                document.documentElement.style.setProperty("--body-top-translateY", `${e.target.offsetTop}px`);
            }, 300);
        };
        window.visualViewport.addEventListener('scroll', viewportHandlerb);
        window.visualViewport.addEventListener('resize', viewportHandler);
        
/* window.addEventListener('touchmove', (e) => {
    if (document.body.scrollTop > 0) {
        document.body.scrollTop = 0;
    }
}, { passive: false });

document.body.addEventListener('scroll', () => {
    if (document.body.scrollTop > 0) {
        document.body.scrollTop = 0;
    }
}, { passive: false }); */


        let appInstalled = false;
        window.addEventListener("appinstalled", () => {
            thisApp.message.tempAppInstalled();
            appInstalled = true;
            mobileDebug("app is Installed")
        });
        window.addEventListener("beforeinstallprompt", async e => {
            e.preventDefault();
            if(appInstalled) return;
            const doInstal = await thisApp.ui.installApp(false);
            thisApp.message.tempPleaseDoInstallApp(doInstal);
            if(doInstal){
                const result = await e.prompt();
            }
        });

        // Install Service Worker
        if (!navigator.serviceWorker || !navigator.onLine || !location.host) {
            if (developerMode) {
                console.log("navigator.serviceWorker:", navigator.serviceWorker);
                console.log("navigator.onLine:", navigator.onLine);
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
        .then(_ => developerMode && console.log("service-worker.js registered and fetched. Will check if update available."))
        .catch(err => {
            if (developerMode) console.error("Service worker registration error:", err);
            mobileDebug("In Index. navigator.serviceWorker.register catch error: ", JSON.stringify(err));
            
            if(confirm("Service Worker update failed. Reload app?. TRUE = Reload. FALSE = Do not reload, I will examin the error.")){
                thisApp.reload();
            }
            
        });
    }).catch(err => {
        console.log(err);
        mobileDebug("In Index.  new App(urlSearchParams).init() catch error: ", JSON.stringify(err));
        if(confirm("new App(urlSearchParams).init() Failed. TRUE = Remove document and asow alert. FALSE = Do nothing, I will examin the error.")){
            document.documentElement.remove();
            alert("cant't initiate the Application");
        }
        
        
    });
});