function drawScreenTwo(){


// final Artworks together
  push();
  translate(width/2,height/3);
  scale(artworkSize);

  let xPos = 0;
  let yPos = 0;
  let puzzleSize = blockSize*3;

  // let tempPuzzelsSolved = 22;
  // let squareRootPuzzels = int(sqrt(tempPuzzelsSolved));
  let squareRootPuzzels = int(sqrt(finalPuzzels.length));

  push();
  translate(-puzzleSize*(squareRootPuzzels),-(puzzleSize*2)*(squareRootPuzzels));

  // ---- DEBUG ----
  // for (let i = 0; i < tempPuzzelsSolved; i++){
  //   push();
  //
  //    if (i%squareRootPuzzels === 0){
  //      xPos = 0;
  //      yPos += puzzleSize;
  //    } else {
  //    xPos += puzzleSize;
  //     }
  //
  //   translate(xPos,yPos);
  //   fill(10*i,0,10*i);
  //   rect(0,0,puzzleSize,puzzleSize);
  //
  //
  //   for (let i = 0; i < 3; i++) {
  //       for (let j = 0; j < 3; j++) {
  //   noFill();
  //   stroke('#FF0000');
  //   strokeWeight(2);
  //   rect(i*(blockSize),j*(blockSize),(blockSize)-2,(blockSize)-2);
  //     }
  //   }
  // pop();
  // }

  // ---- DEBUG ----


  finalPuzzels.forEach((puzzel, i) => {
    //console.log(puzzel,i);

    if (i%squareRootPuzzels === 0){
         xPos = 0;
         yPos += puzzleSize;
       } else {
         xPos += puzzleSize;
      }
    push();
    translate(xPos,yPos);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // puzzel[i][j].update(artworkSize,artworkSize);
        puzzel[i][j].draw();
      }
    }
    pop();
  });

  pop();
  pop();


  let posY = height-(height/4);
  robot(posY,timer,finalPuzzels.length,numbClicks);


}
