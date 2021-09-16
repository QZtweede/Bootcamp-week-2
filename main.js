var bird = document.getElementById("bird")
var height = 0
var right = 0
var array = {}
var up = true
var grav = 0

onkeydown = onkeyup = async function(key){
    array[key.keyCode] = key.type == "keydown";
    if(array[87] && up === true){  
        grav = 0
        height = height + 30
        bird.style.bottom = height + "px" 
        up = false
        await sleep(100)
        gravity()
        await sleep(500)
        up = true
    }

    if(array[87] && array[68] || array[68]){
        right = right + 10
        bird.style.left = right + "px"
    }

    if(array[87] && array[65] || array[65]){
        right = right - 10
        bird.style.left = right + "px"
    }
    
}

async function gravity(){
    console.log(parseInt(bird.style.bottom))
    for(grav; grav < 9.81; grav = grav + 0.01){
        if (array[87]) {        
            grav = 0 
            console.log(grav)
        }
        height = height - grav
        bird.style.bottom = height + "px" 
        await sleep(50)
    }
}

function sleep(time) {      //Functie om pauzes te maken
    return new Promise(resolve => setTimeout(resolve, time));
}
