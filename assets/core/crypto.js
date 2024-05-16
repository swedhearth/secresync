function Crypto(){
    const browserIdString = JSON.stringify(Object.keys(Object.getPrototypeOf(navigator)).reduce((a,nk) =>(a[nk] = navigator[nk],a), {}));

    const totalPbkdf2Loops = 1200000; //(deafault = 1,200,000 total loops of pbkdf2)
    const minPbkdf2Loops = 10; // pbkdf2 loops for persisted key
    const minDbStringLength = 10000; // 50KB;
    
    const encodeText = text => new TextEncoder().encode(text);
    const decodeText = u8Ary => new TextDecoder().decode(u8Ary);
    
    //const paddingPrefixString = "__padding__"; // [95, 95, 112, 97, 100, 100, 105, 110, 103, 95, 95]    
    //const paddingPrefixU8Ary = encodeText(paddingPrefixString); // [95, 95, 112, 97, 100, 100, 105, 110, 103, 95, 95]   
    
    const u8AryFrom = data => new Uint8Array(data);
    const concatU8Arys = async (...u8Arys) => u8AryFrom(await new Blob(u8Arys).arrayBuffer()); // or any iterable object such as an Array, having ArrayBuffers, TypedArrays, DataViews, Blobs, strings, or a mix of any of such elements
    const u8AryfromHexString = hexString => u8AryFrom(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const u8AryToHexString = bytes => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
    const aryBufferToHexString = aryBuffer => u8AryFrom(aryBuffer).reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
    const getRandomU8Ary = len => window.crypto.getRandomValues(u8AryFrom(len));
    const getRandomHexString = len => u8AryToHexString(getRandomU8Ary(len));
    const getNonCryptoRandomU8Ary = len => u8AryFrom(len).fill(0).map(el => Math.floor(Math.random() * 256));
    
    const getDigest = dataU8Ary => window.crypto.subtle.digest('SHA-256', dataU8Ary);
    const getU8AryDigest = async dataU8Ary => u8AryFrom(await getDigest(dataU8Ary));
    const getDigestFromString = string => getDigest(encodeText(string));
    const getDigestFromAry = ary => getDigest(u8AryFrom(ary));
    
    const getHashU8Ary = async (...strings) => u8AryFrom(await getDigestFromString(strings.join(""))); // returns SHA-256 Uint8Array of the concatenated strings
    const getHashHexString = async (...strings) => aryBufferToHexString(await getDigestFromString(strings.join(""))); // returns SHA-256 hex of the concatenated strings
    const getHashHexStringRand = async (len, ...strings) => aryBufferToHexString(await getDigestFromString(strings.join("") + getRandomHexString(len))); // returns SHA-256 hex of the concatenated (strings and a random hex string of the required length)

    const getCompressedU8Ary = async (...iterables) => u8AryFrom(await new Response(await new Blob(iterables).stream().pipeThrough(new CompressionStream("deflate"))).arrayBuffer());
    const getDecompressedString = async (...iterables) => new Response(await new Blob(iterables).stream().pipeThrough(new DecompressionStream("deflate"))).text();

    //const fetchNonce = payloadObj => postDataJson('https://nonces.000webhostapp.com/', payloadObj);
    
/*     const postToNonce = async payloadObj => (
        await fetch('https://nonces.000webhostapp.com/', {
                method: "POST",
                headers: {"content-type": "text/plain;charset=UTF-8"},
                body: JSON.stringify(payloadObj),
            })
    ).json(); */
    
    const postToNonce = payloadObj => 
        fetch('https://nonces.000webhostapp.com/', {
            method: "POST",
            headers: {"content-type": "text/plain;charset=UTF-8"},
            body: JSON.stringify(payloadObj),
        }).then(res => res.json());
    
    const clamp = (min, max, val) => Math.min(Math.max(min, val), max);
    const saltU8AryLen = 16;
    const aesCtrObj = {
        name: "AES-CTR",
        ivLen: 16,
        getAlgorithmObj: ivU8Ary => ({
            name: "AES-CTR",
            counter: ivU8Ary,
            length: 128
        })
    };
    const aesGcmObj = {
        name: "AES-GCM",
        ivLen: 12,
        getAlgorithmObj: ivU8Ary => ({
            name: "AES-GCM",
            iv: ivU8Ary
        })
    };
    const importPass = passU8Ary => window.crypto.subtle.importKey(
        "raw",
        passU8Ary,
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );
    const importKey = (cryptoKeyObj, aesObj) => window.crypto.subtle.importKey(
        "raw",
        cryptoKeyObj,
        { "name": aesObj.name, "length": 256},
        true,
        [ "encrypt", "decrypt" ]
    );
    const exportKey = cryptoKeyObj => window.crypto.subtle.exportKey("raw", cryptoKeyObj);
    const deriveKey = async (passU8Ary, saltU8Ary, pbkfd2Loops, aesObj) => window.crypto.subtle.deriveKey(
        {
            "name": "PBKDF2",
            salt: saltU8Ary,
            "iterations": pbkfd2Loops,
            "hash": "SHA-256"
        },
        await importPass(passU8Ary),
        { "name": aesObj.name, "length": 256},
        true,
        [ "encrypt", "decrypt" ]
    );

    async function encryptStringUseKey(contentsU8Ary, cryptoKeyObj, saltU8Ary, aesObj){ //returns concat iv and ciphertext arrays //contentsU8Ary can be an ArrayBuffer, a TypedArray, or a DataView
        const ivU8Ary = getRandomU8Ary(aesObj.ivLen);
        const algorithmObj = aesObj.getAlgorithmObj(ivU8Ary);
        const encryptedStringAryBuf = await window.crypto.subtle.encrypt(algorithmObj, cryptoKeyObj, contentsU8Ary);
        return concatU8Arys(saltU8Ary, ivU8Ary, encryptedStringAryBuf);
    }
    
    async function decryptStringUseKey(cipherTextU8Ary, cryptoKeyObj, aesObj){
        const saltU8Ary = cipherTextU8Ary.slice(0, saltU8AryLen);//128 bits of the salt 
        const ivU8Ary = cipherTextU8Ary.slice(saltU8AryLen, (saltU8AryLen + aesObj.ivLen));// 16 SaltLen + aesObj.ivLen (12 for GCM and 16 for ctr) = 28 || 36 = 96 for GCM || 128 CTR bits of the iv 
        const encryptedStringU8Ary = cipherTextU8Ary.slice(saltU8AryLen + aesObj.ivLen); //and the rest is the encodedText
        const algorithmObj = aesObj.getAlgorithmObj(ivU8Ary);
        const decryptedStringAryBuf = await window.crypto.subtle.decrypt(algorithmObj, cryptoKeyObj, encryptedStringU8Ary);
        return [u8AryFrom(decryptedStringAryBuf), saltU8Ary];
    }
    
    async function getCryptoKeyObjFromCipher(cipherTextU8Ary, passU8Ary, pbkfd2Loops, aesObj){
        const saltU8Ary = cipherTextU8Ary.slice(0, saltU8AryLen);//128 bits of the salt 
        return deriveKey(passU8Ary, saltU8Ary, pbkfd2Loops, aesObj);
    }
    
    async function getCryptoKeyAndSaltFromNew(passU8Ary, pbkfd2Loops, aesObj){
        const saltU8Ary = getRandomU8Ary(saltU8AryLen);
        const cryptoKeyObj = await deriveKey(passU8Ary, saltU8Ary, pbkfd2Loops, aesObj);
        return [cryptoKeyObj, saltU8Ary];
    }

    async function encryptStringUsePass(contentsU8Ary, passU8Ary, pbkfd2Loops, aesObj){ //returns concat iv and ciphertext arrays
        const [cryptoKeyObj, saltU8Ary] = await getCryptoKeyAndSaltFromNew(passU8Ary, pbkfd2Loops, aesObj)
        return encryptStringUseKey(contentsU8Ary, cryptoKeyObj, saltU8Ary, aesObj);
    }

    async function decryptStringUsePass(cipherTextU8Ary, passU8Ary, pbkfd2Loops, aesObj){
        const cryptoKeyObj = await getCryptoKeyObjFromCipher(cipherTextU8Ary, passU8Ary, pbkfd2Loops, aesObj);
        return decryptStringUseKey(cipherTextU8Ary, cryptoKeyObj, aesObj);
    }
    
    async function getCryptoKeyHexCipherU8Ary(cryptoKeyObj, cryptoKeyHexCipherCryptoKeyU8Ary){
        return encryptStringUsePass(await exportKey(cryptoKeyObj), cryptoKeyHexCipherCryptoKeyU8Ary, minPbkdf2Loops, aesCtrObj);
    }
    
    async function getCryptoKeyFromCryptoKeyHexCipher(cryptoKeyHexCipherU8Ary, cryptoKeyHexCipherCryptoKeyU8Ary){
        const [decryptedCryptoKeyObjU8Ary] = await decryptStringUsePass(cryptoKeyHexCipherU8Ary, cryptoKeyHexCipherCryptoKeyU8Ary, minPbkdf2Loops, aesCtrObj); // whitout saltU8Ary
        return importKey(decryptedCryptoKeyObjU8Ary, aesGcmObj);
    }
    // --------------------------------------------------------
    const getNewPlainPinNonceHashString = _ => getHashHexStringRand(32, browserIdString); // returns SHA-256 hex of a random 32 hex string and the browserIdString // will be used as an nonce 'id' in the Nonce API Server Side;
    
    async function getCryptoKeyHexCipherCryptoKey(plainPinString, plainPinNonceHashString, isNew, recconectCount = 1){
        if(!plainPinNonceHashString) throw "no plainPinNonceHashString in getCryptoKeyHexCipherCryptoKey"; // can't really happen!
        const pinHashString = await getHashHexString(plainPinNonceHashString, browserIdString, plainPinString); // returns SHA-256 hex of concatenated arguments strings // will be used as nonce 'pin'  in the Nonce API Server Side (it could be used as a nonce in Auth Api)
        const serverPayloadObj = {
            id: plainPinNonceHashString,
            pin: pinHashString,
            setNew: isNew
        };
        const nonceApiObj = await postToNonce({d:serverPayloadObj}).catch(errObj => ({err:"fatal"})); // Nonce api returns object with SHA-256 hex of the concatenated(id: plainPinNonceHashString, pin: pinHashString, salt: randomHex)
        if(nonceApiObj.err){
            if(nonceApiObj.err === "fatal" && recconectCount < 3){//- server connection error
                console.log("Fatal Error - will try to recconect. so far there where: " + recconectCount + " connection attempts");
                return getCryptoKeyHexCipherCryptoKey(plainPinString, plainPinNonceHashString, isNew, ++recconectCount);
            }
            throw nonceApiObj.err; //"retry" (the most unlikely scenario that the 256 bit key repeats in the Server Database - only when persistCryptoKey), "die" (php) or "fatal" (recconectCount exceeded - server error)
        }
        if(nonceApiObj.nonce.length !== 64) throw "Nonce from NonceAPI is malformed";
        return getHashU8Ary(pinHashString, nonceApiObj.nonce);
    }
    
    async function getNewCryptoKeyHexCipherU8Ary(cryptoKeyObj, plainPinNonceHashString, plainPinString){
        const newCryptoKeyHexCipherCryptoKey = await getCryptoKeyHexCipherCryptoKey(plainPinString, plainPinNonceHashString, true); //Creates a new encryption keyseed for the PlainPassword and puts the new plainPinNonceHashString in idxDb to use as an 'id' in the Nonce API Server Side
        return getCryptoKeyHexCipherU8Ary(cryptoKeyObj, newCryptoKeyHexCipherCryptoKey); //newCryptoKeyHexCipherU8Ary
    }
    
    async function getCryptoKeyFromKeyHexCipherInBrowser(plainPinString, cryptoKeyHexCipherU8Ary, plainPinNonceHashString){
        const existingCryptoKeyHexCipherCryptoKey = await getCryptoKeyHexCipherCryptoKey(plainPinString, plainPinNonceHashString, false); // returns u8Ary
        return getCryptoKeyFromCryptoKeyHexCipher(cryptoKeyHexCipherU8Ary, existingCryptoKeyHexCipherCryptoKey);
    }

/*     function getPaddedStringU8Ary(contentStringU8Ary, minPaddedStringLen){ 
        if(contentStringU8Ary.length + paddingPrefixU8Ary.length > minPaddedStringLen ) return contentStringU8Ary; 
        const randomPaddingU8Ary = getNonCryptoRandomU8Ary(minPaddedStringLen - paddingPrefixU8Ary.length - contentStringU8Ary.length);
        return concatU8Arys(contentStringU8Ary, paddingPrefixU8Ary, randomPaddingU8Ary);
    } */

/*     function getContentU8Ary(paddedU8Ary){
        const paddedU8AryString = [...paddedU8Ary].join(",");
        const paddingPrefixU8AryString = "," + [...paddingPrefixU8Ary].join(","); // "95,95,112,97,100,100,105,110,103,95,95" with a leading comma;
        const paddingIndex = paddedU8AryString.indexOf(paddingPrefixU8AryString); // find index of ",95,95,112,97,100,100,105,110,103,95,95" (__padding__)
        //console.log(paddingIndex);
        if(paddingIndex < 0) return paddedU8Ary; // if no __padding__ then return original U8Ary
        
        return u8AryFrom(paddedU8AryString.substring(0, paddingIndex).split(",").map(x => +x)); // remove from string everything after found paddingIndex , change the string back to array of integers, then to Uint8Array and return
    } */

/*     async function getDbCipherU8Ary(dbObject, cryptoKeyObj, saltU8Ary){
        const dbStringU8Ary = await getCompressedU8Ary(JSON.stringify(dbObject));
        const paddedStringU8Ary = await getPaddedStringU8Ary(dbStringU8Ary, minDbStringLength); // compressed DB Object + __padding__ + random geebrish
        return encryptStringUseKey(paddedStringU8Ary, cryptoKeyObj, saltU8Ary, aesGcmObj);
    } */

/*     async function getDbObjectFromCipher(dbCipherU8Ary, cryptoKeyObj){ //dbCipherU8Ary will be bufferAry when from file
    //console.log("in getDbObjectFromCipher", dbCipherU8Ary, cryptoKeyObj);
        const [decryptedU8Ary, saltU8Ary] = await decryptStringUseKey(u8AryFrom(dbCipherU8Ary), cryptoKeyObj, aesGcmObj);
        const dbU8Ary = getContentU8Ary(decryptedU8Ary); //compressed dbU8ary
        const dbString = await getDecompressedString(dbU8Ary);
        return [JSON.parse(dbString), saltU8Ary];
    } */
    
    async function getCipherFromString(plainString, cryptoKeyObj, saltU8Ary){
        const stringU8Ary = await getCompressedU8Ary(plainString);
        return encryptStringUseKey(stringU8Ary, cryptoKeyObj, saltU8Ary, aesGcmObj); //u8Ary
    }
    
    async function getStringFromCipher(cipherU8Ary, cryptoKeyObj){
        const [decryptedU8Ary, saltU8Ary] = await decryptStringUseKey(u8AryFrom(cipherU8Ary), cryptoKeyObj, aesGcmObj);//cipherU8Ary will be bufferAry when from file
        const decryptedString = await getDecompressedString(decryptedU8Ary);
        return [decryptedString, saltU8Ary];
    }
    

    async function getCryptoKeyObjFromPlains(dbCipherU8Ary, plainPassString, plainPinString){
        const passU8Ary = await getHashU8Ary(plainPassString, plainPinString);
        return getCryptoKeyObjFromCipher(dbCipherU8Ary, passU8Ary, totalPbkdf2Loops, aesGcmObj)
    }
    
    async function getNewCryptoKeyAndSalt(plainPassString, plainPinString){
      const passU8Ary = await getHashU8Ary(plainPassString, plainPinString);
      return getCryptoKeyAndSaltFromNew(passU8Ary, totalPbkdf2Loops, aesGcmObj)
    }


    /*  ------------- Vendor Password -------------  */
    const vPass = {
        minComplex: 1,
        dfltComplex: 3,
        maxComplex: 4,
        minLen: 6,
        dfltLen: 20,
        maxLen: 32
    };

    async function getVendorPassword(vendorBasePassDigest, vendorPassComplexity = vPass.dfltComplex, vendorPasslength = vPass.dfltLen){
        vendorPassComplexity = clamp(vPass.minComplex, vPass.maxComplex, vendorPassComplexity);
        vendorPasslength = clamp(vPass.minLen, vPass.maxLen, vendorPasslength);
        const vendorBasePassU8Ary = u8AryFrom(await vendorBasePassDigest);
        const basePassChr2dAry = [
            ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"], //alphanum91 = 62 chrs
            ["!,;.?:@$%*_&~"], //basicSpecial91a (13 chrs) = 75 chrs
            ["#^-+=[]{}()|`/<>"], //basicSpecialb91b (16 chrs) = 91 chrs
            ["£¬àäèéëïĳöüáêíîôóúûÆØÅæøåÄÖÕÜõßÇÊÎŞÛçşĂÂȘȚăâșțÔŴŶÁÉÍÏŵŷÓÚÝÀÈÌÒÙËŸýìòùÿĈĜĤĴŜŬĉĝĥĵŝŭĞİğıÐÞðþŐŰőűŒœãÑñ¡¿ÃĨŨ̃ĩũĄ́ĘĮŁŃąęįłńǪā̄ēīōǫǭūŲųżćśźůČŠŽŻĆĐĎĚŇŘŤŮďěňřťĽĹŔľĺŕĀĒĢĪĶĻŅŌ"] //extendedSpecial (165 chrs - 2byte characters) = 256 chrs (1 character for each byte of vendor password)
        ]; //421 bytes in total (decoded to utf8), 161 unique bytes (0 - 256) // base256 - 91 one-byte characters + 165 two-byte characters
        const usablePassChrAry = basePassChr2dAry.filter((el,idx) => idx < vendorPassComplexity).flat().join("");
        const vendorPassString =  [...vendorBasePassU8Ary.slice(0, vendorPasslength)].map(bin => usablePassChrAry[bin % usablePassChrAry.length]).join("");

        //Do Checks
        if(vendorPassComplexity < vPass.maxComplex){ // check if contains alphanumeric characters if complexity is less than max (4)
            const containsAlphaNumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)");
            if(!containsAlphaNumRegex.test(vendorPassString)) return getVendorPassword(getDigest(vendorBasePassU8Ary), vendorPassComplexity, vendorPasslength);
        }
        if(vendorPassComplexity > vPass.minComplex){ // check if contains special characters if complexity is more than min (1)
          const isOnlyAlphanumericRegex = new RegExp("^[a-zA-Z0-9]*$");
          if(isOnlyAlphanumericRegex.test(vendorPassString)) return getVendorPassword(getDigest(vendorBasePassU8Ary), vendorPassComplexity, vendorPasslength);
        }
        //get Password Entropy
        const vendorPassEntropy = Math.log2(usablePassChrAry.length ** vendorPassString.length);
        return {vendorPassString: vendorPassString, vendorPassEntropy: Math.round(vendorPassEntropy)};
    }

    /* ---------------------------------   Vendor object constructor ----------------------------------------------------- */
    function Vendor(vO, vendors){
        if(!vO) {
            this.isNew = true;
            vO = {};
        }
        this.id = vO.id || (vendors.length ? Math.max.apply(Math, vendors.map(o => o.id)) + 1 : 1);
        this.name = vO.name;
        this.base = vO.base || getRandomHexString(32); 
        this.cr8 = vO.cr8 || new Date().getTime();
        this.mod = vO.mod || new Date().getTime();
        if(vO.isNote) this.isNote = true;
        if(vO.log) this.log = vO.log;
        if(vO.note) this.note = vO.note;
        if(vO.url) this.url = vO.url;
        if(vO.tags) this.tags = vO.tags;
        if(vO.cPass) this.cPass = vO.cPass;
        if(vO.imp) this.imp = vO.imp;
        if(vO.cplx && vO.cplx != vPass.dfltComplex) this.cplx = vO.cplx;
        if(vO.len && vO.len != vPass.dfltLen) this.len = vO.len;
    }
    
    Vendor.prototype.getCurrentPassword = function(){
        return getVendorPassword(getDigestFromString(this.base), this.cplx, this.len);
    }

    /* ---------------------------------   New DB Object ----------------------------------------------------- */
    function DatabaseObject(dbObj){
        if(dbObj){
            this.mod = dbObj.mod;
            this.vendors = dbObj.vendors.map(vendObj => new Vendor(vendObj)); // all Vendor Objects have id
        }else{
            this.mod = new Date().getTime();
            this.vendors = [];
        }
    }
    
    this.getNewPlainPinNonceHashString = getNewPlainPinNonceHashString; // returns nonce hash sring to be stored in idxDb
    this.getNewCryptoKeyHexCipherU8Ary = getNewCryptoKeyHexCipherU8Ary;
    this.getCryptoKeyFromKeyHexCipherInBrowser = getCryptoKeyFromKeyHexCipherInBrowser; // require plainPinString, cryptoKeyHexCipherU8Ary, plainPinNonceHashString // returns encrypted database key cryptoKeyObj
    //this.getDbCipherFromObject = getDbCipherU8Ary; // require dbObject, cryptoKeyObj, saltU8Ary // returns cipherTextU8Ary
    //this.getDbObjectFromCipher = getDbObjectFromCipher; // require dbCipherU8Ary, cryptoKeyObj // returns db object
    this.getCryptoKeyObjFromPlains = getCryptoKeyObjFromPlains; // require dbCipherU8Ary, plainPassString, plainPinString, returns decryptedStringAryBuf
    this.getNewCryptoKeyAndSalt = getNewCryptoKeyAndSalt;
    this.getStringFromCipher = getStringFromCipher;
    this.getCipherFromString = getCipherFromString;
    this.DatabaseObject = DatabaseObject;
    this.Vendor = Vendor;
    this.vPass = vPass;
    this.getRandomHexString = getRandomHexString;
};