const w = 180;
class InfiniteCarousel {
  container: HTMLElement;
  timer: number;
  head: number;
  dt: number;
  items: HTMLElement[];
  constructor(selector: string, public images: string[], dt: number = 1000/60) {
    this.container = document.querySelector(selector);
    this.head = 0;
    this.dt = dt;
    this.items = [];
    this.init();
  }
  init() {
    // for(let i = 0; i)
    const self = this;
    this.images.forEach(function(image, i) {
      const item = document.createElement('div');
      item.className = 'item';
      item.style.backgroundImage = 'url("' + image + '")';
      item.style.left = w * i + 'px';
      self.items.push(item);
      self.container.appendChild(item);
    })
  }
  play() {
    this.timer = setInterval(this.update.bind(this, this.dt),
    this.dt);
  }

  update(delta?: number) {
    // const 
    let reset = false;
    for(let i = 0 ; i< this.items.length; i++) {
      const item = this.items[i];
      let left = parseFloat(item.style.left);
      left = left - delta /1000 * 50
      const d = -w - left;
      if(d > 0) {
        reset = true;
        left = w * 5 ;
        continue;
      }
      if(reset)
        item.style.left = w * (i-1) + 'px';
      else
        item.style.left = left + 'px';

    }
    // this.items.forEach(function(item) {
    //   let left = parseFloat(item.style.left);
    //   left = left - delta /1000 * 50
    //   const d = -w - left;
    //   if(d > 0) {
    //     left = w * 5 - d;
    //   }
    //   item.style.left = left + 'px';
    // }.bind(this));
  }

  pause() {
    clearInterval(this.timer);
  }


}

const images = [
  './assets/0.jpeg',
  './assets/1.jpeg',
  './assets/2.jpeg',
  './assets/3.jpeg',
  './assets/4.jpeg',
  './assets/5.jpeg',
]
const carousel = new InfiniteCarousel('.carousel', images);
carousel.play();
