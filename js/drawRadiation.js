import {randomColor} from "./color.js";

export function drawRadiation(canvas, data, opts={}) {
  let w = +canvas.getAttribute("width");
  let h = +canvas.getAttribute("height");
  let angle = 2 * Math.PI / data.length;
  let d = w/2 - 50;
  let ctx = canvas.getContext("2d");
  if (!ctx) {
    throw "Canvas is not supported in your browser"
  }
  ctx.translate(w/2, h/2);
  ctx.fillStyle = opts.fillStyle ? opts.fillStyle :"#000";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.font = opts.font ? opts.font : "24px Arial";
  ctx.rotate(0);
  ctx.lineWidth = opts.lineWidth ? opts.lineWidth : 2;
  ctx.save();

  for (let i = 0, n = data.length; i < n; i++) {
    ctx.strokeStyle = "#ccc";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(d, 0);
    ctx.stroke();
    ctx.fillText(data[i], d + 20, 0);
    ctx.rotate(-angle/2);
    ctx.beginPath();
    ctx.arc(0, 0, d, 0, angle);
    ctx.strokeStyle = randomColor();
    ctx.stroke();
    ctx.rotate(1.5 * angle);
  }
}