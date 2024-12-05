/* 'frequent_0.84_GitHub' */
"use strict";
console.log("index core_0.084_GitHub");
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
 - history versions - DONE !!! 
 - app max width (if not mobile) - DONE !!! FOR ALL
 - AppLogOff seconds
 - app colour mode
 

Export Database filtered - ui.js - downloadCopyDB function -  make add to history. Make History popstate to remove all class="killablePopUp". Remove Trash from the list to export!!!!!!!

killablePopUp - sort history back!!!!!!!!!!!!!
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
             
            if(wasHistoryLength > window.history.length){
                alert("wasHistoryLength is greater than Now History Length. wasHistoryLength: " + wasHistoryLength + ". Now History Length = " + window.history.length + ". Will go back:  " + (1 - window.history.length));
                window.history.go(1 - window.history.length);
            }else if(window.history.length + goBackBy < 1){
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

        
        const origViewPortHeightInt = parseInt(window.visualViewport.height); //800
        console.log('origViewPortHeightInt',origViewPortHeightInt);
        //mobileDebug('origViewPortHeightInt', origViewPortHeightInt);
        let squeezedViewPortHeightInt = 0;
        let resizeDelay;
        let transformDelay;
        
        window.testWithVitualKeyboard = true;
        
        let stopResizing = false;

        const viewportResizeHandler = e => {
            if(stopResizing) return;
            const eventViewPortHeightInt = parseInt(e.target.height);
            
            clearTimeout(resizeDelay);

            if(origViewPortHeightInt === eventViewPortHeightInt){//fully expands from 500 to 800 (original)
                squeezedViewPortHeightInt = 0;
            }else if(squeezedViewPortHeightInt && eventViewPortHeightInt !== squeezedViewPortHeightInt){ // contract 500 to 400 or other way
                resizeDelay = setTimeout(_ => { //wait as it may be squeezing back from 500 to 400
                    squeezedViewPortHeightInt = eventViewPortHeightInt; // either 400 or 500
                    document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
                }, 100);
                return;
            }else{ // if body was not squeezed, now it will be squeezed
                resizeDelay = setTimeout(_ => {
                    squeezedViewPortHeightInt = eventViewPortHeightInt; // either 400 or 500
                }, 500);
            }

            document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
            
            mobileDebug("viewportResizeHandler triggered. Body Size set to: ", e.target.height);
        };

        const viewportScrollHandler = e => {
            if (testWithVitualKeyboard && "virtualKeyboard" in navigator) {
                if(e.target.offsetTop){
                    stopResizing = true;
                    navigator.virtualKeyboard.overlaysContent = true;
/*                     setTimeout(_ => {

                    }, 300); */
                }else{
                    setTimeout(_ => {
                        stopResizing = false;
                        navigator.virtualKeyboard.overlaysContent = false;
                    }, 500);
                }
            }else{
                clearTimeout(transformDelay);
                transformDelay = setTimeout(_ => {
                    document.documentElement.style.setProperty("--body-top-translateY", `${e.target.offsetTop}px`);
                }, 20);
            }
        };

        

/*         if (testWithVitualKeyboard && "virtualKeyboard" in navigator) {
            navigator.virtualKeyboard.overlaysContent = true;
            navigator.virtualKeyboard.addEventListener("geometrychange", (e) => {
                window.virtualKeboardIsVisible = e.target.boundingRect.height;
                mobileDebug("virtualKeyboard geometrychange. VirKeyboardHeight = ", e.target.boundingRect.height, ". Body height set to origViewPortHeightInt - virtualKeyboard.height: ", origViewPortHeightInt - e.target.boundingRect.height);
                //document.documentElement.style.setProperty("--body-height", `${origViewPortHeightInt - e.target.boundingRect.height}px`);
            }, {capture: true, passive: true});
        } */
/*         else{
            window.visualViewport.addEventListener('scroll', viewportTransformHandler);
            window.visualViewport.addEventListener('resize', viewportResizeHandler);
        } */
        
        
            window.visualViewport.addEventListener('scroll', viewportScrollHandler, {capture: true, passive: true});
            window.visualViewport.addEventListener('resize', viewportResizeHandler);
        




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


    }).catch(err => {
        console.log(err);
        mobileDebug("In Index.  new App(urlSearchParams).init() catch error: ", JSON.stringify(err));
        if(confirm("new App(urlSearchParams).init() Failed. TRUE = Remove document and asow alert. FALSE = Do nothing, I will examin the error.")){
            document.documentElement.remove();
            alert("cant't initiate the Application");
        }
        
        
    });
});