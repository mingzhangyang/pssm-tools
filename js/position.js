import {countAtPosition} from './compute.js';
import sample from '../data/sample.js';
import {setupScale, updateScale} from "./setupScale.js";

class DrawingBox {
  constructor (w, h, opts={}) {
    this.margin = Object.assign({top: 50, right: 50, bottom: 50, left: 50}, opts.margin);
    this.padding = Object.assign({top: 0, right: 0, bottom: 30, left: 30});
    this.outerBoxOrigin = {
      x: this.margin.left,
      y: h - this.margin.bottom,
    };
    this.innerBoxOrigin = {
      x: this.margin.left + this.padding.left,
      y: h - (this.margin.bottom + this.padding.bottom),
    };
    this.outerBoxWidth = w - (this.margin.left + this.margin.right);
    this.outerBoxHeight = h - (this.margin.top + this.margin.bottom);
    this.innerBoxWidth = this.outerBoxWidth - (this.padding.left + this.padding.right);
    this.innerBoxHeight = this.outerBoxHeight - (this.padding.top + this.padding.bottom);
  }
}

function getRangeByStep(min=0, max=100, step=10) {
  let res = [];
  let v = min;
  while (v < max) {
    res.push(v);
    v += step;
  }
  res.push(v);
  return res;
}

function getMax(arr) {
  let x = -Infinity;
  for (let a of arr) {
    if (a > x) {
      x = a;
    }
  }
  return x;
}

function getPos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function createChart() {
  let canvas = document.getElementById('line-chart-canvas');
  let ctx = canvas.getContext('2d');

  setupScale(ctx);

  ctx.drawingBox = new DrawingBox(ctx.w, ctx.h);

  ctx.threshold = 12;
  ctx.data = countAtPosition(sample, ctx.threshold);

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

function draw(ctx, pos = {x: 0, y: 0}) {
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#222';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '16px Arial';
  ctx.save();

  ctx.clearRect(0, 0, +ctx.canvas.width, +ctx.h * ctx.canvas.height);

  updateScale(ctx);

  ctx.translate(ctx.drawingBox.outerBoxOrigin.x, ctx.drawingBox.outerBoxOrigin.y);
  ctx.beginPath();
  ctx.moveTo(0, -ctx.drawingBox.outerBoxHeight);
  ctx.lineTo(0, 0);
  ctx.lineTo(ctx.drawingBox.outerBoxWidth, 0);
  ctx.lineTo(ctx.drawingBox.outerBoxWidth, -ctx.drawingBox.outerBoxHeight);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
  ctx.save();

  ctx.translate(ctx.drawingBox.innerBoxOrigin.x, ctx.drawingBox.innerBoxOrigin.y);
  let xAxis = getRangeByStep(0, ctx.data.length, 10);
  let xScale = ctx.drawingBox.innerBoxWidth / (xAxis[xAxis.length-1] - xAxis[0]);
  for (let v of xAxis) {
    ctx.fillText(v + '', v * xScale, ctx.drawingBox.padding.bottom + 18);
  }

  ctx.textAlign = "right";
  let max = getMax(ctx.data);
  let yScale = ctx.drawingBox.innerBoxHeight / max * .8;
  ctx.fillText('0', -ctx.drawingBox.padding.left-8, 0);
  ctx.fillText(max + "", -ctx.drawingBox.padding.left-8, -ctx.drawingBox.innerBoxHeight * .8);

  ctx.beginPath();
  ctx.moveTo(xScale, -ctx.data[0] * yScale);

  for (let i = 1; i < ctx.data.length; i++) {
    ctx.lineTo((i + 1) * xScale, -ctx.data[i] * yScale);
  }
  ctx.stroke();
  ctx.restore();

  let xSpaceStart = ctx.drawingBox.margin.left + ctx.drawingBox.padding.left;
  let xSpaceEnd = ctx.drawingBox.margin.right + ctx.drawingBox.padding.right;
  let ySpaceStart = ctx.drawingBox.margin.top + ctx.drawingBox.padding.top;
  let ySpaceEnd = ctx.drawingBox.margin.bottom + ctx.drawingBox.padding.bottom;

  if (pos.x > xSpaceStart && pos.x < ctx.w - xSpaceEnd && pos.y > ySpaceStart && pos.y < ctx.h - ySpaceEnd) {
    let r = (pos.x - xSpaceStart) % xScale;
    let n = Math.floor((pos.x - xSpaceStart) / xScale);
    n = r > xScale / 2 ? n + 1 : n; // n should be transformed to index of data by minus 1
    if (n === 0 || n > ctx.data.length) {
      return;
    }
    ctx.save();
    ctx.translate(ctx.drawingBox.innerBoxOrigin.x, ctx.drawingBox.innerBoxOrigin.y);
    ctx.fillStyle = 'rgba(255, 66, 99, .6)';
    ctx.beginPath();
    ctx.fillRect(n * xScale - 2, -(ctx.drawingBox.innerBoxHeight), 4, ctx.drawingBox.outerBoxHeight);
    ctx.restore();
    ctx.save();
    ctx.translate(ctx.drawingBox.innerBoxOrigin.x, ctx.drawingBox.innerBoxOrigin.y);
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(n * xScale, -ctx.data[n-1] * yScale, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#222";
    ctx.restore();
    ctx.save();
    ctx.translate(ctx.w - xSpaceEnd - 100 - 30, ySpaceStart + 30);
    ctx.shadowBlur = "10";
    ctx.shadowColor = "rgba(255, 66, 99, .8)";
    ctx.beginPath();
    ctx.fillStyle = "#eef";
    ctx.fillRect(0, 0, 100, 100);
    ctx.restore();
    ctx.save();
    ctx.translate(ctx.w - xSpaceEnd - 100 - 30, ySpaceStart + 30);
    ctx.fillStyle = "#222";
    ctx.font = "24px Arial";
    ctx.fillText(`y: ${ctx.data[n-1]}`, 50, 35);
    ctx.fillText(`x: ${n}`, 50, 75);
    ctx.stroke();
    ctx.restore();
  }
}

(function main() {
  createChart();

  let range = document.getElementById("range-bar");
  range.addEventListener("input", () => {
    range.nextElementSibling.innerText = range.value;
    let canvas = document.getElementById('line-chart-canvas');
    let ctx = canvas.getContext("2d");
    ctx.threshold = +range.value;
    ctx.data = countAtPosition(sample, ctx.threshold);
    draw(ctx);
  });
})();