let targets = [];
let title;

function setup() {
    createCanvas(windowWidth, windowHeight);

    noFill()
    stroke(255)

    title = loadImage('Title.png');
}

function draw() {
    background(0);

    if (targets.length < 1) {
      image(title, width/2-title.width/4, height/2-title.height/4-50, title.width/2, title.height/2);
      textAlign(CENTER);
      text('toque em qualquer lugar para começar', width/2, height/2);
    }

    for (let i = 0; i < targets.length; i++) {
        for (let j = 0; j < targets.length; j++) {
          if (i != j && targets[i].checkIntersection(targets[j])) {
            background(255-targets[i].diameter/12);
            if ("vibrate" in window.navigator) {
              window.navigator.vibrate(50);
            }
          }
        }
        targets[i].display();
        targets[i].grow();
    }
}

function touchStarted() {
    targets.push(new Target(mouseX, mouseY))
    if ("vibrate" in window.navigator) {
      window.navigator.vibrate(50);
    }
}

class Target {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.diameter = 0;
    this.speed = 2;
    this.thickness = 30;
  }

  grow() {
      this.diameter+= this.speed
  }

  checkIntersection(target) {
    if (this.position.dist(target.position) < this.diameter/2 + target.diameter/2 && 
    (this.diameter/2 + target.diameter/2) % this.thickness/4 == 0) {
      return true
    }
  }

  display() {
    strokeWeight(this.thickness/4)
    stroke(255, 255-this.diameter/10)
    for (let i = this.diameter; i > 0; i-= this.thickness) {
        ellipse(this.position.x, this.position.y, i, i)
    }
  }
}