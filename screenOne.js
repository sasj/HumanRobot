function drawScreenOne(){

  timer+= 0.01;
  // console.log(timer);
  // ellipse(width/2,height/2,5,5);

// Nodes appear when accept buttons pressed
      for (var i = 0; i < balls.length; i++) {
        balls[i].move();
        balls[i].display();
      }

// if puzzle is active - no interaction with nodes and buttons
      if(pzzlStateNew === true){

          pzzl[pzzl.length-1].frame();

          ballsInteraction = false;

        for (let i = 0; i < btnNumb; i++) {
          buttons[i].attribute('disabled','disabled');
        }
        btnContinue.attribute('disabled','disabled');

      } else {
        ballsInteraction = true;

        for (let i = 0; i < btnNumb; i++) {
          buttons[i].removeAttribute('disabled');
        }
        btnContinue.removeAttribute('disabled');

        if (finalPuzzels.length > 0 && !btnContinue.hasClass('continue')){
          btnContinue.removeClass("hide");
          btnContinue.html("I'm done");
          btnContinue.class("continue");
          //btnContinue.position(((width/2) + canvasDimensions.margin - (btnContinue.offsetWidth/2)), 50);
        }
      }









}
