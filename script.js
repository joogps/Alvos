let targets = [];

function setup() {
    createCanvas(800, 800);
    background(0);
}

function draw() {
    for (let i = 0; i < targets.length; i++) {
        targets[i].display()
        targets[i].grow()
    }
}

function touchStarted() {
    if (targets.length < 2) {
        targets.push(new Target(mouseX, mouseY))
    }
}

class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 0;
    this.speed = 5;
    this.thickness = 30;
  }

  grow() {
      this.diameter+= this.speed
  }

  display() {
    noStroke()
    for (let i = this.diameter/this.thickness; i > 0; i-= 1) {
        if (i*this.thickness/2 > width+this.thickness) {
            continue
        }
        fill(floor(i)%2 == floor(this.diameter/this.thickness)%2 ? 255 : 0)
        ellipse(this.x, this.y, i*this.thickness, i*this.thickness)
    }
  }
}