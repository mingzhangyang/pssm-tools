export function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

const grayGradient = [];
for (let c of 'edcba987654321') {
  grayGradient.push('#' + c + c + c);
}

const gradient = [
  "#ff9999",
  "#ffbbbb",
  "#eecccc",
  "#cccccc",
  "#cceecc",
  "#bbffbb",
  "#99ff99",
  "#66ff66",
  "#00ff00",
  "#00ee00",
  "#00dd00",
  "#00cc00",
  "#00bb00",
  "#00aa00",
];

export {
  grayGradient,
  gradient,
};