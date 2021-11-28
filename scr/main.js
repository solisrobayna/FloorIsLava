var startButton = document.getElementById('game-start')


startButton.addEventListener('click', startGame)

function clearScreen () {
    var board = document.getElementById('main')
    var childs = document.querySelectorAll('#main > *')
    for (let i = 0; i < childs.length; i++) {
        board.removeChild(childs[i])
    }
}

function gameOver(winner) {
    window.alert(`player ${winner} wins`)
}
function startGame () {
    clearScreen()
    var parent = document.getElementById('main')
    parent.style.background = 'url(../assets/graphics/scifi.gif)'
    parent.style.backgroundSize = 'contain'
    parent.style.backgroundRepeat = 'no-repeat'
    var lives1 = document.createElement('div')
    var lives2 = document.createElement('div')
    lives1.setAttribute('id','life-container1')
    lives2.setAttribute('id' ,'life-container2')
    lives1.innerHTML = '<div class=life1></div><div class=life1></div><div class=life1></div>'
    lives2.innerHTML = '<div class=life2></div><div class=life2></div><div class=life2></div>'
    var plat1 = new Platform (500,75,150,300)
    var player1 = new Player(20, 35, 350, 265, 1)
    var player2 = new Player(20, 35, 450, 265, 2)
    var lava = new Lava (800, 100, 0, 500)
    var livesArray1 = document.getElementsByClassName('life1')
    var livesArray2 = document.getElementsByClassName('life2')
    parent.appendChild(lives2)
    parent.appendChild(lives1)
    parent.appendChild(plat1.sprite)
    parent.appendChild(player1.sprite)
    parent.appendChild(player2.sprite)
    parent.appendChild(lava.sprite)

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
            case 'Enter':
                player1.attack (player2)
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
          case 'w':
              if (!player2.jumping) {
                  player2.jumping = true
              }
              break
            case 's':
                player2.attack(player1)
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
        player1.moveX(player2, plat1)
        player1.moveY(plat1, player2)
        if (!player1.jumping) {
            player1.walkSprite()
        }
        player2.moveX(player1, plat1)
        player2.moveY(plat1, player1)
        if (!player2.jumping) {
            player2.walkSprite()
        }  
        player2.moveHit(player1)
        player1.moveHit(player2)
        player1.lookAt(player2)
        player2.lookAt(player1)
        lava.grow()
        var timerPlat = setTimeout (plat1.reduce,10000)
       if (player1.collideLava(600 - lava.height)) {
            player1.hor = 350 
            player1.sprite.style.left = 350 + 'px'
            player1.sprite.style.top = 170 + 'px'
            player1.vert = 170
            player1.lives -= 1
            lives1.removeChild(livesArray1[0])
        }
        if (player2.collideLava(600 - lava.height)) {
        player2.hor = 450
        player2.sprite.style.left = 450 + 'px'
        player2.sprite.style.top = 170 + 'px'
        player2.vert = 170
        player2.lives -= 1
        lives2.removeChild(livesArray2[0])
        }

        if (player1.isDead()) {
            clearInterval(timerId)
            clearTimeout(timerPlat)
            gameOver(player2.playernum) 
        }
        if (player2.isDead()) {
            clearInterval(timerId)
            clearTimeout(timerPlat)
            gameOver(player1.playernum) 
        }
    },50)

    
}