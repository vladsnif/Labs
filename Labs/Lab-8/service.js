import {isPrime} from "./findPrimitive.js";

export function generateLargePrime(bits) {
    let n;
    do {
        n = getRandomBigInt(2n ** (bits - 1n), 2n ** bits - 1n);
    } while (!isPrime(n));

    return n;
}

export function generateKeys(p, g) {
    let privateKey;

    do {
        privateKey = getRandomBigInt(2n, p - 2n);
    } while (privateKey < 2n || privateKey >= p - 1n);

    const publicKey = modPow(g, privateKey, p);

    return [privateKey, publicKey];
}

function getRandomBigInt(min, max) {
    const range = max - min + 1n;
    return (BigInt(Math.floor(Math.round(Math.random()) * Number(range))) + min);
}

function modPow(base, exponent, modulus) {
    let result = 1n;
    base %= modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n)
            result = (result * base) % modulus;
        exponent = exponent >> 1n;
        base = (base * base) % modulus;
    }
    return result;
}