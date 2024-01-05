import {findPrimitive} from "./findPrimitive.js";
import {generateKeys, generateLargePrime} from "./service.js";
const p = generateLargePrime(4n);
const g = findPrimitive(p);

console.log(`p = ${p.toString()}`);
console.log(`g = ${g.toString()}`);

const aliceKeys = generateKeys(p, g);
const bobKeys = generateKeys(p, g);

console.log("\nAlpha: \n\tПриватний ключ: %s \n\tПублічний ключ: %s", aliceKeys[0].toString(), aliceKeys[1].toString());
console.log("\nBeta: \n\tПриватний ключ: %s \n\tПублічний ключ: %s\n\n", bobKeys[0].toString(), bobKeys[1].toString());

const aliceSharedSecret = modPow(bobKeys[1], aliceKeys[0], p);
const bobSharedSecret = modPow(aliceKeys[1], bobKeys[0], p);

if (aliceSharedSecret === bobSharedSecret) {
    console.log("Обмін ключами успішний. Спільний секретний ключ: %s", aliceSharedSecret.toString());
} else {
    console.log("Помилка в обміні ключами.");
}