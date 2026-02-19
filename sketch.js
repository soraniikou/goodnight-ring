let rings = [];
let particles = [];
let messageTimer = 0;
let showGoodnight = false;
let goodnightAlpha = 0;
let activeMessageAlpha = 255;

let messages = [
  "Thumb: You've already done enough today",
  "Index: Tomorrow's worries can wait until tomorrow",
  "Middle: It's okay to set aside what's unfinished",
  "Ring: You are enough, just by being here",
  "Pinky: May a small happiness find you tomorrow"
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  
  for (let i = 0; i < 5; i++) {
    rings.push({
      x: width / 6 * (i + 1),
      y: height * 0.55,
      baseY: height * 0.55,
      label: ["T", "I", "M", "R", "P"][i],
      msg: messages[i],
      active: false,
      fade: 0,
      offset: random(100)
    });
  }
}

function draw() {
  background(10, 15, 25);
  drawBackgroundStars();

  push();
  fill(255, 182, 193);
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = 'rgba(255, 182, 193, 0.8)';
  textStyle(BOLD);
  textSize(28);
  text("Which finger gets the ring?", width / 2, 80);
  pop();

  let anyActive = rings.some(r => r.active);

  if (anyActive) {
    messageTimer++;
    if (messageTimer > 15 * 60) {
      activeMessageAlpha = lerp(activeMessageAlpha, 0, 0.05);
      if (activeMessageAlpha < 5) {
        showGoodnight = true;
        rings.forEach(r => r.active = false);
      }
    }
  }

  if (showGoodnight) {
    goodnightAlpha = lerp(goodnightAlpha, 255, 0.03);
    push();
    fill(173, 216, 230, goodnightAlpha);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = 'rgba(173, 216, 230, 0.8)';
    textStyle(BOLD);
    textSize(64);
    text("Goodnight", width / 2, height / 2);
    pop();
    return;
  }

  for (let r of rings) {
    r.y = r.baseY + sin(frameCount * 0.015 + r.offset) * 8;
    
    if (r.active) {
      r.fade = lerp(r.fade, 255, 0.05);
      if (frameCount % 20 == 0) {
        particles.push(new Particle(r.x, r.y));
      }
    } else {
      r.fade = lerp(r.fade, 0, 0.1);
    }

    push();
    translate(r.x, r.y);
    noFill();
    strokeWeight(4);
    for (let j = 0; j < 10; j++) {
      let strokeCol = map(j, 0, 10, 60, 210);
      stroke(strokeCol, strokeCol, strokeCol + 40, 180);
      ellipse(0, 0, 60 + j / 2, 40 + j / 2);
    }
    stroke(255, 255, 255, 150);
    strokeWeight(2);
    arc(0, 0, 62, 42, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    
    if (r.fade > 0) {
      stroke(135, 206, 250, r.fade);
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = 'rgba(135, 206, 250, 0.7)';
      ellipse(0, 0, 65, 45);
    }
    pop();

    fill(150, 150, 200, 150);
    noStroke();
    textSize(16);
    text(r.label, r.x, r.y + 60);
    
    if (r.fade > 1) {
      fill(173, 216, 230, min(r.fade, activeMessageAlpha));
      drawingContext.shadowBlur = 12;
      drawingContext.shadowColor = 'rgba(173, 216, 230, 0.6)';
      textSize(24);
      text(r.msg, width / 2, height - 120);
      drawingContext.shadowBlur = 0;
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (showGoodnight) return;
  for (let r of rings) {
    let d = dist(mouseX, mouseY, r.x, r.y);
    if (d < 50) {
      let alreadyActive = r.active;
      rings.forEach(ring => ring.active = false);
      r.active = !alreadyActive;
      messageTimer = 0;
      activeMessageAlpha = 255;
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x + random(-15, 15);
    this.y = y;
    this.vx = random(-0.1, 0.1);
    this.vy = random(-0.2, -0.5);
    this.alpha = 255;
    this.size = random(2, 4);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1.2;
  }
  display() {
    noStroke();
    fill(255, 255, 210, this.alpha);
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = 'white';
    circle(this.x, this.y, this.size);
    drawingContext.shadowBlur = 0;
  }
}

function drawBackgroundStars() {
  for (let i = 0; i < 20; i++) {
    fill(255, 255, 255, 60);
    circle(noise(i * 5) * width, noise(i * 15) * height, 1);
  }
}