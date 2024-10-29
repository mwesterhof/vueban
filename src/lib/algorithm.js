export function countLiberties(x, y, boardData, allyColor=null, seen=null) {
    const size = boardData.length

    if (x < 0 || x >= size) {
        return 0
    }

    if (y < 0 || y >= size) {
        return 0
    }

    const cell = boardData[y][x]
    if (allyColor === null) {
        allyColor = cell
    }
    if (seen === null) {
        seen = createEmptyBoard(size)
    }

    if (cell === null) {
        return 1
    }
    if (cell === !allyColor) {
        return 0
    }

    const coordinates = {
        x: x,
        y: y
    }

    if (seen[y][x]) {
        return 0
    }

    seen[y][x] = true

    return countLiberties(x-1, y, boardData, allyColor, seen) +
        countLiberties(x+1, y, boardData, allyColor, seen) +
        countLiberties(x, y-1, boardData, allyColor, seen) +
        countLiberties(x, y+1, boardData, allyColor, seen)
}

export function updateBoard(boardData, blackMoved) {
    const size = boardData.length
    const opponent = !blackMoved
    const deathNote = createEmptyBoard(size)
    var x, y
    var killed = 0

    for (y=0; y<size; y++) {
        for (x=0; x<size; x++) {

            if (boardData[y][x] === opponent) {
                if (countLiberties(x, y, boardData) === 0) {
                    deathNote[y][x] = true
                }
            }
        }
    }

    for (y=0; y<size; y++) {
        for (x=0; x<size; x++) {
            if (deathNote[y][x]) {
                boardData[y][x] = null
                killed++
            }
        }
    }

    return boardData, killed
}


export function createEmptyBoard(size, value=null) {
    var data = []
    
    for(var y=0; y<size; y++) {
        var line = []
        for (var x=0; x<size; x++) {
            line.push(value)
        }
        data.push(line)
    }

    return data
}
