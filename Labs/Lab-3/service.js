import { finalPermutation, generateSubkeys, initialPermutation, feistelFunction, xor } from './utils.js'
import { EXPANSION_TABLE, S_BOXES, PERMUTATION_TABLE} from './constants.js'
export function desEncrypt(block, key) {
    const subkeys = generateSubkeys(key);
    let permutedBlock = initialPermutation(block);

    let left = permutedBlock.slice(0, 32);
    let right = permutedBlock.slice(32, 64);

    for (let i = 0; i < 16; i++) {
        let temp = right.slice();
        right = xor(left, feistelFunction(right, subkeys[i], EXPANSION_TABLE, S_BOXES, PERMUTATION_TABLE));
        left = temp;
    }

    let combinedBlock = right.concat(left);
    return finalPermutation(combinedBlock);
}

export function desDecrypt(block, key) {
    const subkeys = generateSubkeys(key).reverse();
    let permutedBlock = initialPermutation(block);

    let left = permutedBlock.slice(0, 32);
    let right = permutedBlock.slice(32, 64);

    for (let i = 0; i < 16; i++) {
        let temp = right.slice();
        right = xor(left, feistelFunction(right, subkeys[i], EXPANSION_TABLE, S_BOXES, PERMUTATION_TABLE));
        left = temp;
    }

    let combinedBlock = right.concat(left);
    return finalPermutation(combinedBlock);
}

export function bitArrayToText(bitArray) {
    let text = '';
    for (let i = 0; i < bitArray.length; i += 8) {
        let charCode = 0;
        for (let j = 0; j < 8; j++) {
            charCode |= bitArray[i + j] << (7 - j);
        }
        text += String.fromCharCode(charCode);
    }
    return text;
}
export function textToBitArray(text) {
    const bitArray = [];
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        for (let j = 7; j >= 0; j--) {
            bitArray.push((charCode >> j) & 1);
        }
    }
    return bitArray;
}
