var canvas = document.getElementbyId("Game");
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

ddocument.addEventListener('keydown', event => {
  if (event.keyCode === 87 || event.keyCode === 38) {
    playerY = playerY - 2;
    //W key or Up key
  } else if (event.keyCode === 65 || event.keyCode === 37) {
    playerX = playerX - 2;
    //A Key or Left key
  } else if (event.keyCode === 83 || event.keyCode === 40) {
    playerY = playerY + 2;
    //S Key or Down key
  } else if (event.keyCode === 68 || event.keyCode === 39) {
    playerX = playerX + 2;
    //D Key or Right key
  }
});
                          
function updatePlayer(x, y){
  ctx.fillStyle = "rgb(204, 0, 0)";
  ctx.fillRect(x, y, 50, 50);
}


function update(){
  updatePlayer(playerX, playerY);
}

setInterval(update, 15);
