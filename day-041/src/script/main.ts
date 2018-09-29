namespace Main {

  function deg2rad(deg: number) {
    return deg * Math.PI / 180;
  }
  class Ball {
    ball: HTMLElement;
    speed: number;
    angle: number;
    a: number;
    constructor(ball: HTMLElement) {
      this.ball = ball;
      this.speed = 0.02 * 5;
      this.angle = 0;
      this.a = 1;
      setInterval(this.move.bind(this), 1000/60 )
    }
    
    move(dt: number = 1000/60) {
      if(this.angle> 60) {
        this.a = -1;
      }
      if(this.angle < -60) {
        this.a = 1;
      }
      const delta = 1;
      this.angle += this.a * delta;
      const vx = this.speed * Math.sin(deg2rad(this.angle));
      const vy = this.speed * Math.cos(deg2rad(this.angle));
      const dx = vx * dt;
      const dy = vy * dt;
      this.ball.style.top = parseFloat(this.ball.style.top) + dx + 'px';
      this.ball.style.left = parseFloat(this.ball.style.left) + dy + 'px';

    }

  }
  function randInt(a, b) {
    return Math.floor(Math.random() *(b-a+1) +a);
  }
  function main() {
    const ball = document.getElementsByClassName('ball')[0] as HTMLElement;
    
    setInterval(function() {
      ball.style.top = parseInt(ball.style.top, 10) + randInt(-5, 5) + 'px';
      ball.style.left = parseInt(ball.style.left, 10) + randInt(-5, 5) + 'px';
    }, 1000/60);
  }
  // const ball = new Ball(document.getElementsByClassName('ball')[0] as HTMLElement);

  // main();

  const value = new ValueProvider.SquareValueProvider({x: 0.01, y: 0.01}, 0.2);
  value.attach()
}

// function init() {

//   const ball = document.getElementsByClassName('ball')[0] as HTMLElement;
//   const effect = new AnimationEffect()
//   const animation = new Animation()

// }
// init()
// function f(a, b, c) {
//   console.log(a+b+c);
// }