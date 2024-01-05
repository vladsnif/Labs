import {gcdex} from "./gcdex.js";

export function inverse_element(a, n) {
    let [gcd, x, y] = gcdex(a, n);
    if (gcd !== 1) {
        return null; // обернений елемент не існує
    } else {
        return (x % n + n) % n;
    }
}