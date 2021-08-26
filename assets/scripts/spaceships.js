//////////// COLLISION ALGO FROM MDN
/* 
var circle1 = {radius: 20, x: 5, y: 5};
var circle2 = {radius: 12, x: 10, y: 5};

var dx = circle1.x - circle2.x;
var dy = circle1.y - circle2.y;
var distance = Math.sqrt(dx * dx + dy * dy);

if (distance < circle1.radius + circle2.radius) {
    // collision detected!
}
*/

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

const collider = 
{
    moveableDiv: null,
    staticDivs: [],
    checkCollision: function() 
    {
        let hasJustCollided = false;            
        const staticClass = document.querySelectorAll(".static");
        for (let i = 0; i < this.staticDivs.length; i++) 
        {
            
            const currentDiv = this.staticDivs[i];
            const dx = currentDiv.position.left - this.moveableDiv.position.left;
            const dy = currentDiv.position.top - this.moveableDiv.position.top;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < currentDiv.position.radius + this.moveableDiv.position.radius) 
            {
                hasJustCollided = true;

                if (!this.moveableDiv.ref.classList.contains('collision-state')) 
                {
                    this.moveableDiv.ref.classList.add('collision-state');
                    staticClass[i].classList.add("hide-me");
                    
                }
            } 
            else if (this.moveableDiv.ref.classList.contains('collision-state') && !hasJustCollided) 
            {
                this.moveableDiv.ref.classList.remove('collision-state');
            }

        }

        const hideMeClass = document.querySelectorAll(".hide-me");
        // if(staticClass.length == hideMeClass.length) setup();
        if(staticClass.length == hideMeClass.length) createRandomDivs();
    },
};


// the prototype for my base div
window.BaseDiv = function(div) 
{
    this.position = 
    {
        left: div.getBoundingClientRect().left,
        top: div.getBoundingClientRect().top,
        radius: div.getBoundingClientRect().height / 2,
    };
}


window.MoveDiv = function(ref) 
{
    this.ref = ref;
    BaseDiv.call(this, ref);
}

MoveDiv.prototype.moveOnKeyPress = function(e) 
{
    switch(e.code) 
    {            
        case "KeyW": case "ArrowUp": this.shiftPosition(0, -5); break;
        case "KeyA": case "ArrowLeft": this.shiftPosition(-5, 0); break;
        case "KeyS": case "ArrowDown": this.shiftPosition(0, 5); break;
        case "KeyD": case "ArrowRight": this.shiftPosition(5, 0); break;
        default: break;
    }
}

MoveDiv.prototype.shiftPosition = function(x, y) 
{
    this.position.left += x;
    this.position.top += y;
    this.reDraw(this.ref, this.position);
}

MoveDiv.prototype.reDraw = function(ref, position) 
{
    ref.setAttribute('style', `left: ${position.left}px; top: ${position.top}px`);
    collider.checkCollision();
}

function setup() 
{
    const container = document.querySelector('.container');
    if(document.querySelector("#divtwo")) 
    {
        document.querySelector("#divtwo").remove();
    }
    // TODO: speed/velocity needs to be reset as it gets incremently faster
    
    // create a bunch of random divs
    createRandomDivs();
    
    // create the moveable div
    const newMoveableDiv = document.createElement('div');
    // newMoveableDiv.setAttribute('style', 'left: 500px; top: 500px;');
    newMoveableDiv.setAttribute('id', 'divtwo');
    newMoveableDiv.classList.add('collideme');
    container.appendChild(newMoveableDiv);
    collider.moveableDiv = new MoveDiv(newMoveableDiv);

    document.addEventListener('keydown', (e) => collider.moveableDiv.moveOnKeyPress(e));
};
setup();

function createRandomDivs()
{
    const container = document.querySelector('.container');

    for (let i = 0; i < 5; i++) 
    {
        const newStaticDiv = document.createElement('div');
        newStaticDiv.setAttribute('style', `left: ${Math.floor(Math.random() * 400)}px; top: ${Math.floor(Math.random() * 600)}px; background-color: ${generateRandomColour()};`);
        container.appendChild(newStaticDiv);
        newStaticDiv.classList.add("collideme", "static");
        collider.staticDivs.push(new BaseDiv(newStaticDiv));
    }
}

//generate a random hash colour sequence
function generateRandomColour()
{
    return "#"+Math.floor(Math.random()*16777215).toString(16);
}