var background1,back;
var car,car1;
var dollar,dollar1;
var score;
var dollarGroup,rocksGroup;
var rock1;

var PLAY = 1;
var END = 0;
var gameState=PLAY;

function preload(){
background1=loadImage("background-1_0.png");
  car1=loadImage("car.png");
  dollar1=loadImage("dollar.png");
  rock1=loadImage("rock.png");
}

function setup() {
 createCanvas(500,500)
  
  back=createSprite(248,200,9,9);
  back.addImage(background1);
  back.scale=1.3;
  back.velocityY=5;
  back.y = back.height /2;
  console.log(back.Y);
  
  car=createSprite(250,400,9,9);
  car.addImage(car1);
  car.scale=0.2;
  car.setCollider("rectangle",0,0,400,700);
  
  dollarGroup=createGroup();
  rocksGroup=createGroup();
  
  score=0;
  
  edges=createEdgeSprites();
}

function draw() {
  background(180);
  drawSprites();
  if(gameState===PLAY){
    back.velocityY = (5 + 3* score/5);
    dollarGroup.velocityY = (8 + 3* score/5);
    rocksGroup.velocityY = (8 + 3* score/5);
    
    
      if(car.isTouching(edges)){
        gameState=END;
      }
  if(back.y > 250){
      back.y = 150
    }
      if(keyDown("left_arrow")){
      car.x = car.x - 5;
    }
        if(keyDown("right_arrow")){
      car.x = car.x + 5;
    }
    

    dollar12();
  rock();
    if(car.isTouching(dollarGroup)){
    dollarGroup.destroyEach();
    score=score+1;
    }
    if(dollarGroup.contains(dollar) && dollar.y>500){
      dollarGroup.destroyEach(); 
      score = score - 1 
       
       }
    
    
    
      if(car.isTouching(rocksGroup)){
   gameState=END;
  }

  }
       else if (gameState === END) {
      back.velocityY = 0;
       rocksGroup.destroyEach();
         dollarGroup.destroyEach();
    
     rocksGroup.setVelocityYEach(0);
     dollarGroup.setVelocityYEach(0);
         textSize(20);
         stroke("white");
         fill("white");
         text("Game Over",200,200);
         textSize(20);
          stroke("white");
         fill("white");
         text("Press space to restart",150,250);
         
         if(keyDown("space")){
           reset();
         }
  
       }
  

  textSize(20);
  fill("red");
  stroke("red");
  text("Score: "+score,400,40)

}
  
  function reset(){
  gameState=PLAY;
  score=0;
    car.x=250;
 
}

function dollar12(){
  if (frameCount % 80 === 0) {
     dollar = createSprite(500,0,40,10);
    dollar.x = Math.round(random(100,400));
    dollar.addImage(dollar1);
    dollar.scale = 0.2;
    dollar.velocityY = 8;
    
    
     
    dollar.lifetime = 100;
    
    dollar.depth = car.depth;
    car.depth = car.depth + 1;
    dollarGroup.add(dollar);    
}
}

function rock(){
  if (frameCount % 300 === 0) {
    var rock = createSprite(500,0,40,10);
    rock.x = Math.round(random(250,250));
    rock.addImage(rock1);
    rock.scale = 0.2;
    rock.velocityY = 8;
    rock.setCollider("rectangle",0,0,600,500);
    //rock.debug=true;
     
     
    rock.lifetime = 100;
    
    rock.depth = car.depth;
    car.depth = car.depth + 1;
    rocksGroup.add(rock);    
}
}
