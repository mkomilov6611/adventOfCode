const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");

let register = {
  x: 1,
};
let ops = input.split("\n").map((x) => {
  let parts = x.split(" ");
  if (parts[0] === "addx") {
    return { type: "addx", amount: +parts[1], cycles: 2 };
  }
  return { type: parts[0], amount: 0, cycles: 1 };
});

let pc = 0;
let cycle = 1;
let strength = 0;
let line = "";
while (pc < ops.length) {
  //console.log(cycle, pc, ops[pc].type + " " + ops[pc].amount, register.x);
  if ((cycle - 20) % 40 === 0) {
    //console.log("Cycle", cycle, register.x);
    strength += cycle * register.x;
  }
  const pixel = (cycle % 40) - 1;
  line += Math.abs(register.x - pixel) <= 1 ? "#" : ".";
  if (cycle % 40 === 0 && cycle) {
    console.log(line);
    line = "";
  }
  if (ops[pc].cycles-- == 1) {
    register.x += ops[pc].amount;
    pc++;
  }

  cycle++;
}

console.log(strength);
