const claw = document.getElementById("claw");
let currentX = 0;
let isDropping= false;
let isAnimating = false;
let dropY = 0;

function animate(direction){
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
    const drop = () => {
        if (dropY >= 250) {
            resetClaw();
            return;
        }
        dropY += 2;
        claw.style.transform = `translate(${currentX}px, ${dropY}px)`;
        requestAnimationFrame(drop);
    };

    requestAnimationFrame(drop);
}

function resetClaw() {
    const lift = () => {
        if (dropY <= 0) {
            dropY = 0;
            isDropping = false;
            requestAnimationFrame(moveLeft);
            return;
        }
        dropY -= 8;
        claw.style.transform = `translate(${currentX}px, ${dropY}px)`;
        requestAnimationFrame(lift);
    };

    const moveLeft = () => {
        if (currentX <= 0) {
            currentX = 0;
            claw.style.transform = `translate(${currentX}px, ${dropY}px)`;
            return;
        }
        currentX -= 3;
        claw.style.transform = `translate(${currentX}px, ${dropY}px)`;
        requestAnimationFrame(moveLeft)
    }
    requestAnimationFrame(lift)
}


function clawGrabToy(){
    return false;
}
