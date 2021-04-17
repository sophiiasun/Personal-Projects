const GRID_SIZE = 30
const TOTAL_MINES_COUNT = 60
const boardElement = document.getElementById("game-board")
const MINE_POSITIONS = []

var tmpCounter= 0 

var gameboard = []
var bombsFound = 0

main()

function main(currentTime) {
	createGrid()
	createBombs()
}

// CLICKS

gameboard.forEach(row => {
	row.forEach(tile => {
		tile.buttonElement.addEventListener('mousedown', e => {
			if (tile.clickable == false)
				return
			switch (event.which) {
				case 1:
					revealTile(tile)
					break
				case 3: 
					markTile(tile)
					break
			}
		})
		boardElement.appendChild(tile.buttonElement)
	})	
})

// GRID

function createGrid() {
    for (var r = 0; r < GRID_SIZE; r++) {
    	let row = []
    	for (var c = 0; c < GRID_SIZE; c++) {
    		const buttonElement = document.createElement("button")
    		const type = 0, clickable = true
    		buttonElement.classList.add('button')
    		// buttonElement.dataset.status = 'hidden'
    		buttonElement.style.border = "outset"
    		buttonElement.id = r+"-"+c
    		buttonElement.gridRowStart = r
    		buttonElement.gridColumnStart = c
    		const tile = {
    			buttonElement, r, c, type, clickable,
    			get status() {
    				return this.buttonElement.dataset.status
    			},
    			set status (value) {
    				this.buttonElement.dataset.status = value
    			}
    		} 
    		row.push(tile)
    	}
    	gameboard.push(row)
    }
}

// CREATING BOMBS

function createBombs() {
	let counter = 0
	var row, col
	while (counter < TOTAL_MINES_COUNT) {
		row = Math.floor(Math.random()*30) 
		col = Math.floor(Math.random()*30)
		if (gameboard[row][col].type === 0) {
			gameboard[row][col].type = -1
			counter++
		}
	}
}

// REVEAL TILE (left click)

function revealTile(tile) {
	const button = tile.buttonElement
	tile.clickable = false
	alert(button.id)
	const newTile = document.createElement('div')
	newTile.gridRowStart = tile.r
	newTile.gridColumnStart = tile.c
	newTile.classList.add('tile')
	boardElement.replaceChild(newTile, button)
}

// MARK TILE (right click)

function markTile(tile) {
	const button = tile.buttonElement
	button.innerHTML = "?"
}
