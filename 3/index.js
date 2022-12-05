const rl = require('readline').createInterface({input: require('fs').createReadStream('input.txt')});

function split(str, index) {
    const result = [str.slice(0, index), str.slice(index)];
  
    return result;
}

let totalPriority = 0;

const priorityChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

// Part 1
rl.on('line', (rucksack) => {
    const [firstCompartment, secondCompartment] = split(rucksack, rucksack.length/2);
    const duplications = [];
    // fill the duplications and add the total priority for this rucksack 
    firstCompartment.split('').forEach(char => {
        if(secondCompartment.includes(char)){
            
            // keep track of the duplicates, so we dont add them more than once
            if(!duplications.includes(char)) {
                duplications.push(char);
            } else {
                // if its already in the list
                return
            }

            const isUpperCase = !priorityChars.includes(char);

            if(isUpperCase) {
                totalPriority += priorityChars.indexOf(char.toLowerCase()) + 27; 
            } else {
                totalPriority += priorityChars.indexOf(char) + 1
            }
        }
    })

})


// Part 2
let currentGroup = []
let totalPriority2 = 0;

rl.on('line', (rucksack) => {
    currentGroup.push(rucksack)

    if(currentGroup.length === 3) {
        console.log({currentGroup})
        const duplications = [];

        currentGroup[0].split('').forEach(char => {
            if(currentGroup[1].includes(char) && currentGroup[2].includes(char)) {
                // keep track of the duplicates, so we dont add them more than once
                if(!duplications.includes(char)) {
                    duplications.push(char);
                } else {
                    // if its already in the list
                    return
                }

                const isUpperCase = !priorityChars.includes(char);

                if(isUpperCase) {
                    totalPriority2 += priorityChars.indexOf(char.toLowerCase()) + 27; 
                } else {
                    totalPriority2 += priorityChars.indexOf(char) + 1
                }
            }
        })
        
        currentGroup = []
    }
})


rl.on('close', () =>{
    console.log({totalPriority, totalPriority2})
})