import {countAtPosition} from './compute.js';
import sample from '../data/sample.js';

function createChart() {
  let canvas = document.getElementById('line-chart-canvas');
  let ctx = canvas.getContext('2d');
  ctx.w = +canvas.getAttribute('width');
  ctx.h = canvas.getAttribute('height');
  ctx.threshold = 12;
  ctx.outerSpace = 50;
  ctx.innerSpace = 30;
  ctx.drawingArea = {
    width: ctx.w - (ctx.outerSpace + ctx.innerSpace),
    height: ctx.h - (ctx.outerSpace + ctx.innerSpace),
  };

  // canvas.style.width = ctx.w + "px";
  // canvas.style.height = ctx.h + "px";
  //
  // let r = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
  // canvas.width = ctx.w * r;
  // canvas.height = ctx.h * r;
  // ctx.scale(r, r);

  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#222';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '16px Arial';
  ctx.save();

  let space = 50;

  ctx.translate(space, ctx.h - space);
  ctx.beginPath();
  ctx.moveTo(0, -(ctx.h - space * 2));
  ctx.lineTo(0, 0);
  ctx.lineTo(ctx.w - space * 2, 0);
  ctx.lineTo(ctx.w - space * 2, -(ctx.h - space * 2));
  ctx.closePath();
  ctx.stroke();

  ctx.translate(30, -30);
  for (let v of [0, 10, 20, 30, 40, 50]) {
    ctx.fillText(v + '', v * 20, 48);
  }
  ctx.textAlign = 'right';
  for (let v of [0, 50, 100, 150, 200]) {
    ctx.fillText(v + '', -40, -v * 2);
  }

  ctx.restore();
  draw(ctx);

  canvas.addEventListener('mouseenter', evt => {
    draw(ctx, getPos(canvas, evt));
  });

  canvas.addEventListener('mouseleave', evt => {
    draw(ctx, getPos(canvas, evt));
  });

  canvas.addEventListener('mousemove', evt => {
    draw(ctx, getPos(canvas, evt));
  });
}

function getPos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function draw(ctx, pos = {x: 0, y: 0}) {
  ctx.save();
  ctx.clearRect(60, 60, ctx.w - 120, ctx.h - 120);
  ctx.translate(80, ctx.h - 80);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  let d = countAtPosition(sample, ctx.threshold);
  ctx.data = d;
  for (let i = 1; i < d.length; i++) {
    ctx.lineTo(i * 20, -d[i] * 2);
  }
  ctx.stroke();
  ctx.restore();

  if (pos.x > 80 && pos.x < ctx.w - 80 && pos.y > 80 && pos.y < ctx.h - 80) {
    let r = (pos.x - 80) % 20;
    let n = (pos.x - 80 - r) / 20;
    n = r > 10 ? n + 1 : n;
    ctx.save();
    ctx.translate(80, ctx.h - 80);
    ctx.fillStyle = 'rgba(255, 66, 99, .6)';
    ctx.beginPath();
    ctx.fillRect(n * 20 - 2, -(ctx.h - 160), 4, ctx.h - 160);
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(n * 20, -ctx.data[n] * 2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#222";
    ctx.restore();
    ctx.save();
    ctx.translate(ctx.w - 200, 100);
    ctx.shadowBlur = "10";
    ctx.shadowColor = "rgba(255, 66, 99, .8)";
    ctx.beginPath();
    ctx.fillStyle = "#eef";
    ctx.fillRect(0, 0, 100, 100);
    ctx.restore();
    ctx.save();
    ctx.translate(ctx.w - 200, 100);
    ctx.fillStyle = "#222";
    ctx.font = "24px Arial";
    ctx.fillText(`y: ${ctx.data[n]}`, 50, 35);
    ctx.fillText(`x: ${n}`, 50, 75);
    ctx.stroke();
    ctx.restore();
  }
}

createChart();

let range = document.getElementById("range-bar");
range.addEventListener("input", () => {
  range.nextElementSibling.innerText = range.value;
  let canvas = document.getElementById('line-chart-canvas');
  let ctx = canvas.getContext("2d");
  ctx.threshold = +range.value;
  draw(ctx);
});