function findAllPointsOnCurve() {
    const p = 23;
    let points = [];

    for (let x = 0; x < p; x++) {
        for (let y = 0; y < p; y++) {
            if ((y * y) % p === (x * x * x + x + 1) % p) {
                points.push({x: x, y: y});
            }
        }
    }

    return points;
}

const pointsOnCurve = findAllPointsOnCurve();
console.log(pointsOnCurve);
