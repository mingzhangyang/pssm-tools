import {compute, sumAbove} from "./compute.js";
import {draw_2} from "./draw.js";
import {aaa} from "./aaa.js";
import {setupScale} from "./setupScale.js";

const squareWidth = 6;
const spacing = 2;
let data = compute();
let m = sumAbove(data, 12, {spacing: spacing, squareWidth: squareWidth});

function recognize(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  let x = evt.clientX - rect.left;
  let y = evt.clientY - rect.top;
  let rc = x % (squareWidth + spacing);
  let rr = y % (squareWidth + spacing);
  if (rc > squareWidth || rr > squareWidth) {
    document.getElementById("aaa-name").innerText = "";
    return;
  }
  let c = (x - rc) / (squareWidth + spacing);
  let r = (y - rr) / (squareWidth + spacing);
  let n = r * 100 + c;
  document.getElementById("aaa-name").innerText = aaa[n];
}

export default function setup() {
  let canvas = document.getElementById("canvas");

  draw_2(canvas, m);
  document.getElementById("count").innerText = m.size + '';

  canvas.addEventListener("mouseenter", evt => {
    recognize(canvas, evt);
  });

  canvas.addEventListener("mousemove", evt => {
    recognize(canvas, evt);
  });

  canvas.addEventListener("mouseleave", () => {
    document.getElementById("aaa-name").innerText = "";
  });

  let bar = document.getElementById("score-bar");
  bar.addEventListener("input", () => {
    bar.nextElementSibling.innerText = bar.value;
    let m = sumAbove(data, +bar.value);
    draw_2(canvas, m, {spacing: spacing, squareWidth: squareWidth});
    document.getElementById("count").innerText = m.size;
  });
}