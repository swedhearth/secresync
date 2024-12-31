/* 'frequent_0.84_GitHub' */
"use strict";
console.log("index core MobileOptimisation_97");
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
 

Export Database filtered - ui.js - exportDb function -  make add to history. Make History popstate to remove all class="disposableModalSection". Remove Trash from the list to export!!!!!!!

disposableModal - sort history back!!!!!!!!!!!!!


DONE !!!!!!! beforeMsgModule - hide when popping up!!!!!!!!!!!!!

DONE!!!hide sharing option if the account type is note

DONE!!! For notification history icon to be a bell or klepsydra (bell would be better)
DONE!!! revision history move to the bottom bar and hide the account modification bar when historical account is showing

DONE!!!!!!!! horizontal scroll bar  to make thin as vertical

TODO make all database icons as thick as the current expDb - And some other icons maybe a little fatter.

DONE!!! revision wrap to caption in the middle
DONE!!!!!!!!!! select the history button when revision displayed
DONE!!!!!!!!!!!!! bell fr historyclose button to arrowleft in Formexport account to finish
|Done!!swap main bar with taskbar
make some of the settings in the database (DbObj) settings directly

TODo - settings to display the current and the past credentials
TOTO- Time zone and timeformat setting
DONE!!! Blur disable from start

*/

// get url search parameters
mobileDebug("In Index. Start the History Check. window.history.state = ", JSON.stringify(window.history.state));
(async _ =>{
    let locationSearch = window.location.search; // if redirected, the location should be: "?code=code&state=state" || "?error=error&state=state" OR empty string
    if(locationSearch){
        const wasHistoryLength = window.sessionStorage?.getItem("historyLength");
        if(wasHistoryLength){ // Maybe if no history - then don;t do it?
            window.sessionStorage.setItem("locationSearch", locationSearch);
            await new Promise(res => setTimeout(res, 300));//wait until disk is flushed 500ms,
            const wasHistoryLengthInt = parseInt(wasHistoryLength); // not needed really
            let goBackBy = wasHistoryLengthInt - window.history.length - 2;
            if(wasHistoryLengthInt > window.history.length || window.history.length + goBackBy < 1){
                window.history.go(1 - window.history.length);
            }else{
                window.history.go(goBackBy); //then go 2 pages back in history to avoid going to the cloud authorisation page
            }
            return null;
        }
        window.location.replace(window.location.origin + window.location.pathname.replace("index.html", ""));
    }

    window.history.state || window.history.pushState({lastBackExists: true}, "", "");// add lastBackExists state if empty state

    while (!window.history.state.lastBackExists) {
        await new Promise(res => {
            window.addEventListener("popstate", res, {once:true}); //must add popstate as history back is delayed
            window.history.back();
        });
    }

    locationSearch = window.sessionStorage?.getItem("locationSearch") || "";
    window.sessionStorage?.removeItem("locationSearch");

    return Object.fromEntries(new URLSearchParams(locationSearch));
    
})().then(urlSearchParams => {

    console.log("urlSearchParams", urlSearchParams);
    if(!urlSearchParams){
        setTimeout(_ =>{
            if(confirm("IN INDEX - !!! This has been caught when no urlSearchParams and 2 seconds ellapsed. WILL RELOAD. history.state: " + JSON.stringify(window.history.state) + " - window.history.length = " + window.history.length)){
                window.location.replace(window.location.origin + window.location.pathname.replace("index.html", ""));
            }
        }, 2000);
        return;
    }

    /* ------------------------------------------------------------ Initiate and start App -------------------------------------------------------------- */
    new App(urlSearchParams).init().then(async thisApp => {
        if(developerMode) console.log(thisApp);

        window.addEventListener('online', thisApp.connectivitychange);
        window.addEventListener('offline', thisApp.connectivitychange);
        
        document.addEventListener('visibilitychange', thisApp.visibilityChange);
        window.addEventListener('blur', e => e.target === this && thisApp.ui.blur(true), {capture: true});

        const origViewPortHeightInt = parseInt(window.visualViewport.height); //800
        
        mobileDebug('origViewPortHeightInt', origViewPortHeightInt);
        
        let squeezedViewPortHeightInt = window.virtualKeyboardIsDisplayed = 0;
        let resizeDelay;
        let transformDelay;
        let disableResize = false;
        
        window.testWithVitualKeyboard = true;

        const viewportResizeHandler = e => {
            mobileDebug("viewportResizeHandler triggered. eventViewPortHeightInt: ", parseInt(e.target.height), "squeezedViewPortHeightInt", squeezedViewPortHeightInt);
            if(disableResize) return;
            clearTimeout(resizeDelay);
            const eventViewPortHeightInt = parseInt(e.target.height);

            if(origViewPortHeightInt === eventViewPortHeightInt){//fully expands from 500 to 800 (original)
                squeezedViewPortHeightInt = 0;
            }else if(squeezedViewPortHeightInt && eventViewPortHeightInt !== squeezedViewPortHeightInt){ // contract 500 to 400 or other way
                resizeDelay = setTimeout(_ => { //wait as it may be squeezing back from 500 to 400
                    squeezedViewPortHeightInt = eventViewPortHeightInt; // either 400 or 500
                    document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
                }, 50);
                return;
            }else{ // if body was not squeezed, now it will be squeezed
                resizeDelay = setTimeout(_ => {
                    squeezedViewPortHeightInt = eventViewPortHeightInt; // either 400 or 500
                }, 500); //500
            }

            document.documentElement.style.setProperty("--body-height", `${e.target.height}px`);
            
            mobileDebug("viewportResizeHandler triggered. Body Size set to: ", e.target.height);
        };

        const viewportScrollHandler = e => {
            if (testWithVitualKeyboard && "virtualKeyboard" in navigator) {
                if(e.target.offsetTop){
                    disableResize = true;
                    navigator.virtualKeyboard.overlaysContent = true;
                }else{
                    setTimeout(_ => {
                        disableResize = false;
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

        window.visualViewport.addEventListener('scroll', viewportScrollHandler);
        window.visualViewport.addEventListener('resize', viewportResizeHandler);
        mobileDebug("viewportScrollHandler and viewportResizeHandler addEventListener. virtualKeyboard in navigator = ", "virtualKeyboard" in navigator);

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