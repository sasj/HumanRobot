class Ball {
  constructor(parent, xin, yin, idin, oin) {
    this.parent = parent;
    this.startX = xin;
    this.startY = yin;
    this.x = xin;
    this.y = yin;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.diameter = random(15,30);
    this.id = idin;
    this.others = oin;
    this.on = 0;
    this.angle = 0;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    // this.vx += gravity;
    // this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.vx += random(-0.01, 0.01);
    this.vy += random(-0.01, 0.01);

    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  clicked(px,py){
    let d = dist(px, py, this.x, this.y);
    if (d < this.diameter) {
      console.log("CLICKED ON BUBBLE!");
      var p = new Pzzls();
      pzzl.push(p);
      // console.log(pzzl);
      pzzlStateNew = true;
      this.on = 1;
    }

  }

  display() {
    // Line
    stroke('#0000FF');
    strokeWeight(1);
    line(this.startX, this.startY, this.x, this.y);


    if(this.on === 0){

      fill('#FFFFFF');
      ellipse(this.x, this.y, this.diameter, this.diameter);

      // fill('#0000FF');
      // let newDia = 1 + (sin(this.angle + PI) * (this.diameter/2) ) / 2 + (this.diameter/2);
      // ellipse(this.x, this.y, newDia, newDia);

      for(let i = 0; i < 3; i++){
      noFill();
      stroke('#0000FF');
      let newDia2 = 1 + (sin(this.angle+(HALF_PI*(i*0.9))) * (this.diameter/2) ) + (this.diameter/2);
      ellipse(this.x, this.y, newDia2, newDia2);
      }

      this.angle += 0.02;
    } else {
      fill('#0000FF');
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }

  }
}
