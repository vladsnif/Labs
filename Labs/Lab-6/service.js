import {addRoundKey, invMixColumns, invShiftRows, invSubBytes, mixColumns, shiftRows, subBytes} from "./utils.js";
import {generateRoundKeys} from "./generateRoundKeys.js";

export function aesEncrypt(plaintext, key) {
    let state = [...plaintext];  // Перетворення вхідних даних у внутрішню структуру
    let roundKeys = generateRoundKeys(key);  // Генерація раундових ключів

    addRoundKey(state, roundKeys[0]);

    for (let i = 1; i < 10; i++) {  // 10 раундів для 128-бітного ключа
        subBytes(state);
        shiftRows(state);
        mixColumns(state);
        addRoundKey(state, roundKeys[i]);
    }

    // Фінальний раунд без mixColumns
    subBytes(state);
    shiftRows(state);
    addRoundKey(state, roundKeys[10]);

    return state;  // Повертаємо зашифровані дані
}

export function aesDecrypt(ciphertext, key) {
    let state = [...ciphertext];  // Конвертування криптотексту у внутрішню структуру
    let roundKeys = generateRoundKeys(key);  // Генерація раундових ключів

    addRoundKey(state, roundKeys[10]);  // Початкове додавання ключа

    for (let i = 9; i > 0; i--) {  // 9 зворотних раундів
        invShiftRows(state);
        invSubBytes(state);
        addRoundKey(state, roundKeys[i]);
        invMixColumns(state);
    }

    // Фінальний раунд без invMixColumns
    invShiftRows(state);
    invSubBytes(state);
    addRoundKey(state, roundKeys[0]);

    return state;  // Повертаємо розшифровані дані
}