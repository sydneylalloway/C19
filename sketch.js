var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();

  ghost=createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;
  

}

function draw() {
  background(200);
  if(gameState==="play"){
    tower.velocityY = 1;
      //reset background
        if(tower.y > 400){
            tower.y = 300
    }
        //making the door
      spawnDoor();

      //move left 
        if(keyDown(RIGHT_ARROW)){
      ghost.x+=2;
    }
    //gravity 
    ghost.velocityY+=0.8;
    if(keyDown("space")){
        ghost.velocityY=-10;
    }
    //move right 
    if(keyDown(LEFT_ARROW)){
    ghost.x-=2;
    }
    if(climbersGroup.isTouching(ghost)){
ghost.velocityY=0;
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
ghost.destroy();
gameState="end";
    }
    drawSprites();

  }


  else if(gameState==="end"){
    //tower.velocityY = 0;
    text("Game Over", 230,250);
  }
  
   
}
 function spawnDoor(){
   if(frameCount%100===0){

  door=createSprite(100, 0, 20,20);
  door.addImage("door", doorImg);
  door.velocityY=3;
  door.x=Math.round(random(100,500));
  doorsGroup.add(door);
  door.lifetime=200;
  

  climber=createSprite(door.x,60,20,20);
  climber.addImage("climber",climberImg);
  climber.velocityY=3;
  climbersGroup.add(climber);
  climber.lifetime=200;

  invisibleBlock=createSprite(door.x,70,70,5);
  invisibleBlock.velocityY=3;
  invisibleBlock.visible=false;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.lifetime=200;
  door.depth=ghost.depth;
  ghost.depth+=1;

  climber.depth=ghost.depth;
  ghost.depth+=1;
   }
   
 }

