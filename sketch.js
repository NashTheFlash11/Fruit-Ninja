var PLAY = 1;
var END = 0;
var gameState = 1;

var score;

var fruitGroup, fruit1, fruit2, fruit3, fruit4;
var enemyGroup, monster, monster1, monsterImage;

var sword, swordImage;

var gameOver, gameOverImage;

var knifeSound, gameoverSound;


function preload(){
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monster1 = loadImage("alien1.png");
  //monster2 = loadImage("alien2.png");
  monsterImage = loadImage("alien2.png")
  
  swordImage = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png");
  
  knifeSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(400, 400);
  
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  gameOver = createSprite(200, 200, 40, 10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  sword.setCollider("rectangle", 0, 0, 40, 40);
  
  score = 0;
}

function draw(){
  background('lightblue');
  
  text("Score: " + score, 300, 50);
  
  if(gameState === PLAY){
    gameOver.visible = false;
    
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    fruits();
    Enemy();
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score + 1;
      knifeSound.play();
    }
    
    if(score > 0 && score % 4 === 0){
      fruitGroup.setVelocityXEach = -10;
    }
    
    if(score > 0 && score % 10 === 0){
      enemyGroup.setVelocityXEach = -13;
    }
    
    if(enemyGroup.isTouching(sword)){
      gameState = END;
      gameoverSound.play();
    }
  } else if(gameState === END){
      sword.addImage(gameOverImage);
      sword.x = 200;
      sword.y = 200;
    
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
    
      fruitGroup.setVelocityXEach = 0;
      enemyGroup.setVelocityXEach = 0;
    }  
  
  drawSprites();
}

function fruits(){
  if(World.frameCount % 80 === 0){
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    r = Math.round(random(1, 4));
    if(r == 1){
      fruit.addImage(fruit1);
    } else if(r == 2){
      fruit.addImage(fruit2);
    } else if(r == 3){
      fruit.addImage(fruit3);
    }
    else{
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50, 340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount % 200 === 0){
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}

