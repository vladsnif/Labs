import {FP, IP, PC1, PC2} from './constants.js';

export function initialPermutation(block) {
    let permutedBlock = [];
    for (let i = 0; i < IP.length; i++) {
        permutedBlock.push(block[IP[i] - 1]);
    }

    return permutedBlock;
}

export function finalPermutation(block) {
    let permutedBlock = [];
    for (let i = 0; i < FP.length; i++) {
        permutedBlock.push(block[FP[i] - 1]);
    }

    return permutedBlock;
}

function permute(key, permutationTable) {
    let permutedKey = [];
    for (let i = 0; i < permutationTable.length; i++) {
        permutedKey.push(key[permutationTable[i] - 1]);
    }
    return permutedKey;
}


function leftRotate(arr, shifts) {
    return arr.slice(shifts).concat(arr.slice(0, shifts));
}

export function generateSubkeys(key) {
    const shifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

    let permutedKey = permute(key, PC1);
    let C = permutedKey.slice(0, 28);
    let D = permutedKey.slice(28, 56);

    let subkeys = [];
    for (let i = 0; i < 16; i++) {
        C = leftRotate(C, shifts[i]);
        D = leftRotate(D, shifts[i]);
        let combinedKey = C.concat(D);
        let subkey = permute(combinedKey, PC2);
        subkeys.push(subkey);
    }

    return subkeys;
}

function expand(block, expansionTable) {
    let expandedBlock = [];
    for (let i = 0; i < expansionTable.length; i++) {
        expandedBlock.push(block[expansionTable[i] - 1]);
    }
    return expandedBlock;
}

export function xor(bits1, bits2) {
    return bits1.map((bit, index) => bit ^ bits2[index]);
}

function substitute(expandedBlock, sBoxes) {
    let substitutedBlock = [];
    for (let i = 0; i < sBoxes.length; i++) {
        let blockPart = expandedBlock.slice(i * 6, (i + 1) * 6);
        let row = (blockPart[0] << 1) | blockPart[5];
        let col = (blockPart[1] << 3) | (blockPart[2] << 2) | (blockPart[3] << 1) | blockPart[4];
        let sBoxValue = sBoxes[i][row][col];

        substitutedBlock.push(sBoxValue >> 3 & 1);
        substitutedBlock.push(sBoxValue >> 2 & 1);
        substitutedBlock.push(sBoxValue >> 1 & 1);
        substitutedBlock.push(sBoxValue & 1);
    }
    return substitutedBlock;
}


export function feistelFunction(right, subkey, expansionTable, sBoxes, permutationTable) {
    let expandedBlock = expand(right, expansionTable);
    let xoredBlock = xor(expandedBlock, subkey);
    let substitutedBlock = substitute(xoredBlock, sBoxes);
    return permute(substitutedBlock, permutationTable);
}
