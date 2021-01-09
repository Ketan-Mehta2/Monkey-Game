//decalaring variables
var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacles, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0,survivalTime = 0,chances = 3;
var ground;
var gameOver,gameOver_img;
var restart,restart_img;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.jfif");
}



function setup() {
//to create canvas
  createCanvas(575,400);
//to create ground
  ground = createSprite(400,357,900,10);
  ground.shapeColor = ("forestgreen");
//to create gameover and restart
    
  restart = createSprite(285,210,20,20);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  
  gameOver = createSprite(280,150,20,20);
  gameOver.addImage(gameOver_img);
  gameOver.scale = 0.2;
  
//to create monkey
  monkey = createSprite(50,310,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.150;
//assigning the value for score and chances
  score = 0;
  chances = 3;
//assigning the value for survival time
  survivalTime = 0;
//assigning groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
//clear the screen
  background("white");
  textSize(20);
  fill("black");
  text("Survival time: "+survivalTime,20,50);
  text("Chances: "+chances,235,50);
  text("Score: "+ score, 450,50);
  
 if (gameState === PLAY){
  //display score
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival time: "+survivalTime,20,50);
  text("Chances: "+chances,235,50);
  text("Score: "+ score, 450,50);
  
  //trying to invisible gameover and restart
   gameOver.visible = false;
   restart.visible = false;
   
  //trying to jump monkey
   if(keyDown("space") && monkey.y >= 300){
     monkey.velocityY = -10;
   }
   monkey.velocityY = monkey.velocityY + 0.3;
   monkey.collide(ground);
   
  //increase score
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     score = score + 2;
   }
  
  //decrease chances
   if(obstacleGroup.isTouching(monkey)){
     obstacleGroup.destroyEach();
     chances = chances - 1;
   }
   
  if(chances === 0){
    gameState = END;
  }
   banana();
   obstacles();
 }
  
  else if(gameState===END){
   bananaGroup.setVelocityEach(0);
   bananaGroup.destroyEach();
   obstacleGroup.setVelocityEach(0);
   obstacleGroup.destroyEach();
   gameOver.visible = true;
   restart.visible = true;
   monkey.collide(ground);
 }
  
  if(mousePressedOver(restart)){
    reset();
  }
  drawSprites();
}

function banana(){
 //write here code to banana
  if(World.frameCount%130===0){
    fruit = createSprite(575,200,20,20);
    fruit.y = Math.round(random(120,200));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -(7+(score/8));
    fruit.lifetime = 150;
    bananaGroup.add(fruit);
  }
}

function obstacles(){
 //write the code here to obstacle
  if(World.frameCount%300===0){
    obstacle = createSprite(575,325,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.150;
    obstacle.velocityX = -(8+(score/8));
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle)
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
  chances = 3;
  survivalTime = 0;
}

