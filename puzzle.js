class Puzzle {
  constructor() {
    this.xPos = (windowWidth-wnd)/2;
    this.yPos = (windowHeight-wnd)/2;
    this.unit = blockSize;
    this.startX = this.xPos-this.unit;
    this.startY = this.yPos-(this.unit*2);
    this.block = [];
    this.puzzleSolved = false;
    this.rndPzl = int(random(0,4));
    this.done = false;

    this.block['done'] = false;
    for (let i = 0; i < 3; i++) {
      this.block[i] = []
      for (let j = 0; j < 3; j++) {

        this.block[i][j] = new Blocks(this.startX+(i*this.unit),this.startY+(j*this.unit),this.unit,this.rndPzl);
      }
    }
  }

  checkSolved(blockSolved) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!blockSolved[i][j].solved()) {
          return false;
        }
      }
    }

    return true;
  }

  frame() {
    this.display();
    if (this.checkSolved(this.block)) {

        if (this.displaySolved() === 'done') {
          console.log(`this.displaySolved() === 'done'`);

          this.puzzleSolved = true;
          this.block['done'] = 'pizza';
          finalPuzzels.push(this.block);
          puzzleStateNew = false;
        }
        else {
          console.log(`this.displaySolved() === 'not done'`);
        }

        console.log(this.block);
    }
  }

  display() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.block[i][j].draw(this.unit);
      }
    }
  }

  displaySolved() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.block[i][j].drawSolved() === 'done') {
          return 'done';
        }
      }
    }

  }

  clicked() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.block[i][j].clicked(mouseX,mouseY);
      }
    }
  }
}
