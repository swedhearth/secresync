const shareForm = document.getElementById("shareForm");
const inputSharedPassInput = document.getElementById("inputSharedPassInput");
const outputSharedPassFieldset = document.getElementById("outputSharedPassFieldset");
const outputSharedPassInput = document.getElementById("outputSharedPassInput");

const baseChr2dAry = [ // excluded characters: " and '
    ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"], //alphanum91 = 62 chrs
    ["!,;.?:@$%*_&~"], //basicSpecial91a (13 chrs) = 75 chrs
    ["#^-+=[]{}()|`/<>"], //basicSpecialb91b (16 chrs) = 91 chrs
    Array.from({ length: 165 }, (_, idx) => String.fromCharCode(idx + 192)).join("")//extendedSpecial (165 chrs - 2byte characters) = 256 chrs (1 character for each byte of vendor password)
];

const chrAry = baseChr2dAry.flat().join("").split("");

const urlSearchParams = Object.fromEntries(new URLSearchParams(window.location.search)); // this is in the location part of the url
if(urlSearchParams.b){
    inputSharedPassInput.addEventListener("input", async e => {
        outputSharedPassFieldset.className = (e.target.value ? "" : "elNoShow");
        const pinBuff = new TextEncoder().encode(inputSharedPassInput.value.toLowerCase());
        const pinDigestAry = [...new Uint8Array(await window.crypto.subtle.digest("SHA-256", pinBuff))];
        const xoredShareAry = window.atob(urlSearchParams.b.replace(/[-_.]/g, c => ({'-': '+', '_': '/'}[c]))).split("").map(c => c.charCodeAt(0));
        const xoredPassLen = xoredShareAry.pop();
        const passPlainLen = (pinDigestAry.reduce((acc, val) => acc + val, 0) % 32) ^ xoredPassLen;
        const passIndexAry = xoredShareAry.map((v,i) => v ^ pinDigestAry[i]);
        const plainPass = passIndexAry.map(idx => chrAry[idx]).join("");
        outputSharedPassInput.value = plainPass.substring(0, passPlainLen);
    });
}

shareForm.addEventListener("submit", e => {
    e.preventDefault();
});

toggleShowPass.addEventListener("click", e => {
    toggleShowPass.classList.toggle("passEyeHide");
    outputSharedPassInput.type = outputSharedPassInput.type === "password" ? "text" : "password";
});

copyClipboard.addEventListener("click", e => {
    window.navigator.vibrate(200);
    navigator.clipboard.writeText(outputSharedPassInput.value);
});
