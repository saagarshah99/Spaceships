/*****************************SPACESHIP MOUSE/KEYBOARD INPUT*****************************/

// checking for change of conditions after any mouse/keyboard input and updating accordingly
const evaluateGameState = () => {
    collisionObject.collisionDetection();
    
    const scoreboard = document.querySelector(".space__config__scoreboard");
    scoreboard.innerHTML = collisionObject.numberOfCollisions;

    resetStars();
}

// listening to taps/mouse clicks (collision), hide star and move spaceship to that position
const destroyStarOnclick = (newStarDiv) => {
    newStarDiv.addEventListener("click", (event) => {
        const spaceship = document.querySelector("#spaceship");
        
        spaceship.style.top = newStarDiv.style.top;
        spaceship.style.bottom = newStarDiv.style.bottom;
        spaceship.style.left = newStarDiv.style.left;
        spaceship.style.right = newStarDiv.style.right;

        newStarDiv.classList.add("space__hidden");

        evaluateGameState();
    });
}

// handling keyboard input to update current position at a given speed
MoveSpaceship.prototype.moveOnKeyPress = function(event) {
    const speed = parseInt(document.querySelector(".space__config__rngSpeed").value);
    let x = 0; let y = 0;
    
    switch(event.code) {
        case "KeyW": case "ArrowUp": y = speed * -1; break;
            
        case "KeyA": case "ArrowLeft": x = speed * -1; break;
        
        case "KeyS": case "ArrowDown": y = speed; break;
        
        case "KeyD": case "ArrowRight": x = speed; break;
        
        default: break;
    }
    
    this.shiftPosition(x, y);
    evaluateGameState();
}
document.addEventListener("keydown", (e) => collisionObject.spaceship.moveOnKeyPress(e));




/*****************************GAME CONFIG FORM EVENT HANDLERS*****************************/

// hide all current stars and call function randomly generate/update number of stars 
document.querySelector(".space__config__btn").addEventListener("click", (event) => {
    event.preventDefault();
    
    document.querySelectorAll(".space__stars").forEach((star) => {
        star.classList.add("space__hidden")
    });
    
    createRandomStars();    
});

// prevent game keyboard input from conflicting with speed range slider
document.querySelector(".space__config__rngSpeed").addEventListener("keydown", (event) => {
    event.preventDefault();
});