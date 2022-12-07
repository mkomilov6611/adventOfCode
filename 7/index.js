const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const allLines = input.split('\n');

const dirSizeMapping = {}
const dirSubdirMapping = {}

let currDir = null;

allLines.forEach(line => {
    const isCD = line.includes('$ cd')
    const isDR = line.includes('dir ')
    const isLS = line.includes('$ ls')
    const isFile = !(isCD || isDR || isLS)

    if(isCD) {
        currDir = line.slice('$ cd'.length + 1, line.length);
    }

    if(isDR) {
        if (!dirSubdirMapping[currDir]) dirSubdirMapping[currDir] = []
        dirSubdirMapping[currDir].push(line.slice('dir'.length + 1, line.length))
    }

    if(isFile) {
        if (!dirSizeMapping[currDir]) dirSizeMapping[currDir] = 0
        dirSizeMapping[currDir] += Number(line.match(/\d+/));
    }
})

const validDirs = {};

function getDirTotalSize(dir) {
        let totalDirSize = dirSizeMapping[dir] || 0; // files size

        if(totalDirSize > 100000) {
            return false
        }

        let totalDirsAllSubsize = 0; 

        const subdirs = dirSubdirMapping[dir] || [];
        if(!subdirs.length) return totalDirSize;

        const isSubdirsValid = subdirs.every(sub => {
            const subTotalSize = getDirTotalSize(sub)
            totalDirSize += subTotalSize;

            if(subTotalSize <= 100000) {
                validDirs[sub] = subTotalSize;
            } else {
                return false
            }

            if(totalDirsAllSubsize > 100000) {
                return false
            }

            return true
        })

        if(!isSubdirsValid) {
            return false
        }

        return totalDirSize + totalDirsAllSubsize;
}

Object.keys(dirSubdirMapping).forEach(dir => {
   const totalDirSize = getDirTotalSize(dir)

    if(totalDirSize && totalDirSize <= 100000) {
        validDirs[dir] = totalDirSize;
    } else {
        return // no point in checking subs
    }
})    


console.log({dirSubdirMapping, dirSizeMapping, validDirs, result: Object.values(validDirs).reduce((a,b)=> a+ b, 0)})