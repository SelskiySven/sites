let current_time = 0
let limit = 25*60*1000
let time_left = limit
let running = false
let paused = false

let timer_container = document.getElementById("timer")
let pause_button = document.getElementById("pause")

function wrap(time,n){
    return "<span class='symbol'>"+time.padStart(n,"0").split("").join("</span><span class='symbol'>")+"</span>"
}

function setTime(){
    let ms = String(time_left%1000)
    let s = String(Math.floor(time_left/1000)%60)
    let m = String(Math.floor(time_left/1000/60)%60)
    let h = String(Math.floor(time_left/1000/60/60)%24)
    timer_container.innerHTML = `${wrap(h,2)}:${wrap(m,2)}:${wrap(s,2)}:${wrap(ms,4)}`
}

setTime()

async function timer() {
    while (time_left>0){
        if (!running||paused) return
        step = performance.now()
        time_left-=step-current_time
        current_time = step
        if (time_left<60000 && !timer_container.classList.contains("timer-alarm")) timer_container.classList.add("timer-alarm")
        setTime()
        await new Promise(requestAnimationFrame)
    }
    time_left=0
    setTime()
    alert("MAKE A BREAK")
}

function start(){
    current_time = performance.now()
    running = true
    timer()
}

function stop(){
    running = false
    time_left = limit
    paused=false
    pause_button.innerText = "pause"
    if (timer_container.classList.contains("timer-alarm")) timer_container.classList.remove("timer-alarm")
    setTime()
}

function pause(){
    if (running&&!paused){
        paused=true
        pause_button.innerText = "resume"
    } else if (running&&paused) {
        paused=false
        pause_button.innerText = "pause"
        start()
    }
}