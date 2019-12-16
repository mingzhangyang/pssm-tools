import sample from "../data/sample.js";
import {aaa} from "./aaa.js";

export function compute(data = sample) {
  let arr = [];
  for (let i = 0; i < data.seq.length - 2; i++) {
    let j = i + 1;
    let k = i + 2;
    let obj = {};
    for (let v of aaa) {
      let score = data.scores[i][v[0]] + data.scores[j][v[1]] + data.scores[k][v[2]];
      if (!obj[score]) {
        obj[score] = [v];
        continue;
      }
      obj[score].push(v);
    }
    arr.push(obj);
  }
  let res = {};
  for (let obj of arr) {
    let keys = Object.keys(obj);
    for (let key of keys) {
      if (!res[key]) {
        res[key] = {};
      }
      for (let a of obj[key]) {
        if (!res[key][a]) {
          res[key][a] = 1;
          continue;
        }
        res[key][a] += 1;
      }
    }
  }

  return res;
}

export function findMinMax(d) {
  let min = 0;
  let max = 0;
  let keys = Object.keys(d);
  for (let key of keys) {
    let obj = d[key];
    let ks = Object.keys(obj);
    for (let k of ks) {
      let v = obj[k];
      if (v > max) {
        max = v;
      }
      if (v < min) {
        min = v;
      }
    }
  }
  return [min, max];
}

export function sum(d) {
  let res = {};
  let keys = Object.keys(d);
  for (let key of keys) {
    let obj = d[key];
    let ks = Object.keys(obj);
    let all = 0;
    for (let k of ks) {
      all += obj[k];
    }
    res[key] = {
      all: all,
      unique: ks.length,
    }
  }
  return res;
}

export function sumLog(d) {
  let res = {};
  let keys = Object.keys(d);
  for (let key of keys) {
    let obj = d[key];
    let ks = Object.keys(obj);
    let all = 0;
    for (let k of ks) {
      all += obj[k];
    }
    res[key] = {
      all: Math.log2(all),
      unique: Math.log2(ks.length),
    }
  }
  return res;
}

export function sumAbove(d, score) {
  let res = new Map();
  let obj = d[score+''];
  while (obj) {
    let keys = Object.keys(obj);
    for (let key of keys) {
      res.set(key, 1);
    }
    score++;
    obj = d[score + ''];
  }
  return res;
}

export function countAtPosition(data=sample, threshold=0) {
  let res = new Array(data.seq.length - 2);
  for (let i = 0; i < data.seq.length - 2; i++) {
    res[i] = 0;
    let j = i + 1;
    let k = i + 2;
    for (let a of aaa) {
      let score = data.scores[i][a[0]] + data.scores[j][a[1]] + data.scores[k][a[2]];
      if (score >= threshold) {
        res[i]++;
      }
    }
  }
  return res;
}