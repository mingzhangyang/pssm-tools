import {compute, sum, sumAbove} from "./compute.js";

function prep(data=compute()) {
  const tc = 8000;
  let keys = Object.keys(data).map(d => +d).sort((a, b) => a - b);
  let res = [];
  for (let key of keys) {
    let c = sumAbove(data, key);
    res.push({
      score: key,
      count: c.size,
      ratio: c.size/tc,
      specificity: 1 - c.size / tc,
    });
  }
  return res;
}

function barChart(d=prep()) {
  let c = document.getElementById("bar-chart");
  let df = document.createDocumentFragment();

  let spacing = 6;
  let i = 0;

  for (let obj of d) {
    let b = df.appendChild(document.createElement("div"));
    b.classList.add("bar");
    b.setAttribute("id", `score-${obj.score}`);
    b.style.height = obj.ratio * 80 + "%";
    b.style.left = spacing + (spacing + 12) * i + "px";

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

barChart();