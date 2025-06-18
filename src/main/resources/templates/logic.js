const claw = document.getElementById("claw");
const toy = document.getElementById("toy");
let isDropping= false;
let isAnimating = false;
let isResetting = false;
let clawX = 50;
let clawY = -400;


function animate(direction){
    if(isResetting) return;
    if(isDropping) return;

    if (direction === "ArrowLeft"){
        clawX -= 5;
    }
    else if (direction === "ArrowRight"){
        clawX += 5;
    }
    else if (direction === " "){
        dropClaw(claw);
        return;
    }
    claw.style.transform = `translate(${clawX}px,${clawY}px)`;
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
    isDropping = true;
    const drop = () => {
        if (clawY >= -160) {
            reset(claw);
            moveToy(toy);
            isDropping = false;
            isResetting = true;
            return;
        }
        clawY += 8;
        claw.style.transform = `translate(${clawX}px, ${clawY}px)`;
        requestAnimationFrame(drop);
    };

    requestAnimationFrame(drop);
}

function reset(element) {
    const lift = () => {
        if (clawY <= -400) {
            requestAnimationFrame(moveLeft);
            return;
        }
        clawY -= 8;
        element.style.transform = `translate(${clawX}px, ${clawY}px)`;
        requestAnimationFrame(lift);
    }

    const moveLeft = () => {
        if (clawX <= 70) {
            isResetting = false;
            return;
        }
        clawX -= 5;
        element.style.transform = `translate(${clawX}px, ${clawY}px)`;
        requestAnimationFrame(moveLeft)
    }
    requestAnimationFrame(lift)
}



// toy logic
let toyX = 300;
let toyY = 340;

function moveToy(element){

    const lift = () => {
        if(toyY <= 130){
            requestAnimationFrame(moveLeft);
            return;
        }
        toyY -= 8;
        element.style.transform = `translate(${toyX}px,${toyY}px)`
        requestAnimationFrame(lift);
    };

    const moveLeft = () => {
        if(toyX <= 70){
            requestAnimationFrame(pickupPrize);
            return;
        }
        toyX -= 5;
        element.style.transform = `translate(${toyX}px,${toyY}px)`
        requestAnimationFrame(moveLeft);
    }

    const pickupPrize = () => {
        if(toyY >= 340){
            toy.style.display = "none";
            toyY += 165;
            toy.style.transform = `translate(${toyX}px,${toyY}px)`
            toy.style.display = "block";
            return;
        }
        toyY += 5;
        element.style.transform = `translate(${toyX}px,${toyY}px)`
        requestAnimationFrame(pickupPrize);
    }

    requestAnimationFrame(lift);
}