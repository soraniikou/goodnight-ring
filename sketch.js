
let rings = [];
let particles = [];
let messageTimer = 0;
let showGoodnight = false;
let goodnightAlpha = 0;
let activeMessageAlpha = 255;

let myVoice; 
let voiceCount = 0; // 再生回数を数える変数

let messages = [
  "Thumb: You've already done enough today",
  "Index: Tomorrow's worries can wait until tomorrow",
  "Middle: It's okay to set aside what's unfinished",
  "Ring: You are enough, just by being here",
  "Pinky: May a small happiness find you tomorrow"
];

function preload() {
  // 音声ファイルの読み込み
  myVoice = loadSound('voice.m4a'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  
  // スマホの音ズレ対策：オーディオコンテキストを明示的に作成
  getAudioContext().suspend();

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
  fill(135, 206, 250);
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = 'rgba(135, 206, 250, 0.8)';
  textStyle(BOLD);
  textSize(28);
  text("Which finger gets the ring?", width / 2, 80);
  pop();

  let anyActive = rings.some(r => r.active);

  if (anyActive) {
    messageTimer++;
    // ここで Goodnight 画面へ移行する時間を判定
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
    fill(25, 25, 112, goodnightAlpha); 
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'rgba(25, 25, 112, 0.5)';
    textStyle(BOLD);
    textSize(32); 
    text("Goodnight", width / 2, height / 2);
    pop();
    return;
  }

  // リングとメッセージの描画
  for (let r of rings) {
    r.y = r.baseY + sin(frameCount * 0.015 + r.offset) * 8;
    if (r.active) {
      r.fade = lerp(r.fade, 255, 0.05);
      if (frameCount % 20 == 0) particles.push(new Particle(r.x, r.y));
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
    pop();

    if (r.fade > 1) {
      fill(173, 216, 230, min(r.fade, activeMessageAlpha));
      textSize(24);
      text(r.msg, width / 2, height - 120);
    }
  }

  // パーティクル更新
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].alpha <= 0) particles.splice(i, 1);
  }
}

function mousePressed() {
  // 【重要】スマホ対策：タップの瞬間にオーディオを有効化
  userStartAudio().then(() => {
    console.log("Audio ready");
  });

  if (showGoodnight) return;

  for (let r of rings) {
    let d = dist(mouseX, mouseY, r.x, r.y);
    if (d < 50) {
      let alreadyActive = r.active;
      rings.forEach(ring => ring.active = false);
      r.active = !alreadyActive;

      // ★タップした瞬間に音声を2回再生する処理を開始
      if (r.active && myVoice.isLoaded()) {
        voiceCount = 0;
        playVoiceTwice();
      }

      messageTimer = 0;
      activeMessageAlpha = 255;
    }
  }
}

// 音声を2回繰り返すための関数
function playVoiceTwice() {
  if (voiceCount < 2) {
    myVoice.play();
    voiceCount++;
    // 1回目が終わったら、少し間を空けて自分自身をもう一度呼ぶ
    myVoice.onended(() => {
      setTimeout(playVoiceTwice, 500); // 0.5秒あけて2回目
    });
  }
}

// (ParticleクラスとdrawBackgroundStarsは変更なしのため省略して貼り付けてOKです)
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
    circle(this.x, this.y, this.size);
  }
}

function drawBackgroundStars() {
  for (let i = 0; i < 20; i++) {
    fill(255, 255, 255, 60);
    circle(noise(i * 5) * width, noise(i * 15) * height, 1);
  }
}
