// return true if distance between current star and spaceship < their combined radius 
const compareDistanceAndRadius = (currentStarPosition, spaceshipPosition) =>
{    
    const dx = currentStarPosition.left - spaceshipPosition.left;
    const dy = currentStarPosition.top - spaceshipPosition.top;    
    const distance = Math.sqrt(dx*dx + dy*dy);
    const combinedRadius = currentStarPosition.radius + spaceshipPosition.radius

    return distance < combinedRadius;
}

// use this object to create instance of each new star in order to track them in array
window.BaseStar = function(star) 
{
    this.position = 
    {
        left: star.getBoundingClientRect().left,
        top: star.getBoundingClientRect().top,
        radius: star.getBoundingClientRect().height / 2,
    };
}

/* object storing info about spaceship and stars, contains function that loops 
through stars to compare position of spaceship (checking for collisions) */
const collisionObject = 
{
    spaceship: null, 
    starDivs: [],
    numberOfCollisions: 0,
    
    collisionDetection() 
    {
        const starClass = document.querySelectorAll(".space__stars");

        let hasJustCollided = false;
        for (let i = 0; i < this.starDivs.length; i++) 
        {
            if(compareDistanceAndRadius(this.starDivs[i].position, this.spaceship.position))
            {
                hasJustCollided = true;
                starClass[i].classList.add("space__hidden");
                this.numberOfCollisions++;
                document.getElementById("scoreboard").innerHTML = "Score: "+this.numberOfCollisions;
            }

        }

        if(starClass.length == document.querySelectorAll(".space__hidden").length) 
        {
            createRandomStars(document.querySelector("#txtNumberOfStars"));
        }
    },
};

/*
    - .using prototype to add new properties/functions to object constructor
    - receiving keyboard input, updating current position, constantly checking for collisions
*/
window.MoveSpaceship = function(ref) {this.ref = ref; BaseStar.call(this, ref);}
MoveSpaceship.prototype.shiftPosition = function(x, y) 
{
    this.position.left += x; 
    this.position.top += y;
    
    this.ref.setAttribute("style", `left: ${this.position.left}px; top: ${this.position.top}px`);
    collisionObject.collisionDetection(); 
}