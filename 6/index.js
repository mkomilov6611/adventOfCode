const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

function isUnique(str) {
    return new Set(str).size == str.length;
}

let tempChars = []
let theIndex = null

input.split('').some((char, index) => {
    if(tempChars.length === 14) {
        tempChars.shift();
    }

    if(tempChars.length === 13 && !tempChars.includes(char)) {
        if(isUnique(tempChars)) {
            theIndex = index + 1;
            return true
        }
    }

    tempChars.push(char);
})

console.log({theIndex})
