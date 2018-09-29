/// <reference lib="es6"/>

const $: (string) => Element = document.querySelector.bind(document)
const $$: (string) => NodeList = document.querySelectorAll.bind(document)



class Carousel {
  container: Element;
  images;
  items: Element[];
  indicator: Carousel.Indicator;
  index: number;
  constructor(ele: Element, images: string[]) {
    this.container = ele;
    this.index = 0;
    this.images = images;
    this.items = Array.from(this.container.children).slice(0, -1);

    this.indicator = new Carousel.Indicator(ele.lastChild, this.gotoIndex.bind(this));

  }
  gotoIndex(n: number) {
    this.items.forEach(function(item:HTMLElement) {
      // item.style.display = "none";
      item.className = "item";
    })
    
    const current:HTMLElement = this.items[this.index]
    const item:HTMLElement = this.items[n];
    if(n>this.index) {
      item.classList.add('slide-left-in');
      current.classList.add('slide-left-out');
    }else {
      item.classList.add('slide-right-in');
      current.classList.add('slide-right-out');
    } 
    // item.style.display = "block";
    this.index = n;
  }
  goNext() {

  }
  goPrevious() {

  }

}

namespace Carousel {
  export class Indicator {
    container: Node;
    index = 0;
    count: number;
    items: Element[];
    constructor(ele: Node, cb: Function, light: number = 0) {
      this.container = ele;
      // init
      this.count = ele.childNodes.length;
      this.index = light;
      this.items = Array.apply(undefined, ele.childNodes);
      const self = this;
      this.items.forEach(function(item, i) {
        item.onclick = self.gotoIndex.bind(self, i, cb);
      })

      this.gotoIndex(this.index, cb);
    }
    gotoIndex(n: number, cb: Function) {
      this.items.forEach(function (item) {
        item.classList.remove('active');
      })
      this.items[n].classList.add('active');
      cb(n);
    }
    // goNext() {
    //   if (++this.index >= this.count) {
    //     this.index = 0;
    //   }
    //   this.gotoIndex(this.index);
    // }

    // goPrevious() {
    //   if (--this.index < 0) {
    //     this.index = this.count - 1;
    //   }
    //   this.gotoIndex(this.index);
    // }
  }
}
const images = [];
[1,2,3,4,5].forEach(function(i) {
  images.push("/assets/"+i+".jpg");
})
const carousel = new Carousel($('.carousel'), images);

