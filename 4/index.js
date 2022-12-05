const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const allPairs = input.split('\n');
let totalDuplicates = 0
let totalDuplicates2 = 0;

allPairs.forEach(pair => {
   const [oneElv, otherElv] =  pair.split(',');
   const [oneBeg, oneEnd] = oneElv.split('-')
   const [otherBeg, otherEnd] = otherElv.split('-')

   const numberOneBeg = Number(oneBeg)
   const numberOtherBeg = Number(otherBeg)
   const numberOneEnd = Number(oneEnd)
   const numberOtherEnd = Number(otherEnd)

   if((Number(oneBeg) <= Number(otherBeg) && Number(oneEnd) >= Number(otherEnd))
    || (Number(otherBeg) <= Number(oneBeg) && Number(otherEnd) >= Number(oneEnd))) {
        totalDuplicates += 1;
    }


    if((numberOneBeg <= numberOtherBeg && numberOneEnd >= numberOtherBeg) ||
        (numberOtherBeg <= numberOneBeg && numberOtherEnd >= numberOneBeg)) {
            totalDuplicates2 += 1
        }
})

console.log({totalDuplicates, totalDuplicates2});
