import "easeljs";
var canvas = <HTMLCanvasElement>document.getElementById('test-canvas');
function resizeCanvas() {
  canvas.width = document.body.clientWidth 
  canvas.height = document.body.clientHeight 
}
window.onresize = resizeCanvas;
resizeCanvas();



 //Create a stage by getting a reference to the canvas

    const stage = new createjs.Stage("test-canvas");
    //Create a Shape DisplayObject.
    const circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    stage.addChild(circle);
    //Update stage will render next frame
    stage.update();

    var pokemon = new createjs.Bitmap('../img/pokemon.png');
    stage.addChild(pokemon);
    var dir = 1;
    createjs.Ticker.addEventListener('tick', function() {
      pokemon.x += 10 * dir;
      if(pokemon.x >= 400 || pokemon.x <= 0) {
        dir *= -1;
      }
      stage.update();
    })
function randomInt(a,b) {
  return Math.floor(Math.random() * (b-a+1) + a);
}
function randomColor() {
  var r = randomInt(0, 255);
  var g = randomInt(0, 255);
  var b = randomInt(0, 255);
  return  `rgb(${r}, ${g}, ${b})`;
}
function textDemo() {
  for(let i = 0; i < 10; i++) {
    var text = new createjs.Text('hello easeljs',   randomInt(20, 40) +'px' + " monospace",  randomColor());
    text.x = randomInt(0, 400);
    text.y = randomInt(0, 300);
    text.rotation = randomInt(0, 360);
    stage.addChild(text);
  }
  stage.update();
}

function shapeDemo() {
  for (let index = 0; index < 10; index++) {
    var shape = new createjs.Shape();
    shape.graphics.beginStroke(randomColor())
    .drawCircle(randomInt(0,400),
      randomInt(0, 300), randomInt(10, 30));
    stage.addChild(shape);
    
  }
  stage.update();
}

shapeDemo();
// textDemo()