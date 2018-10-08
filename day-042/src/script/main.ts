class Clock {
  private timer: number;
  private reactions: Function[];
  constructor(public fq: number = 1000) {
    this.timer = setInterval(this.update.bind(this, this.fq),
      fq);
    this.reactions = [];
    this.update(this.fq);
  }

  update(dt: number) {
    const date = new Date();
    const [h, m, s] = [date.getHours(),
    date.getMinutes(),
    date.getSeconds()];
    this.reactions.forEach(function(cb) {
      cb(h,m,s);
    })
  }
  attach(cb: Function) {
    if(this.reactions.indexOf(cb) > 0) return this;
    this.reactions.push(cb);
    return this;
  }
}

const clock = new Clock()
const hourPointer = document.getElementsByClassName('hour-pointer')[0] as HTMLElement;
const minutePointer = document.getElementsByClassName('minute-pointer')[0] as HTMLElement;
const secondPointer = document.getElementsByClassName('second-pointer')[0] as HTMLElement;

function setRotate(ele:HTMLElement, deg: number) {
  ele.style.transform = "rotate(" + deg + "deg)";
}
function updateHour(h, m, s) {
  // hourPointer.style.transform = "rotate"
  const hh = h + m/60 + s/3600;
  setRotate(hourPointer, hh * 30 -90);
}
function updateMinute(h, m, s) {
  const mm = m + s/60;
  setRotate(minutePointer, mm * 6 - 90);
}
function updateSecond(h, m, s) {
  setRotate(secondPointer, s * 6 - 90);
}
clock.attach(updateHour)
  .attach(updateMinute)
  .attach(updateSecond)
