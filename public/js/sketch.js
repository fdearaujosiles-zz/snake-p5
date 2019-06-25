var player, frameSkip = 8;

function setup() {
  createCanvas(400, 400);
  player = new Player();
  food = new Food();
}

function draw() {
  if(frameCount % frameSkip == 0) {
    if(!player.nextMove) player.update(...player.dir);
    player.show();
  }
}

function keyPressed() {
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
}