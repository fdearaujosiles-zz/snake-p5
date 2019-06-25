class Player {
    constructor() {
      let centerX = width / 2;
      let centerY = height / 2;
      this.sqrSize = 10;
      this.squares = [[centerX, centerY], 
                      [centerX-this.sqrSize, centerY], 
                      [centerX-(this.sqrSize * 2), centerY], 
                      [centerX-(this.sqrSize * 3), centerY], 
                      [centerX-(this.sqrSize * 4), centerY]];
      this.dir = [1, 0];
      this.nextMove = undefined;
      this.nextDir = [1, 0];
    }
  
    get length() {return this.squares.length}
  
    update(xOffset, yOffset) {
      console.log(xOffset, yOffset)
      this.nextMove = this.squares.map((s,i) => {
        if(i!=0) return this.squares[i-1]
        else {
          let newPosX = s[0] + (this.sqrSize * xOffset), newPosY = s[1] + (this.sqrSize * yOffset);
          return [newPosX>=width ? newPosX-width : newPosX<0 ? newPosX+width : newPosX,
                  newPosY>=height ? newPosY-height : newPosY<0 ? newPosY+height : newPosY]
        }
      })
      this.nextDir = [xOffset, yOffset]
    }
  
    show() {
      background(30);
      fill(255);
      this.squares = this.nextMove;
      this.dir = this.nextDir;
      this.nextMove = undefined;
      this.nextDir = undefined;
      fill(255, 40, 40, 255);
      rect(...this.squares[0].concat([this.sqrSize, this.sqrSize]));
      fill(120, 255, 120, 255);
      for(let i=1; i<this.length;i++) rect(...this.squares[i].concat([this.sqrSize, this.sqrSize]));
    }
  
    grow() {this.squares = [...this.squares, []]}
}