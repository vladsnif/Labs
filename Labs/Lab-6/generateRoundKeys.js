import {Rcon, sBox} from "./constants.js";

function subWord(word) {
    // Тут ви маєте використати S-box для підстановки кожного байта
    // Приклад:
    return word.map(b => sBox[b]);
}

function rotWord(word) {
    // Циклічний зсув слова (масиву з 4 байтів) на один байт вліво
    return word.slice(1).concat(word.slice(0, 1));
}

export function generateRoundKeys(key) {
    const Nb = 4;  // Кількість слів (32-бітних блоків) в основному ключі
    const Nk = 4;  // Довжина ключа в слівах (4 для AES-128)
    const Nr = 10; // Кількість раундів (10 для AES-128)

    let expandedKeys = new Array(Nb * (Nr + 1));
    for (let i = 0; i < Nk; i++) {
        expandedKeys[i] = key.slice(4 * i, 4 * (i + 1));  // Копіювання основного ключа
    }

    for (let i = Nk; i < Nb * (Nr + 1); i++) {
        let temp = expandedKeys[i - 1];
        if (i % Nk === 0) {
            temp = subWord(rotWord(temp)).map((b, index) => b ^ Rcon[i / Nk][index]);
        }
        expandedKeys[i] = expandedKeys[i - Nk].map((b, index) => b ^ temp[index]);
    }

    return expandedKeys;
}
