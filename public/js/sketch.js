var player, food, gameStart = false, speed = 7;

function createFood() {
  return createVector(floor(random((width/10) - 10)) * 10, floor(random((height/10) - 10)) * 10)
}

function setup() {
  createCanvas(400, 400);
  frameRate(speed)
  background(30)
  player = new Player();
  player.update(...player.dir);
  player.show();
  food = createFood();
  rect(food.x, food.y, 10, 10)
}

function draw() {
  if(gameStart){
    if(!player.nextMove) player.update(...player.dir);
    player.show();
    if(player.hasEaten(food)) food = createFood();
    if(player.collide()) {
      gameStart = false;
      player = new Player();
      player.update(...player.dir);
      player.show();
      food = createFood();
    }
    rect(food.x, food.y, 10, 10)
  }
}

function keyPressed() {
  if(gameStart){
    switch(keyCode) {
      case LEFT_ARROW:
        if(player.dir[0] == 0) player.update(-1,0);
        break;
      case RIGHT_ARROW:
        if(player.dir[0] == 0) player.update(1,0);
        break;
      case DOWN_ARROW:
        if(player.dir[1] == 0) player.update(0,1);
        break;
      case UP_ARROW:
        if(player.dir[1] == 0) player.update(0,-1);
        break;      
    }
  } else if (keyCode == RETURN) {
    gameStart = true;
  }
}