// return random number of given range
const random = (min, max) => Math.floor(Math.random() * max) + min;

/* 
    - generate random colour hashes (base 16), positions/spawn points and sizes of sprites
    - positions calculated specifically for the screen we're currently viewing the game on
*/
const randomColour = () => "#"+random(0, 16777215).toString(16);
const randomPosition = (unit) => random(0, 80)+unit;
const randomSpawnPoint = () => random(30, 50)+"%";
const randomSize = () => random(30, 80)+"px";

// update scoreboard when invoked
const getScore = () => "Score: "+collisionObject.numberOfCollisions;

//prevent non-numeric input from even occuring
const numbersOnly = (event) => {
	const inputText = String.fromCharCode(event.which);

    if(!(/[0-9 .]/.test(inputText))) 
    {
        event.preventDefault()
    };
}