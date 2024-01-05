import {findPrimitive} from "./findPrimitive.js";
import {bigIntToText, generateLargePrime, getRandomBigInt, modInverse, modPow, textToBigInt} from "./service.js";

const p = generateLargePrime(512n);
const g = findPrimitive(p);

const x = getRandomBigInt(256);
const y = modPow(g, x, p);

const text = "Hello world";
const m = textToBigInt(text);
const k = getRandomBigInt(256);
const c1 = modPow(g, k, p);
const c2 = (m * modPow(y, k, p)) % p;

const s = modPow(c1, x, p);
const mDecrypted = bigIntToText((c2 * modInverse(s, p)) % p);

console.log('Origin text:', text)
console.log('decrypted text:', mDecrypted)
