/* 'core_0.012_GitHub' */
"use strict";
console.log("index core_0.012_GitHub");
/* 
TO DO:
- Google Drive Integration - Will not do
- decide on payment/supportDonate - To do
 
 UserSettings - and or AppDBObjUserSettiings (for app before loading the the db object - then another for after the DBObj has been loaded - e.g. number of revisions stored)make?
 catchSync vs catchLoad vs catchUpdate make correct
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
    if(!urlSearchParams) return;

    /* ------------------------------------------------------------ Initiate and start App -------------------------------------------------------------- */
    new App(urlSearchParams).init().then(app => {
        if(developerMode) console.log(app);
        window.addEventListener('popstate',  e => {
            if(!window.history.state){
                app.message.exitAppConfirm();
                window.history.pushState({lastBackExists: true}, '', '');
            }
        });
        window.addEventListener('online', app.connectivitychange);
        window.addEventListener('offline', app.connectivitychange);
        
        installServiceWorker(); // Install Service Worker
    }).catch(err => {
        console.log(err);
        document.documentElement.remove()
        alert("cant't initiate the Application");
    });
});


function installServiceWorker(){
    if(developerMode) console.log("are we installServiceWorker?");
    if(!navigator.serviceWorker || !navigator.onLine || !location.host){
        if(developerMode) console.log("navigator.serviceWorker: ", navigator.serviceWorker, " | navigator.onLine: ", navigator.onLine, " | location.host: ", location.host, "RETURNING");
        return;
    }
    if(developerMode) console.log("YES we are installServiceWorker?");
    async function onstateChange(){
        switch (this.state) {// Has service worker state changed?
            case 'installed':
                if(developerMode) console.log('installed');
                this.postMessage({ action: 'skipWaiting' });
                break;
            case "activating":
                if(developerMode) console.log("Now newWorker is activating");
                break;
            case "activated":
                if(developerMode) console.log('activated');
                break;
        }
    }

    navigator.serviceWorker.register('service-worker.js', {scope: '/secresync/'}).then(reg => {
        reg.addEventListener('updatefound', _ => {
            console.log("service-worker.js updateFound");
            reg.installing.addEventListener('statechange', onstateChange)
        });
        reg.update()
        .then(regUpd => console.log("service-worker.js register then update - is it updated now?"))
        .catch(err => {
                if(developerMode) console.error(err);
            if(window.confirm("Service Worker Update Failure. Reload App?")){
                window.location.reload();//window.location.replace(app.URL);
            }

        });
    }).catch(err => {
        if(developerMode) console.error("catch register('service-worker.js')", err);
        //app.message.error(e); //that never shows! - it does when trying to install the worker on the LOCAL file
    });

}
/* ****************** !!!!!!!!!!!!!!!!!!!!  END Install Service Worker !!!!!!!!!!!!!!!!!!!!!!! ****************** */

/* ****************** !!!!!!!!!!!!!!!!!!!!  Unregister Service Worker !!!!!!!!!!!!!!!!!!!!!!! ****************** */
function uninstallServiceWorker(){
    try{
        caches.keys().then(keyList => {
            for (let key of keyList) caches.delete(key);
        });

        navigator.serviceWorker.getRegistrations()
        .then(regs => {
            for(let reg of regs) reg.unregister();
        });
    }catch(e){
        return;
    }
}

/* ****************** !!!!!!!!!!!!!!!!!!!!  END Unregister Service Worker !!!!!!!!!!!!!!!!!!!!!!! ****************** */
