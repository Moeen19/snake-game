let board;
let context;
let foodX
let foodY
let velocityX = 0
let velocityY = 0
const rows = 20
const cols = 20
const blockSize = 25
let snake_head_x = blockSize * 10
let snake_head_y = blockSize * 10

function genFood() {
    foodX = Math.floor(Math.random() * rows) * blockSize
    foodY = Math.floor(Math.random() * cols) * blockSize
}

function update() {
    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize, blockSize)
    
    context.fillStyle = 'lime'
    snake_head_x += velocityX * blockSize
    snake_head_y += velocityY * blockSize
    context.fillRect(snake_head_x, snake_head_y, blockSize, blockSize)

    if(snake_head_x === foodX && snake_head_y === foodY) {
        genFood()
    }
}

function changeDirection(e) {
    if(e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0
        velocityY = -1
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0
        velocityY = 1
    } else if  (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1
        velocityY = 0
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1
        velocityY = 0
    }
}

window.onload = () => {
    board = document.getElementById("board")
    board.height = cols * blockSize
    board.width = rows * blockSize
    context = board.getContext("2d")
    genFood()
    
    document.addEventListener('keyup', changeDirection)
    setInterval(update, 1000/10)
}
