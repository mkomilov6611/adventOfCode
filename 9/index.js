const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");

function part1() {
  const h = [0, 0];
  const t = [0, 0];
  const hash = {};
  const addLoc = (loc) => (hash[loc.join(",")] = true);
  const moves = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
  };

  addLoc(t);
  input.split("\n").forEach((line) => {
    const [dir, cstr] = line.trim().split(/\s+/);
    const move = moves[dir];
    const ct = parseInt(cstr);
    for (let iter = 0; iter < ct; iter++) {
      h[0] += move[0];
      h[1] += move[1];
      updateChain(h, t);
      addLoc(t);
    }
  });
  return Object.keys(hash).length;
}

function updateChain(head, tail) {
  const dx = head[0] - tail[0];
  const dy = head[1] - tail[1];
  const dirx = head[0] > tail[0] ? 1 : -1;
  const diry = head[1] > tail[1] ? 1 : -1;
  if (dx === 0 || dy === 0) {
    if (Math.abs(dx) > 1) tail[0] += dirx;
    if (Math.abs(dy) > 1) tail[1] += diry;
  } else if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    tail[0] += dirx;
    tail[1] += diry;
  }
}

function part2() {
  const rope = Array.from(Array(10)).map(($) => [0, 0]);
  const hash = {};
  const addLoc = (loc) => (hash[loc.join(",")] = true);
  const moves = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
  };

  addLoc(rope[0]);
  input.split("\n").forEach((line, i) => {
    const [dir, cstr] = line.trim().split(/\s+/);

    const move = moves[dir];
    const ct = parseInt(cstr);
    for (let iter = 0; iter < ct; iter++) {
      rope[0][0] += move[0];
      rope[0][1] += move[1];

      for (let i = 1; i < rope.length; i++) {
        updateChain(rope[i - 1], rope[i]);
      }
      addLoc(rope[rope.length - 1]);
    }
  });
  return Object.keys(hash).length;
}

console.log({ part1: part1(), part2: part2() });
