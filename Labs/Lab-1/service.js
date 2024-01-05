export function encrypt(input, rowKey, columnKey) {
    let rowKeyLength = rowKey.length;
    let columnKeyLength = columnKey.length;
    let matrix = Array.from(Array(rowKeyLength), () => new Array(columnKeyLength));
    let index = 0;

    for (let i = 0; i < rowKeyLength; i++) {
        for (let j = 0; j < columnKeyLength; j++) {
            if (index < input.length) {
                matrix[i][j] = input[index++];
            }
        }
    }

    let sortedMatrix = Array.from(rowKey).map((c, i) => ({ char: c, index: i }))
        .sort((a, b) => a.index - b.index)
        .map(item => item.char);

    return Array.from(columnKey).sort().map(ch => {
        let colIndex = columnKey.indexOf(ch);
        return Array.from({length: rowKeyLength}).map((_, i) => {
            let rowIndex = sortedMatrix.indexOf(rowKey[i]);
            return matrix[rowIndex][colIndex];
        }).join('');
    }).join('');
}

export function decrypt(encryptedText, rowKey, columnKey) {
    let rowKeyLength = rowKey.length;
    let columnKeyLength = columnKey.length;
    let matrix = Array.from(Array(rowKeyLength), () => new Array(columnKeyLength));
    let index = 0;

    Array.from(columnKey).sort().forEach(ch => {
        let colIndex = columnKey.indexOf(ch);
        for (let i = 0; i < rowKeyLength; i++) {
            if (index < encryptedText.length) {
                matrix[i][colIndex] = encryptedText[index++];
            }
        }
    });

    let originalOrder = Array.from(rowKey).map((c, i) => ({ char: c, index: i }))
        .sort((a, b) => a.index - b.index)
        .map(item => item.char);

    let decryptedText = Array.from({length: rowKeyLength}).map((_, i) => {
        return Array.from({length: columnKeyLength}).map((_, j) => {
            let rowIndex = originalOrder.indexOf(rowKey[i]);
            return matrix[rowIndex][j];
        }).join('');
    }).join('');

    return decryptedText.trim();
}