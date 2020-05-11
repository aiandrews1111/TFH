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
    bulletSpeed = 5,
    bulletDirY = 0,
    reloadTimer = 0,
    bulletDamage = 10;
    bulletReload = 60,
    bullets = [];

var enemies = [];
    



function Bullet(x, y) {
  this.x = x;
  this.y = y;
  var mouseX = event.clientX - canvas.offsetLeft;
  var mouseY = event.clientY - canvas.offsetTop;
  this.DirX = this.x - mouseX;
  this.DirY = this.y - mouseY;
    
}
Bullet.prototype.draw = function() {
    if (this.DirX != 0){
    this.x += -1*(bulletSpeed/Math.sqrt(Math.abs(Math.pow(this.DirX, 2) + Math.pow(this.DirY, 2))))*this.DirX;
    this.y += -1*(bulletSpeed/Math.sqrt(Math.abs(Math.pow(this.DirX, 2) + Math.pow(this.DirY, 2))))*this.DirY;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    }
    if (this.x > 500 || this.x < 0 || this.y > 500 || this.y <0){
       this.delete = bullets.indexOf(Bullet);
       bullets = bullets.splice(this.delete, 1);
    }
};

function Enemy(hp, size, speed) {
    this.maxhp = hp;
    this.hp = this.maxhp;
    this.size = size;
    this.x = Math.random()*500;
    this.y = Math.random()*500;
    this.speedx = Math.random() + 0.5;
    this.speedy = Math.random() + 0.5;
    this.speed = speed;
    this.speedx*=this.speed;
    this.speedy*=this.speed;
    this.goingright = Math.round(Math.random());
    this.goingup = Math.round(Math.random());
}
Enemy.prototype.draw = function() {
    if (this.goingright == 1){
        this.x+=this.speedx;
    }
    else{
        this.x-=this.speedx;
    }
    if (this.goingup == 1){
        this.y-=this.speedy;
    }
    else{
        this.y+=this.speedy;
    }
    
    if (this.x>500-this.size/2){
        this.goingright = 0;
    }
    if (this.y>500-this.size/2){
        this.goingup = 0;
    }
    if (this.x<0+this.size/2){
        this.goingright = 1;
    }
    if (this.y<0+this.size/2){
        this.goingup = 1;
    }

    for (var i = 0; i < bullets.length; i++) {
         var distx = bullets[i].x - this.x;
         var disty = bullets[i].y - this.y;
         var dist = Math.pow(Math.pow(distx, 2) + Math.pow(disty, 2), 0.5);
         if (dist<this.size/2){
             this.hp -= bulletDamage;
         }
    }
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size*8/9, 0, Math.PI * 2 * this.hp/this.maxhp);
    ctx.fillStyle = "red";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size*7/9, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    
    
    
    if (hp < 0){
       this.delete = enemies.indexOf(Enemy);
       enemies = enemies.splice(this.delete, 1);
    }
};



canvas.addEventListener("click", function(event){
    if (reloadTimer<0){
    bullets.push(new Bullet(x, y));
    reloadTimer = bulletReload;
    }
});


function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, 500, 500);
    for (var i = 0; i < bullets.length; i++) {
         bullets[i].draw();
    }
    for (var i = 0; i < enemies.length; i++) {
         enemies[i].draw();
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
    
    reloadTimer --;
}



update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
