//generate a random hash colour sequence
const randomColour = () => "#"+Math.floor(Math.random()*16777215).toString(16);

// add or remove collision state depending on current collision status
const checkCollisionState = (spaceshipClasslist, hasJustCollided, numberOfCollisions) =>
{
    const collisionState = "collision-state";
    const containsCollision = spaceshipClasslist.contains(collisionState);
    
    if(!containsCollision) spaceshipClasslist.add(collisionState);
    else if(containsCollision && !hasJustCollided) spaceshipClasslist.remove(collisionState);

    // increase size of spaceship upon collision
    // const spaceshipStyle = document.getElementById("spaceship").style;
    // spaceshipStyle.padding = numberOfCollisions+"px";
    // spaceshipStyle.opacity = "0.5";
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
    spaceship: null, 
    starDivs: [],
    numberOfCollisions: 0,
    
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
                this.numberOfCollisions++;
                document.getElementById("scoreboard").innerHTML = "Score: "+this.numberOfCollisions;
            } 
            checkCollisionState(this.spaceship.ref.classList, hasJustCollided, this.numberOfCollisions);
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
        
        const randomSize = Math.floor(Math.random() * 80) + 30+"px";
        newStarDiv.style.width = randomSize;
        newStarDiv.style.height = randomSize;

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

    let randomSpawnPoint = Math.floor(Math.random() * 50) + 30+"%";
    
    const newSpaceship = document.createElement("div");
    newSpaceship.setAttribute("style", `left: ${randomSpawnPoint}; top: ${randomSpawnPoint};`);
    newSpaceship.setAttribute("id", "spaceship");
    newSpaceship.classList.add("collidable-object");
    // newSpaceship.innerHTML = `<img src="./assets/images/spaceship.svg" width="50" height="50" />`;
    newSpaceship.innerHTML = `<img src="./assets/images/alien_icon.png" width="50" height="50" />`;
    
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
});