let sketch1 = function(p) {
  let N;
  let s, margin = 1.5;

  let detail = 25;

  let palette1, palette2;

  p.setup = function() {
    p.createCanvas(500, 500, p.WEBGL);
    N = p.random([4, 6, 8]);
    s = p.width / (N + 2 * margin);
    margin *= s;
    p.noStroke();
    p.noLoop();
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
};
let sketch2 = function(p) {
  const circs = []; // array of circs
  const num = 2; // num of eyes
  const clrs = ["red", "green", "blue"]; // add more colors for inner circs
  const autoUpdateNumRays = false; // change if you want

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(32);

    p.strokeWeight(2);
    p.stroke(127);

    // Insert 2 "eyes"
    for (let n = 0; n < num; n++) {
      insertEye(((n + 1) * p.width) / (num + 1), p.height / 2, p.width / (num + 1), clrs, n % 2 !== 0);
    }

    p.frameRate(30);
  };

  function insertEye(x, y, r, clrs, backwards) {
    // Create structure circ for inner rays, will not be displayed later
    circs.push(new Circ(x, y, r * 0.05, clrs.length)); // clrs.length anchor positions
    if (backwards) circs[circs.length - 1].da = -circs[circs.length - 1].da;
    const poss = circs[circs.length - 1].getPos();

    // For every anchor position
    for (let i = 0; i < poss.length; i++) {
      const p1 = poss[i];
      const p2 = poss[(i + 1) % poss.length];
      const midPoint = { x: p.lerp(p1.x, p2.x, 0.5), y: p.lerp(p1.y, p2.y, 0.5) };
      // Create rotating structure circ
      circs.push(new Circ(midPoint.x, midPoint.y, r * 0.05, clrs.length));
      if (backwards) circs[circs.length - 1].da = -circs[circs.length - 1].da;
      circs[circs.length - 1].a = -p.TWO_PI / poss.length + (p.TWO_PI * i) / poss.length;
      const cp = circs[circs.length - 1].getPos();
      // Create circ to visualize with num of rays and given color
      circs.push(new Circ(cp[0].x, cp[0].y, r * 0.4, 17, clrs[i]));
      if (backwards) circs[circs.length - 1].da = -circs[circs.length - 1].da;
    }
  }

  p.draw = function() {
    p.blendMode(p.BLEND);
    p.background(32);

    p.push();
    p.blendMode(p.ADD);
    const per_n = circs.length / num;
    for (let n = 0; n < num; n++) {
      for (let i = 1; i < per_n; i += 2) {
        const sc = circs[n * per_n + i]; // structure circle
        const poss = sc.getPos();
        sc.update();

        const dc = circs[n * per_n + i + 1]; // display circ
        dc.show();
        dc.update(poss[0].x, poss[0].y);
        if (autoUpdateNumRays) {
          dc.setNumAnchors(20 + 10 * p.sin(p.TWO_PI * p.floor(p.fract(p.frameCount / 40) * 10) / 10));
        } else {
          if (p.mouseX && p.mouseY) dc.setNumAnchors(p.map(p.mouseX, 0, p.width, 3, 40), p.map(p.mouseY, 0, p.height, 200, 2));
        }
      }
    }
    p.pop();
    // noLoop();
  };

  p.mousePressed = function() {
    if (p.mouseButton === p.LEFT) {
      p.loop();
    }
  };

  // Class Circ
  // define position and size and num of anchor points
  // get positions of anchors after update() and getPos()
  class Circ {
    constructor(x, y, r, n, clr = null) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.n = n;
      this.a = 0;
      this.da = p.TWO_PI / n / 16; // level of detail rotation > 1
      this.clr = clr || p.color(128);
    }

    setNumAnchors(n, t = 16) {
      n = p.floor(n);
      this.n = n;
      this.da = p.TWO_PI / n / t * Math.sign(this.da);
    }

    getPos(n = null) {
      let poss = [];
      if (!n) n = this.n;

      for (let i = 0; i < n; i++) {
        const ca = (i / n) * p.TWO_PI;
        const x = p.cos(this.a + ca) * this.r + this.x;
        const y = p.sin(this.a + ca) * this.r + this.y;
        poss.push({ x, y });
      }

      return poss;
    }

    update(x = null, y = null) {
      this.a += this.da;
      if (!(x === null || y === null)) {
        this.x = x;
        this.y = y;
      }
    }

    show() {
      p.push();
      p.noFill();
      p.stroke(this.clr);
      p.translate(this.x, this.y);
      p.rotate(this.a);

      // circle(0, 0, this.r * 2);
      // strokeWeight(2);
      // line(0, -this.r, 0, this.r);

      p.noStroke();
      p.fill(this.clr);
      const poss = this.getPos(this.n * 2);
      for (let i = 0; i < poss.length - 1; i += 2) {
        p.beginShape();
        p.vertex(0, 0);
        p.vertex(poss[i].x - this.x, poss[i].y - this.y);
        p.vertex(poss[i + 1].x - this.x, poss[i + 1].y - this.y);
        p.endShape(p.CLOSE);
      }

      p.pop();
    }
  };
};



let p1 = new p5(sketch1, 'canvas1');
let p2 = new p5(sketch2, 'canvas2');
