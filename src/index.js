import _ from 'lodash';

let d=document.getElementById('clock')
console.log(d)
let ctx = d.getContext('2d')

let font_height = 15,
    margin = 35,
    hand_truncation = d.width / 25,
    hour_hand_truncation = d.width / 10,
    numeral_spacing = 20,
    radius = d.width/2 - margin,
    hand_radius = radius + numeral_spacing
function drawCircle() {
  ctx.beginPath();
  ctx.arc(d.width/2,d.height/2,radius,0,Math.PI*2,true)
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

ctx.font = font_height + 'px Arial';
let  loop = setInterval(drawClock, 1000);