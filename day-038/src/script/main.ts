function randomInt(a: number, b: number) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}
class TwoColorBall {
  private static _redBalls: number[] = [];
  private static _bludBall: number = 0;

  static generate() {
    this.generateRedBalls();
    this.generateBlueBall();
  }
  private static generateRedBalls() {
    let balls: number[] = []
    for(let i=0; i<33; i++) {
      balls[i] = i+1;
    }

    for(let i=0; i < 6 ; i++) {
      this._redBalls[i] = balls.splice(randomInt(0, balls.length - 1), 1)[0];
    }
  }
  private static generateBlueBall() {
    this._bludBall = randomInt(1, 16);
  }
  static get redBalls(): number[] {
    return this._redBalls.sort(function(a,b) {
      return a - b;
    });
  }
  static get blueBall(): number {
    return this._bludBall;
  }
}

function repeat(s:string, n: number) {
  let r = "";
  while(n>0) {
    r += s;
    n--;
  }
  return r;
}

function pad(n: string, size: number) {
  if(n.length < size) {
    return repeat("0", size - n.length) + n;
  }
  return n;
}
// TwoColorBall.generate();
// console.log(TwoColorBall.redBalls, TwoColorBall.blueBall);
const $ : (string) => HTMLElement = document.querySelector.bind(document)
const $$ : (string) => HTMLElement[] = document.querySelectorAll.bind(document)

function main() {
  const redBalls = $$('.ball-red');
  const blueBall = $('.ball-blue');
  const roll = $('.roll');
  const balls = Array.prototype.concat.apply([blueBall], redBalls);

  function gen() {
    balls.forEach(function(ball) {
      ball.classList.remove('animate');
      window.requestAnimationFrame(function() {
        ball.classList.add('animate');
      })
    })
    TwoColorBall.generate();
    redBalls.forEach(function(red, i) {
      red.innerText = pad(TwoColorBall.redBalls[i].toString(), 2);
    })
    blueBall.innerText = pad(TwoColorBall.blueBall.toString(), 2);
  }

  roll.onclick = gen

  gen()
}



main()
