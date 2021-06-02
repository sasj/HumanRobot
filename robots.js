
function robot(_posY,finalTime,finalSolved,finalNumbClicks){
  rectMode(CENTER);
  let maxWidth = windowWidth-(wnd*2);


  let finalAmount = (1+( 0.5 * finalSolved)) * (1.0 * (finalNumbClicks/finalTime));
 ;

  let percentageBar = map(finalAmount,0,100,0, maxWidth, true);
  console.log(finalSolved,finalTime,finalNumbClicks,finalAmount);
// console.log(`100 - ((1+(0.1 * ${finalSolved})) * (0.4 * (${finalNumbClicks}/${finalTime})));`)

  push();
  translate(0,_posY);


  push();
  translate(width/2,0);
  textAlign(CENTER);
  textSize(fontSize);
  fill('#0000FF')

  text('You have clicked ' + numbClicks + ' times.',0,0,maxWidth,robotTextSpacing*2);
  translate(0,robotTextSpacing);

  text('Completed ' + finalPuzzels.length + ' puzzels.',0,0, maxWidth,robotTextSpacing*2);

  translate(0,robotTextSpacing);
  text('This makes you ' + floor(finalAmount) + '% robot',0,0,maxWidth,robotTextSpacing*2);

  //robot meter bar
  push();
  translate(-(width/2)+(wnd/2),0);
  rectMode(CORNER);
  stroke('#0000FF')
  fill('#FFFFFF')
  rect(0,0,maxWidth,robotTextSpacing/2);

  fill('#0000FF')
  rect(0,0,percentageBar,robotTextSpacing/2);
  pop();


  pop();
  pop();


}
