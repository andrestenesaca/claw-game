const claw = document.getElementById("claw");
const toy = document.getElementById("toy");
let currentX = 0;
let isDropping= false;
let isAnimating = false;
let dropY = 0;
let isResetting = false;

function animate(direction){
    if(isResetting) return;
    if(isDropping) return;

    if (direction === "ArrowLeft"){
        currentX -= 5;
    }
    else if (direction === "ArrowRight"){
        currentX += 5;
    }
    else if (direction === " "){
        dropClaw(claw);
        return;
    }
    claw.style.transform = `translateX(${currentX}px)`;
    if (isAnimating){
        requestAnimationFrame(()=>{
            animate(direction);
        });
    }
}

document.addEventListener("keydown", (event) => {

    switch (event.key){
        case "ArrowLeft":
            if (!isAnimating){
                isAnimating = true;
                animate("ArrowLeft");
            }
            break;
        case "ArrowRight":
            if (!isAnimating) {
                isAnimating = true;
                animate("ArrowRight");
            }
            break;
        case " ":
            if (!isAnimating) {
                isAnimating = true;
                animate(" ");
            }
            break;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === " ") {
        isAnimating = false; // stop animation when key released
    }
});

function dropClaw() {
    dropY = 0;
    isDropping = true;
    const drop = () => {
        if (dropY >= 250) {
            reset(claw);
            moveToy(toy);
            isDropping = false;
            isResetting = true;
            return;
        }
        dropY += 8;
        claw.style.transform = `translate(${currentX}px, ${dropY}px)`;
        requestAnimationFrame(drop);
    };

    requestAnimationFrame(drop);
}

function reset(element) {
    const lift = () => {
        if (dropY <= 0) {
            dropY = 0;
            requestAnimationFrame(moveLeft);
            return;
        }
        dropY -= 8;
        element.style.transform = `translate(${currentX}px, ${dropY}px)`;
        requestAnimationFrame(lift);
    }

    const moveLeft = () => {
        if (currentX <= 0) {
            currentX = 0;
            isResetting = false;
            return;
        }
        currentX -= 5;
        element.style.transform = `translate(${currentX}px, ${dropY}px)`;
        requestAnimationFrame(moveLeft)
    }
    requestAnimationFrame(lift)
}

let toyX = 300;
let toyY = 340;

function updateToyPosition(){
    toy.style.transform = `translate(${toyX}px, ${toyY}px`;
}

function moveToy(element){

    const lift = () => {
        if(toyY <= 130){
            requestAnimationFrame(moveLeft);
            return;
        }
        toyY -= 8;
        element.style.transform = `translate(${toyX}px, ${toyY}px)`
        requestAnimationFrame(lift);
    };

    const moveLeft = () => {
        if(toyX <= 70){
            return;
        }
        toyX -=5;
        element.style.transform = `translate(${toyX}px,${toyY}px)`
        requestAnimationFrame(moveLeft);
    }
    requestAnimationFrame(lift);
}
