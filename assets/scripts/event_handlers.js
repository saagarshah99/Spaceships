// handling keyboard input to update current position
MoveSpaceship.prototype.moveOnKeyPress = function(e) {
    switch(e.code) {
        case "KeyW": case "ArrowUp": this.shiftPosition(0, -5); break;
        case "KeyA": case "ArrowLeft": this.shiftPosition(-5, 0); break;
        case "KeyS": case "ArrowDown": this.shiftPosition(0, 5); break;
        case "KeyD": case "ArrowRight": this.shiftPosition(5, 0); break;
        
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