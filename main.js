
var canvas = document.getElementById('Game');
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 500;

var x = 150,
    y = 150,
    velY = 0,
    velX = 0,
    speed = 2,
    friction = 0.77,
    keys = [];

var bulletx = 0,
    bullety = 0,
    bulletDirX = 0,
    bulletSpeed = 1,
    bulletDirY = 0,
    bullets = [];
    



function Bullet(x, y) {
  this.x = x;
  this.y = y;
  var mouseX = event.clientX
  var mouseY = event.clientY
  this.DirX = this.x - mouseX;
  this.DirY = this.y - mouseY;
    
}
function Bullet.prototype.draw() {
    if (this.DirX != 0){
    this.x += -1*(bulletSpeed/Math.sqrt(Math.abs(Math.pow(this.DirX, 2) + Math.pow(this.DirY, 2))))*this.DirX;
    this.y += -1*(bulletSpeed/Math.sqrt(Math.abs(Math.pow(this.DirX, 2) + Math.pow(this.DirY, 2))))*this.DirY;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    }
}



document.addEventListener("click", function(event){
    bullets.push(new Bullet(x, y));
});


function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, 500, 500);
    
    for (i = 0; i < bullets.length; i++) {
         bullets[i].draw();
    }
    //temporary location
    
    if (keys[38] || keys[87]) {
        if (velY > -speed) {
            velY--;
        }
    }
    
    if (keys[40] || keys[83]) {
        if (velY < speed) {
            velY++;
        }
    }
    if (keys[39] || keys[68]) {
        if (velX < speed) {
            velX++;
        }
    }
    if (keys[37] || keys[65]) {
        if (velX > -speed) {
            velX--;
        }
    }

    velY *= friction;
    y += velY;
    velX *= friction;
    x += velX;

    if (x >= 495) {
        x = 495;
    } else if (x <= 5) {
        x = 5;
    }

    if (y > 495) {
        y = 495;
    } else if (y <= 5) {
        y = 5;
    }

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
}



update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
