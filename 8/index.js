const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");

let visiblesCount = 0;
let maxViewScore = 0;

input.split("\n").forEach((line, lineIndex) => {
  if (lineIndex == 0 || lineIndex == line.length - 1) {
    visiblesCount += line.length;
    return;
  }

  line.split("").forEach((char, charIndex) => {
    const isVisible = checkIfVisible(input, line, lineIndex, char, charIndex);

    if (isVisible) {
      visiblesCount += 1;
    }
  });
});

function checkIfVisible(input, line, lineIndex, char, charIndex) {
  if (charIndex == 0 || charIndex == line.length - 1) {
    visiblesCount += 1;
    return;
  }

  const theBlockingCharsLeft = line.slice(0, charIndex).split("");
  const theBlockingCharsRight = line
    .slice(charIndex + 1, line.length)
    .split("");
  const theBlockingCharsUp = [];
  const theBlockingCharsDown = [];

  input.split("\n").forEach((_line, _lineIndex) => {
    if (_lineIndex < lineIndex) {
      theBlockingCharsUp.push(_line[charIndex]);
    }

    if (_lineIndex > lineIndex) {
      theBlockingCharsDown.push(_line[charIndex]);
    }
  });

  input.split("\n").map((_line, _lineIndex) => {});

  // part 1
  [
    theBlockingCharsLeft,
    theBlockingCharsRight,
    theBlockingCharsUp,
    theBlockingCharsDown,
  ].some((neighbor) => neighbor.every((nChar) => char > nChar))
    ? visiblesCount++
    : false;

  // part 2
  let theViewScores = [0, 0, 0, 0];

  [
    theBlockingCharsLeft.reverse(),
    theBlockingCharsRight,
    theBlockingCharsUp.reverse(),
    theBlockingCharsDown,
  ].forEach((neighbor, nIndex) => {
    neighbor.some((nChar) => {
      if (nChar >= char) {
        theViewScores[nIndex] += 1;
        return true;
      }

      theViewScores[nIndex] += 1;
      return false;
    });
  });

  let theViewScore = theViewScores.reduce((a, b) => a * b);

  if (theViewScore > maxViewScore) {
    maxViewScore = theViewScore;
  }
}

console.log({ part1: visiblesCount, part2: maxViewScore });
