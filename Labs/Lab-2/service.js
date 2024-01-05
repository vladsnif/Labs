const UKRAINIAN_ALPHABET = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя";

    export function encrypt(text, key) {
    let encryptedText = "";
    let textLength = text.length;

    for (let i = 0; i < textLength; i++) {
        let plainChar = text[i];
        let keyChar = key[i % key.length];
        let shift = UKRAINIAN_ALPHABET.indexOf(keyChar);

        if (UKRAINIAN_ALPHABET.includes(plainChar)) {
            let newIndex = (UKRAINIAN_ALPHABET.indexOf(plainChar) + shift) % UKRAINIAN_ALPHABET.length;
            encryptedText += UKRAINIAN_ALPHABET[newIndex];
        } else {
            encryptedText += plainChar;
        }
    }

    return encryptedText;
}
export function decrypt(text, key) {
    let decryptedText = "";
    let textLength = text.length;

    for (let i = 0; i < textLength; i++) {
        let cipherChar = text[i];
        let keyChar = key[i % key.length];
        let shift = UKRAINIAN_ALPHABET.indexOf(keyChar);

        if (UKRAINIAN_ALPHABET.includes(cipherChar)) {
            let newIndex = (UKRAINIAN_ALPHABET.indexOf(cipherChar) - shift + UKRAINIAN_ALPHABET.length) % UKRAINIAN_ALPHABET.length;
            decryptedText += UKRAINIAN_ALPHABET[newIndex];
        } else {
            decryptedText += cipherChar;
        }
    }

    return decryptedText;
}