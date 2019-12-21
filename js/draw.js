import {gradient} from "./color.js";
import {aaa} from "./aaa.js";
import {updateScale} from "./setupScale.js";

export function draw_1(canvas, data, opts) {
  let ctx = canvas.getContext("2d");
  if (!ctx) {
    console.log("Canvas is not supported in your browser");
  }
  let w = +canvas.getAttribute("width");
  // let h = +canvas.getAttribute("height");

  let barWidth = 20;
  let d = 4;
  let y = 40;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#888";
  ctx.font = "14px Arial";
  ctx.fillStyle = "#666";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "center";
  ctx.save();

  ctx.translate(w/2, y);
  ctx.beginPath();
  ctx.moveTo(-barWidth / 2, - 4);
  ctx.lineTo(barWidth / 2, - 4);
  ctx.stroke();
  ctx.fillText("0", 0, -4);

  for (let i = 1; i < 28; i++) {
    ctx.beginPath();
    ctx.moveTo(barWidth/2 + d  + (d + barWidth) * (i-1), -4);
    ctx.lineTo(barWidth/2   + (d + barWidth) * i, -4);
    ctx.stroke();
    ctx.fillText(i + '', barWidth/2 + d  + (d + barWidth) * (i-1) + barWidth / 2, -4);
    ctx.beginPath();
    ctx.moveTo(-barWidth/2 - d - (d + barWidth) * (i - 1), -4);
    ctx.lineTo(-barWidth/2 - (d + barWidth) * i, -4);
    ctx.fillText(-i + '', -barWidth/2 - d  - (d + barWidth) * (i-1) - barWidth / 2, -4);
    ctx.stroke();
  }

  ctx.restore();
  ctx.save();
  y = 41.5;
  ctx.translate(w / 2, y);
  ctx.lineWidth = 1;

  let keys = Object.keys(data);
  for (let key of keys) {
    let x = +key;
    if (x > 0) {
      for (let i = 0, n = aaa.length; i < n; i++) {
        let count = data[key][aaa[i]];
        if (count > 0) {
          ctx.strokeStyle = gradient[count];
          ctx.beginPath();
          ctx.moveTo(barWidth/2 + d  + (d + barWidth) * (x-1), i);
          ctx.lineTo(barWidth/2   + (d + barWidth) * x, i);
          ctx.stroke();
        }
      }
    } else if (x < 0) {
      x = -x;
      for (let i = 0, n = aaa.length; i < n; i++) {
        let count = data[key][aaa[i]];
        if (count > 0) {
          ctx.strokeStyle = gradient[count];
          ctx.beginPath();
          ctx.moveTo(-barWidth/2 - d  - (d + barWidth) * (x-1), i);
          ctx.lineTo(-barWidth/2   - (d + barWidth) * x, i);
          ctx.stroke();
        }
      }
    } else {
      for (let i = 0, n = aaa.length; i < n; i++) {
        let count = data[key][aaa[i]];
        if (count > 0) {
          ctx.strokeStyle = gradient[count];
          ctx.beginPath();
          ctx.moveTo(-barWidth / 2, i);
          ctx.lineTo(barWidth / 2, i);
          ctx.stroke();
        }
      }
    }
  }

}

export function draw_2(canvas, m, opts={squareWidth: 6, spacing: 2}) {
  // console.log(aaa.length);
  let ctx = canvas.getContext("2d");
  if (!ctx) {
    console.log("Canvas is not supported in your browser");
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  updateScale(ctx);

  let d = opts.squareWidth;
  let n = 0;
  for (; n < aaa.length; n++) {
    let c = n % 100;
    let r = (n - c) / 100;
    let t = m.get(aaa[n]);
    ctx.fillStyle = t ? "#f66" : "#ccc";
    ctx.fillRect((d+opts.spacing) * c, (d+opts.spacing) * r, d, d);
  }
}