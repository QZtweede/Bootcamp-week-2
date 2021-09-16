var bird = document.getElementById("bird")
var height = 0
var left = 0
var right = 0


document.addEventListener("keypress", movement);

function movement(key) {
    if(key.code == "KeyW"){
        height = height + 10
        bird.style.bottom = height + "px"
    }
    if(key.code == "KeyD"){
        left = left + 10
        bird.style.left = left + "px"
    }   
    if(key.code == "KeyA"){
        left = left - 10
        bird.style.left = left + "px"
    }   
}