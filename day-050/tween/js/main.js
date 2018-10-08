// import 'tweenjs';
var target = document.getElementById('box');
var play = document.getElementById('play');
var force = document.getElementById('force');
var circle = document.getElementById('circle');
var texts = {true: "pause", false: "play"};
createjs.CSSPlugin.install();

target.style.opacity = 1;
target.style.left= '0px';
target.style.transform = "scale(1)";
// createjs.Tween.get(target)
// .to({left: 200}, 1000, createjs.Ease.linear)
// .call(onComplete)
var anim = createjs.Tween.get(target, {loop: true})
.to({opacity: 0, left: 200,
  transform: "scale(2)",
}, 2000, createjs.Ease.linear)

var playing = true;
anim.pause();
anim.play();

function onComplete() {
  console.log('yeah') ;
}
force.onclick = function() {
  anim.play();
}
play.onclick = function() {
  if(anim.paused)
    anim.play();
  else 
    anim.pause();

  // playing = !playing;
  play.innerText = texts[anim.paused];
}

// createjs.Tween.get(circle, { loop: true })
//   .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
//   .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
//   .to({ alpha: 0, y: 225 }, 100)
//   .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
//   .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));