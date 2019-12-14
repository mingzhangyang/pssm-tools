const a = [
  "A",
  "G",
  "I",
  "L",
  "V",
  "M",
  "F",
  "W",
  "P",
  "C",
  "S",
  "T",
  "Y",
  "N",
  "Q",
  "H",
  "K",
  "R",
  "D",
  "E"
];

const aa = [];
for (let i of a) {
  for (let j of a) {
    aa.push(i + j);
  }
}

const aaa = [];
for (let i of a) {
  for (let j of aa) {
    aaa.push(i + j);
  }
}

export {a, aa, aaa};