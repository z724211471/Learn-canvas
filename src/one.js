
let canvas = document.getElementById('canvas'),
context = canvas.getContext('2d'),
rubberbandDiv = document.getElementById('rubberbandDiv'),
resetButton = document.getElementById('resetButton'),
image = document.getElementById("img1"),
mousedown = {},
rubberbandRectangle = {},
dragging = false;


function rubberbandStart(x,y){
  mousedown.x=x;
  mousedown.y=y;
  rubberbandRectangle.left=mousedown.x;
  rubberbandRectangle.top=mousedown.y;
  moveRubberbandDiv();
  showRubberbandDiv();
  dragging = true;
}

function rubberbandStretch(x,y){
  rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;
  rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;

  rubberbandRectangle.width = Math.abs(x - mousedown.x);
  rubberbandRectangle.height = Math.abs(y - mousedown.y);
  moveRubberbandDiv();
  resizeRubberbandDiv();

}
function rubberbandEnd() {
  let bbox = canvas.getBoundingClientRect();
  try {
    context.drawImage(canvas,rubberbandRectangle.left - bbox.left,rubberbandRectangle.top - bbox.top,rubberbandRectangle.width,rubberbandRectangle.heigh,
      0,0,canvas.width,canvas.height);
  } catch (error) {

    
  }
  resetRubberbandRectangle();
  rubberbandDiv.style.width=0;
  rubberbandDiv.style.height=0;
  hideRubberbandDiv()
  dragging=false;

}
function moveRubberbandDiv(){
  rubberbandDiv.style.top=rubberbandRectangle.top + 'px';
  rubberbandDiv.style.left =rubberbandRectangle.left + 'px';
}
function resizeRubberbandDiv(){
  rubberbandDiv.style.width=rubberbandRectangle.width + 'px';
  rubberbandDiv.style.height =rubberbandRectangle.height + 'px';
}
function showRubberbandDiv(){
  rubberbandDiv.style.display='inline';
}
function hideRubberbandDiv(){
  rubberbandDiv.style.display='none';
}
function resetRubberbandRectangle() {
   rubberbandRectangle={top:0,left:0,width:0,heigh:0}

}
canvas.onmousedown = function(e){
  console.log(e)
  let x= e.clientX,
      y= e.clientY;
  e.preventDefault();
  rubberbandStart(x,y);
}
window.onmousemove=function(e){
  let x =e.clientX,y=e.clientY;
  e.preventDefault();
  if(dragging){
    rubberbandStretch(x,y);
  }
}

window.onmouseup = function(e){
  e.preventDefault();
  rubberbandEnd();
}
// image.src= 'https://pic4.zhimg.com/v2-3be05963f5f3753a8cb75b6692154d4a_1440w.jpg'
// image.crossOrigin = 'anonymous';
image.onload=function(e){
  console.log(e)
  // console.log(canvas.width,canvas.height)
  //  context.font = "100px sans-serif"
  // context.fillText("天若有情", 10, 100);
  // context.strokeText("天若有情", 10, 200)
  context.drawImage(image,0,0,canvas.width,canvas.height);
}


resetButton.onclick=function(e){
  console.log(canvas.toDataURL())
  context.clearRect(0,0,context.canvas.width,context.canvas.heigh);
  context.drawImage(image,0,0,canvas.width,canvas.height);
}

