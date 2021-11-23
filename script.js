var startButton = document.getElementById('game-start')

startButton.addEventListener('click', clearScreen)

function clearScreen () {
    var board = document.getElementById('container')
    var childs = document.querySelectorAll('#container > *')
    for (let i = 0; i < childs.length; i++) {
        board.removeChild(childs[i])
    }
    
}


