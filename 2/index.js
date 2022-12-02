const rl = require('readline').createInterface({input: require('fs').createReadStream('input.txt')});
let part1Score = 0;
let part2Score = 0;

const scoreMap = {
    X: 1,
    Y: 2,
    Z: 3
};

const winningMap = {
    'A X': 3,
    'A Y': 6,
    'A Z': 0,
    'B X': 0,
    'B Y': 3,
    'B Z': 6,
    'C X': 6,
    'C Y': 0,
    'C Z': 3
}

const hintMap = {
    X: {
        // should lose
        possibleCombinations: {
            A: 'Z',
            B: 'X',
            C: 'Y'
        }
    },
    Y: {
        // should draw
        possibleCombinations: {
            A: 'X',
            B: 'Y',
            C: 'Z'
        }
    },
    Z: {
        // should win
        possibleCombinations: {
            A: 'Y',
            B: 'Z',
            C: 'X'
        }
    }
}

rl.on('line', (game) => {
    const [opponentsChoose, myChoose] = game.split(' ');

    // Part 1 Strategy
    // default score no matter if we win or not
    part1Score += scoreMap[myChoose];
    // see whats score in winning map
    part1Score += winningMap[game];

    // Part 2 Strategy
    // default score by following hinted strategy
    const hintedChoose = hintMap[myChoose].possibleCombinations[opponentsChoose]
    part2Score += scoreMap[hintedChoose];
    // see whats score in winning map
    part2Score += winningMap[`${opponentsChoose} ${hintedChoose}`];
})

rl.on('close', ()=>{
    console.log({part1Score, part2Score})
})
