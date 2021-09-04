/*****************************SPACESHIP MOUSE/KEYBOARD INPUT*****************************/

const evaluateGameState = () => {
    collisionObject.collisionDetection();
    updateScoreboard();
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
    
    switch(event.code) {
        case "KeyW": case "ArrowUp": this.shiftPosition(0, speed*-1); break;

        case "KeyA": case "ArrowLeft": this.shiftPosition(speed*-1, 0); break;

        case "KeyS": case "ArrowDown": this.shiftPosition(0, speed); break;

        case "KeyD": case "ArrowRight": this.shiftPosition(speed, 0); break;
        
        default: break;
    }

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