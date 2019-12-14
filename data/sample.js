const a = ["A", "G", "I", "L", "V", "M", "F", "W", "P", "C", "S", "T", "Y", "N", "Q", "H", "K", "R", "D", "E"];

const raw = `
P\tC\tMaster\tA\tG\tI\tL\tV\tM\tF\tW\tP\tC\tS\tT\tY\tN\tQ\tH\tK\tR\tD\tE
1 \tY\t7 - Y\t-5\t-6\t3\t-4\t2\t1\t4\t-3\t0\t-5\t0\t-4\t6\t0\t-5\t-4\t-5\t2\t-6\t-5
2 \tS\t8 - T\t-1\t-5\t2\t-2\t0\t-4\t1\t-6\t0\t1\t3\t3\t-4\t-4\t-4\t-5\t-1\t1\t-5\t-1
3 \tC\t9 - C\t-4\t-6\t-5\t-5\t-4\t-5\t-6\t-6\t-6\t12\t-4\t-4\t-6\t-6\t-7\t-7\t-7\t-7\t-7\t-7
4 \tD\t10 - N\t-1\t-5\t-7\t-7\t-6\t-6\t-7\t-7\t-5\t-7\t-3\t-1\t-6\t4\t-3\t3\t0\t-1\t7\t-2
5 \tG\t11 - E\t0\t4\t1\t-2\t-2\t-5\t-5\t-6\t-6\t5\t-2\t0\t0\t2\t-4\t3\t-5\t-5\t-5\t0
6 \tC\t12 - C\t-4\t-6\t-5\t-5\t-4\t-5\t-6\t-6\t-6\t12\t-4\t-4\t-6\t-6\t-7\t-7\t-7\t-7\t-7\t-7
7 \tL\t13 - K\t-4\t3\t-1\t3\t-1\t-3\t-5\t-6\t-5\t-6\t0\t-4\t-5\t1\t3\t-5\t1\t0\t-1\t-1
8 \tK\t14 - H\t-2\t1\t1\t-2\t-1\t3\t-5\t-6\t-5\t-5\t2\t2\t0\t1\t1\t1\t2\t-4\t-4\t0
9 \tP\tGap\t-2\t0\t-4\t0\t-2\t-4\t-5\t-5\t5\t-5\t-3\t-1\t1\t1\t-3\t2\t-4\t-4\t1\t3
10 \tI\t15 - H\t-5\t-7\t7\t1\t0\t-2\t3\t-5\t-6\t-5\t0\t-4\t-4\t-1\t-6\t3\t-6\t-6\t-6\t-6
P\tC\tMaster\tA\tG\tI\tL\tV\tM\tF\tW\tP\tC\tS\tT\tY\tN\tQ\tH\tK\tR\tD\tE
11 \tV\t16 - V\t0\t-6\t2\t-2\t2\t4\t-4\t5\t1\t-5\t0\t2\t2\t-1\t0\t-5\t-5\t-1\t-1\t-5
12 \tG\t17 - E\t-3\t6\t-6\t-6\t-5\t-5\t-5\t-5\t2\t-5\t-3\t-4\t-5\t1\t-3\t-4\t-3\t-1\t-3\t3
13 \tV\t18 - T\t-2\t-6\t0\t-1\t2\t1\t0\t-6\t3\t-5\t-1\t0\t0\t0\t-4\t1\t1\t2\t-5\t1
14 \tR\t19 - R\t-5\t-6\t-5\t-5\t0\t1\t1\t-5\t-6\t-6\t-4\t-5\t2\t-4\t0\t-4\t-2\t8\t-5\t-4
15 \tY\t20 - W\t-5\t-7\t1\t-2\t0\t2\t6\t8\t-7\t-6\t-6\t-5\t7\t-6\t-6\t-4\t-6\t-6\t-7\t-6
16 \tH\t21 - H\t-1\t-5\t-6\t-6\t-6\t-5\t-6\t-6\t-5\t-6\t-1\t-1\t-4\t2\t-3\t8\t4\t2\t-4\t1
17 \tC\t22 - C\t-4\t-6\t-5\t-5\t-4\t-5\t-6\t-6\t-6\t11\t-1\t-4\t-6\t1\t-6\t-6\t-6\t-7\t-6\t-7
18 \tL\t23 - T\t1\t-5\t-4\t1\t-1\t-4\t-5\t-6\t-5\t-5\t1\t0\t-5\t3\t3\t-4\t1\t1\t-1\t0
19 \tV\t24 - V\t-4\t-5\t-1\t-4\t4\t1\t-5\t-6\t-5\t-5\t0\t2\t-5\t1\t0\t-5\t-1\t1\t2\t1
20 \tC\t25 - C\t0\t-6\t-5\t-5\t-4\t-5\t-6\t-6\t-6\t11\t-4\t-4\t-6\t-6\t-6\t-6\t-1\t-6\t-7\t-7
P\tC\tMaster\tA\tG\tI\tL\tV\tM\tF\tW\tP\tC\tS\tT\tY\tN\tQ\tH\tK\tR\tD\tE
21 \tE\t26 - E\t-4\t0\t-5\t-1\t-2\t-5\t1\t2\t3\t-6\t0\t-4\t0\t-4\t-3\t-4\t-4\t2\t3\t3
22 \tD\t27 - D\t-5\t-5\t-7\t-7\t-7\t-6\t0\t-7\t-5\t-7\t-4\t-4\t-6\t3\t-3\t-4\t-1\t-5\t7\t1
23 \tF\t28 - Y\t-5\t-7\t0\t-3\t-4\t1\t8\t-3\t-7\t4\t-5\t0\t5\t-6\t-6\t-4\t-6\t-6\t-7\t-6
24 \tD\t29 - D\t-5\t-5\t-6\t-2\t-6\t-6\t-7\t-7\t-5\t-6\t-1\t1\t-6\t2\t-4\t-5\t-4\t-5\t8\t-2
25 \tL\t30 - L\t-1\t-7\t-2\t6\t-1\t-1\t0\t-5\t-6\t-5\t-2\t-4\t-4\t-7\t-6\t-6\t-6\t-6\t-7\t-6
26 \tC\t31 - C\t-4\t-6\t-5\t-5\t-4\t-5\t-6\t-6\t-6\t12\t-4\t-4\t-6\t-6\t-7\t-7\t-7\t-7\t-7\t-7
27 \tS\t32 - I\t-2\t-5\t0\t0\t-4\t-4\t1\t-5\t-5\t-5\t3\t1\t1\t-1\t2\t-4\t2\t0\t-1\t0
28 \tS\t33 - N\t0\t0\t0\t-5\t0\t-4\t-6\t-6\t0\t-5\t2\t2\t-5\t-1\t2\t-4\t2\t1\t0\t-1
29 \tC\t34 - C\t-4\t-6\t-5\t-5\t-4\t-5\t-6\t-6\t-6\t12\t-4\t-4\t-6\t-6\t-7\t-7\t-7\t-7\t-7\t-7
30 \tY\t35 - Y\t-5\t-7\t-1\t-1\t-4\t-4\t6\t-2\t-7\t-6\t-5\t-5\t8\t-6\t-1\t2\t-6\t-5\t-7\t-6
P\tC\tMaster\tA\tG\tI\tL\tV\tM\tF\tW\tP\tC\tS\tT\tY\tN\tQ\tH\tK\tR\tD\tE
31 \tA\t36 - N\t2\t-1\t-5\t0\t-5\t1\t-1\t-6\t-1\t-5\t1\t-4\t-5\t0\t3\t2\t1\t1\t-4\t0
32 \tK\t37 - T\t1\t1\t-5\t-5\t1\t-5\t-6\t-6\t-5\t-5\t2\t1\t-5\t1\t-3\t-4\t3\t1\t-4\t2
33 \tG\t38 - K\t-4\t4\t-1\t-2\t0\t2\t0\t-6\t-1\t-6\t-4\t-1\t-5\t1\t-1\t1\t2\t-1\t-1\t-1
34 \tK\tGap\t0\t-3\t-3\t-3\t-1\t2\t1\t-3\t-3\t-3\t1\t0\t-3\t2\t-2\t3\t2\t1\t1\t1
35 \tK\tGap\t-3\t2\t-1\t0\t-3\t-3\t-3\t-4\t0\t-4\t-3\t-1\t0\t-3\t-2\t3\t4\t-2\t2\t1
36 \tG\t39 - S\t0\t3\t3\t-5\t-4\t-4\t-5\t-6\t1\t-5\t1\t-1\t1\t-4\t-4\t1\t2\t1\t-1\t-4
37 \tH\t40 - H\t-5\t-5\t-7\t-7\t-7\t-5\t-5\t-6\t-6\t-7\t-4\t-5\t-2\t4\t-3\t11\t-4\t-4\t-4\t-4
38 \tP\tGap\t-1\t1\t-3\t0\t-3\t-3\t-3\t-4\t4\t-3\t-2\t2\t-3\t0\t1\t3\t1\t-3\t0\t0
39 \tP\tGap\t-2\t-2\t-2\t-1\t-2\t-2\t-2\t-2\t4\t-2\t1\t2\t-2\t-2\t1\t-2\t0\t0\t0\t0
40 \tD\t41 - T\t0\t1\t-6\t-6\t-5\t-5\t1\t-6\t-5\t-6\t1\t1\t0\t-3\t0\t-4\t2\t-1\t4\t2
P\tC\tMaster\tA\tG\tI\tL\tV\tM\tF\tW\tP\tC\tS\tT\tY\tN\tQ\tH\tK\tR\tD\tE
41 \tH\t42 - H\t-5\t-1\t-7\t-6\t-7\t-5\t-5\t-6\t-6\t-7\t-4\t-5\t-2\t-3\t2\t11\t-4\t-4\t-4\t-1
42 \tS\t43 - K\t1\t-1\t-1\t-1\t-5\t-4\t-6\t-6\t3\t-5\t4\t1\t-5\t-4\t0\t-5\t-1\t1\t0\t1
43 \tF\t44 - M\t-5\t-6\t1\t1\t-1\t5\t6\t-4\t-6\t-5\t1\t-4\t3\t-5\t-5\t-4\t-1\t0\t-6\t-2
44 \tT\t45 - V\t-2\t-2\t-3\t1\t2\t-4\t1\t-6\t-5\t2\t-2\t3\t-4\t-4\t-1\t-5\t0\t-5\t2\t2
45 \tE\t46 - K\t-1\t-5\t-1\t-2\t-1\t1\t1\t-6\t3\t1\t-1\t-4\t-5\t2\t0\t-4\t2\t2\t-4\t2
46 \tI\t47 - W\t0\t-6\t4\t2\t0\t5\t0\t2\t-1\t-5\t-5\t-4\t2\t0\t-5\t2\t-1\t-5\t-6\t-5`;

function prep(s) {
  let arr = s.split("\n").filter(d => d.trim()).map(line => line.split("\t"));
  arr = arr.filter(d => d[0] !== 'P');
  let res = {
    seq: [],
    scores: [],
  };
  for (let aa of arr) {
    res.seq.push(aa[1]);
    let obj = {};
    for (let i = 0; i < a.length; i++) {
      obj[a[i]] = +aa[i+3];
    }
    res.scores.push(obj);
  }
  return res;
}

const sample  = prep(raw);
export default sample;