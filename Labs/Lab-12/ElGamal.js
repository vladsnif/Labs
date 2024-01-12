// Параметри еліптичної кривої
import {addPoints} from "./service.js";

const p = 23; // модуль
const a = 1;
const b = 1;
const G = { x: 17, y: 20 }; // Базова точка (генератор)

// Функція множення точки на число
function pointMultiplication(point, n, p) {
    let result = null;
    let addend = point;

    while (n > 0) {
        if (n & 1) {
            result = result ? addPoints(result, addend, p) : addend;
        }
        addend = addPoints(addend, addend, p);
        n >>= 1;
    }

    return result;
}

// Генерація ключів
function generateKeys(p, G) {
    const privateKey = Math.floor(Math.random() * (p - 1)) + 1;
    const publicKey = pointMultiplication(G, privateKey, p);
    return { privateKey, publicKey };
}

// Шифрування
function encrypt(message, publicKey, p, G) {
    const k = Math.floor(Math.random() * (p - 1)) + 1;
    const C1 = pointMultiplication(G, k, p);
    const C2 = addPoints(message, pointMultiplication(publicKey, k, p), p);
    return { C1, C2 };
}

// Розшифрування
function decrypt(ciphertext, privateKey, p) {
    const S = pointMultiplication(ciphertext.C1, privateKey, p);
    const SInverse = { x: S.x, y: (p - S.y) % p };
    return addPoints(ciphertext.C2, SInverse, p);
}

// Функція для перетворення тексту в число
function textToNumber(text) {
    let number = 0;
    for (let i = 0; i < text.length; i++) {
        number = (number * 31 + text.charCodeAt(i)) % p;
    }
    return number;
}

// Функція для пошуку точки на кривій
function findPointForNumber(x, p) {
    let ySquared, y;
    while (true) {
        ySquared = (x * x * x + a * x + b) % p;
        for (let possibleY = 0; possibleY < p; possibleY++) {
            if ((possibleY * possibleY) % p === ySquared) {
                return { x, y: possibleY };
            }
        }
        x = (x + 1) % p;
    }
}

// Приклад використання
const message = { x: 3, y: 10 }; // Прикладова точка на кривій (повідомлення)

const keys = generateKeys(p, G);
const encrypted = encrypt(message, keys.publicKey, p, G);
const decrypted = decrypt(encrypted, keys.privateKey, p);

console.log('Message Point:', message);
console.log('Encrypted:', encrypted);
console.log('Decrypted:', decrypted);
