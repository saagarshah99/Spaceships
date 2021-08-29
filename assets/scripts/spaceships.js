/* 
    - generate random numbers for colour hashes and positions between 0 and 100 for random positioning
    - positions calculated specifically for the screen we're currently viewing the game on
*/
const randomColour = () => "#"+Math.floor(Math.random()*16777215).toString(16);
const randomPosition = () => Math.floor(Math.random() * 80);
const randomSpawnPoint = () => Math.floor(Math.random() * 50) + 30+"%";

//prevent non-numeric input from even occuring
const numbersOnly = (event) =>
{	
	if(!(/[0-9 .]/.test(String.fromCharCode(event.which)))) event.preventDefault();
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
function createRandomStars(txtNumberOfStars)
{
    if(!txtNumberOfStars.value) txtNumberOfStars.value = 10;
    for (let i = 0; i < txtNumberOfStars.value; i++) 
    {
        const newStarDiv = document.createElement("div");
        
        // small white stars for every multiple of 5, random size and colour for the rest
        let colour = randomColour();
        let size = Math.floor(Math.random() * 80) + 30+"px";
        if(i % 5 == 0) 
        {
            colour = "white";
            size = "20px";
        }
        newStarDiv.style.width = size; 
        newStarDiv.style.height = size;
        
        newStarDiv.style.top = `${randomPosition()}vh`; 
        newStarDiv.style.right = `${randomPosition()}vw`;
        newStarDiv.style.bottom = `${randomPosition()}vh`; 
        newStarDiv.style.left = `${randomPosition()}vw`;
        
        newStarDiv.style.backgroundColor = colour;
        

        document.querySelector(".space").appendChild(newStarDiv);
        newStarDiv.classList.add("space__collidable-object", "space__stars");
        collisionObject.starDivs.push(new BaseStar(newStarDiv));
    }
}

/*
    - setting up entire game "canvas", listening for keyboard input on page load
    - creating random stars and new spaceship, then positioning them
*/ 
const setup = () =>
{
    createRandomStars(document.querySelector("#txtNumberOfStars"));
    
    const newSpaceship = document.querySelector("#spaceship");    
    newSpaceship.setAttribute("style", `left: ${randomSpawnPoint()}; top: ${randomSpawnPoint()};`);
    newSpaceship.classList.add("space__collidable-object");
    newSpaceship.innerHTML = `<img src="./assets/images/alien_icon.png" width="50" height="50" />`;
    
    document.querySelector(".space").appendChild(newSpaceship);
    collisionObject.spaceship = new MoveSpaceship(newSpaceship);    
    
    document.addEventListener("keydown", (e) => collisionObject.spaceship.moveOnKeyPress(e));    
}; 
setup();

// hide all current stars and call function randomly generate/update number of stars 
document.querySelector("#btnConfigGame").addEventListener("click", (event) => 
{
    event.preventDefault();
    document.querySelectorAll(".space__stars").forEach((star) => star.classList.add("space__hidden"));
    createRandomStars(document.querySelector("#txtNumberOfStars"));    
});

