function leftRotate(value, shift) {
    return (value << shift) | (value >>> (32 - shift));
}

function prepareMessageForSha1(message) {
    let bits = toBitString(unescape(encodeURIComponent(message))) + "1" + "0".repeat((448 - message.length * 8 - 1) % 512) + lengthBitString(message);
    let chunks = [];
    for (let i = 0; i < bits.length; i += 512) {
        chunks.push(bits.substring(i, i + 512));
    }
    return chunks;
}

function toBitString(str) {
    return str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

function lengthBitString(message) {
    let length = message.length * 8;
    return length.toString(2).padStart(64, '0');
}

function sha1(message) {
    let h0 = 0x67452301;
    let h1 = 0xEFCDAB89;
    let h2 = 0x98BADCFE;
    let h3 = 0x10325476;
    let h4 = 0xC3D2E1F0;

    let chunks = prepareMessageForSha1(message);

    chunks.forEach(chunk => {
        let words = [];
        for (let i = 0; i < 16; i++) {
            words[i] = parseInt(chunk.substring(i * 32, (i + 1) * 32), 2);
        }
        for (let i = 16; i < 80; i++) {
            words[i] = leftRotate(words[i - 3] ^ words[i - 8] ^ words[i - 14] ^ words[i - 16], 1);
        }

        let [a, b, c, d, e] = [h0, h1, h2, h3, h4];

        for (let i = 0; i < 80; i++) {
            let f, k;
            if (i < 20) {
                f = (b & c) | (~b & d);
                k = 0x5A827999;
            } else if (i < 40) {
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            } else if (i < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8F1BBCDC;
            } else {
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }

            let temp = (leftRotate(a, 5) + f + e + k + words[i]) >>> 0;
            e = d;
            d = c;
            c = leftRotate(b, 30);
            b = a;
            a = temp;
        }

        h0 = (h0 + a) >>> 0;
        h1 = (h1 + b) >>> 0;
        h2 = (h2 + c) >>> 0;
        h3 = (h3 + d) >>> 0;
        h4 = (h4 + e) >>> 0;
    });

    return [h0, h1, h2, h3, h4].map(e => e.toString(16).padStart(8, '0')).join('');
}

let message = "Hello world!";
console.log(sha1(message));