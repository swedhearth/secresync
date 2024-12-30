const shareForm = document.getElementById("shareForm");
const inputSharedPassInput = document.getElementById("inputSharedPassInput");
const outputSharedPassFieldset = document.getElementById("outputSharedPassFieldset");
const outputSharedPassInput = document.getElementById("outputSharedPassInput");

shareForm.addEventListener("submit", e => {
    e.preventDefault();
});

const baseChr2dAry = [ // excluded characters: " and '
    ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"], //alphanum91 = 62 chrs
    ["!,;.?:@$%*_&~"], //basicSpecial91a (13 chrs) = 75 chrs
    ["#^-+=[]{}()|`/<>"], //basicSpecialb91b (16 chrs) = 91 chrs
    Array.from({ length: 165 }, (_, idx) => String.fromCharCode(idx + 192)).join("")//extendedSpecial (165 chrs - 2byte characters) = 256 chrs (1 character for each byte of vendor password)
];

const chrAry = baseChr2dAry.flat().join("").split("");
console.log(chrAry.join(""))

let xorLocationPlainSafeB64; // this is in the location part of the url

    const b64From = (...iterables) => //ASYNC - uses native browser solution instead of Binary to ASCII (btoa) //data: iterable object such as an Array, ArrayBuffers, TypedArrays, DataViews, Blobs, strings, or a mix
        new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = _ => res(reader.result);
            reader.onerror = err => rej(err);
            reader.readAsDataURL(new Blob(iterables));
        });
    const safeB64From = (...iterables) => b64From(...iterables).then(b64 => b64.substring(b64.indexOf(',') + 1).replace(/[+/=]/g, c => ({'+': '-', '/': '_', '=': ''}[c])));// remove the `data:...;base64, from the start then make safe B64 String
    
const testFn = async _ => {
    const passPlain = "9!,;.?:@$%*_&~#^-+=[]{}";
    console.log(passPlain);
    const passIndexAry = passPlain.split("").map(c => chrAry.indexOf(c));
    const pinPLain = "PIN";
    const pinBuff = new TextEncoder().encode(pinPLain);
    const pinDigestAry = [...new Uint8Array(await window.crypto.subtle.digest("SHA-256", pinBuff))];
    const xoredLocationAry = pinDigestAry.map((v,i) => v ^ passIndexAry[i]);
    const xoredPinLen = (pinDigestAry.reduce((acc, val) => acc + val, 0) % 32) ^ passPlain.length;
    xoredLocationAry.push(xoredPinLen);
    console.log("xoredLocationAry", xoredLocationAry, "passPlain.length", passPlain.length, "xoredPinLen", xoredPinLen);

    xorLocationPlainSafeB64 = window.btoa(String.fromCharCode.apply(null, xoredLocationAry)).replace(/[+/=]/g, c => ({'+': '-', '/': '_', '=': ''}[c]))

}

testFn();
    const bufferFromB64 = base64 => fetch(`data:application/octet-stream;base64,${base64}`).then(response => response.arrayBuffer()); //ASYNC
    const bufferFromSafeB64 = safeb64String => bufferFromB64(safeb64String.replace(/[-_.]/g, c => ({'-': '+', '_': '/'}[c]))); //, '.': '=' //ASYNC

inputSharedPassInput.addEventListener("input", async e => {
    outputSharedPassFieldset.className = (e.target.value ? "" : "elNoDisplay");
    const pinBuff = new TextEncoder().encode(inputSharedPassInput.value);
    const pinDigestAry = [...new Uint8Array(await window.crypto.subtle.digest("SHA-256", pinBuff))];
    const xoredLocationAry = window.atob(xorLocationPlainSafeB64.replace(/[-_.]/g, c => ({'-': '+', '_': '/'}[c]))).split("").map(c => c.charCodeAt(0));
    const xoredPinLen = xoredLocationAry.pop(xorLocationPlainSafeB64);
    const passPlainLen = (pinDigestAry.reduce((acc, val) => acc + val, 0) % 32) ^ xoredPinLen;

    const passIndexAry_2 = xoredLocationAry.map((v,i) => v ^ pinDigestAry[i]); // pinDigestU8Ary.map((v,i) => v ^ xoredLocationAry[i] || 0 );
    const plainPass = passIndexAry_2.map(idx => chrAry[idx]).join("");
    outputSharedPassInput.value = plainPass.substring(0, passPlainLen);
});


toggleShowPass.addEventListener("click", e => {
    toggleShowPass.classList.toggle("passEyeHide");
    outputSharedPassInput.type = outputSharedPassInput.type === "password" ? "text" : "password";
});

copyClipboard.addEventListener("click", e => {
    window.navigator.vibrate(200);
    navigator.clipboard.writeText(outputSharedPassInput.value);
});
