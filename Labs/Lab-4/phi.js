export function phi(m) {
    let result = m;
    for (let p = 2; p * p <= m; ++p) {
        if (m % p === 0) {
            while (m % p === 0) {
                m /= p;
            }
            result -= result / p;
        }
    }
    if (m > 1) {
        result -= result / m;
    }
    return result;
}

