var canvas = document.getElementById('Game');
var ctx = canvas.getContext('2d');

document.getElementById("Game").addEventListener("click", shoot);
//gives canvas event listener
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
    bulletDirY = 0;
    

function update() {
    requestAnimationFrame(update);
    
    if (bulletDirX != 0){
    bulletx += (bulletSpeed/sqrt(Math.pow(bulletDirX, 2) + Math.pow(bulletDirY, 2)))*bulletDirX
    bullety += (bulletSpeed/sqrt(Math.pow(bulletDirX, 2) + Math.pow(bulletDirY, 2)))*bulletDirY
    ctx.arc(bulletx, bullety, 2, 0, Math.PI * 2);
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

    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
}

function shoot() {
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    bulletDirX = x - mouseX;
    bulletDirY = y - mouseY;
    bulletx = x;
    bullety = y;
};


update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
