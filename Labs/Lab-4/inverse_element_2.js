import {phi} from "./phi.js";

export function inverse_element_2(a, p) {
    return modPow(a, phi(p) - 1, p);
}

 function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}
