import {modPow} from "./modPow.js";

export function egcd(a, b) {
    if (a === 0n) {
        return [b, 0n, 1n];
    } else {
        let [g, x, y] = egcd(b % a, a);
        return [g, y - (b / a) * x, x];
    }
}

export function modInverse(a, m) {
    let [g, x, y] = egcd(a, m);
    if (g !== 1n) {
        throw new Error('Modular inverse does not exist');
    } else {
        return x % m;
    }
}


export function rsaEncrypt(m, e, n) {
    return modPow(m, e, n);
}


export function rsaDecrypt(c, d, n) {
    return modPow(c, d, n);
}