const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;


var canvas;
var crane,craneImg;
var building,buildingImg;
var building2,building2Img;
var bomb;
var bomb_con;
var button,buttonImg;

function preload(){
buildingImg=loadImage("building.png");
building2Img=loadImage("building2.png");
craneImg=loadImage("crane.png");
bombImg=loadImage("bomb.png");

}

function setup() {
 canvas= createCanvas(windowWidth,windowHeight);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  rope = new Rope(7,{x:displayWidth-150,y:displayHeight+30});
  ground = new Ground(displayWidth,displayHeight);

  button=createImg("cut_button.png");
  button.position(displayWidth/2-150,displayHeight/2+10);
button.size=0.2;
  button.mouseClicked(drop);

  crane= createSprite(displayWidth/2,displayHeight/2+50,30,30);
  crane.addImage(craneImg);
  crane.scale=0.1;

  building= createSprite(displayWidth/2,displayHeight/2,20,20);
  building.addImage(buildingImg);
building.scale=0.1;

  building2= createSprite(displayWidth/2,displayHeight/2,20,20);
  building2.addImage(building2Img);
  building2.scale=0.1;

  bomb=createSprite();
bomb.addImage(bombImg);
bomb.scale=0.2

  bomb = Bodies.circle(300,300,20);
  Matter.Composites.add(rope.body,bomb);

  bomb_con = new Link(rope,bomb);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() {

  
  rope.show();
  Engine.update(engine);
  ground.show();


   drawSprites();
}

function drop()
{
  rope.break();
  bomb_con.dettach();
  bomb_con= null; 
}
function collide(body,sprite){
  if (body!=null){
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<=80){
      World.remove(engine.world,bomb);
      bomb=null
      return true
    }
else{
  return false
}
  }

}