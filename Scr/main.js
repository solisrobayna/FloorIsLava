var startButton = document.getElementById('game-start')

startButton.addEventListener('click', clearScreen)

function clearScreen () {
    var board = document.getElementById('main')
    var childs = document.querySelectorAll('#main > *')
    for (let i = 0; i < childs.length; i++) {
        board.removeChild(childs[i])
    }
  
var parent = document.getElementById('main')

var plat1 = new Platform ('200px','75px','0px','425px','platform')
var plat2 = new Platform ('75px','150px','300px','350px','platform')
var plat3 = new Platform ('75px','250px','500px','250px','platform')
var plat4 = new Platform ('75px','350px','650px','150px','platform')
var player = new Player(20, 20, 50, 405)

parent.appendChild(plat1.self)
parent.appendChild(plat2.self)
parent.appendChild(plat3.self)
parent.appendChild(plat4.self)
parent.appendChild(player.self)

window.addEventListener('keydown',function(e) {
    switch(e.key) {
        case 'ArrowRight':
            player.direction = 1
            Player.move(player)
            break
        case 'ArrowLeft':
            player.direction = -1
            Player.move(player)
            break
    }
  })
}


