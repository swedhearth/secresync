/* 'core_0.015_GitHub' */
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
Log-off tied to visibility change
Local file database change textBank
DONE!!!  -Icons before sections headers - icons ::before name, log, link, note, etc

DONE - Scroll event tied to el.focus() - search input to lose focus
DONE - Maximum revisions - overwrite the oldest - is it done?

DONE!!!  -history - swipe from bottom to display all history messages
DONE!!! - Tooltips in mobile view for icons
DONE!!! - spinner - change


DONE!!! - redo the vdertical alignment in typeLog and typeNote

DONE!!! revisions - shorten the descryption to just date or v: xx/xx/xxxx tt:tt:tt



*/

// get url search parameters
(async _ =>{
    let locationSearch = window.location.search; // if redirected, the location should be: "?code=code&state=state" || "?error=error&state=state" OR empty string
    if(locationSearch){
        const wasHistoryLength = window.sessionStorage?.getItem("historyLength");
        if(wasHistoryLength){
            window.sessionStorage.setItem("locationSearch", locationSearch);
            await new Promise(res => setTimeout(res, 500));//wait until disk is flushed 500ms,
            window.history.go(wasHistoryLength - window.history.length -2); //then go 2 pages back in history to avoid going to the cloud authorisation page
            return null;
        }
        locationSearch = "";
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
        
        document.addEventListener('visibilitychange', thisApp.visibilityChange);
        
        
        let appInstalled = false;

        window.addEventListener("appinstalled", () => {appInstalled = true});
        window.addEventListener("beforeinstallprompt", async (event) => {
        event.preventDefault();
            if(appInstalled) return;
            const doInstal = await thisApp.ui.installApp();
            console.log(doInstal);
            const result = await event.prompt();
        });
        
/* setTimeout(async _ => {
            const doInstal = await thisApp.ui.installApp();
            console.log(doInstal);
}, 3000); */
        
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
                            //if (await thisApp.alert.newVersion()) thisApp.reload();
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