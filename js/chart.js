import {compute, sumAbove} from "./compute.js";

const _data = compute();
const _d = prep(_data);

function prep(data = _data) {
  const tc = 8000;
  let keys = Object.keys(data).map(d => +d).sort((a, b) => a - b);
  let res = [];
  for (let key of keys) {
    let c = sumAbove(data, key);
    res.push({
      score: key,
      count: c.size,
      ratio: c.size / tc,
      specificity: 1 - c.size / tc,
    });
  }
  return res;
}

function barChart(d = _d) {
  let c = document.getElementById("bar-chart");
  let df = document.createDocumentFragment();

  let spacing = 6;
  let i = 0;

  for (let obj of d) {
    let b = df.appendChild(document.createElement("div"));
    b.classList.add("bar");
    b.setAttribute("id", `score-${obj.score}`);
    b.style.height = obj.ratio * 80 + "%";
    b.style.left = 30 + spacing + (spacing + 12) * i + "px";

    let h = b.appendChild(document.createElement("div"));
    h.classList.add("header-info");
    h.innerText = obj.count + "";

    let f = b.appendChild(document.createElement("div"));
    f.classList.add("footer-info");
    f.innerText = obj.score + '';
    i++;
  }

  c.appendChild(df);
}

function lineChart(d = _d) {
  let canvas = document.getElementById("line-chart-canvas");
  let ctx = canvas.getContext("2d");
  if (!ctx) {
    alert("Canvas is not supported in your browser");
    return;
  }
  ctx.w = +canvas.getAttribute("width");
  ctx.h = +canvas.getAttribute("height");
  ctx.data = d;
  ctx.radius = 1;
  ctx.spacing = 18;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "16px Arial";
  ctx.fillStyle = "#666";
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#222";

  draw(ctx);

  canvas.addEventListener("mouseenter", evt => {
    let rect = canvas.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top;
    draw(ctx, {x: x, y: y});
  });
  canvas.addEventListener("mouseleave", evt => {
    draw(ctx);
  });
  canvas.addEventListener("mousemove", evt => {
    let rect = canvas.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top;
    draw(ctx, {x: x, y: y});
  });

  let xAxis = document.getElementById("line-chart").getElementsByClassName("x-axis")[0];
  xAxis.appendChild(createXAxis());
}

function draw(ctx, pos = {x: 0, y: 0}) {
  ctx.save();
  ctx.clearRect(0, 0, ctx.w, ctx.h);
  ctx.translate(42, ctx.h - 10);
  let h = ctx.h * .8;
  ctx.beginPath();
  ctx.moveTo(0, -h * ctx.data[0].specificity);
  for (let i = 1; i < ctx.data.length; i++) {
    ctx.lineTo(ctx.spacing * i, -h * ctx.data[i].specificity);
  }
  ctx.stroke();
  ctx.restore();

  if (pos.x > 36 && pos.x < 42 + (ctx.data.length - 1) * ctx.spacing) {
    let r = (pos.x - 42) % ctx.spacing;
    let n = Math.floor((pos.x - 42 - r) / ctx.spacing);
    n = r > 6 ? n + 1 : n;

    ctx.save();
    ctx.translate(42, ctx.h - 10);
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 66, 66, .4)";
    ctx.fillRect(ctx.spacing * n - 6, -h, 12, h);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    let cx = ctx.spacing * n;
    let cy = -h * ctx.data[n].specificity;
    ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#666";
    ctx.fillText((ctx.data[n].specificity * 100).toFixed(2) + "%", cx - 24, cy - 24);
    ctx.restore();
  }
}

function createXAxis(d=_d, space=30, barWidth=12, spacing=6) {
  let df = document.createDocumentFragment();

  let i = 0;
  for (let obj of d) {
    let b = df.appendChild(document.createElement("span"));
    b.classList.add("tick");
    b.style.left = 30 + spacing + (spacing + 12) * i + "px";
    b.innerText = obj.score + '';
    i++;
  }

  return df;
}

barChart(_d);
lineChart(_d);

