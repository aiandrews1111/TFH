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

function updatePlayer(){
  ctx.fillStyle = "rpg(204, 0, 0)";
  ctx.fillRect(175, 175, 50, 50);
}


function update(){
  updatePlayer();
}

setInterval(update, 15);
