import {compute, sum, sumAbove} from "./compute.js";
import {draw_2} from "./draw.js";

window.onload = () => {
  console.log("loaded");
  let data = compute();
  let m = sumAbove(data, 12);
  let canvas = document.getElementById("canvas");
  draw_2(canvas, m);
  document.getElementById("count").innerText = m.size;

  let bar = document.getElementById("score-bar");
  bar.addEventListener("input", () => {
    bar.nextElementSibling.innerText = bar.value;
    let m = sumAbove(data, +bar.value);
    draw_2(canvas, m);
    document.getElementById("count").innerText = m.size;
  })
};