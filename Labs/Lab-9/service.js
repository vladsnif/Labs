export function textToBigInt(text) {
    const codeUnits = new Uint16Array(text.length);
    for (let i = 0; i < text.length; i++) {
        codeUnits[i] = text.charCodeAt(i);
    }

    let hex = '';
    new Uint8Array(codeUnits.buffer).forEach((byte) => {
        hex += byte.toString(16).padStart(2, '0');
    });

    return BigInt('0x' + hex);
}

export function bigIntToText(bigint) {
    const hex = bigint.toString(16);
    const charCodes = [];
    for (let i = 0; i < hex.length; i += 2) {
        charCodes.push(parseInt(hex.substring(i, i + 2), 16));
    }

    return String.fromCharCode(...new Uint16Array(new Uint8Array(charCodes).buffer));
}
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

function egcd(a, b) {
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