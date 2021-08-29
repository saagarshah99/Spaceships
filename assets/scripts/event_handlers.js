// handling keyboard input to update current position at a given speed
MoveSpaceship.prototype.moveOnKeyPress = function(event) {
    const speed = 20;
    
    switch(event.code) {
        case "KeyW": case "ArrowUp": this.shiftPosition(0, speed*-1); break;

        case "KeyA": case "ArrowLeft": this.shiftPosition(speed*-1, 0); break;

        case "KeyS": case "ArrowDown": this.shiftPosition(0, speed); break;

        case "KeyD": case "ArrowRight": this.shiftPosition(speed, 0); break;
        
        default: break; //ignore other keyboard input
    }
}

// hide all current stars and call function randomly generate/update number of stars 
document.querySelector("#btnConfigGame").addEventListener("click", (event) => {
    event.preventDefault();
    
    document.querySelectorAll(".space__stars").forEach((star) => {
        star.classList.add("space__hidden")
    });
    
    createRandomStars(document.querySelector("#txtNumberOfStars"));    
});