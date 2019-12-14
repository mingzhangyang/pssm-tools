import {compute, findMinMax} from "./compute.js";
import {draw_1} from "./draw.js";

window.onload = () => {
  console.log("loaded");
  let data = compute();
  console.log(findMinMax(data));
  let canvas = document.getElementById("canvas");
  draw_1(canvas, data);
};