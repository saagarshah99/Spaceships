//generate a random hash colour sequence
const randomColour = () => "#"+Math.floor(Math.random()*16777215).toString(16);

const collider = 
{
    spaceship: null, starDivs: [],
    
    // looping to compare position of spaceship with stars to check for collisions
    // checkCollision: function() 
    checkCollision() 
    {
        let hasJustCollided = false;            
        const starClass = document.querySelectorAll(".stars");
        for (let i = 0; i < this.starDivs.length; i++) 
        {
            const currentStar = this.starDivs[i];

            const dx = currentStar.position.left - this.spaceship.position.left;
            const dy = currentStar.position.top - this.spaceship.position.top;
            
            //if distance between the current star and spaceship coordinates < their combined radius 
            if(Math.sqrt(dx*dx + dy*dy) < currentStar.position.radius+this.spaceship.position.radius) 
            {
                hasJustCollided = true;
                starClass[i].classList.add("hidden");

                if(!this.spaceship.ref.classList.contains('collision-state')) 
                {
                    this.spaceship.ref.classList.add('collision-state');
                }
            } 
            else if(this.spaceship.ref.classList.contains('collision-state') && !hasJustCollided) 
            {
                this.spaceship.ref.classList.remove('collision-state');
            }
        }

        // TODO: this only runs twice, length eventually gets uneven
        if(starClass.length == document.querySelectorAll(".hidden").length) createRandomStars();
    },
};

// generate specific amount of randomly positions stars
const createRandomStars = () =>
{
    for (let i = 0; i < 1; i++) 
    {
        const newStarDiv = document.createElement('div');
        
        newStarDiv.setAttribute('style', `left: ${Math.floor(Math.random() * 400)}px; top: ${Math.floor(Math.random() * 600)}px; background-color: ${randomColour()};`);

        document.querySelector('.space-container').appendChild(newStarDiv);
        newStarDiv.classList.add("collidable-object", "stars");
        collider.starDivs.push(new BaseDiv(newStarDiv));
    }
}

// the prototype for my base div
window.BaseDiv = function(star) 
{
    this.position = 
    {
        left: star.getBoundingClientRect().left,
        top: star.getBoundingClientRect().top,
        radius: star.getBoundingClientRect().height / 2,
    };
}

/***
 * .prototype allows you to add new properties/functions to object constructors
 * receiving keyboard input and appropriately updating current position
 */
window.MoveStar = function(ref) {this.ref = ref; BaseDiv.call(this, ref);}
MoveStar.prototype.shiftPosition = function(x, y) 
{
    this.position.left += x; 
    this.position.top += y;
    
    this.ref.setAttribute('style', `left: ${this.position.left}px; top: ${this.position.top}px`);
    collider.checkCollision();
}
MoveStar.prototype.moveOnKeyPress = function(e) 
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

// setting up entire game "canvas" and listening for keyboard input on page load
const setup = () =>
{
    const spaceship = document.querySelector("#spaceship");    
    if(spaceship) spaceship.remove(); //remove previous spaceship in new game
    
    // TODO: speed/velocity needs to be reset as it gets incremently faster
    
    // creating random stars and new spaceship, then positioning them
    createRandomStars();
    const newSpaceship = document.createElement('div');
    newSpaceship.setAttribute('style', 'left: 500px; top: 500px;');
    newSpaceship.setAttribute('id', 'spaceship');
    newSpaceship.classList.add('collidable-object');
    document.querySelector('.space-container').appendChild(newSpaceship);
    collider.spaceship = new MoveStar(newSpaceship);    
}
setup(); document.addEventListener('keydown', (e) => collider.spaceship.moveOnKeyPress(e));