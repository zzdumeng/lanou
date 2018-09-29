// var a = 3;

// function fn() {
//   console.log("a is ", a);
//   var a = 2;
//   b = 4;
//   var c;
//   // console.log(a, b, c);
// }

// fn();

// console.log("b is" ,b);
var f = function (a ,b) {
  console.log(a+b);
  // return a+b;
}

function fn(func) {
  func = function() {
    console.log("inner");
  }
  
}

// f(3,4);
// console.log(f(3,4));

// fn(f);
// f(10,10);
function f2(a) {
  a.value = 3;
}

var o = {}
f2(o)
console.log(o)
