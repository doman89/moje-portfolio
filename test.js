const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const vader = document.querySelector("section img");

canvas.width = 500;
canvas.height = 250;

cw = canvas.width;
ch = canvas.height;

//32x48 sx sy swidht sheight dx dy

let vaderPosX = (cw / 2) - 16;
let vaderPosY = (ch / 2) - 24;
let vaderAnimLeftX;
let vaderAnimLeftY;
let vaderAnimLeftStep = 0;
let vaderAnimUpX;
let vaderAnimUpY;
let vaderAnimUpStep = 0;
let vaderAnimRightX;
let vaderAnimRightY;
let vaderAnimRightStep = 0;
let vaderAnimDownX;
let vaderAnimDownY;
let vaderAnimDownStep = 0;
// let vaderImage = ctx.drawImage(vader, vaderAnimLeft + vaderAnimLeftStep, 0, 32, 48, vaderPosX, vaderPosY, 32, 48);

const playerMove = (direction) => {
    if (direction == 1) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 500, 250);
        // ctx.drawImage(vader)

    } else if (direction == 2) {

    } else if (direction == 3) {

    } else {

    }
}
const keyboardSupport = (e) => {
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 37:
            console.log("left");
            playerMove(1);
            break;
        case 38:
            console.log("up");
            playerMove(2);
            break;
        case 39:
            console.log("right");
            playerMove(3);
            break;
        case 40:
            console.log("down");
            playerMove(4);
            break;

        default:
            break;
    }
}

window.addEventListener("keydown", keyboardSupport);

function about(userName) {
    return (userAge) => {
        return `Hej ${userName}, Twój wiek to ${userAge} lat.`
    }
}

let user = about(`Mateusz`);
console.log(user(29));

user = about(`Joanna`);
console.log(user(30));