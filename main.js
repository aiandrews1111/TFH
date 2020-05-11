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

var bulletSpeed = 5,
    reloadTimer = 0,
    bulletDamage = 10,
    bulletReload = 15,
    bullets = [],
    wave = 0;

var enemies = [];
var regularEnemySpawnRate = 600;

var time = 0;


function Bullet(x, y) {
  this.x = x;
  this.y = y;
  var mouseX = event.clientX - canvas.offsetLeft;
  var mouseY = event.clientY - canvas.offsetTop;
  this.DirX = this.x - mouseX;
  this.DirY = this.y - mouseY;
  this.delete = 0;
    
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
       this.delete = 1;
    }
};

function Enemy(hp, size, speed) {
    this.maxhp = hp;
    this.hp = this.maxhp;
    this.size = size;
    this.x = 250 + Math.random()*(125-this.size);
    this.y = 250 + Math.random()*(125-this.size);
    this.speedx = Math.random() + 0.5;
    this.speedy = Math.random() + 0.5;
    this.speed = speed;
    this.speedx*=this.speed;
    this.speedy*=this.speed;
    this.goingright = Math.round(Math.random());
    this.goingup = Math.round(Math.random());
    this.delete = 0;
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
    
    if (this.x>500-this.size){
        this.goingright = 0;
    }
    if (this.y>500-this.size){
        this.goingup = 1;
    }
    if (this.x<0+this.size){
        this.goingright = 1;
    }
    if (this.y<0+this.size){
        this.goingup = 0;
    }

    for (var i = 0; i < bullets.length; i++) {
         var distx = bullets[i].x - this.x;
         var disty = bullets[i].y - this.y;
         var dist = Math.pow(Math.pow(distx, 2) + Math.pow(disty, 2), 0.5);
         console.log(dist);
         if (dist<this.size + 2){
             this.hp -= bulletDamage;
             bullets[i].delete = 1;
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
    
    
    if (this.hp <= 0){
       this.delete = 1;
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
         if(bullets[i].delete == 1){
             bullets.splice(i, 1);
         }
    }
    for (var i = 0; i < enemies.length; i++) {
         enemies[i].draw();
         if(enemies[i].delete == 1){
             enemies.splice(i, 1);
         }
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
    
    
    if (time==0){
        enemies.push(new Enemy(25, 25, 1));
    }
    if (time == regularEnemySpawnRate){
        regularEnemySpawnRate += 100;
        if ((regularEnemySpawnRate-600)/100 % 5 != 0){
        enemies.push(new Enemy(time/20, 20+time/500, 1.5 + time/2500));
        }
        if (regularEnemySpawnRate == 1100){
            enemies.push(new Enemy(120, 50, 2));
        } else if (regularEnemySpawnRate == 1600){
            enemies.push(new Enemy(240, 100, 1));
        } else if (regularEnemySpawnRate == 2100){
            enemies.push(new Enemy(500, 125, 2));
        } else if (regularEnemySpawnRate == 2600){
            enemies.push(new Enemy(2000, 100, 0.5));
        } else if (regularEnemySpawnRate == 3100){
            enemies.push(new Enemy(500, 125, 2));
            enemies.push(new Enemy(500, 125, 2));
        } else if (regularEnemySpawnRate == 3600){
            enemies.push(new Enemy(4000, 75, 0.3));
        } else if (regularEnemySpawnRate == 4100){
            enemies.push(new Enemy(500, 45, 5));
            enemies.push(new Enemy(500, 45, 5));
            enemies.push(new Enemy(500, 45, 5));
            enemies.push(new Enemy(500, 45, 5));
            
        }
        time = 0;
    }
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    wave = regularEnemySpawnRate/100 - 5;
    ctx.fillText("Wave "+wave, canvas.width/2, canvas.height/2);
    ctx.fillStyle = "black";
    time++;
}



update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
