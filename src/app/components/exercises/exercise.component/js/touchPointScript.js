var canvas;
var ctx;
var x = 75;
var y = 50;
var WIDTH = 960;
var HEIGHT = 540;
var dragok = false;

function rect(x,y,w,h) {
 ctx.beginPath();
 ctx.rect(x,y,w,h);
 ctx.closePath();
 ctx.fill();
}

function clear() {
 ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
 canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
 return setInterval(draw, 10);
}

function draw() {
 clear();
 /*ctx.fillStyle = "#FAF7F8";
 rect(0,0,WIDTH,HEIGHT);*/
 ctx.fillStyle = "#444444";
 rect(x - 15, y - 15, 30, 30);
 
}

function myMove(e){
 if (dragok){
  x = e.pageX-30 - canvas.offsetLeft;
  $("#xcor").val(x-15);
  y = e.pageY-70 - canvas.offsetTop;
  $("#ycor").val(y-15);
  
 }
 
}

function myDown(e){
 if (e.pageX-30 < x + 15 + canvas.offsetLeft && e.pageX-30 > x - 15 +
 canvas.offsetLeft && e.pageY-70 < y + 15 + canvas.offsetTop &&
 e.pageY-70 > y -15 + canvas.offsetTop){
  x = e.pageX-30 - canvas.offsetLeft;
  y = e.pageY-70 - canvas.offsetTop;
  dragok = true;
  canvas.onmousemove = myMove;
 }
}

function myUp(){
 dragok = false;
 canvas.onmousemove = null;
 clearInterval(clearer);
}

var clearer = init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;