const explode = () => {
    const canvas = document.createElement("canvas")
            
    confetti.create(canvas.classList.add("explode"), { resize: true });
    confetti({particleCount: 100, angle: 60, spread: 55, origin: { x: 0 }});
    confetti({particleCount: 100, angle: 120, spread: 55, origin: { x: 1 }});
    
    canvas.remove();
}