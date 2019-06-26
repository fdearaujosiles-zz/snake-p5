class Player {
    constructor() {
      let centerX = width / 2;
      let centerY = height / 2;
      this.sqrSize = 10;
      this.body = [createVector(centerX, centerY), 
                      createVector(centerX-this.sqrSize, centerY), 
                      createVector(centerX-(this.sqrSize * 2), centerY), 
                      createVector(centerX-(this.sqrSize * 3), centerY), 
                      createVector(centerX-(this.sqrSize * 4), centerY)];
      this.dir = [1, 0];
      this.nextMove = undefined;
      this.nextDir = [1, 0];
    }
  
    get x() {return this.body[0].x}
    get y() {return this.body[0].y}
    get length() {return this.body.length}

    segment(n) {return [this.body[n].x, this.body[n].y, this.sqrSize, this.sqrSize]}
  
    update(xOffset, yOffset) {
      this.nextMove = this.body.map((s,i) => {
        if(i!=0) return this.body[i-1]
        else {
          let newPosX = s.x + (this.sqrSize * xOffset), newPosY = s.y + (this.sqrSize * yOffset);
          return createVector(newPosX>=width ? newPosX-width : newPosX<0 ? newPosX+width : newPosX,
                  newPosY>=height ? newPosY-height : newPosY<0 ? newPosY+height : newPosY)
        }
      })
      this.nextDir = [xOffset, yOffset]
    }
  
    hasEaten(food) {
      if(dist(this.x, this.y, food.x, food.y) < 1) {
        this.grow();
        return true
      }
      return false
    }

    collide() {
      for(let i=1; i<this.length;i++) {
        if(dist(this.body[0].x ,this.body[0].y, this.body[i].x, this.body[i].y) < 1) {
          return true
        }
      }
      return false
    }

    show() {
      background(30);
      fill(255);
      this.body = this.nextMove;
      this.dir = this.nextDir;
      this.nextMove = undefined;
      this.nextDir = undefined;
      fill(255, 40, 40, 255);
      rect(...this.segment(0));
      fill(120, 255, 120, 255);
      for(let i=1; i<this.length;i++) rect(...this.segment(i));
    }
  
    grow() {this.body = [...this.body, []]}
}