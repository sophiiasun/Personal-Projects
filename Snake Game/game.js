// GAME

let lastRenderTime = 0
let gameOver = false
let SNAKE_LENGTH = 1
let SCORE = 0
const SNAKE_SPEED = 5 // two moves per second
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
	alert("game start")
	if (gameOver) {
		if (confirm("You Lost! Your score was " + SCORE + ". Press 'ok' to restart.")) {
			window.location = 'file:///Users/sophiasun/GitHub/Personal-Projects/Snake%20Game/main.html'
		}
		return
	}
	window.requestAnimationFrame(main)
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
	if (secondsSinceLastRender < 1/SNAKE_SPEED) return
	lastRenderTime = currentTime
	update()
	draw()
}

window.requestAnimationFrame(main)

function update() {
	updateSnake()
	updateFood()
	checkDeath()
}

function draw() {
	gameBoard.innerHTML = ''
	drawSnake()
	drawFood()
}

function checkDeath() {
	gameOver = outsideGrid(snakeBody[0]) || snakeIntersection()
}

// SNAKE

const snakeBody = [{x: 11, y: 11}]

function updateSnake() {
	getInputDirection() 
	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = {...snakeBody[i]}
	}
	snakeBody[0].x += inputDirection.x
	snakeBody[0].y += inputDirection.y
}

function drawSnake() {
	snakeBody.forEach(segment => {
		const snakeElement = document.createElement('div')
		snakeElement.style.gridRowStart = segment.y
		snakeElement.style.gridColumnStart = segment.x
		snakeElement.classList.add('snake')
		gameBoard.appendChild(snakeElement)
	})
}

function onSnake(position, ignoreHead) {
	return snakeBody.some((segment, index) => {
		return segment.x === position.x && segment.y === position.y
	})
}

function addSegment() {
	snakeBody.push({...snakeBody[snakeBody.length-1]})
	SNAKE_LENGTH++
}

function snakeIntersection() {
	if (SNAKE_LENGTH <= 4) return
	var touchCounter = 0
	snakeBody.forEach(segment => {
		if (segment.x === snakeBody[0].x && segment.y === snakeBody[0].y) touchCounter++
	})
	return touchCounter >= 2
}

// INPUT

let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x: 0, y: 0}

window.addEventListener('keydown', e => {
	switch(e.key) {
		case 'ArrowUp':
			if (lastInputDirection.y !== 0) break
			inputDirection = {x: 0, y: -1}
			break;
		case 'ArrowDown':
			if (lastInputDirection.y !== 0) break
			inputDirection = {x: 0, y: 1}
			break;
		case 'ArrowLeft':
			if (lastInputDirection.x !== 0) break
			inputDirection = {x: -1, y: 0}
			break;
		case 'ArrowRight':
			if (lastInputDirection.x !== 0) break
			inputDirection = {x: 1, y: 0}
			break;
	}
})

function getInputDirection() {
	lastInputDirection = inputDirection
	return inputDirection
}

// FOOD

let food = {x: 5, y: 5}

function updateFood() {
	if (onSnake(food, false)) {
		addSegment()
		food = getRandomFoodPosition()
		SCORE++
	}
}

function drawFood() {
	const foodElement = document.createElement('div')
	foodElement.style.gridRowStart = food.y
	foodElement.style.gridColumnStart = food.x
	foodElement.classList.add('food')
	gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
	let newFoodPosition
	while (newFoodPosition == null || onSnake(newFoodPosition, false)) {
		newFoodPosition = randomGridPosition()
	}
	return newFoodPosition
}

// GRID

const GRID_SIZE = 21

function randomGridPosition() {
	return {
		x: Math.floor(Math.random() * GRID_SIZE) + 1,
		y: Math.floor(Math.random() * GRID_SIZE) + 1
	}
}

function outsideGrid(position) {
	return position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE
}