let board;
let context;
let gameOver;
const rows = 18;
const cols = 18;
const blockSize = 25;
const modelStart = document.getElementById("Start");
const scoreContainer = document.getElementById("Score")
let score = 0;

// initial speed of the snake
let velocityX = 0;
let velocityY = 0;

// snake head
let snake_head_x = blockSize * 10;
let snake_head_y = blockSize * 10;

// snake body
let snakeBody = [];

// Food
let foodX;
let foodY;

// Generate food randomly on the canvas
function genFood() {
  foodX = Math.floor(Math.random() * rows) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
}

// Draw/update canvas on each call.
function update() {
    scoreContainer.innerHTML = `<p class="text-[17px] text-white font-medium">${score}</p>`
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  // draw food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);
  if (gameOver) {
    return;
  }

  // move body forward with head
  for (let i = snakeBody.length - 1; i >= 0; i--) {
    if (i === 0) {
      snakeBody[i] = { x: snake_head_x, y: snake_head_y };
    } else {
      snakeBody[i] = { ...snakeBody[i - 1] };
    }
  }

  // draw snake head
  context.fillStyle = "lime";
  snake_head_x += velocityX * blockSize;
  snake_head_y += velocityY * blockSize;
  context.fillRect(snake_head_x, snake_head_y, blockSize, blockSize);

  // draw snake body
  snakeBody.forEach((segment) => {
    context.fillRect(segment.x, segment.y, blockSize, blockSize);
  });

  // check collision with bounds
  if (
    snake_head_x < 0 ||
    snake_head_x > cols * blockSize - 1 ||
    snake_head_y < 0 ||
    snake_head_y > rows * blockSize - 1
  ) {
    gameOver = true;
    modelStart.style.visibility = "visible";
    modelStart.innerHTML =
      '<p class="text-white  text-[20px]">Game Over! Play again?</p>';
  }

  // check collision with self
  for (let i = 0; i < snakeBody.length; i++) {
    if (snake_head_x === snakeBody[i].x && snake_head_y === snakeBody[i].y) {
      gameOver = true;
      modelStart.style.visibility = "visible";
      modelStart.innerHTML =
        '<p class="text-white  text-[20px]">Game Over! Play again?</p>';
    }
  }

  // check if consumed food
  if (snake_head_x === foodX && snake_head_y === foodY) {
    snakeBody.push({ x: foodX, y: foodY });
    score += Math.floor(Math.random() * 10)
    genFood();
  }
}

// On key event, change direction accordingly
function changeDirection(e) {
  console.log(e);
  if (e.code === "ArrowUp" && velocityY !== 1) {
    if (!gameOver) {
      modelStart.style.visibility = "hidden";
    }
    velocityX = 0;
    velocityY = -1;
  } else if (e.code === "ArrowDown" && velocityY !== -1) {
    if (!gameOver) {
      modelStart.style.visibility = "hidden";
    }
    velocityX = 0;
    velocityY = 1;
  } else if (e.code === "ArrowLeft" && velocityX !== 1) {
    if (!gameOver) {
      modelStart.style.visibility = "hidden";
    }
    velocityX = -1;
    velocityY = 0;
  } else if (e.code === "ArrowRight" && velocityX !== -1) {
    if (!gameOver) {
      modelStart.style.visibility = "hidden";
    }
    velocityX = 1;
    velocityY = 0;
  } else if (e.type === "click") {
    if (!gameOver) {
      modelStart.style.visibility = "hidden";
    }
    velocityX = 1;
    velocityY = 0;
  }
}

window.onload = () => {
  board = document.getElementById("board");
  board.height = cols * blockSize;
  board.width = rows * blockSize;
  context = board.getContext("2d");
  genFood();

  if (!gameOver) {
    document.addEventListener("keyup", changeDirection);
    modelStart.addEventListener("click", changeDirection);
  }
  setInterval(update, 1000 / 10);
};
