const rngSpeed = document.querySelector(".space__config__rngSpeed");

// handling keyboard input to update current position at a given speed
MoveSpaceship.prototype.moveOnKeyPress = function(event) {
    const speed = parseInt(rngSpeed.value);
    
    switch(event.code) {
        case "KeyW": case "ArrowUp": this.shiftPosition(0, speed*-1); break;

        case "KeyA": case "ArrowLeft": this.shiftPosition(speed*-1, 0); break;

        case "KeyS": case "ArrowDown": this.shiftPosition(0, speed); break;

        case "KeyD": case "ArrowRight": this.shiftPosition(speed, 0); break;
        
        default: break; //ignore other keyboard input
    }
}

// hide all current stars and call function randomly generate/update number of stars 
document.querySelector(".space__config__btn").addEventListener("click", (event) => {
    event.preventDefault();
    
    document.querySelectorAll(".space__stars").forEach((star) => star.classList.add("space__hidden"));
    
    createRandomStars(document.querySelector(".space__config__txtStars"));    
});

// prevent game keyboard input from conflicting with speed range slider
rngSpeed.addEventListener("keydown", (event) => event.preventDefault());