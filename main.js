var bird = document.getElementById("bird")
var wing = document.getElementById("wing")
// var slider = document.getElementById("slider1").addEventListener("oninput", wingSpan())
var height = 0
var right = 800
var array = {}
var up = true
var gravity = 100

slider1.oninput = function wingSpan(){
    console.log("test")
    document.documentElement.style.setProperty("--var-transform", "scale(" + slider1.value / 50 + ")")
    wing.style.transform = "scale(" + slider1.value / 50 + ") rotate(30deg)"
}


onkeydown = onkeyup = async function(key){
    array[key.keyCode] = key.type == "keydown"
    if(array[38] && up === true){  
        bird.style.transition = "bottom " + 0.3 + "s ease-out"
        // grav = 0
        height = parseInt(getComputedStyle(bird).bottom) + 30
        bird.style.bottom = height + "px" 
        up = false
        checkIfIdle()
        animateWing()
        await sleep(500)
        bird.style.transition = "bottom " + height / gravity + "s ease-out"
        bird.style.bottom = 0 + "px"
        up = true
    }

    if(array[38] && array[39] || array[39]){
        right = right + 5
        bird.style.left = right + "px"
        bird.style.transform = "scaleX(1)"
    }

    if(array[38] && array[37] || array[37]){
        right = right - 5
        bird.style.left = right + "px"
        bird.style.transform = "scaleX(-1)"
    }
}

async function animateWing(){
    wing.style.animation = "flap 0.5s"
    await sleep(500)
    wing.style.animation = ""
}

async function checkIfIdle(){
    if(array[38] === false){    
        if(parseInt(getComputedStyle(bird).bottom) > 0){
            wing.style.animation = "idle 0.2s infinite"
        }
        else(
            wing.style.animation = ""
        )
    }
    await sleep(200)
    checkIfIdle()
}

function sleep(time) {      //Functie om pauzes te maken
    return new Promise(resolve => setTimeout(resolve, time));
}
