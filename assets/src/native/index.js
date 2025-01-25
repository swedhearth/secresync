/* 'frequent_0.84_GitHub' */
"use strict";
console.log("index core MobileOptimisation_97");
/* 
TO DO:
IN PROGRESS - decide on payment/supportDonate - To do

TODO- Time zone and timeformat setting

TODO -Check the persist password methods on live production server ->  the "online" Alert - not available -> is it an close button to not save on the device? -> ALSO check the "offlineCredNoSave" alert -> wtf?

*/

// get url search parameters
(async _ =>{
    let locationSearch = window.location.search; // if redirected, the location should be: "?code=code&state=state" || "?error=error&state=state" OR empty string
    if(locationSearch){
        const wasHistoryLength = window.sessionStorage?.getItem("historyLength");
        if(wasHistoryLength){
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
        return null;
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
    if(!urlSearchParams){
        setTimeout(_ => {
            //urlSearchParams is null and 2 seconds ellapsed - it looks like we don't go back in history.
            window.location.replace(window.location.origin + window.location.pathname.replace("index.html", ""));
        }, 2000);
        return;
    }

    /* ------------------------------------------------------------ Initiate and start App -------------------------------------------------------------- */
    new App(urlSearchParams).init().then(async thisApp => {
        if(developerMode) console.log(thisApp);

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
                }, 200);
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
        
        window.visualViewport.addEventListener('scroll', viewportScrollHandler);
        window.visualViewport.addEventListener('resize', viewportResizeHandler);
        
        window.addEventListener('online', thisApp.connectivitychange);
        window.addEventListener('offline', thisApp.connectivitychange);
        
        window.addEventListener('blur', e => e.target === this && thisApp.ui.blur(true), {capture: true});
        
        document.addEventListener('visibilitychange', thisApp.visibilityChange);

    }).catch(err => {
        const crEl = tag => document.createElement('html'); 
        const createErrorPage = () => {

            const html = crEl('html');
            html.lang = 'en';

            const head = document.createElement('head');
            const metaCharset = document.createElement('meta');
            metaCharset.setAttribute('charset', 'UTF-8');
            const metaViewport = document.createElement('meta');
            metaViewport.setAttribute('name', 'viewport');
            metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            const title = document.createElement('title');
            title.textContent = 'Application Error';
            const style = document.createElement('style');
            style.textContent = `
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                }
                h1 {
                    font-size: 50px;
                }
                p {
                    font-size: 20px;
                }
                a {
                    color: #007BFF;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            `;

            head.append(metaCharset, metaViewport, title, style);

            const body = document.createElement('body');
            const h1 = document.createElement('h1');
            h1.textContent = 'Something Went Wrong';
            const p1 = document.createElement('p');
            p1.textContent = 'Cannot start the application.';
            const p2 = document.createElement('p');
            const a = document.createElement('a');
            a.href = window.location.origin + window.location.pathname.replace("index.html", "");
            a.textContent = 'Reload application';
            p2.appendChild(a);

            body.append(h1, p1, p2);

            html.append(head, body);

            return html;
        };
        
        if(developerMode){
            console.log(err);
            mobileDebug("In Index.  new App(urlSearchParams).init() catch error: ", JSON.stringify(err));
            if(confirm("new App(urlSearchParams).init() Failed. TRUE = Remove document and asow alert. FALSE = Do nothing, I will examin the error.")){
                document.documentElement.replaceWith(createErrorPage());
                alert("cant't initiate the Application");
            }
        }else{
            document.documentElement.replaceWith(createErrorPage());
        }
    });
});