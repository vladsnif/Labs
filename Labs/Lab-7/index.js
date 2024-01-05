import {millerRabinTest} from "./millerTest.js";
import {generatePrime} from "./generatePrime.js";
import {modInverse, rsaDecrypt, rsaEncrypt} from "./RSA.js";

let n0 = 53;
let n = 32;
let k = 5;
let composite = millerRabinTest(n, k);
let prime = millerRabinTest(n0, k);
console.log(`${n} is ${composite ? 'probably prime' : 'composite'}`);
console.log(`${n0} is ${prime ? 'probably prime' : 'composite'}`);

let p = generatePrime(512);
let q = generatePrime(512);

let n2 = p * q;
let phi = (p - 1n) * (q - 1n);

let e = 65537n;
let d = modInverse(e, phi);

let m = 10089n;
let encrypt = rsaEncrypt(m, e, n2);
let decrypted = rsaDecrypt(encrypt, d, n2);
console.log('Encrypted', encrypt);
console.log('Decrypted', decrypted);