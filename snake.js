const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
let speed = 5
let tile_count = 20
let tile_size = canvas.width/tile_count -2
let headx = 10
let heady = 10
let xvelocity = 0
let yvelocity = 0
let applex = 5
let appley = 5
const snake_elements = []
let tail_length = 2
let score = 0
const snd = new Audio("gp.wav")

class snake_parts{
  constructor(x,y){
    this.x = x
    this.y = y
  }
}



function draw(){
  change_snake_position()
  let res = gameover()
  if(res)
  {
    return
  }
  clear()
  score_draw()
  draw_snake()
  draw_apple()
  collison()


  console.log("checking");
  setTimeout(draw,1000/speed)
}


// making the game gameover

function gameover(){
  let game = false
  if (headx<0 || headx >=20) {
    game = true
  }
  if (heady<0 || heady>=20) {
    game = true
  }

  if(game)
  {
    ctx.font = "50px Verdana"
    var gradient = ctx.createLinearGradient(0, 0, 200, 0)
    gradient.addColorStop("0","magenta")
    gradient.addColorStop("0.5","blue")
    gradient.addColorStop("1","red")
    ctx.fillStyle = gradient
    ctx.fillText("Game Over",canvas.width/6.5,canvas.height/2)
  }


  return game
}

// drawing the score

function score_draw(){
  ctx.fillStyle = "white"
  ctx.font = "10px Verdana"
  ctx.fillText("Score "+score,canvas.width-50,10)
}


function clear(){
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,canvas.width,canvas.height)
}

function draw_snake(){


  // drawing snake body parts

  ctx.fillStyle = "orange"
  for (var i = 0; i < snake_elements.length; i++) {
    let part = snake_elements[i]
     ctx.fillRect(part.x*tile_count,part.y*tile_count,tile_size,tile_size)
  }
 snake_elements.push(new snake_parts(headx,heady))
 if (snake_elements.length>tail_length) {
   snake_elements.shift() //shift remove the first element of array
 }


 // snake head
 ctx.fillStyle = "green"
 ctx.fillRect(tile_count*headx,tile_count*heady,tile_size,tile_size)

}

// drawing the apple
 function draw_apple(){
   ctx.fillStyle = "red"
   ctx.fillRect(applex*tile_count,appley*tile_count,tile_size,tile_size)
 }

// giving the key command to snake
document.body.addEventListener("keydown",key)

function key(event){

  // up
  if (event.keyCode == 38) {
    yvelocity = -1
    xvelocity = 0
  }
  // down
  if (event.keyCode == 40) {
    yvelocity = 1
    xvelocity = 0
  }
// LEFT
  if (event.keyCode == 37) {
    yvelocity = 0
    xvelocity = -1
  }
// RIGHT
  if (event.keyCode == 39) {
    yvelocity = 0
    xvelocity = 1
  }
}

// changing the snake positiion

function change_snake_position(){
  headx += xvelocity
  heady += yvelocity

}

// changing the position if colision

function collison(){
  console.log(applex);
  console.log(appley);
  if(headx==applex && heady == appley)
  {
    applex = Math.floor((Math.random() * tile_count));
    appley =  Math.floor((Math.random() * tile_count));
    tail_length++
    snd.play()
    score++
  }
}








draw()
