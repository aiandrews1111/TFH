var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = canvas.height = 300;

var x = 150,
    y = 150,
    velY = 0,
    velX = 0,
    speed = 2,
    friction = 0.98,
    keys = [];

function update() {
    requestAnimationFrame(update);
    
    if (keys[38]) {
        if (velY > -speed) {
            velY--;
        }
    }
    
    if (keys[40]) {
        if (velY < speed) {
            velY++;
        }
    }
    if (keys[39]) {
        if (velX < speed) {
            velX++;
        }
    }
    if (keys[37]) {
        if (velX > -speed) {
            velX--;
        }
    }

    velY *= friction;
    y += velY;
    velX *= friction;
    x += velX;

    if (x >= 295) {
        x = 295;
    } else if (x <= 5) {
        x = 5;
    }

    if (y > 295) {
        y = 295;
    } else if (y <= 5) {
        y = 5;
    }


    ctx.fillStyle = "rgb(204, 0, 0)";
    ctx.fillRect(x, y, 5, 5);
}

update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
