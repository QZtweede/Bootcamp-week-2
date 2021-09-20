var bird = document.getElementById("bird")
var wing = document.getElementById("wing")
var height = 0
var right = 800
var array = {}
var up = true
var gravity = 100
var isSettingChanging = false
var b1 = document.getElementById("Ebutton")
var b2 = document.getElementById("Mbutton")
var b3 = document.getElementById("Jbutton")
var heightH = document.getElementById("heightH")

b1.onclick = function(){    //verander achtergrond en gravity per button
    gravity = 100 
    document.body.style.backgroundImage = "url(sprites/aarde.jpg)"
    bird.style.backgroundImage =  "url(sprites/eend.png)"
    wing.style.backgroundImage = "url(sprites/vleugel.png)"

}
b2.onclick = function(){
    gravity = 200 
    document.body.style.backgroundImage = "url(sprites/maan.jpg)"
    document.body.style.backgroundPosition = "bottom"
    bird.style.backgroundImage =  "url(sprites/ruimteeend.png)"
    wing.style.backgroundImage = "url(sprites/vleugel.png)"
}
b3.onclick = function(){
    gravity = 50 
    document.body.style.backgroundImage = "url(sprites/jupiter.jpg)"
    bird.style.backgroundImage =  "url(sprites/alieneend.png)"
    wing.style.backgroundImage = "url(sprites/aliendvleugel.png)"
}

slider1.oninput = function wingSpan(){
    isSettingChanging = true
    document.documentElement.style.setProperty("--var-transform", "scale(" + slider1.value / 50 + ")")
    wing.style.transform = "scale(" + slider1.value / 50 + ") rotate(30deg)"}

slider2.oninput = function birdSize(){
    isSettingChanging = true
    bird.style.transform = "scale(" + slider2.value / 50 + ")"
}

slider1.onmouseup = slider2.onmouseup = function settingsNotChanging(){
    isSettingChanging = false
}

checkHeight()


onkeydown = onkeyup = async function(key){
    array[key.keyCode] = key.type == "keydown"
    if(array[87] && up === true){  
        bird.style.transition = "bottom " + 0.3 + "s ease-out"
        height = parseInt(getComputedStyle(bird).bottom) + slider1.value / 1.5 * gravity / 100
        bird.style.bottom = height + "px" 
        up = false
        checkIfIdle()
        animateWing()
        await sleep(500)
        bird.style.transition = "bottom " + height * gravity / 5000 + "s ease-out"
        bird.style.bottom = 0 + "px"
        up = true
    }

    if(array[87] && array[68] || array[68]){
        right = right + 5
        bird.style.left = right + "px"
        bird.style.transform = "scaleX(1) scale(" + slider2.value / 50 + ")"
        if(parseInt(getComputedStyle(bird).left) >= document.documentElement.clientWidth - document.documentElement.clientWidth / 100 * 20){
            right = -100
        }
    }

    if(array[87] && array[65] || array[65]){
        right = right - 5
        bird.style.left = right + "px"
        bird.style.transform = "scaleX(-1) scale(" + slider2.value / 50 + ")"
        if(parseInt(getComputedStyle(bird).left) <= -100){
            right = document.documentElement.clientWidth - document.documentElement.clientWidth / 100 * 20
        }
    }
}

async function checkHeight(){
    heightH.innerHTML = "height: " + parseInt(getComputedStyle(bird).bottom) / 40 + "m"
    await sleep(100)
    checkHeight()
}

async function animateWing(){
    wing.style.animation = "flap 0.5s"
    await sleep(500)
    wing.style.animation = ""
}

async function checkIfIdle(){
    if(array[87] === false && isSettingChanging === false){    
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
