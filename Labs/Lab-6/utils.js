import {invSBox, sBox} from "./constants.js";

export function addRoundKey(state, roundKey) {
    for (let i = 0; i < state.length; i++) {
        // XOR кожного байта стану з відповідним байтом раундового ключа
        state[i] = state[i] ^ roundKey[i];
    }
}

export function subBytes(state) {
    for (let i = 0; i < state.length; i++) {
        state[i] = sBox[state[i]];
    }
}

 function shiftRow(row, shifts) {
    return row.slice(shifts).concat(row.slice(0, shifts));
}

export function shiftRows(state) {
    for (let i = 0; i < 4; i++) {
        let row = [state[i], state[i + 4], state[i + 8], state[i + 12]];
        row = shiftRow(row, i);
        for (let j = 0; j < 4; j++) {
            state[i + 4 * j] = row[j];
        }
    }
}

function galoisMultiplication(a, b) {
    let p = 0;
    for (let counter = 0; counter < 8; counter++) {
        if ((b & 1) !== 0) {
            p ^= a;
        }
        let hiBitSet = (a & 0x80) !== 0;
        a <<= 1;
        if (hiBitSet) {
            a ^= 0x1b; // x^8 + x^4 + x^3 + x + 1
        }
        b >>= 1;
    }
    return p % 256;
}

export function mixColumns(state) {
    for (let i = 0; i < 4; i++) {
        let column = [
            state[i], state[i + 4], state[i + 8], state[i + 12]
        ];

        let mixed = [
            galoisMultiplication(column[0], 2) ^ galoisMultiplication(column[1], 3) ^ column[2] ^ column[3],
            column[0] ^ galoisMultiplication(column[1], 2) ^ galoisMultiplication(column[2], 3) ^ column[3],
            column[0] ^ column[1] ^ galoisMultiplication(column[2], 2) ^ galoisMultiplication(column[3], 3),
            galoisMultiplication(column[0], 3) ^ column[1] ^ column[2] ^ galoisMultiplication(column[3], 2)
        ];

        for (let j = 0; j < 4; j++) {
            state[i + 4 * j] = mixed[j];
        }
    }
}

export function hexStringToByteArray(hexString) {
    let byteArray = [];
    for (let i = 0; i < hexString.length; i += 2) {
        let byteValue = parseInt(hexString.substring(i, i + 2), 16);
        byteArray.push(byteValue);
    }
    return byteArray;
}
export function byteArrayToHexString(byteArray) {
    return byteArray.map(byte => {
        let hex = byte.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function invShiftRow(row, shifts) {
    return row.slice(-shifts).concat(row.slice(0, -shifts));
}



export function invShiftRows(state) {
    for (let i = 0; i < 4; i++) {
        let row = [state[i], state[i + 4], state[i + 8], state[i + 12]];
        row = invShiftRow(row, i);
        for (let j = 0; j < 4; j++) {
            state[i + 4 * j] = row[j];
        }
    }
}
export function invSubBytes(state) {
    for (let i = 0; i < state.length; i++) {
        state[i] = invSBox[state[i]];
    }
}
export function invMixColumns(state) {
    for (let i = 0; i < 4; i++) {
        let column = [
            state[i], state[i + 4], state[i + 8], state[i + 12]
        ];

        let mixed = [
            galoisMultiplication(column[0], 14) ^ galoisMultiplication(column[1], 11) ^ galoisMultiplication(column[2], 13) ^ galoisMultiplication(column[3], 9),
            galoisMultiplication(column[0], 9) ^ galoisMultiplication(column[1], 14) ^ galoisMultiplication(column[2], 11) ^ galoisMultiplication(column[3], 13),
            galoisMultiplication(column[0], 13) ^ galoisMultiplication(column[1], 9) ^ galoisMultiplication(column[2], 14) ^ galoisMultiplication(column[3], 11),
            galoisMultiplication(column[0], 11) ^ galoisMultiplication(column[1], 13) ^ galoisMultiplication(column[2], 9) ^ galoisMultiplication(column[3], 14)
        ];

        for (let j = 0; j < 4; j++) {
            state[i + 4 * j] = mixed[j];
        }
    }
}

