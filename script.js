const circleElement = document.querySelector('.circle');

const mouse = { x: 0, y: 0 };
const previousMouse = {x: 0, y: 0 } //tracks mouse position in previous frame
const circle = { x: 0, y: 0 };
let currentScale = 0;
let currentAngle = 0;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

const speed = 0.17;

const tick = () => {
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;

    //circleElement.style.transform = `translate(${circle.x}px, ${circle.y}px)`; // circle follows mouse
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

    // Squeeze
    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;

    const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150);
    const scaleValue = (mouseVelocity / 150) * 0.5;

    currentScale += (scaleValue - currentScale) * speed;

    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    //ROTATE
    const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

    if (mouseVelocity > 20){
        currentAngle = angle;
    }

    const rotateTransform = `rotate(${currentAngle}deg)`;

    // Apply all transformations
    circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
    
    window.requestAnimationFrame(tick);
}

tick();