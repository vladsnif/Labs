import {bitArrayToText, desDecrypt, desEncrypt, textToBitArray} from "./service.js";

let inputText = "Keyboard";
let plaintextBlock = textToBitArray(inputText);
let key = Array.from({length: 56}, (_, i) => (i + 1) % 2);

let encryptedBlock = desEncrypt(plaintextBlock, key);
let encryptedText = bitArrayToText(encryptedBlock);
let decryptedBlock = bitArrayToText(desDecrypt(encryptedBlock, key));

console.log("Base text:", inputText);
console.log("Encrypted text:", encryptedText);
console.log("Decrypted text:", decryptedBlock);