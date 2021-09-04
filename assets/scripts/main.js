/*****************************SPAWNING/STYLING SPACESHIP & STARS*****************************/

const addStyleToStar = (newStarDiv, i) => {
    //small white circles every 5 planets to represent stars, random size/colour for rest
    let colour = randomColour();
    let size = randomSize();
    if(i % 5 === 0) {
        colour = "white";
        size = "20px";
    } 
    
    newStarDiv.style.backgroundColor = colour;
    newStarDiv.style.width = newStarDiv.style.height = size;
    
    // generating random position (coordinates) for current new star
    newStarDiv.style.top = randomPosition("vh");
    newStarDiv.style.bottom = randomPosition("vh");
    newStarDiv.style.left = randomPosition("vw");
    newStarDiv.style.right = randomPosition("vw");
}

// generate specific amount of stars w/ random sizes, positions and colours
const createRandomStars = () => {
    const txtNumberOfStars = document.querySelector(".space__config__txtStars");
    if(!txtNumberOfStars.value) txtNumberOfStars.value = 10;

    for (let i = 0; i < txtNumberOfStars.value; i++) {
        const newStarDiv = document.createElement("div");
        addStyleToStar(newStarDiv, i);

        document.querySelector(".space").appendChild(newStarDiv);
        newStarDiv.classList.add("space__collidable-object", "space__stars");
        collisionObject.stars.push(new BaseStar(newStarDiv));

        destroyStarOnclick(newStarDiv); //enable mouse input
    }
}

// creating new spaceship and positioning it
const spawnSpaceship = (spaceship) => {
    spaceship.style.left = randomSpawnPoint();
    spaceship.style.top = randomSpawnPoint();

    document.querySelector(".space").appendChild(spaceship);
    collisionObject.spaceship = new MoveSpaceship(spaceship);
}

// generate new stars/planets when current set runs out
const resetStars = () => {
    const starClass = document.querySelectorAll(".space__stars");
    const hiddenClass = document.querySelectorAll(".space__hidden");
    
    if(starClass.length == hiddenClass.length) createRandomStars();
}



/*****************************INITIALISING GAME LOGIC*****************************/

//anonymous function (main) - spawning spaceship/random stars
(function() {
    createRandomStars();
    spawnSpaceship(document.querySelector("#spaceship"));
})();
