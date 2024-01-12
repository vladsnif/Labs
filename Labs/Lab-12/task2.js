import {addPoints} from "./service.js";

function findOrderOfPoint(G, p) {
    let current = { x: G.x, y: G.y };
    let i = 1;

    while (!(current.x === 0 && current.y === 0)) {
        current = addPoints(current, G, p);
        i++;
    }

    return i;
}

const G = { x: 17, y: 20 };
const p = 23;
const order = findOrderOfPoint(G, p);
console.log(order);
