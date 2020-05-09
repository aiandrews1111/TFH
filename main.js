var canvas = document.getElementbyID("Game");
var ctx = canvas.getContext("2d");
var playerX = 175;
var playerY = 175;


var PlayerStats = {

  HP:100,
  Equppied:"Pistol",
  Speed: 10,
  Level: 1,
  Name: "NA",
};

document.addEventListener('keydown', event => {
  if (event.keyCode === 87) {
    playerY = playerY - 2;
    //W key
  } else if (event.keyCode === 65) {
    playerX = playerX - 2;
    //A Key
  } else if (event.keyCode === 63) {
    playerY = playerY + 2;
    //S Key
  } else if (event.keyCode === 68) {
    playerX = playerX + 2;
    //D Key
  }
});
                          
function updatePlayer(x, y){
  ctx.fillStyle = "rpg(204, 0, 0)";
  ctx.fillRect(x, y, 50, 50);
}


function update(){
  updatePlayer(playerX, playerY);
}

setInterval(update, 15);
