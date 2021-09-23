var bird = document.getElementById("bird")
var wing = document.getElementById("wing")
var height = 0
var right = 800
var array = []
var up = true
var gravity = 100
var b1 = document.getElementById("Ebutton")
var b2 = document.getElementById("Mbutton")
var b3 = document.getElementById("Jbutton")
var heightH = document.getElementById("heightH")
var startB = document.getElementById("startButton")
var controls = document.getElementById("controls")
var icon = document.getElementById("icon")
var soundEffect = new Audio("sprites/soundEffect.wav")
var eendSoundEffect = new Audio("sprites/Eend.wav")
var kwek = document.getElementById("kwek")



bird.onclick = async function(){
    eendSoundEffect.play()
    kwek.style.opacity = 1
    await sleep(200)
    kwek.style.opacity = 0
}

startB.onclick = async function(){
    controls.style.transition = "2s"
    controls.style.left = "100vw"
    await sleep(2000)
    controls.style.transition = "0s"
}

icon.onclick = async function(){
    controls.style.transition = "2s"
    controls.style.left = "0"
    await sleep(2000)
    controls.style.transition = "0s"
}


b1.onclick = function(){    //verander achtergrond en gravity per button
    gravity = 100 
    document.body.style.backgroundImage = "url(sprites/aarde.jpg)"
    bird.style.backgroundImage =  "url(sprites/eend.png)"
    wing.style.backgroundImage = "url(sprites/vleugel.png)"

}
b2.onclick = function(){    //verander achtergrond en gravity per button
    gravity = 200 
    document.body.style.backgroundImage = "url(sprites/maan.jpg)"
    document.body.style.backgroundPosition = "bottom"
    bird.style.backgroundImage =  "url(sprites/ruimteeend.png)"
    wing.style.backgroundImage = "url(sprites/vleugel.png)"
}
b3.onclick = function(){    //verander achtergrond en gravity per button
    gravity = 50 
    document.body.style.backgroundImage = "url(sprites/jupiter.jpg)"
    bird.style.backgroundImage =  "url(sprites/alieneend.png)"
    wing.style.backgroundImage = "url(sprites/aliendvleugel.png)"
}

slider1.oninput = function wingSpan(){  //verander de grootte van de vleugel en hoe snel de vogel omhoog gaat met de slider
    document.documentElement.style.setProperty("--var-transform", "scale(" + slider1.value / 50 + ")")
    wing.style.transform = "scale(" + slider1.value / 50 + ") rotate(30deg)"
}

slider2.oninput = function birdSize(){  //verander de grootte van de vogel met de slider
    bird.style.transform = "scale(" + slider2.value / 50 + ")"
}

checkHeight()
checkIfIdle()

onkeydown = onkeyup = async function(key){      //functie om te kijken welke knoppen worden ingedrukt
    array[key.keyCode] = key.type == "keydown"
    if(array[87] && up === true || array[38] && up === true){   //als de W knop / pijl omhoog word ingedrukt
        soundEffect.play()
        bird.style.transition = "bottom " + 0.3 + "s ease-out"
        height = parseInt(getComputedStyle(bird).bottom) + slider1.value / 1.5 * gravity / 100
        bird.style.bottom = height + "px" 
        up = false
        animateWing()
        await sleep(500)
        bird.style.transition = "bottom " + height * gravity / 5000 + "s ease-out"
        bird.style.bottom = 0 + "px"
        up = true
    }

    if(array[87] && array[68] || array[68] || array[38] && array[39] || array[39]){    //als de D knop / rechter pijl word ingedrukt of als de D knop / rechter pijl en de W knop / pijl omhoog worden ingedrukt
        right = right + 5
        bird.style.left = right + "px"
        bird.style.transform = "scaleX(1) scale(" + slider2.value / 50 + ")"
        if(parseInt(getComputedStyle(bird).left) >= document.documentElement.clientWidth - document.documentElement.clientWidth / 100 * 20){
            right = -100
        }
    }

    if(array[87] && array[65] || array[65] || array[38] && array[37] || array[37]){    //als de A knop / rechter pijl word ingedrukt of als de A knop / rechter pijl en de W knop / pijl omhoog worden ingedrukt
        right = right - 5
        bird.style.left = right + "px"
        bird.style.transform = "scaleX(-1) scale(" + slider2.value / 50 + ")"
        if(parseInt(getComputedStyle(bird).left) <= -100){
            right = document.documentElement.clientWidth - document.documentElement.clientWidth / 100 * 20
        }
    }
}

async function checkHeight(){   //checkt de hoogte van de vogel
    heightH.innerHTML = "height: " + Math.round(parseInt(getComputedStyle(bird).bottom) / 40 * 10) / 10 + "m"
    await sleep(100)
    checkHeight()
}

async function animateWing(){   //animeert de vleugel als de vogel omhoog gaat
    wing.style.animation = "flap 0.5s"
    await sleep(500)
    wing.style.animation = ""
}

async function checkIfIdle(){   //kijkt of de vogel aan het vallen is en geeft dan een animatie aan de vleugel
    if(array[87] === false && array[38] === undefined|| array[87] === undefined && array[38] === false|| array[87] === false && array[38] === false){    
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

function sleep(time) {      //functie om pauzes te maken
    return new Promise(resolve => setTimeout(resolve, time))
}
