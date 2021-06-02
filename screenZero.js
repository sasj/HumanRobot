function drawScreenZero() {

  title(width/2,height/2);

  angle += 0.02;
}


function btnContinueSetup() {
  btnContinue = createButton('Please press this button to continue');
  btnContinue.class("continue");
  btnContinue.parent("artwork");
  btnContinue.mouseClicked(goToNext);
}


function title(_xPos,_yPos){
  push();
  translate(_xPos,_yPos);

  textAlign(RIGHT);
  textSize(fontSize);
  fill('#0000FF')
  text(`Hello, are you`,0,0);

  let textBoxAni = (sin(angle) * textHight) / 2 + textHight / 2;

  push();
  translate(-(textWidth/2)+(10),0-(textBoxAni/2));

  textHuman.noStroke();
  textHuman.fill('#0000FF');
  textHuman.textSize(fontSize);
  textHuman.textAlign(LEFT);
  textHuman.text('human?',textHuman.width/2,textHuman.height/2);
  image(textHuman,0,0,textWidth, textBoxAni);

  textRobot.noStroke();
  textRobot.fill('#0000FF');
  textRobot.textSize(fontSize);
  textRobot.textAlign(LEFT);
  textRobot.text('robot?',textRobot.width/2,textRobot.height/2);
  image(textRobot,0,(0-(textHight/2))+(textBoxAni),textWidth, textHight-textBoxAni);


    pop();
  pop();


// robot(height-(height/4),30,10,167);

}
