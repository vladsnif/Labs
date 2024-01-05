export function modPow(base, exponent, modulus) {
    let result = 1n;
    base = base % modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n;
        base = (base * base) % modulus;
    }
    return result;
}

function isProbablePrime(n, k) {
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n || n < 2n) return false;

    let r = 0n;
    let d = n - 1n;
    while (d % 2n === 0n) {
        d /= 2n;
        r += 1n;
    }

    for (let i = 0; i < k; i++) {
        const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 4n))) + 1n;
        let x = modPow(a, d, n);

        if (x === 1n || x === n - 1n) continue;

        for (let j = 1n; j < r; j++) {
            x = modPow(x, 2n, n);
            if (x === 1n) return false;
            if (x === n - 1n) break;
        }

        if (x !== n - 1n) return false;
    }
    return true;
}
function isPrimitiveRoot(g, p) {
    const phi = p - 1n;
    const factors = primeFactors(phi);

    for (const factor of factors) {
        if (modPow(g, phi / factor, p) === 1n) {
            return false;
        }
    }
    return true;
}

export function getRandomBigInt(bits) {
    let random = BigInt(0);
    for (let i = 0; i < bits; i++) {
        random = random * 2n + BigInt(Math.round(Math.random()));
    }
    return random | 1n; // Забезпечити, що число є непарним
}

function primeFactors(n) {
    let factors = new Set();
    // Пошук факторів 2
    while (n % 2n === 0n) {
        factors.add(2n);
        n = n / 2n;
    }

    // Пошук непарних факторів
    for (let i = 3n; i <= Math.sqrt(Number(n)); i += 2n) {
        while (n % i === 0n) {
            factors.add(i);
            n = n / i;
        }
    }

    if (n > 2n) {
        factors.add(n);
    }
    return factors;
}


export function findPrimitiveRoot(p) {
    let g = 2n;
    while (!isPrimitiveRoot(g, p)) {
        g++;
    }
    return g;
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