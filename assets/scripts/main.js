/*****************************SPAWNING/STYLING SPACESHIP & STARS*****************************/

// generating width, position (coordinates) and colour for current new star
const addStyleToStar = (newStarDiv) => {
    newStarDiv.style.width = newStarDiv.style.height = randomSize();
    
    newStarDiv.style.top = randomPosition("vh"); 
    newStarDiv.style.bottom = randomPosition("vh"); 
    newStarDiv.style.left = randomPosition("vw");
    newStarDiv.style.right = randomPosition("vw");
    
    newStarDiv.style.backgroundColor = randomColour();
}

// generate specific amount of stars w/ random sizes, positions and colours
const createRandomStars = (txtNumberOfStars) => {
    if(!txtNumberOfStars.value) txtNumberOfStars.value = 10;

    for (let i = 0; i < txtNumberOfStars.value; i++) {
        const newStarDiv = document.createElement("div");
        addStyleToStar(newStarDiv);

        document.querySelector(".space").appendChild(newStarDiv);
        newStarDiv.classList.add("space__collidable-object", "space__stars");
        collisionObject.stars.push(new BaseStar(newStarDiv));

        destroyStarOnclick(newStarDiv);
    }
}

// creating new spaceship and positioning it
const spawnSpaceship = (spaceship) => {
    spaceship.style.left = randomSpawnPoint();
    spaceship.style.top = randomSpawnPoint();
    spaceship.style.backgroundColor = "#00d4ff";

    document.querySelector(".space").appendChild(spaceship);
    collisionObject.spaceship = new MoveSpaceship(spaceship);
}

// generate new stars/planets when current set runs out
const resetStars = () => {
    const starClass = document.querySelectorAll(".space__stars");
    const hiddenClass = document.querySelectorAll(".space__hidden");
    
    if(starClass.length == hiddenClass.length) {
        createRandomStars(document.querySelector(".space__config__txtStars"));
    }
}



/*****************************INITIALISING GAME LOGIC*****************************/

//main anon function - (spawning spaceship/random stars + resetting scoreboard)
(function() {
    createRandomStars(document.querySelector(".space__config__txtStars"));
    spawnSpaceship(document.querySelector("#spaceship"));
    updateScoreboard();
})();