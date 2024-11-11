/* 'core_0.015_GitHub' */
function Crypto(){
    "use strict";
    //const encodeText = text => new TextEncoder().encode(text);
    const decodeText = u8Ary => new TextDecoder().decode(u8Ary);
    
    const bufferFromIterable = (...iterables) => new Blob(iterables).arrayBuffer(); //iterable object such as an Array, ArrayBuffers, TypedArrays, DataViews, Blobs, strings, or a mix of any of such elements
    const bufferFromB64 = base64 => fetch(`data:application/octet-stream;base64,${base64}`).then(response => response.arrayBuffer()); //ASYNC
    const bufferFromSafeB64 = safeb64String => bufferFromB64(safeb64String.replace(/[-_.]/g, c => ({'-': '+', '_': '/'}[c]))); //, '.': '=' //ASYNC
    
    const u8AryFrom = data => new Uint8Array(data); // data: length, array, ArrayBuffers, TypedArrays
    const u8AryFromB64 = b64String => u8AryFrom(window.atob(b64String).split("").map(c => c.charCodeAt(0))); //SYNC

    const b64From = (...iterables) => //ASYNC - uses native browser solution instead of Binary to ASCII (btoa) //data: iterable object such as an Array, ArrayBuffers, TypedArrays, DataViews, Blobs, strings, or a mix
        new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = _ => res(reader.result);
            reader.onerror = err => rej(err);
            reader.readAsDataURL(new Blob(iterables));
        });
    const safeB64From = (...iterables) => b64From(...iterables).then(b64 => b64.substring(b64.indexOf(',') + 1).replace(/[+/=]/g, c => ({'+': '-', '/': '_', '=': ''}[c])));// remove the `data:...;base64, from the start then make safe B64 String
    const trimmedB64FromU8Ary = u8Ary => btoa(String.fromCharCode.apply(null, u8Ary)).replace(/=+$/, '');// SYNC function uses Binary to ASCII

    const b64FromTimeInt = timeInt => trimmedB64FromU8Ary(u8AryFrom(new BigUint64Array([BigInt(timeInt)]).buffer).reverse().filter(Boolean));
    const timeIntFromB64 = timeB64String => u8AryFromB64(timeB64String).reduce((p, c)=> p * 256 + c);

    const digest = data => window.crypto.subtle.digest('SHA-256', data); //data: ArrayBuffers, TypedArrays or DataViews // returns ArrayBuffer
    const digestFromIterable = (...iterables) => bufferFromIterable(...iterables).then(digest);// returns SHA-256 ArrayBuffer of the concatenated iterable object
    const safeB64DigestFromIterable = (...iterables) => digestFromIterable(...iterables).then(safeB64From);
    
    const hexFrom = data => u8AryFrom(data).reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), ''); // data: ArrayBuffers, TypedArrays

    const randomU8Ary = len => window.crypto.getRandomValues(u8AryFrom(len)); //Returns the same array passed as typedArray. In this case = U8Ary
    const randomHex = len => hexFrom(randomU8Ary(len));

    const compressedBufferFromIterable = async (...iterables) =>  new Response(await new Blob(iterables).stream().pipeThrough(new CompressionStream("deflate"))).arrayBuffer();
    const getDecompressedString = async (...iterables) => new Response(await new Blob(iterables).stream().pipeThrough(new DecompressionStream("deflate"))).text();
    
    const postToNonce = payloadObj => // API does not function anymore - nonces.000webhostapp.com has been disabled - TO DO!!!
        fetch('https://nonces.000webhostapp.com/', {
            method: "POST",
            headers: {"content-type": "text/plain;charset=UTF-8"},
            body: JSON.stringify(payloadObj),
        }).then(res => res.json());
    
    /* --------------------------------------------------- Crypto Module Constants and window.crypto.subtle functions ---------------------------------------------------------------*/
    const totalPbkdf2Loops = 1200000; //(deafault = 1,200,000 total loops of pbkdf2)
    const minPbkdf2Loops = 10; // pbkdf2 loops for persisted key
    const saltLen = 16;

    const aesCtrObj = { 
        name: "AES-CTR",
        ivLen: 16,
        getAlgorithmObj: iv => ({
            name: "AES-CTR",
            counter: iv,
            length: 128
        })
    };
    const aesGcmObj = {
        name: "AES-GCM",
        ivLen: 12,
        getAlgorithmObj: iv => ({
            name: "AES-GCM",
            iv: iv
        })
    };
    const importKey = (cryptoKey, aesObj) => window.crypto.subtle.importKey(
        "raw",
        cryptoKey,
        { "name": aesObj.name, "length": 256},
        true,
        [ "encrypt", "decrypt" ]
    );
    const exportKey = cryptoKey => window.crypto.subtle.exportKey("raw", cryptoKey);
    const deriveKey = async (pass, salt, pbkfd2Loops, aesObj) => window.crypto.subtle.deriveKey(
        {
            "name": "PBKDF2",
            salt: salt,
            "iterations": pbkfd2Loops,
            "hash": "SHA-256"
        },
        await window.crypto.subtle.importKey(
            "raw",
            pass,
            "PBKDF2",
            false,
            ["deriveBits", "deriveKey"]
        ),
        { "name": aesObj.name, "length": 256},
        true,
        [ "encrypt", "decrypt" ]
    );
    const encrypt = (...args) => window.crypto.subtle.encrypt(...args);
    const decrypt = (...args) => window.crypto.subtle.decrypt(...args);
    
    /* --------------------------------------------------- Main Encrypt and Decrypt functions ---------------------------------------------------------------*/
    async function encryptUseKey(plainData, cryptoKey, salt, aesObj){ //plainData: ArrayBuffer, a TypedArray, or a DataView 
        const iv = randomU8Ary(aesObj.ivLen).buffer;
        const algorithmObj = aesObj.getAlgorithmObj(iv);
        const cipherText = await encrypt(algorithmObj, cryptoKey, plainData);
        return bufferFromIterable(salt, iv, cipherText); //returns cipher: concated ArrayBuffer of salt, iv and ciphertext buffers
    }
    
    async function decryptUseKey(cipherData, cryptoKey, aesObj){
        const salt = cipherData.slice(0, saltLen);//128 bits of the salt 
        const iv = cipherData.slice(saltLen, (saltLen + aesObj.ivLen));// 16 SaltLen + aesObj.ivLen (12 for GCM and 16 for ctr) = 28 || 36 = 96 for GCM || 128 CTR bits of the iv 
        const cipherText = cipherData.slice(saltLen + aesObj.ivLen); //and the rest is the encodedText
        const algorithmObj = aesObj.getAlgorithmObj(iv);
        const plainData = await decrypt(algorithmObj, cryptoKey, cipherText);
        return [plainData, salt];
    }
    
    async function getCryptoKeyFromCipher(cipher, passBuffer, pbkfd2Loops, aesObj){
        const salt = cipher.slice(0, saltLen);//128 bits of the salt can be u8Ary or ArrayBuffer
        return deriveKey(passBuffer, salt, pbkfd2Loops, aesObj); //Returns Crypto Key Object
    }
    
    async function getCryptoKeyAndSaltFromNew(passBuffer, pbkfd2Loops, aesObj){
        const salt = randomU8Ary(saltLen).buffer; 
        const cryptoKey = await deriveKey(passBuffer, salt, pbkfd2Loops, aesObj);
        return [cryptoKey, salt];
    }

    async function encryptUsePass(plainData, passBuffer, pbkfd2Loops, aesObj){ //plainData: ArrayBuffer, a TypedArray, or a DataView
        const [cryptoKey, salt] = await getCryptoKeyAndSaltFromNew(passBuffer, pbkfd2Loops, aesObj)
        return encryptUseKey(plainData, cryptoKey, salt, aesObj); //returns cipher: concated ArrayBuffer of salt, iv and ciphertext buffers
    }

    async function decryptUsePass(cryptoKeyCipher, passBuffer, pbkfd2Loops, aesObj){
        const cryptoKey = await getCryptoKeyFromCipher(cryptoKeyCipher, passBuffer, pbkfd2Loops, aesObj); //Returns Crypto Key Object
        return decryptUseKey(cryptoKeyCipher, cryptoKey, aesObj);
    }
    
    async function getEncryptedCryptoKey(cryptoKey, cryptoKeyCipherPass){ // returns encrypted cryptoKey using cryptoKeyCipherPass composed of plainPin && Authentication methods (online or webAuthn)
        return encryptUsePass(await exportKey(cryptoKey), cryptoKeyCipherPass, minPbkdf2Loops, aesCtrObj); //returns cipher: concated ArrayBuffer of salt, iv and ciphertext buffers
    }
    
    async function getDecryptedCryptoKey(cryptoKeyCipher, cryptoKeyCipherPass){ // returns decrypted cryptoKey using cryptoKeyCipherPass
        const [decryptedCryptoKey] = await decryptUsePass(cryptoKeyCipher, cryptoKeyCipherPass, minPbkdf2Loops, aesCtrObj); // whitout salt
        return importKey(decryptedCryptoKey, aesGcmObj); //Returns Crypto Key Object
    }
    
    
    /* --------------------------------------------------- Main Crypto Module Methods ---------------------------------------------------------------*/
    async function getCipherFromString(plainString, cryptoKey, salt){
        const stringBuffer = await compressedBufferFromIterable(plainString);
        return encryptUseKey(stringBuffer, cryptoKey, salt, aesGcmObj); //returns cipher: concated ArrayBuffer of salt, iv and ciphertext buffers
    }
    
    async function getStringFromCipher(cipherData, cryptoKey){ //cipherData: Typed Array, ArrayBuffer, DataView
        const [decryptedData, salt] = await decryptUseKey(cipherData, cryptoKey, aesGcmObj);//ArrayBuffer when from file
        const decryptedString = await getDecompressedString(decryptedData);
        return [decryptedString, salt];
    }
    
    async function getCryptoKeyFromPlains(dbCipher, plainPassString, plainPinString){  //dbCipher: u8Ary || ArrayBuffer
        const passBuffer = await digestFromIterable(plainPassString, plainPinString); //returns ArrayBuffer
        return getCryptoKeyFromCipher(dbCipher, passBuffer, totalPbkdf2Loops, aesGcmObj); //Returns Crypto Key Object
    }
    
    async function getNewCryptoKeyAndSalt({plainPassString, plainPinString}){
      const passBuffer = await digestFromIterable(plainPassString, plainPinString); //returns arrayBuffer
      return getCryptoKeyAndSaltFromNew(passBuffer, totalPbkdf2Loops, aesGcmObj);
    }
    
    /* --------------------------------------------------- Persisted Key Use ONLINE ---------------------------------------------------------------*/
    async function getCryptoKeyCipherPass(plainPinString, persistId, isNew, recconectCount = 1){
        const persistIdHex = hexFrom(persistId); //persistId: ArrayBuffer
        const pinHashHex = plainPinString ? hexFrom(await digestFromIterable(persistIdHex, plainPinString)) : "0";// if plainPinString === false then = 0 value - only for PIN-less share //digest: ArrayBuffer

        /* const nonceApiObj = await postToNonce({
            d: {
                id: persistIdHex, //persistId, // hash string (persistIdHex)
                pin: pinHashHex, // SHA-256 hash hex of concatenated arguments strings  - will be used as nonce 'pin'  in the Nonce API Server Side 
                setNew: isNew
            }
        }).catch(errObj => ({err:"fatal"})); */
        // Nonce api returns object with SHA-256 hex of the concatenated(id: persistIdHex, pin: pinHashHex, salt: randomHex)
        
        /*Start temp*/
        const nonceApiObj = { nonce:"80d7384aeaf989fa788f7f8308fb4a9608c1d88a1cd638b73c163e61f5decefe" };
        /*End Temp*/
        
        if(nonceApiObj.err){
            if(nonceApiObj.err === "fatal" && recconectCount < 3){//- server connection error
                if(developerMode) console.log("Fatal Error - will try to recconect. so far there where: " + recconectCount + " connection attempts");
                return getCryptoKeyCipherPass(plainPinString, persistId, isNew, ++recconectCount);
            }
            throw nonceApiObj.err; //"retry" (the most unlikely scenario that the 256 bit key repeats in the Server Database - only when persistCredentials), "die" (php) or "fatal" (recconectCount exceeded - server error)
        }
        if(nonceApiObj.nonce.length !== 64) throw "Nonce from NonceAPI is malformed";
        return digestFromIterable(persistIdHex, pinHashHex, nonceApiObj.nonce); //cryptoKeyCipherPass: ArrayBuffer
    }
    
    async function getEncryptedCryptoKeyUseOnline(cryptoKey, plainPinString){
        const persistId = await randomU8Ary(32).buffer; //ArrayBuffer
        const cryptoKeyCipherPass = await getCryptoKeyCipherPass(plainPinString, persistId, true); //Creates a new encryption keyseed for the PlainPassword and puts the new persistId (ArrayBuffer) in idxDb to use as an 'id' in the Nonce API Server Side (returns ArrayBuffer)
        const cryptoKeyCipher = await getEncryptedCryptoKey(cryptoKey, cryptoKeyCipherPass); //(returns ArrayBuffer)
        return [persistId, cryptoKeyCipher];
    }
    
    async function getDecryptedCryptoKeyUseOnline({plainPinString, cryptoKeyCipher, persistId}){
        const cryptoKeyCipherPass = await getCryptoKeyCipherPass(plainPinString, persistId, false); // persistId (ArrayBuffer) - returns arryBuffer
        return getDecryptedCryptoKey(cryptoKeyCipher, cryptoKeyCipherPass); //Returns Crypto Key Object
    }

    /* --------------------------------------------------- Persisted Key Use AUTH ---------------------------------------------------------------*/
    async function verifyAuth(clientDataChallenge, randomChallenge, flagsByte){
        if(clientDataChallenge !== await safeB64From(randomChallenge)){
            alert ("clientData challenge not equal randomChallenge. Throwing");
            throw "clientDataChallengeIsNotrandomChallenge";
        }
        if([0, 2].filter(pos => flagsByte & (1 << pos)).length !== 2){ //Bit 0, User Presence (UP), Bit 2, User Verification (UV)
            alert ("flagsByte Error. Throwing");
            throw "authenticatorDataFlagsByteError";
        }
    }
    
    async function getEncryptedCryptoKeyUseAuth(cryptoKey, plainPinString){
        const randomChallenge = randomU8Ary(18);
        const userHandle = randomU8Ary(32);
        const credential = await navigator.credentials.create({ // register Web Auth
          publicKey: {
            challenge: randomChallenge,
            rp: { name: "SecreSync" }, // If rp.id is omitted, it defaults to the document origin
            user: {
              id: userHandle, //This Uint8Array will be used to encrypt the Crypto Key Object
              name: "secreSync",
              displayName: "Secret Synchronised"
            },
            pubKeyCredParams: [ {type: "public-key", alg: -7}, {type: "public-key", alg: -257}, {type: "public-key", alg: -8} ],
            authenticatorSelection:{
                authenticatorAttachment: "platform",
                residentKey: "required",
                userVerification: "required"
            }
          }
        }); // Let it throw if error
        
        const persistId = credential.rawId;
if(developerMode) console.log("persistId must be ArrayBuffer, and is: ", persistId);
        const res = credential.response;
        const clientData = JSON.parse(decodeText(res.clientDataJSON));
        const authenticatorData = res.getAuthenticatorData(); // ArrayBuffer
        const rpIdHash = authenticatorData.slice(0, 32);// ArrayBuffer
        const flagsByte = u8AryFrom(authenticatorData)[32];
        
        await verifyAuth(clientData.challenge, randomChallenge, flagsByte);

        const cryptoKeyCipherPass = await digestFromIterable(persistId, userHandle, rpIdHash, plainPinString); //(returns ArrayBuffer)
        const cryptoKeyCipher = await getEncryptedCryptoKey(cryptoKey, cryptoKeyCipherPass); //(returns ArrayBuffer)
        return [persistId, cryptoKeyCipher];//credential.rawId === persistId ArrayBuffer - this to be stored in IDBX to get credentials. It will be stored as persistId (ArrayBuffer)
    }

    async function getDecryptedCryptoKeyUseAuth({plainPinString, cryptoKeyCipher, persistId}){ //persistId is ArrayBuffer = credential.rawId at credentials.create
        const randomChallenge = randomU8Ary(18);
        const credential = await navigator.credentials.get({
          publicKey: {
            challenge: randomChallenge,
            //rpId: "localhost", //If rpId is omitted, it will default to the current origin's domain.
            allowCredentials: [{
              type: "public-key",
              id: persistId
            }],
            userVerification: "required"
          }
        }); // Let it throw if error

        const res = credential.response;
        const clientData = JSON.parse(decodeText(res.clientDataJSON));
        const userHandle = res.userHandle;
        const rpIdHash = res.authenticatorData.slice(0, 32);// ArrayBuffer
        const flagsByte = u8AryFrom(res.authenticatorData)[32];
        
        await verifyAuth(clientData.challenge, randomChallenge, flagsByte);
if(developerMode) console.log("persistId = ", persistId, "persistId should be ArrayBuffer and should be equal to the credential.rawId, which is: ", credential.rawId);
        // It's not recommended for using the credential.response.userHandle as an encryption key because it'll can be disclosed without user verification...how?
        const cryptoKeyCipherPass = await digestFromIterable(credential.rawId, userHandle, rpIdHash, plainPinString); //(returns ArrayBuffer)
        return getDecryptedCryptoKey(cryptoKeyCipher, cryptoKeyCipherPass); //Returns Crypto Key Object object's promise
    }

    /* ---------------------------------------------  Vendor Password -------------------------------------------------------------*/
    const vPass = {
        minComplex: 1,
        dfltComplex: 3,
        maxComplex: 4,
        minLen: 6,
        dfltLen: 20,
        maxLen: 32,
        baseChr2dAry: [ // excluded characters: " and '
            ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"], //alphanum91 = 62 chrs
            ["!,;.?:@$%*_&~"], //basicSpecial91a (13 chrs) = 75 chrs
            ["#^-+=[]{}()|`/<>"], //basicSpecialb91b (16 chrs) = 91 chrs
            Array.from({ length: 165 }, (_, idx) => String.fromCharCode(idx + 192)).join("")//extendedSpecial (165 chrs - 2byte characters) = 256 chrs (1 character for each byte of vendor password)
        ], //421 bytes in total (decoded to utf8), 161 unique bytes (0 - 256) // base256 - 91 one-byte characters + 165 two-byte characters // Add the basePassChr2dAry as a vPass.baseChr2dAry
        grades: [
            { value: 256, color: [0, 100] }, //RG - N/A
            { value: 200, color: [0, 150] }, //RG - "superior"
            { value: 127, color: [0, 200] }, //RG - "excellent",
            { value: 120, color: [50, 255] }, //RG - "great",
            { value: 110, color: [100, 255] }, //RG - "veryStrong",
            { value: 100, color: [150, 255] }, //RG - "strong",
            { value: 90, color: [200, 255] }, //RG - "good",
            { value: 80, color: [255, 255] }, //RG - "fine",
            { value: 70, color: [255, 200] }, //RG - "fair",
            { value: 60, color: [255, 100] }, //RG - "weak",
            { value: 50, color: [255, 0] }, //RG - "veryWeak",
            { value: 40, color: [150, 0] }, //RG - "extremelyWeak",
            { value: 0, color: [0, 0] } //RG - "inadequate",
        ]
    };
    const clamp = (min, max, val) => Math.min(Math.max(min, val), max);
    const containsAlphaNumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)");
    const isOnlyAlphaNumRegex = new RegExp("^[a-zA-Z0-9]*$");

    async function getVendorPassword(vendorBasePassDigestPromise, vendorPassComplexity = vPass.dfltComplex, vendorPasslength = vPass.dfltLen){
        vendorPassComplexity = clamp(vPass.minComplex, vPass.maxComplex, vendorPassComplexity);
        vendorPasslength = clamp(vPass.minLen, vPass.maxLen, vendorPasslength);
        const vendorBasePassU8Ary = u8AryFrom(await vendorBasePassDigestPromise);
        const usablePassChrAry = vPass.baseChr2dAry.slice(0, vendorPassComplexity).flat().join("");
        const vendorPassPlainString =  [...vendorBasePassU8Ary.slice(0, vendorPasslength)].map(bin => usablePassChrAry[bin % usablePassChrAry.length]).join("");
        //Do Checks
        if(vendorPassComplexity < vPass.maxComplex && !containsAlphaNumRegex.test(vendorPassPlainString)){ // check if contains alphanumeric characters if complexity is less than max (4)
            return getVendorPassword(digest(vendorBasePassU8Ary), vendorPassComplexity, vendorPasslength);
        }
        if(vendorPassComplexity > vPass.minComplex && isOnlyAlphaNumRegex.test(vendorPassPlainString)){ // check if contains special characters if complexity is more than min (1)
            return getVendorPassword(digest(vendorBasePassU8Ary), vendorPassComplexity, vendorPasslength);
        }
        //get Password Entropy
        const vendorPassEntropy = Math.log2(usablePassChrAry.length ** vendorPassPlainString.length);
        //get Password Grade and Colour
        const entropyGradeIdx = vPass.grades.findIndex(grade => grade.value < vendorPassEntropy);
        const vendorPassStartGrade = vPass.grades[entropyGradeIdx - 1].value;
        const vendorPassStartColor = vPass.grades[entropyGradeIdx - 1].color
        const vendorPassGrade = vPass.grades[entropyGradeIdx].value;
        const vendorPassEndColor = vPass.grades[entropyGradeIdx].color;
        const factor = (vendorPassEntropy - vendorPassStartGrade) / (vendorPassGrade - vendorPassStartGrade);
        const interpolatedColor = vendorPassStartColor.map((c, i) => Math.round(c + factor * (vendorPassEndColor[i] - c)));
        //extend vPass
        vPass.plainString = vendorPassPlainString;
        vPass.entropy = Math.round(vendorPassEntropy);
        vPass.grade = vendorPassGrade;
        vPass.color = `rgb(${interpolatedColor.join(',')},0)`;
        return vPass;
    }

    /* ------------------------------------------- Vendor object constructor ----------------------------------------------------- */
    function Vendor(vO, vendors){
        if(!vO) {
            this.isNew = true;
            vO = {};
        }

        this.id = vO.id || (vendors?.length ? Math.max.apply(Math, vendors.map(o => o.id)) + 1 : 1);
        this.name = vO.name;
        this.base = vO.b ? u8AryFromB64(vO.b) : vO.base || randomU8Ary(32);

        this.cr8 = vO.c ? timeIntFromB64(vO.c) : vO.cr8 || new Date().getTime();
        this.mod = vO.m ? timeIntFromB64(vO.m) : vO.mod || new Date().getTime();

        if(vO.isNote) this.isNote = true;
        if(vO.log) this.log = vO.log;
        if(vO.note) this.note = vO.note;
        if(vO.url) this.url = vO.url;
        if(vO.tags) this.tags = vO.tags;
        if(vO.cPass) this.cPass = vO.cPass;
        if(vO.imp) this.imp = vO.imp;
        if(vO.cplx && vO.cplx != vPass.dfltComplex) this.cplx = parseInt(vO.cplx);
        if(vO.len && vO.len != vPass.dfltLen) this.len = parseInt(vO.len);
        
        if(vO.isTrash) this.isTrash = vO.isTrash;
        if(vO.rev?.length) this.rev = vO.rev;
    }

    Vendor.prototype.getCurrentPassword = function(){
        return getVendorPassword(digest(this.base), this.cplx, this.len);
    };

    Vendor.prototype.prepareForSend = function(excludeRevs){
        const vO = {...this};
        if(excludeRevs) delete vO.rev;
        vO.b = trimmedB64FromU8Ary(this.base);
        vO.c = b64FromTimeInt(this.cr8);
        vO.m = b64FromTimeInt(this.mod);
        const { base, cr8, mod, ...vendorRest } = vO;
        //console.log("prepareForSend vendorRest = ", vendorRest);
        return vendorRest;
    }
    
    Vendor.prototype.prepareForShare = async function(plainPinString = false){ // TO DOOOOOOOOOOOOOOOOOOOOO
        const {plainString} = await this.getCurrentPassword();
        const vO = JSON.stringify({
            ps: plainString,  // why not just: ps: await this.getCurrentPassword(), ???????????????????
            nm: this.name,
            lg: this.log,
            nt: this.note,
            ul: this.url,
            tg: this.tags,
        });

        const vOBuffer = await compressedBufferFromIterable(vO); // compress JSON string
        const persistId = await randomU8Ary(32).buffer; //ArrayBuffer
        const cryptoKeyCipherPass = await getCryptoKeyCipherKey(plainPinString, persistId, true); //plainPinString === false - will become "0" hexString in getCryptoKeyCipherPass, cryptoKeyCipherPass: ArrayBuffer
        if(developerMode) console.log("cryptoKeyCipherPass = ", cryptoKeyCipherPass);
        const cipher = await encryptUsePass(vOBuffer, cryptoKeyCipherPass, minPbkdf2Loops, aesGcmObj); // returns ArrayBuffer
        if(developerMode) console.log("cipher = ", cipher);
        const trimmedB64cipher = trimmedB64FromU8Ary(cipher);
        return [hexFrom(persistId), trimmedB64cipher];
    }

    /* -------------------------------------------- New DB Object ------------------------------------------------------- */
    function DatabaseObject(dbObj, doUpdateMod){
        //console.log("dbObj.vandors before Updtate", dbObj.vendors);
        this.mod = dbObj && !doUpdateMod ? dbObj.mod : Date.now(); //!updateMod ? dbObj?.mod : Date.now();
        this.vendors = dbObj?.vendors?.map(vendObj => new Vendor(vendObj)) || [];
        //this.cipher = null;
        //console.log(this.vendors);
    }
    
    DatabaseObject.prototype.reset = function(){
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                delete this[key];
            }
        }
        this.exists = false;
    };
    
    DatabaseObject.prototype.prepare = function(encryptFunction){
        const writeVendors = this.vendors.map(vendObj => vendObj.prepareForSend());
        const prepared = JSON.stringify({
            mod: this.mod,
            vendors: writeVendors
        });
        return prepared;
    };

    /* -------------------------------------------- Declared Crypto Module Methods and Properties ------------------------------------------------------- */
    this.getEncryptedCryptoKeyUseOnline = getEncryptedCryptoKeyUseOnline; //ASYNC requires cryptoKey, plainPinString //Returns [persistId, cryptoKeyCipher]=([ArrayBuffer, Uint8Array])
    this.getDecryptedCryptoKeyUseOnline = getDecryptedCryptoKeyUseOnline; //ASYNC requires plainPinString, cryptoKeyCipher (ArrayBuffer), persistId (ArrayBuffer) //Returns Crypto Key Object
    this.getEncryptedCryptoKeyUseAuth = getEncryptedCryptoKeyUseAuth; //ASYNC requires cryptoKey, plainPinString //Returns [persistId, cryptoKeyCipher]=([ArrayBuffer, Uint8Array])
    this.getDecryptedCryptoKeyUseAuth = getDecryptedCryptoKeyUseAuth; //ASYNC requires plainPinString, cryptoKeyCipher (ArrayBuffer), persistId (ArrayBuffer)// Returns Crypto Key Object

    this.getCipherFromString = getCipherFromString; //ASYNC requires plainString, cryptoKey, salt //Returns cipher
    this.getStringFromCipher = getStringFromCipher; //ASYNC requires cipherData, cryptoKey //Returns [decryptedString, salt];
    this.getCryptoKeyFromPlains = getCryptoKeyFromPlains; //ASYNC requires cipher, plainPassString, plainPinString,  //Returns Crypto Key Object
    this.getNewCryptoKeyAndSalt = getNewCryptoKeyAndSalt; //ASYNC requires {plainPassString, plainPinString} from dbCredentials //Returns [cryptoKey, salt];

    this.Vendor = Vendor; //Object Constructor
    this.DatabaseObject = DatabaseObject; //Object Constructor

    this.bufferFromSafeB64 = bufferFromSafeB64; //ASYNC
    this.safeB64From = safeB64From; //ASYNC
    this.safeB64DigestFromIterable = safeB64DigestFromIterable; //ASYNC
    this.randomHex = randomHex; //SYNC
};