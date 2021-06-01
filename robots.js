
function robot(_posY,finalTime,finalSolved,finalNumbClicks){
  rectMode(CENTER);
  let maxWidth = windowWidth-(wnd*2);
  let finalAmount = ((finalNumbClicks)/finalTime)*(finalSolved);
  let percentageBar = map(finalAmount,0,finalTime,0, maxWidth, true);
  // console.log(finalTime);


  push();
  translate(0,_posY);

  push();
  translate(wnd/2,0);
  rectMode(CORNER);
  stroke('#0000FF')
  fill('#FFFFFF')
  rect(0,0,maxWidth,15*scaleAmount);

  fill('#0000FF')
  rect(0,0,percentageBar,15*scaleAmount);
  pop();

  push();
  let spacing = height/20;
  translate(width/2,0);
  textAlign(CENTER);
  textSize(fontSize);
  fill('#0000FF')

  text('The robot meter',0,0,maxWidth,spacing*2);

  translate(0,spacing);
  translate(0,spacing);

  text('You have clicked ' + numbClicks + ' times',0,0,maxWidth,spacing*2);
  translate(0,spacing);
  text('and completed ' + finalPuzzels.length + ' puzzels',0,0, maxWidth,spacing*2);

  pop();
  pop();

}
