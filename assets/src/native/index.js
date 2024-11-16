/* 'frequent_0.021_GitHub' */
"use strict";
console.log("index core_0.015_GitHub");
/* 
TO DO:
- Google Drive Integration - Will not do
- decide on payment/supportDonate - To do
 
 UserSettings - and or AppDBObjUserSettiings (for app before loading the the db object - then another for after the DBObj has been loaded - e.g. number of revisions stored)make?
 catchSync vs catchLoad vs catchUpdate make correct
 
 alert before getChangePassword !!!!
 
 
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

Change the remember password hint and the checkbox text to: remember password. Password is remembered. / Remove the remembered password.... maybe make it in the unrolled hint

Make hint for new Password 

*/

// get url search parameters
mobileDebug("In Index. Start the History Check. window.history.state = ", JSON.stringify(window.history.state));
(async _ =>{
    let locationSearch = window.location.search; // if redirected, the location should be: "?code=code&state=state" || "?error=error&state=state" OR empty string
    if(locationSearch){
        mobileDebug("In Index. locationSearch is present. window.location.search = ", locationSearch);
        const wasHistoryLength = window.sessionStorage?.getItem("historyLength");
        mobileDebug("In Index. wasHistoryLength = ", wasHistoryLength);
        mobileDebug("In Index. window.history.length = ", window.history.length);
        
        if(wasHistoryLength){
            mobileDebug("In Index. will go back by = ", wasHistoryLength - window.history.length -2);
            window.sessionStorage.setItem("locationSearch", locationSearch);
            await new Promise(res => setTimeout(res, 300));//wait until disk is flushed 500ms,
            window.history.go(wasHistoryLength - window.history.length -2); //then go 2 pages back in history to avoid going to the cloud authorisation page
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
            mobileDebug("!!! IN INDEX - !!! This has been caught when no urlSearchParams and 5 seconds ellapsed. WILL RELOAD. history.state", JSON.stringify(window.history.state));
            alert("urlSearchParams returned null and 5 seconds has passed. reload the app");
            window.location.replace(window.location.origin + window.location.pathname);
        }, 5000);
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
        
        document.addEventListener('visibilitychange', thisApp.visibilityChange, {capture: true});
        
       // window.addEventListener('blur', thisApp.ui.blur, {capture: true});

        let appInstalled = false;
        window.addEventListener("appinstalled", () => {{
            thisApp.message.tempAppInstalled();
            appInstalled = true;
        }});
        window.addEventListener("beforeinstallprompt", async e => {
            e.preventDefault();
            if(appInstalled) return;
            const doInstal = await thisApp.ui.installApp(false);
            thisApp.message.tempPleaseDoInstallApp(doInstal);
            if(doInstal){
                const result = await e.prompt();
            }
        });




/* return; */
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
            if (window.confirm("Service Worker update failed. Reload app?")) {
                thisApp.reload();
            }
        });
    }).catch(err => {
        console.log(err);
        document.documentElement.remove()
        alert("cant't initiate the Application");
    });
});