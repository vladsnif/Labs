import {decrypt, encrypt} from "./service.js";

const plaintext = "наступаємонасвітанку";
const keyword = "віженервіженервіжене";

const encryptedText = encrypt(plaintext, keyword);
const decryptedText = decrypt(encryptedText, keyword);

console.log("Оригінальний текст: " + plaintext);
console.log("Зашифрований текст: " + encryptedText);
console.log("Розшифрований текст: " + decryptedText);