let targets = [];

function setup() {
    createCanvas(800, 800);

    noFill()
    stroke(255)
}

function draw() {
    background(0);
    for (let i = 0; i < targets.length; i++) {
        targets[i].display()
        targets[i].grow()
    }
}

function touchStarted() {
    targets.push(new Target(mouseX, mouseY))
    window.navigator.vibrate(100);
}

class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 0;
    this.speed = 2;
    this.thickness = 30;
  }

  grow() {
      this.diameter+= this.speed
  }

  display() {
    strokeWeight(this.thickness/4)
    stroke(255, 255-this.diameter/15)
    for (let i = this.diameter; i > 0; i-= this.thickness) {
        ellipse(this.x, this.y, i, i)
    }
  }
}