// TODO: change single quotations to doubles

//generate a random hash colour sequence
const randomColour = () => "#"+Math.floor(Math.random()*16777215).toString(16);

// add or remove collision state depending on current collision status
const checkCollisionState = (spaceshipClasslist, hasJustCollided) =>
{
    const collisionState = "collision-state";
    const containsCollision = spaceshipClasslist.contains(collisionState);
    
    if(!containsCollision) spaceshipClasslist.add(collisionState);
    else if(containsCollision && !hasJustCollided) spaceshipClasslist.remove(collisionState);
}

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
    spaceship: null, starDivs: [],
    
    collisionDetection() 
    {
        const starClass = document.querySelectorAll(".stars");

        let hasJustCollided = false;            
        for (let i = 0; i < this.starDivs.length; i++) 
        {
            if(compareDistanceAndRadius(this.starDivs[i].position, this.spaceship.position))
            {
                hasJustCollided = true;
                starClass[i].classList.add("hidden");
            } 
            checkCollisionState(this.spaceship.ref.classList, hasJustCollided);
        }

        if(starClass.length == document.querySelectorAll(".hidden").length) createRandomStars();
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
MoveSpaceship.prototype.moveOnKeyPress = function(e) 
{
    switch(e.code) 
    {            
        case "KeyW": case "ArrowUp": this.shiftPosition(0, -5); break;
        case "KeyA": case "ArrowLeft": this.shiftPosition(-5, 0); break;
        case "KeyS": case "ArrowDown": this.shiftPosition(0, 5); break;
        case "KeyD": case "ArrowRight": this.shiftPosition(5, 0); break;
        
        default: break; //ignore other keyboard input
    }
}

// generate specific amount of randomly positions stars
function createRandomStars(event)
{
    // document.querySelector("#frmGameConfig").preventDefault();
    let numberOfStars =  document.querySelector("#txtNumberOfStars");
    if(!numberOfStars.value) numberOfStars.value = 10
    
    for (let i = 0; i < numberOfStars.value; i++) 
    {
        const newStarDiv = document.createElement("div");
        
        newStarDiv.setAttribute("style", `left: ${Math.floor(Math.random() * 400)}px; \
        top: ${Math.floor(Math.random() * 600)}px; background-color: ${randomColour()};
        right: ${Math.floor(Math.random() * 400)}px; bottom: ${Math.floor(Math.random() * 600)}px;`);

        document.querySelector(".space-container").appendChild(newStarDiv);
        newStarDiv.classList.add("collidable-object", "stars");
        collisionObject.starDivs.push(new BaseStar(newStarDiv));
    }
}

/*
    - setting up entire game "canvas", listening for keyboard input on page load
    - creating random stars and new spaceship, then positioning them
*/ 
const setup = () =>
{
    const spaceship = document.querySelector("#spaceship");    
    if(spaceship) spaceship.remove(); //remove previous spaceship in new game
    
    createRandomStars();
    
    const newSpaceship = document.createElement("div");
    newSpaceship.setAttribute("style", "left: 500px; top: 500px;");
    newSpaceship.setAttribute("id", "spaceship");
    newSpaceship.classList.add("collidable-object");
    document.querySelector(".space-container").appendChild(newSpaceship);
    collisionObject.spaceship = new MoveSpaceship(newSpaceship);    
    
    document.addEventListener("keydown", (e) => collisionObject.spaceship.moveOnKeyPress(e));    
}; setup();

// hide all current stars and call function randomly generate/update number of stars 
document.querySelector("#btnConfigGame").addEventListener("click", (event) => 
{
    event.preventDefault();
    document.querySelectorAll(".stars").forEach((star) => star.classList.add("hidden"));
    createRandomStars();
    document.hasFocus();
});