const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const allLines = input.split('\n');
const allStacks = [];

allLines.forEach((line) => {
    const allChars = line.match(/\[\w+\]|    /g)
        ?.map(char => char.replace('[', ''))
        ?.map(char => char.replace(']', ''));

    if(allChars) {
        allChars.forEach((char, index) => {
            if(char.trim().length) {
                if(!allStacks[index]) allStacks[index] = [];
                allStacks[index].unshift(char);
            }
        })
        return
    }
});

allLines.forEach((line) => {
    if(line) {
        const howMany = line.match(/move \d+/g) ? line.match(/move \d+/g)[0].match(/\d+/): null
        const fromWhere = line.match(/from \d+/g)? line.match(/from \d+/g)[0].match(/\d+/): null
        const toWhere = line.match(/to \d+/g)? line.match(/to \d+/g)[0].match(/\d+/): null

        console.log({line, before: allStacks, howMany,fromWhere, toWhere})
        
        if(howMany && fromWhere && toWhere) {
                allStacks[toWhere-1].push(...allStacks[fromWhere-1]
                    .splice(allStacks[fromWhere-1].length - howMany, allStacks[fromWhere-1].length))
        }
    }

    console.log({allStacks})
});

let theCombination = '';

allStacks.forEach(stack => {
    theCombination += stack[stack.length - 1];
})

console.log({theCombination})