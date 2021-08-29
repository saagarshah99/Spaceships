// generate specific amount of stars w/ random sizes, positions (coordinates) and colours
const createRandomStars = (txtNumberOfStars) => {
    if(!txtNumberOfStars.value) txtNumberOfStars.value = 10;
    for (let i = 0; i < txtNumberOfStars.value; i++) {
        const newStarDiv = document.createElement("div");
        
        newStarDiv.style.width = newStarDiv.style.height = randomSize();
        
        newStarDiv.style.top = randomPosition("vh"); 
        newStarDiv.style.bottom = randomPosition("vh"); 
        newStarDiv.style.left = randomPosition("vw");
        newStarDiv.style.right = randomPosition("vw");
        
        newStarDiv.style.backgroundColor = randomColour();

        document.querySelector(".space").appendChild(newStarDiv);
        newStarDiv.classList.add("space__collidable-object", "space__stars");
        collisionObject.stars.push(new BaseStar(newStarDiv));
    }
}

/*
    - setting up entire game "canvas", listening for keyboard input on page load
    - creating random stars and new spaceship, then positioning them
    - initialising scoreboard
*/ 
const main = () => {
    createRandomStars(document.querySelector(".space__config__input-stars"));
    
    const spaceship = document.querySelector("#spaceship");    

    spaceship.style.left = randomSpawnPoint();
    spaceship.style.top = randomSpawnPoint();
    spaceship.style.backgroundColor = "#00d4ff";

    document.querySelector(".space").appendChild(spaceship);
    collisionObject.spaceship = new MoveSpaceship(spaceship);
    
    document.querySelector(".space__config__scoreboard").innerHTML = getScore();
    
    document.addEventListener("keydown", (e) => collisionObject.spaceship.moveOnKeyPress(e));    
}; 
main();