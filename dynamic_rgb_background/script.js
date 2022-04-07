let red = 217,green = 127,blue = 336
function change_background(){
    red = (red+0.2)%360
    blue = (blue+0.2)%360
    green = (green+0.2)%360
    document.body.style.background = "linear-gradient("+red+"deg,rgba(255,0,0,.8),rgba(255,0,0,0) 70.71%),linear-gradient("+green+"deg,rgba(0,255,0,.8),rgba(0,255,0,0) 70.71%),linear-gradient("+blue+"deg,rgba(0,0,255,.8),rgba(0,0,255,0) 70.71%)"
}
let change = setInterval(change_background,10);