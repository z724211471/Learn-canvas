import _ from 'lodash';

let d=document.getElementById('canvas')
console.log(d)
let context = d.getContext('2d')

let  AXIS_MARGIN = 40,
AXIS_ORIGIN = { x: AXIS_MARGIN, y: canvas.height-AXIS_MARGIN },

AXIS_TOP   = AXIS_MARGIN,
AXIS_RIGHT = canvas.width-AXIS_MARGIN,

HORIZONTAL_TICK_SPACING = 10,
VERTICAL_TICK_SPACING = 10,

AXIS_WIDTH  = AXIS_RIGHT - AXIS_ORIGIN.x,
AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP,

NUM_VERTICAL_TICKS   = AXIS_HEIGHT / VERTICAL_TICK_SPACING,
NUM_HORIZONTAL_TICKS = AXIS_WIDTH  / HORIZONTAL_TICK_SPACING,

TICK_WIDTH = 10,
TICKS_LINEWIDTH = 0.5,
TICKS_COLOR = 'navy',

AXIS_LINEWIDTH = 1.0,
AXIS_COLOR = 'blue';

// Functions..........................................................

function drawGrid(color, stepx, stepy) {
context.save()

context.fillStyle = 'white';
context.fillRect(0, 0, context.canvas.width, context.canvas.height);

context.lineWidth = 0.5;
context.strokeStyle = color;

for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
 context.beginPath();
 context.moveTo(i, 0);
 context.lineTo(i, context.canvas.height);
 context.stroke();
}

for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
 context.beginPath();
 context.moveTo(0, i);
 context.lineTo(context.canvas.width, i);
 context.stroke();
}

context.restore();
}

function drawAxes() {
context.save(); 
context.strokeStyle = AXIS_COLOR;
context.lineWidth = AXIS_LINEWIDTH;

drawHorizontalAxis();
drawVerticalAxis();

context.lineWidth = 0.5;
context.lineWidth = TICKS_LINEWIDTH;
context.strokeStyle = TICKS_COLOR;

drawVerticalAxisTicks();
drawHorizontalAxisTicks();

context.restore();
}

function drawHorizontalAxis() {
context.beginPath();
context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
context.lineTo(AXIS_RIGHT,    AXIS_ORIGIN.y)
context.stroke();
}

function drawVerticalAxis() {
context.beginPath();
context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
context.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
context.stroke();
}

function drawVerticalAxisTicks() {
var deltaX;

for (var i=1; i < NUM_VERTICAL_TICKS; ++i) {
  context.beginPath();

  if (i % 5 === 0) deltaX = TICK_WIDTH;
  else             deltaX = TICK_WIDTH/2;
          
  context.moveTo(AXIS_ORIGIN.x - deltaX,
                 AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);

  context.lineTo(AXIS_ORIGIN.x + deltaX,
                 AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);

  context.stroke();
}
}

function drawHorizontalAxisTicks() {
var deltaY;

for (var i=1; i < NUM_HORIZONTAL_TICKS; ++i) {
  context.beginPath();

  if (i % 5 === 0) deltaY = TICK_WIDTH;
  else             deltaY = TICK_WIDTH/2;
          
  context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
                 AXIS_ORIGIN.y - deltaY);

  context.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
                 AXIS_ORIGIN.y + deltaY);

  context.stroke();
}
}

// Initialization................................................

drawGrid('lightgray', 10, 10);

// drawAxes();
// let gradi = ctx.createRadialGradient(d.width/2,d.height/2,10,d.width/2,0,100)
// gradi.addColorStop(0,'blue');
// gradi.addColorStop(0.25,'black');
// gradi.addColorStop(0.75,'purple');
// gradi.addColorStop(1,'yellow');
// ctx.fillStyle=gradi;
// ctx.rect(0,0,d.width,d.height)
// ctx.fill()
// function drawGrid(color,stepx,stepy){
//   ctx.strokeStyle = color;
//   ctx.lineWidth = 0.5;

//   for (var i = stepx + 0.5; i < ctx.canvas.width; i += stepx) {
//     ctx.beginPath();
//     ctx.moveTo(i, 0);
//     ctx.lineTo(i, ctx.canvas.height);
//     ctx.stroke();
//   }

//   for (var i = stepy + 0.5; i < ctx.canvas.height; i += stepy) {
//     ctx.beginPath();
//     ctx.moveTo(0, i);
//     ctx.lineTo(ctx.canvas.width, i);
//     ctx.stroke();
//   }
// }

// function drawTwoArcs(){
//   ctx.beginPath()
//   ctx.arc(300,190,150,0,Math.PI*2,false)
//   ctx.arc(300,190,50,0,Math.PI*2,true)
//   ctx.fill()
//   ctx.shadowColor=undefined;
//   ctx.shadowOffsetX=0;
//   ctx.shadowOffsetY=0;
//   ctx.stroke();
// }
// function draw() {
//   ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
//   drawGrid('lightgray',20,20);
//   ctx.save();
//   ctx.shadowColor='rgba(0,0,0,0.8)'
//   ctx.shadowOffsetX=12
//   ctx.shadowOffsetY=12
//   ctx.shadowBlur=15
//   drawTwoArcs();
//   ctx.restore()
// }
// ctx.fillStyle='rgba(100,140,230,0.5)';
// ctx.strokeStyle = ctx.fillStyle;
// draw();

let font_height = 15,
    margin = 200,
    hand_truncation = d.width / 25,
    hour_hand_truncation = d.width / 10,
    numeral_spacing = 20,
    radius = d.width / 2 - margin,
    hand_radius = radius + numeral_spacing
function drawCircle() {
  ctx.beginPath();
  ctx.arc(d.width / 2,d.height / 2,radius,0,Math.PI*2,true)
  ctx.stroke()
}
function drawNumerals() {
  let numerals=[1,2,3,4,5,6,7,8,9,10,11,12],angle=0,numeralWidth=0;
  numerals.forEach(item=>{
    angle = Math.PI/6*(item-3)
    numeralWidth = ctx.measureText(item).width
    ctx.fillText(item,d.width/2+Math.cos(angle)*(hand_radius)-numeralWidth/2,
    d.height/2+Math.sin(angle)*(hand_radius)+font_height/3)
  })
}

function drawCentenr() {
  ctx.beginPath();
  ctx.arc(d.width/2,d.height/2,5,0,Math.PI*2,true);
  ctx.fill();
}
function drawHand(loc,isHour) {
  let angel =(Math.PI*2)*(loc/60)-Math.PI/2,
  handRadius=isHour ? radius-hand_truncation-hour_hand_truncation
                    : radius - hand_truncation
  ctx.moveTo(d.width/2,d.height/2)
  ctx.lineTo(d.width/2 + Math.cos(angel) * handRadius, d.height/2+Math.sin(angel)*handRadius)
  ctx.stroke()
}

function drawHands() {
    let date = new Date,
        hour = date.getHours()
        hour = hour>12?hour-12:hour;
        drawHand(hour*5+(date.getMinutes()/60)*5,true,0.5)
        drawHand(date.getMinutes(),false,0.5)
        drawHand(date.getSeconds(),false,0.2)
}

function drawClock(){
  ctx.clearRect(0,0,d.width,d.height);
  drawCircle();
  drawCentenr();
  drawHands();
  drawNumerals();
}

// ctx.font = font_height + 'px Arial';
// let  loop = setInterval(drawClock, 1000);