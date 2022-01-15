var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var trex, trex_running, edges;
var groundImage,ground, ground2;
var cloud, cloudimage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstaclegroup, cloudgroup;
var score = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50

  ground = createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;

  ground2 = createSprite(300,190,600,10);
  ground2.visible = false;
  obstaclegroup = createGroup();
  cloudgroup = createGroup();

}


function draw(){
  //establecer color de fondo.
  background("white");
  text ("score: "+ score,500,50);
  
  if(gamestate == PLAY){
    score = score+ Math.round(frameCount/60);
    ground.velocityX = -6;
    if(ground.x<0){
      ground.x = ground.width/2;   
    }
  //hacer que el Trex salte al presionar la barra espaciadora
    if(keyDown("space")&& trex.y > 150){
      trex.velocityY = -10;
    }
        //asigna gravedad al t-rex
    trex.velocityY = trex.velocityY + 0.5;
    clouds();
    obsticle();
    if(obstaclegroup.isTouching(trex)){
      gamestate = END;
    }
  }
  else if(gamestate == END){
    ground.velocityX = 0;
  }

  //cargar la posición Y del Trex
  console.log(trex.y)
  
 
  
  
  //evitar que el Trex caiga
  trex.collide(ground2);
   
 
  drawSprites();
}
function clouds(){
  if (frameCount%60==0){
    cloud = createSprite(600,100,40,10);
    cloud.velocityX = -3;
    cloud.addImage(cloudimage);
    cloud.scale = 0.6;
    cloud.y = Math.round(random(10,90));
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloud.lifetime = 220;
    cloudsgroup.add(cloud);
    
  }
}
function obsticle(){
  if (frameCount%60==0){
    var cactus = createSprite(600,165,10,40);
      cactus.velocityX = -6;
      var rand = Math.round(random(1,6));
      switch(rand){
        case 1: cactus.addImage(obstacle1);
        break;
        case 2: cactus.addImage(obstacle2);
        break;
        case 3: cactus.addImage(obstacle3);
        break;
        case 4: cactus.addImage(obstacle4);
        break;
        case 5: cactus.addImage(obstacle5);
        break;
        case 6: cactus.addImage(obstacle6);
        break;
        default: break;
      }
      cactus.scale = 0.5;
      cactus.lifetime = 300;
      obstaclegroup.add(cactus);
  }
    }
    