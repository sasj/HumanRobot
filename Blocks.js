class Blocks {

  constructor(xPos,yPos,dim, pzl){
    this.xPos = xPos;
    this.yPos = yPos;
    this.rot = int(random(0,4));
    this.rndRot = int(random(0,4));
    this.dim = dim;
    this.sp = this.dim/6;
    this.puzzle = pzl;
    this.st = false;
    this.newDim = 0;
    this.good = this.rot;
    this.done = false;
  }

  clicked(px,py){
    let d = dist(px, py, this.xPos, this.yPos);
    if (d < (this.dim/2)) {

      if (this.good === 3){
        this.rot = 0;
        this.good = 0;
      } else {
        this.rot = this.rot +1;
        this.good = this.good  +1;
      }
    }

  }


  solved(){
    return this.st;
  }

  draw(){
    rectMode(CENTER);
    push();

    translate(this.xPos,this.yPos);
    strokeWeight(1);
    stroke('#0000FF');
    noFill();

  // console.log(this.st);


    //base rect
    fill(255);
    rect(0,0,this.dim,this.dim);


    if( this.good  === 0){
      stroke('#0000FF');
      fill('#0000FF');
      this.st = true;
    } else {
      fill('#FFFFFF');
      stroke('#0000FF');
      this.st = false;
    }

    rotate(radians(this.rndRot*90));
    rotate(radians(this.rot*90));

    if( this.good  === 0){
      stroke('#0000FF');
      fill('#0000FF');
      this.st = true;
    } else {
      fill('#FFFFFF');
      stroke('#0000FF');
      this.st = false;
    }

    this.shapes(this.puzzle);

    pop();
  }



  shapes(_shapeNumber){

      if( _shapeNumber === 0){
        let tmpSize = this.dim/2;
        beginShape();
        vertex(0-tmpSize,0-tmpSize);
        vertex(0,0+tmpSize);
        vertex(0-tmpSize,0+tmpSize);
        endShape(CLOSE);
      } else if (_shapeNumber === 1) {
        let tmpSize = this.dim/2;
        beginShape();
        vertex(0-tmpSize,0-tmpSize);
        vertex(0,0);
        vertex(0-tmpSize,0+tmpSize);
        endShape(CLOSE);
      } else if (_shapeNumber === 2) {
        let tmpSize = this.dim/2;
        beginShape();
        vertex(0-tmpSize,0-tmpSize);
        vertex(0+tmpSize,0);
        vertex(0-tmpSize,0+tmpSize);
        endShape(CLOSE);
      } else if (_shapeNumber === 3) {
        let tmpSize = this.dim;
        push();
        rotate(radians(180));
        translate(0,-tmpSize/2)
        arc(0,0,tmpSize,tmpSize,0,radians(180));

        pop();
      }

  }


  drawSolved() {

    rectMode(CENTER);
    push();
    translate(this.xPos,this.yPos);

    if (this.newDim < this.dim){
      let angle = 1;
      this.newDim += angle;
    } else {
         return 'done';
      this.newDim = this.dim;

    }

    fill('#FFFFFF');
    rect(0,0,this.newDim,this.newDim);
    pop();

  }

}
