// return true if distance between current star and spaceship < their combined radius 
const collisionOccured = (currentStarPosition, spaceshipPosition) => {
    const dx = currentStarPosition.left - spaceshipPosition.left;
    const dy = currentStarPosition.top - spaceshipPosition.top;    
    
    const distance = Math.sqrt(dx*dx + dy*dy);
    const combinedRadius = currentStarPosition.radius + spaceshipPosition.radius

    return distance < combinedRadius;
}

/* object storing info/properties about spaceship and stars, contains collision detection function */
const collisionObject = {
    spaceship: null, 
    stars: [],
    numberOfCollisions: 0,
    
    // loop through stars - if collision detected, hide to "destroy" and accumulate score
    collisionDetection() {
        for (let i = 0; i < this.stars.length; i++) {            
            if(collisionOccured(this.stars[i].position, this.spaceship.position)) {
                const starClass = document.querySelectorAll(".space__stars");
                starClass[i].classList.add("space__hidden");
                this.numberOfCollisions++;
            }
        }
    },
};

// use this object to create instance of each new star in order to track them in array
BaseStar = function(star) {
    this.position = {
        left: star.getBoundingClientRect().left,
        top: star.getBoundingClientRect().top,
        radius: star.getBoundingClientRect().height / 2,
    };
}

/*
    - .using prototype to add new properties/functions to object constructor
    - receiving keyboard input, updating current position, constantly checking for collisions
*/
MoveSpaceship = function(ref) {this.ref = ref; BaseStar.call(this, ref);}
MoveSpaceship.prototype.shiftPosition = function(x, y) {
    this.position.left += x;
    this.ref.style.left = this.position.left+"px";
    
    this.position.top += y;
    this.ref.style.top = this.position.top+"px";
}