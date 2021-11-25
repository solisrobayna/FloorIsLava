var startButton = document.getElementById('game-start')

startButton.addEventListener('click', startGame)



function clearScreen () {
    var board = document.getElementById('main')
    var childs = document.querySelectorAll('#main > *')
    for (let i = 0; i < childs.length; i++) {
        board.removeChild(childs[i])
    }
}

function startGame () {
    clearScreen()
    var parent = document.getElementById('main')
    var plat1 = new Platform (200,75,300,300)
   /* var plat2 = new Platform ('75px','150px','300px','350px','platform')
    var plat3 = new Platform ('75px','250px','500px','250px','platform')
    var plat4 = new Platform ('75px','350px','650px','150px','platform')*/
    var player1 = new Player(20, 20, 350, 280)
    var player2 = new Player(20, 20, 450, 280)
    player2.self.style.background = 'yellow'
    var lava = new Lava (800, 100, 0, 500)
    parent.appendChild(plat1.self)
    /*parent.appendChild(plat2.self)
    parent.appendChild(plat3.self)
    parent.appendChild(plat4.self)*/
    parent.appendChild(player1.self)
    parent.appendChild(player2.self)
    parent.appendChild(lava.self)

    window.addEventListener('keydown',function(e) {
        switch(e.key) {
            case 'ArrowRight':
                player1.direction = 1
                break
            case 'ArrowLeft':
                player1.direction = -1
                break
            case 'ArrowUp':
                if(!player1.jumping) {
                    player1.jumping = true
                }
                break
        }
    })


    window.addEventListener('keydown', function(e){
      switch (e.key.toLowerCase()) {
          case 'd':
                player2.direction = 1
                break
            case 'a':
                player2.direction = -1
                break
      }
    }) 
  
  window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
        player1.direction = 0
    })

  window.addEventListener('keyup', function(e) {
    if (e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 'd')
        player2.direction = 0
    })
  
    var timerId = setInterval(function() {  
        player1.moveX(player2)
        player1.moveY(plat1)
        player2.moveX(player1)
        player2.moveY(plat1)
        lava.grow()
       if (player1.collideLava(600 - lava.height) ||
            player2.collideLava(600 - lava.height)) {
            clearInterval(timerId)
            window.alert('GAME OVER')
        }
        
    },50)

    
}
 

    

