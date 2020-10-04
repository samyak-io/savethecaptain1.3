var cap, capRunImg;
var ground, groundImg;
var backgr, backgroundImg;

//obstacles
var spikes, spikesImg, spikesGroup;
var fireBall, fireBallImg, fireBallGroup;

//coins
var silverCoins, silverCoinsImg, silverCoinsGroup, goldCoins, goldCoinsImg, goldCoinsGroup;


//game states
var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var score = 0;

function preload(){
    backgroundImg = loadImage("sprites/bg3.png");
    groundImg = loadImage("sprites/groundImg.png");

    capIdleImg = loadAnimation("sprites/idle-0.png");
    capRunImg = loadAnimation("sprites/run-0.png","sprites/run-1.png","sprites/run-3.png","sprites/run-4.png","sprites/run-5.png","sprites/run-6.png","sprites/run-7.png");

    fireBallImg = loadAnimation("sprites/fireBall1.png","sprites/fireBall2.png","sprites/fireBall3.png","sprites/fireBall4.png","sprites/fireBall5.png","sprites/fireBall6.png","sprites/fireBall7.png","sprites/fireBall8.png","sprites/fireBall9.png","sprites/fireBall10.png");
    spikesImg = loadImage("sprites/spikes.png");

    goldCoinsImg = loadAnimation("sprites/goldCoin1.png","sprites/goldCoin2.png","sprites/goldCoin3.png","sprites/goldCoin4.png","sprites/goldCoin5.png","sprites/goldCoin6.png","sprites/goldCoin7.png","sprites/goldCoin8.png","sprites/goldCoin9.png","sprites/goldCoin10.png")
    silverCoinsImg = loadAnimation("sprites/silverCoin1.png","sprites/silverCoin2.png","sprites/silverCoin3.png","sprites/silverCoin4.png","sprites/silverCoin5.png","sprites/silverCoin6.png","sprites/silverCoin7.png","sprites/silverCoin8.png","sprites/silverCoin9.png","sprites/silverCoin10.png")
  }

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);

    //create background
    backgr = createSprite(windowWidth/2 + 200, windowHeight/2 - 40, windowWidth, windowHeight);
    backgr.addImage(backgroundImg);
    backgr.x = backgr.width/2;
    
    //create ground
    ground = createSprite(0,backgr.y/2 + 550,windowWidth,10);
    ground.visible = false;
    ground.x = ground.width/2;
    ground.velocityX = -3;

    //create player
    cap = createSprite(windowWidth/8 - 30,ground.y);
    cap.scale = 2.5;
    cap.addAnimation("running",capRunImg);
    cap.addAnimation("idle", capIdleImg);
    
    spikesGroup = new Group();
    fireBallGroup = new Group();

    silverCoinsGroup = new Group();
    goldCoinsGroup = new Group();

}

function draw(){
    background("white");

  if(gameState === PLAY){
    if(ground.x < windowWidth/2){
      ground.x = ground.width/2;
    }

    backgr.velocityX = -5;
    if(backgr.x < 450){
      backgr.x = backgr.width/2;
    }

    //score system
    score = Math.round(frameCount/2);

    // console.log(windowWidth);
    console.log(cap.y);

    spikeObstacles();
    fireBallObstacle();
    silverCoin();
    goldCoin();
    jump();

    if(spikesGroup.isTouching(cap)){
     gameState = END;
   }
  } 
  else if(gameState === END){
    ground.velocityX = 0;
    cap.velocityY = 0;
    backgr.velocityX = 0;
    cap.changeAnimation("idle",capIdleImg);

    spikesGroup.setVelocityXEach(0);
    fireBallGroup.setVelocityXEach(0);
    silverCoinsGroup.setVelocityXEach(0);
    goldCoinsGroup.setVelocityXEach(0);
  }
    //collide captain with ground
    cap.collide(ground);

    //console.log(cap.y);
    drawSprites();
    
    stroke(62, 230, 255);
    fill("darkblue");
    textSize(20);
    textFont("Courier")
    text("Score: " + score, windowWidth - 200, windowHeight/8 - 20);
}

//press space to jump
function jump(){
  if(keyDown("space") && cap.y >= 686){
    cap.velocityY = - 17;
  }
  //add gravity to the captain
  cap.velocityY = cap.velocityY + 0.66;
}

//spawn spikes 
function spikeObstacles(){
    if(frameCount % 120 === 0){
    spikes = createSprite(windowWidth, ground.y, 20, 20);
    spikes.addImage(spikesImg);
    spikes.scale = 0.15;
    spikes.velocityX = -5;
    spikes.lifetime = 400;
    spikesGroup.add(spikes);
  }
}

function fireBallObstacle(){
  if(frameCount % 160 === 0 && score > 100){
    fireBall = createSprite(windowWidth, random(ground.y - 20, ground.y - 110), 20, 20);
    fireBall.addAnimation("fire",fireBallImg);
    fireBall.scale = 1.2;
    fireBall.velocityX = - 18;
    fireBall.lifetime = 320;
    fireBallGroup.add(fireBall);
  }
}

function silverCoin(){
  if(frameCount % 100 === 0){
    silverCoins = createSprite(windowWidth, random(ground.y - 15, ground.y - 120), 20, 20);
    silverCoins.addAnimation("sCoin",silverCoinsImg);
    silverCoins.scale = 0.1;
    silverCoins.velocityX = -5;
    silverCoins.lifetime = 320;
    silverCoinsGroup.add(silverCoins);
  }
}

function goldCoin(){
  if(frameCount % 220 === 0 && score > 150){
    goldCoins = createSprite(windowWidth, random(ground.y - 15, ground.y - 120), 20, 20);
    goldCoins.addAnimation("gCoin",goldCoinsImg);
    goldCoins.scale = 0.1;
    goldCoins.velocityX = -5;
    goldCoins.lifetime = 320;
    goldCoinsGroup.add(goldCoins);
  }
}
