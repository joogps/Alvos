let targets = [];
let title;
let titleOpacity = 255;

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    title = loadImage('Title.png');

    textAlign(CENTER);
}

function draw() {
    background(0);

    noStroke()

    if (titleOpacity > 0.01) {
      tint(255, titleOpacity)
      image(title, width/2-title.width/4, height/2-title.height/4-50, title.width/2, title.height/2);

      fill(255, titleOpacity)
      textStyle(BOLD);
      text('toque em qualquer lugar para começar', width/2, height/2);

      if (!("vibrate" in window.navigator)) {
        textStyle(ITALIC);
        text('*navegador não suporta a função de vibração', width/2, height/2+100);
      }

      if (targets.length > 0) {
        titleOpacity = lerp(titleOpacity, 0, 0.1)
      }
    }
    
    noFill()
    for (let i = 0; i < targets.length; i++) {
        for (let j = 0; j < targets.length; j++) {
          if (i != j && targets[i].checkIntersection(targets[j])) {
            if ("vibrate" in window.navigator) {
              window.navigator.vibrate(50);
            }
          }
        }
        targets[i].display();
        targets[i].grow();
        if (targets[i].opacity <= 0) {
          targets.pop(i)
        }
    }
}

function touchStarted() {
  if (targets.length < 3) {
    targets.push(new Target(mouseX, mouseY))
    if ("vibrate" in window.navigator) {
      window.navigator.vibrate(50);
    }
  }
}

class Target {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.diameter = 0;
    this.speed = 2.5;
    this.thickness = 50;
    this.opacity = 255
  }

  grow() {
      this.diameter+= this.speed
      this.speed+= 0.001
      this.opacity-= this.speed/10
  }

  checkIntersection(target) {
    if (this.position.dist(target.position) < this.diameter/2 + target.diameter/2) {
      let intersection = (this.diameter/2 + target.diameter/2 - this.position.dist(target.position))%(this.thickness/4)
      if (intersection > 0 && intersection < 5) {
        return true
      }
    }
  }

  display() {
    stroke(255, this.opacity)
    for (let i = this.diameter; i > 0; i-= this.thickness) {
        strokeWeight(this.thickness/4)
        if (i-this.thickness <= 0) {
          strokeWeight(this.thickness/4*(i/this.thickness))
        }
        ellipse(this.position.x, this.position.y, i, i)
    }
  }
}