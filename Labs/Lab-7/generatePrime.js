import {modPow} from "./modPow.js";

export function isProbablePrime(n, k) {
    if (n === 2 || n === 3) return true;
    if (n % 2n === 0n || n < 2n) return false;

    let r = 0n, d = n - 1n;
    while (d % 2n === 0n) {
        d /= 2n;
        r += 1n;
    }

    for (let i = 0; i < k; i++) {
        const a = 2n + BigInt(Math.floor(Math.random() * (Number(n - 3n))));
        let x = modPow(a, d, n);

        if (x === 1n || x === n - 1n) continue;

        for (let j = 1n; j < r; j++) {
            x = modPow(x, 2n, n);
            if (x === n - 1n) break;
            if (j === r - 1n) return false;
        }
    }
    return true;
}

export function generatePrime(bits) {
    if (bits < 2) return null;

    let min = 1n << BigInt(bits - 1);
    let max = (1n << BigInt(bits)) - 1n;

    while (true) {
        let n = BigInt(Math.floor(Math.random() * Number(max - min + 1n))) + min;
        if (n % 2n === 0n) n += 1n;  // Забезпечити, що n є непарним

        if (isProbablePrime(n, 20)) return n;
    }
}