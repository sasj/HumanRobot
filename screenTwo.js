function drawScreenTwo(){

    // final Artworks together
    push();
    translate(width/2,height/4);
    scale(artworkSize);

    let xPosDebug = 0;
    let yPosDebug = 0;
    let xPos = 0;
    let yPos = 0;
    let puzzleSize = blockSize*3;

    let puzzelsSolvedDebug = 8;
    let squareRootPuzzelsDebug = int(sqrt(puzzelsSolvedDebug));
    let squareRootPuzzels = int(sqrt(finalPuzzels.length));

    push();
    // translate(0,-puzzleSize);
    push();
    // translate(-((puzzleSize*(squareRootPuzzelsDebug/3))),-(puzzleSize*(squareRootPuzzelsDebug/3)));
    // translate(-((puzzleSize*squareRootPuzzelsDebug)/2),-((puzzleSize*squareRootPuzzelsDebug)/2));
    translate(-((puzzleSize*squareRootPuzzels)/2),-((puzzleSize*squareRootPuzzels)/2));


    // console.log(squareRootPuzzelsDebug);

    // ---- DEBUG ----
    // for (let i = 0; i < finalPuzzels.length; i++){
    //
    //     if (i%squareRootPuzzels === 0){
    //         xPosDebug = 0;
    //         yPosDebug += puzzleSize;
    //     } else {
    //         xPosDebug += puzzleSize;
    //     }
    //
    //     push();
    //     translate(xPosDebug+(blockSize/2),yPosDebug+(blockSize/2));
    //
    //     for (let i = 0; i < 3; i++) {
    //         for (let j = 0; j < 3; j++) {
    //             noFill();
    //             stroke('#FF0000');
    //             strokeWeight(2);
    //             rect(i*(blockSize),j*(blockSize),(blockSize),(blockSize));
    //         }
    //     }
    //     fill('#FF00FF'); ellipse(0,0,20,20);
    //     pop();
    // }

    // ---- DEBUG ----

    finalPuzzels.forEach((puzzel, i) => {

        if (i%squareRootPuzzels === 0){
            xPos = 0;
            yPos += puzzleSize;
        } else {
            xPos += puzzleSize;
        }
        push();

        // translate(xPos-blockSize,(yPos-(puzzleSize+blockSize)));
        // translate(xPos-blockSize,yPos-blockSize);
        // console.log(`translate(${xPos}-${blockSize},(${yPos}-(${puzzleSize}+${blockSize})))`);
        // console.log(`translate(${xPos-blockSize},${yPos-puzzleSize+blockSize})`);


        translate(xPos+(blockSize/2),yPos+(blockSize/2));
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                puzzel[i][j].draw('small',i,j);
            }
        }

        pop();
    } );


    pop();
    pop();



    pop();

    let posY = height-(height/4);
    robot(posY,timer,finalPuzzels.length,numbClicks);


}
