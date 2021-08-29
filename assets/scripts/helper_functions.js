/* 
    - generate random numbers for colour hashes and positions between 0 and 100 for random positioning
    - positions calculated specifically for the screen we're currently viewing the game on
*/
const randomColour = () => "#"+Math.floor(Math.random()*16777215).toString(16);
const randomPosition = (unit) => Math.floor(Math.random() * 80)+unit;
const randomSpawnPoint = () => Math.floor(Math.random() * 50) + 30+"%";
const randomSize = () => Math.floor(Math.random() * 80) + 30+"px";

//prevent non-numeric input from even occuring
const numbersOnly = (event) =>
{	
	if(!(/[0-9 .]/.test(String.fromCharCode(event.which)))) event.preventDefault();
}