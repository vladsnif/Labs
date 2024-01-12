import {findPrimitiveRoot, generatePrime, getRandomBigInt, modPow} from "./service.js";

let p = generatePrime(512);

let g = findPrimitiveRoot(p);

let privateA = getRandomBigInt(256);
let privateB = getRandomBigInt(256);

let publicA = modPow(g, privateA, p);
let publicB = modPow(g, privateB, p);

let secretKeyA = modPow(publicB, privateA, p);
let secretKeyB = modPow(publicA, privateB, p);
if (secretKeyA === secretKeyB)
{
    console.log("Спільний секретний ключ:", secretKeyA);
}
else
{
    console.log("Помилка в обміні ключами.");
}