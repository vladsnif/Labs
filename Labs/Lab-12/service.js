function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

export function inverseMod(a, m) {
    if (a === 0 || gcd(a, m) !== 1) {
        return null; // Оберненого не існує, повертаємо null
    }
    let [g, x] = extendedGCD(a, m);
    return (x % m + m) % m;
}

function extendedGCD(a, b) {
    if (b === 0) return [a, 1, 0];
    let [g, x, y] = extendedGCD(b, a % b);
    return [g, y, x - y * Math.floor(a / b)];
}

export function addPoints(point1, point2, p) {
    if (point1.x === point2.x && point1.y === (p - point2.y)) {
        return { x: 0, y: 0 }; // Точки є інверсними, результат - точка в нескінченності
    }

    if (point1.x === 0 && point1.y === 0) return point2;
    if (point2.x === 0 && point2.y === 0) return point1;

    let lambda, inverse;
    if (point1.x === point2.x && point1.y === point2.y) {
        if (point1.y === 0) {
            return { x: 0, y: 0 }; // Подвоєння точки на осі x, результат - точка в нескінченності
        }
        let numerator = (3 * point1.x * point1.x + 1) % p;
        let denominator = (2 * point1.y) % p;
        inverse = inverseMod(denominator, p);
        if (inverse === null) {
            return { x: 0, y: 0 }; // Обернене для деномінатора не існує
        }
        lambda = (numerator * inverse) % p;
    } else {
        let numerator = (point2.y - point1.y) % p;
        let denominator = (point2.x - point1.x) % p;
        inverse = inverseMod(denominator, p);
        if (inverse === null) {
            return { x: 0, y: 0 }; // Обернене для деномінатора не існує
        }
        lambda = (numerator * inverse) % p;
    }

    let x3 = (lambda * lambda - point1.x - point2.x) % p;
    let y3 = (lambda * (point1.x - x3) - point1.y) % p;

    x3 = (x3 + p) % p;
    y3 = (y3 + p) % p;

    return { x: x3, y: y3 };
}