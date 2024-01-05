import {aesDecrypt, aesEncrypt} from "./service.js";
import {byteArrayToHexString, hexStringToByteArray} from "./utils.js";


const hexString = '00000101030307070f0f1f1f3f3f7f7f';
const plaintext = hexStringToByteArray(hexString);
const key = hexStringToByteArray("00000000000000000000000000000000");
const encrypted = aesEncrypt(plaintext, key);
const decrypt = aesDecrypt(encrypted, key);
console.log("Origin",hexString);
console.log("Encrypted",byteArrayToHexString(encrypted));
console.log("Decrypted",byteArrayToHexString(decrypt));