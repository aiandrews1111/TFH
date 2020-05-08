var PlayerStats = {

  HP:100,
  Equppied:"Pistol",
  Speed: 10,
  Level: 1,
  Name: "NA",
};

function updatePlayer(){
  console.log("player updated");
}


function update(){
  updatePlayer();
}

setInterval(update, 15);
