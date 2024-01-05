import {modPow} from "./modPow.js";

export function millerRabinTest(n, k) {
    if (n === 2 || n === 3) return true;
    if (n % 2 === 0 || n < 2) return false;

    // Знаходження r та d, де n - 1 = 2^r * d і d є непарним
    let r = 0;
    let d = n - 1;
    while (d % 2 === 0) {
        d /= 2;
        r += 1;
    }

    for (let i = 0; i < k; i++) {
        const a = 2 + Math.floor(Math.random() * (n - 4));
        let x = modPow(a, d, n);

        if (x === 1 || x === n - 1) continue;

        let continueLoop = false;
        for (let j = 0; j < r - 1; j++) {
            x = modPow(x, 2, n);
            if (x === n - 1) {
                continueLoop = true;
                break;
            }
        }

        if (!continueLoop) {
            return false; // n є складеним
        }
    }

    return true; // n є простим з імовірністю (1 - (1/4)^k)
}