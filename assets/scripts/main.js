// generate specific amount of stars w/ random sizes, positions and colours
const createRandomStars = (txtNumberOfStars) =>
{
    if(!txtNumberOfStars.value) txtNumberOfStars.value = 10;
    for (let i = 0; i < txtNumberOfStars.value; i++) 
    {
        const newStarDiv = document.createElement("div");
        
        newStarDiv.style.width = newStarDiv.style.height = randomSize(); 

        newStarDiv.style.top = randomPosition("vh"); 
        newStarDiv.style.bottom = randomPosition("vh"); 
        newStarDiv.style.left = randomPosition("vw");
        newStarDiv.style.right = randomPosition("vw");
        
        newStarDiv.style.backgroundColor = randomColour();

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