var canvas;
var ctx;
var x = 75;
var y = 50;
var x2 = 400;
var y2 = 300;
var xline1 = x;
var yline1 = y;
var xline2 = x2;
var yline2 = y2;
var WIDTH = 960;
var HEIGHT = 540;
var dragok = false;
var dragok2 = false;

function rect(x,y,w,h) {
 ctx.beginPath();
 ctx.rect(x,y,w,h);
 ctx.closePath();
 ctx.fill();
}

function line(x,y,x2,y2){
 ctx.beginPath();
 ctx.moveTo(x,y);
 ctx.lineTo(x2,y2);
 ctx.closePath();
 ctx.stroke();
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
 line(x,y,x2,y2);
 rect(x - 15, y - 15, 30, 30);
 rect(x2 -15, y2-15,30,30 );

 
}

function myMove(e){
 if (dragok){
  x = e.pageX-30 - canvas.offsetLeft;
  xline1 = x;
  $("#xcor").val(x-15);
  y = e.pageY-70 - canvas.offsetTop;
  yline1 = y;
  $("#ycor").val(y-15);
  
 }
 if(dragok2){
     
       x2 = e.pageX-30 - canvas.offsetLeft;
       xline2 = x2
       $("#x2cor").val(x2-15);
         y2 = e.pageY-70 - canvas.offsetTop;
         yline2 = y2;
         $("#y2cor").val(y2-15);

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
 if(e.pageX-30 < x2 + 15 + canvas.offsetLeft && e.pageX-30 > x2 - 15 +
 canvas.offsetLeft && e.pageY-70 < y2 + 15 + canvas.offsetTop &&
 e.pageY-70 > y2 -15 + canvas.offsetTop){
     x2 = e.pageX-30 - canvas.offsetLeft;
  y2 = e.pageY-70 - canvas.offsetTop;
  dragok2 = true;
  canvas.onmousemove = myMove;
 }
}

function myUp(){
 dragok = false;
 dragok2= false;
 canvas.onmousemove = null;
  clearInterval(clearer);
}

var clearer = init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;