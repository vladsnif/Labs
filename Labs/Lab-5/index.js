function mul02(byte) {
    let result = byte << 1;
    if (byte && 0x80) {
        result = result ^ 0x1B;
    }
    return result & 0xFF;
}

function mul03(byte) {
    return mul02(byte) ^ byte;
}

console.log(mul02(0xD4).toString(16));
console.log(mul03(0xBF).toString(16));
