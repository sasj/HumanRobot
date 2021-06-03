let artworkCanvas;
let canvasDimensions = { margin: 25, width: 0, height: 0 }
let wnd = 100;
let fontSize = 30;


let buttons = [];
let btnX, btnY;
let btnNumb = 8;
let btnText = ['I ACCEPT','CONFIRMED', 'ACCEPT ALL', 'ALLOW ALL', 'I UNDERSTAND', 'GOT IT!','UNDERSTOOD','ALRIGHT','OK', 'CLOSE'];


let gameState   = 0;
let numbClicks  = 0;
let numberPuzzlesSolved = 1;
let timer = 0;
let angle = 0;

// Nodes popping output
let balls       = [];
let numBalls    = 0;
let gravity     = 0.2;
let friction    = -0.9;
let spring      = 0.02;

// Blocks puzzles
let pzzl = [];
let pzzlState = true;
let pzzlStateNew = false; //false at start
let ballsInteraction = true;
let finalPuzzels = [];
let scaleAmount = 4;
let blockSize = 50;
let artworkSize = 10;


let textHuman;
let textRobot;
let textHight = 30*scaleAmount;
let textWidth = 70*scaleAmount;

let robotTextSpacing = 100;

function setup() {
    pixelDensity();
  artworkCanvas = createCanvas(canvasDimensions.width, canvasDimensions.height);
  artworkCanvas.parent("artwork");

  textFont("Roboto")
  textHuman = createGraphics(textWidth,textHight);
  textRobot = createGraphics(textWidth,textHight);
  windowResized();

  for (let i = 0; i < btnNumb; i++) {
    let rndNumText = int(random(0,btnText.length));
    buttons[i] = createButton(btnText[rndNumText]);
    let rndNumBut = int(random(0,btnText.length));
    buttons[i].class("hide");
    buttons[i].parent("artwork");
    buttons[i].mouseClicked(active);
  }

  btnContinue = createButton('Please press this button to continue');
  btnContinue.class("continue");
  btnContinue.parent("artwork");
  btnContinue.mouseClicked(goToNext);

  //debug pzzl
  var p = new Pzzls();
  pzzl.push(p);

  strokeWeight(1);

}

function draw() {
  background(255);

  if (gameState === 0) {
    drawScreenZero();
  }
  else if (gameState === 1){
    drawScreenOne();
  }
  else if (gameState === 2){
    drawScreenTwo();
    noStroke();
  }
}

function active(){
  this.class("active");
  console.log(this.elt)

  for (let i = 0; i < int(random(1,7)); i++) {
    balls.push(new Ball(this.elt, mouseX, mouseY)); // Make a new object at the mouse location and remember its parent button.
  }
  this.mouseClicked(false); // used so no new nodes appear from the button pressed
}

function goToNext(){
  if (gameState === 0) {
    btnContinue.class("hide");
    for (let i = 0; i < btnNumb; i++) {
      buttons[i].class("notActive");
    }
    gameState = 1;

  } else if (gameState === 1) {
    for (let i = 0; i < btnNumb; i++) {
      buttons[i].class("hide");
      btnContinue.html("restart");
    }
    gameState = 2;
  } else if (gameState === 2) {
    btnContinue.removeClass("hide");

    btnContinue.class("continue");
    btnContinue.mouseClicked(window.location.reload());

  }

}

const isTouchDevice =  function() {
  const is_or_not =  'ontouchstart' in window        // works on most browsers
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface

  return is_or_not ? true : false; // Fix to always return true or false
}

function mousePressed(e) {
  console.log('mouse/touch', e.type, mouseX, mouseY, isTouchDevice());
  if (isTouchDevice() && e.type === 'mousedown') {
    console.log('mobile device, ignore mousedown event');
    return;
  }

  if (ballsInteraction === true) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].clicked(mouseX, mouseY);
    }
  }

  if (pzzlStateNew === true) {
    pzzl[pzzl.length - 1].clicked();
  }


  if (gameState != 2) { numbClicks += 1;}
}

function setCanvasDimensions() {
  responsiveness();

  canvasDimensions.width          = windowWidth   - (canvasDimensions.margin * 2);
  canvasDimensions.height         = windowHeight  - (canvasDimensions.margin * 2);
  artworkCanvas.elt.style.margin  = canvasDimensions.margin + 'px';

  // console.log(canvasDimensions,windowWidth,windowHeight);
}

function windowResized() {
  setCanvasDimensions();
  resizeCanvas(
      canvasDimensions.width,
      canvasDimensions.height
  );
}

function responsiveness() {
  [
    { pixels: 411, scaleAmount: 1, margin: 25, fontSize: 18 , blockSize: 50, artworkSize:0.25, robotTextSpacing: 25},
    { pixels: 768, scaleAmount: 1, margin: 50, fontSize: 28, blockSize: 75, artworkSize:0.35, robotTextSpacing: 40 },
    { pixels: 1024, scaleAmount: 1, margin: 75, fontSize: 22, blockSize: 100, artworkSize:0.25, robotTextSpacing: 35 },
    { pixels: 1220, scaleAmount: 1, margin: 75, fontSize: 22, blockSize: 100, artworkSize:0.25, robotTextSpacing: 35 },
  ].forEach((breakPoint) => {
    let matchMedia = window.matchMedia(`(min-width: ${breakPoint.pixels}px)`);
    // console.log(breakPoint, matchMedia);
    if (matchMedia.matches) {
      scaleAmount   = breakPoint.scaleAmount;
      fontSize      = breakPoint.fontSize;
      blockSize      = breakPoint.blockSize;
      artworkSize      = breakPoint.artworkSize;
      robotTextSpacing = breakPoint.robotTextSpacing;
      canvasDimensions.margin = breakPoint.margin;
      wnd = (canvasDimensions.margin * 2);
      balls.forEach(ball => {
        repositionBallOrigin(ball);
      });
    }
  });
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    console.log(balls)
  }
  if (keyCode === RIGHT_ARROW) {
    balls[balls.length -1].startX = 100;
    balls[balls.length -1].startY = 100;
  }
  if (keyCode === DOWN_ARROW) {
    balls.forEach(ball => {
      repositionBallOrigin(ball);
    });
  }
}

function repositionBallOrigin(ball) {
  let parentPosition = ball.parent.getBoundingClientRect();
  ball.startX = (Math.ceil(parentPosition.left) + Math.ceil(ball.parent.offsetWidth / 2)) - canvasDimensions.margin;
  ball.startY = (Math.ceil(parentPosition.top) + Math.ceil(ball.parent.offsetHeight / 2)) - canvasDimensions.margin;

  /*
  console.log(ball.parent);
  console.log(`
        original startX/startY: ${ball.startX}/${ball.startY}
        parent position top/left: ${Math.ceil(parentPosition.left)}/${Math.ceil(parentPosition.top)}
        parent width/height: ${Math.ceil(ball.parent.offsetWidth)}/${Math.ceil(ball.parent.offsetHeight)}
        parent center: ${Math.ceil(parentPosition.left)} + ${Math.ceil(ball.parent.offsetWidth / 2)} / ${Math.ceil(parentPosition.top)} + ${Math.ceil(ball.parent.offsetHeight / 2)}
        canvas/browser margin: ${canvasDimensions.margin}
        new ball startX/startY: (${Math.ceil(parentPosition.left) + Math.ceil(ball.parent.offsetWidth / 2)}) - ${canvasDimensions.margin}/(${Math.ceil(parentPosition.top) + Math.ceil(ball.parent.offsetHeight / 2)}) - ${canvasDimensions.margin}
      `);
  */
}
