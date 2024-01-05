import {decrypt, encrypt} from "./service.js";

const text = "програмнезабезпечення    ";
const rowKey = "шифр";
const columnKey = "крипто";

const encryptedText = encrypt(text, rowKey, columnKey);
console.log("Encrypted Text: ", encryptedText);

const decryptedText = decrypt(encryptedText, rowKey, columnKey);
console.log("Decrypted Text: ", decryptedText);