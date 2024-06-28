
var trex ,trex_running, trex_collided;
var ground, obstacle;
var groundImage, invisibleGround;
var cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImagen,restartImage, gameOver,restart;
var jumSound, checkPoint, dieSound;
// var message = "esto es un mensaje";

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png" );
  trex_collided = loadAnimation("trex_collided.png")
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
restartImage = loadImage("restart.png");
gameOverImagen = loadImage("gameOver.png");

jumSound = loadSound("jump.mp3");
checkPoint = loadSound("checkpoint.mp3");
dieSound = loadSound("die.mp3")

}

function setup(){
  createCanvas(600,200)
 
  //crear sprite de Trex
  trex = createSprite(50,180,20,50);
trex.scale = 0.5;
  trex.addAnimation ("runnig", trex_running);
  trex.addAnimation ("collided", trex_collided);

  // crear sprites del suelo 
ground = createSprite(200,180,400,20);
ground.addImage("ground" ,groundImage );

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImagen);

restart = createSprite(300,140);
restart.addImage(restartImage);

gameOver.scale = 0.5;
restart.scale = 0.5;




invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;
var rand = Math.round(random(1,100));
console.log(rand);



obstaclesGroup = new Group();
cloudsGroup = new Group();

console.log("Hola"+ 5);

trex.setCollider("circle" ,0,0,40);
trex.debug = true;

score = 0;

}

function draw(){
  background("white")
  text("Puntuacion " + score, 500 ,50);


//console.log(message);
  console.log("esto es" , gameState);

  gameOver.visible = false;
restart.visible = false;

if(gameState === PLAY){
  // mover el suelo 
  ground.velocityX = -(6 + score/100);
  //sumatorian de puntos 
score = score + Math.round(getFrameRate()/60);
if(score > 0 && score % 100 === 0){
checkPoint.play();}

 // reiniciar el suelo del trex
 if(ground.x<0){
    ground.x = ground.width/2;
  }
  //tecla de salto
 if(keyDown("space") &&trex.y >=100 ){
    trex.velocityY = -10 ;
    jumSound.play();

  }
  // agregar gravedad
  trex.velocityY = trex.velocityY + 0.5 ;
  
//lamada de la funcion de nubes y obstaculos
   spawnClouds();
   spawnObstacles();
if(obstaclesGroup.isTouching(trex)){
  gameState = END;
}


}

else if (gameState === END){

trex.velocityY = 0;
trex.changeAnimation("collided", trex_collided);
gameOver.visible = true;
restart.visible = true;
dieSound.play();


  ground.velocityX = 0;

obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);


if(mousePressedOver(restart)){
  reset();

}

obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);


}

  console.log(frameCount);

 

   // CHOQUE CON EL SUELO
   trex.collide(invisibleGround);
   
   


  drawSprites();

}
function spawnClouds(){
  if(frameCount % 60 === 0){
  cloud = createSprite(600,100,40,10);
  cloud.addImage(cloudImage)
  cloud.y = Math.round (random(10,60));
  cloud.scale = 0.4;
  cloud.velocityX = -(6 + score/100);

  //Tiempo de vida de un sprite
  cloud.lifetime = 230;

  //Ajustar la profundidad de los sprites
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;

  cloudsGroup.add(cloud);

  
  }
}
function spawnObstacles(){
  if(frameCount % 60 === 0){
   obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + score/100);


  var rand = Math.round(random(1,6));
switch(rand){
  case 1: obstacle.addImage(obstacle1);
  break;
  case 2: obstacle.addImage(obstacle2);
  break;
  case 3: obstacle.addImage(obstacle3);
  break;
  case 4: obstacle.addImage(obstacle4);
  break;
  case 5: obstacle.addImage(obstacle5);
  break;
  case 6: obstacle.addImage(obstacle6);
  break;
  default: break;
}
// asignar scala y lifetime

obstacle.scale = 0.5;
obstacle.lifetime = 230;


obstaclesGroup.add(obstacle);
}
}

function reset(){
gameState = PLAY;

obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("runnig", trex_running);
score = 0;
}