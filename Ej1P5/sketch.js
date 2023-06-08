let sketch1 = function(p) {
  let N;
  let s, margin = 1.5;

  let detail = 25;

  let palette1, palette2;

  p.setup = function() {
    let canvas1 = p.createCanvas(p.select('#canvas1').width, p.select('#canvas1').height, p.WEBGL);
    canvas1.parent('canvas1');
    p.noStroke();
    p.noLoop();
    resizeSketch1();
  };

  p.draw = function() {
    p.translate(-p.width / 2, -p.height / 2);

    palette1 = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];
    palette2 = p.shuffle(["#050505", "#fffbe6"]);

    let backCol = p.random([0, 1]);
    p.background(palette2[backCol]);

    for (let i = 0; i <= N; i++) {
      let x = i * s + margin;
      for (let j = 0; j <= N; j++) {
        let y = j * s + margin;
        p.fill(palette2[(i + j) % 2]);
        p.ellipse(x, y, s, s, detail * 4);
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        makeTile(i, j);
      }
    }

    let dotMode = ~~p.random(4);
    for (let i = 0; i <= N; i++) {
      let x = i * s + margin;
      for (let j = 0; j <= N; j++) {
        let y = j * s + margin;
        if (dotMode == 0) {
          p.fill(p.random(p.random([palette1, palette2])));
        } else if (dotMode == 1) {
          p.fill(p.random(palette1));
        } else if (dotMode == 2) {
          p.fill(p.random(palette2));
        } else {
          p.fill(palette2[1 - (i + j) % 2]);
        }
        if ((i + j) % 2 == backCol) p.fill(p.random(palette1));
        else p.fill(palette2[1 - (i + j) % 2]);
        p.ellipse(x, y, s / 2, s / 2, detail * 4);
      }
    }
  };

  function makeTile(i, j) {
    let x = i * s + margin;
    let y = j * s + margin;
    if (p.random() < 1 / 2) {
      p.fill(p.random(palette1));
      p.square(x, y, s);
      p.fill(palette2[(i + j) % 2]);
      p.arc(x, y, s, s, 0, p.PI / 2, p.PIE, detail);
      p.arc(x + s, y + s, s, s, p.PI, 3 * p.PI / 2, p.PIE, detail);
      p.fill(palette2[1 - (i + j) % 2]);
      p.arc(x + s, y, s, s, p.PI / 2, p.PI, p.PIE, detail);
      p.arc(x, y + s, s, s, 3 * p.PI / 2, p.TAU, p.PIE, detail);
    } else {
      if (p.random() < 1 / 2) {
        p.fill(palette2[1 - (i + j) % 2]);
        p.square(x, y, s);
        p.fill(palette2[(i + j) % 2]);
        p.arc(x, y, s, s, 0, p.PI / 2, p.PIE, detail);
        p.arc(x + s, y + s, s, s, p.PI, 3 * p.PI / 2, p.PIE, detail);
      } else {
        p.fill(palette2[(i + j) % 2]);
        p.square(x, y, s);
        p.fill(palette2[1 - (i + j) % 2]);
        p.arc(x + s, y, s, s, p.PI / 2, p.PI, p.PIE, detail);
        p.arc(x, y + s, s, s, 3 * p.PI / 2, p.TAU, p.PIE, detail);
      }
    }
  }

  p.windowResized = function() {
    resizeSketch1();
  };

  function resizeSketch1() {
    let containerWidth = p.select('#canvas1').width;
    let containerHeight = p.select('#canvas1').height;
    p.resizeCanvas(containerWidth, containerHeight);
    N = p.random([4, 6, 8]);
    s = containerWidth / (N + 2 * margin);
    margin *= s;
  }
};

let sketch2 = function(p) {
  let cols = ['#F2BBC9', '#4971A6', '#02732A', '#F2BB16', '#F27405'];

  let count = 10;
  let area = count * count;
  let w, h;
  let xa, ya;
  let uoff, voff;

  let off = 10;

  let pos = [];
  let sa = [];
  let col = [];

  let bg = '#FFF0DC';

  p.setup = function() {
    let canvas2 = p.createCanvas(p.select('#canvas2').width, p.select('#canvas2').height);
    canvas2.parent('canvas2');
    p.noStroke();
    p.frameRate(30);
    resizeSketch2();
  };

  p.draw = function() {
    p.background(bg);

    for (let n = 0; n < area; n++) {
      let posx = pos[n].x + w / 2;
      let posy = pos[n].y + h / 2;

      xa = p.map(n, -area, area, 0.1, Math.PI * uoff);
      ya = p.map(n, -area, area, 0.1, 2 * Math.PI * voff);

      let xoff = p.sin(sa[n] + xa);
      let yoff = p.abs(p.sin(sa[n] + ya));

      p.fill(0);
      p.text(n + 1, posx, posy);

      p.fill('#DED1B6');
      p.rect(posx + off, posy + off, w * xoff, h * yoff, 15);

      p.fill(col[n]);
      p.rect(posx, posy, w * xoff, h * yoff, 15);
    }

    xa += 0.1;
    ya += 0.1;
    uoff += 0.05;
    voff -= 0.01;
  };

  p.windowResized = function() {
    resizeSketch2();
  };

  function resizeSketch2() {
    let containerWidth = p.select('#canvas2').width;
    let containerHeight = p.select('#canvas2').height;
    p.resizeCanvas(containerWidth, containerHeight);
    pos = new Array(area);
    sa = new Array(area);
    col = new Array(area);
    w = containerWidth / count;
    h = containerHeight / count;
    uoff = 1;
    voff = 1;
    for (let n = 0; n < area; n++) {
      let i = n % count;
      let j = Math.floor(n / count);
      pos[n] = p.createVector(i * w, j * h);
      sa[n] = p.map(i * j, 0, area, -Math.PI, Math.PI);
      let s = p.sin(i + j);
      let ii = Math.floor(p.map(s, -1, 1, 0, cols.length));
      ii = p.constrain(ii, 0, cols.length - 1);
      col[n] = p.color(cols[ii]);
    }
  }
};

let p1 = new p5(sketch1, 'canvas1');
let p2 = new p5(sketch2, 'canvas2');
