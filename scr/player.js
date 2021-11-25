function Player(width, height, posx, posy) {
  var self = this
  this.sprite = document.createElement('div')
  this.sprite.setAttribute('id', 'player')
  this.sprite.style.top = posy + 'px'
  this.sprite.style.left = posx + 'px'
  this.sprite.style.width = width + 'px'
  this.sprite.style.height = height + 'px'
  this.direction = 0
  this.hor = posx
  this.vert = posy
  this.height = height
  this.wide = width
  this.speedX = 0
  this.speedHit = 0
  this.speedY = 40
  this.directionY = 1
  this.jumping = false
  

  this.moveX = function (enemy) {
    if (this.hor >= 0 && this.hor <= 780) {
      this.hor += 5 * this.direction
      this.sprite.style.left = this.hor + 'px'
      this.collidePlayers(enemy)
      if (this.collidePlayers(enemy)) {
        this.bump(enemy)
      }
    }
  }

  this.moveY = function (platform, enemy) {
    if (this.jumping && this.speedY >= 0.15) {
      this.vert -= this.speedY
      this.speedY -= this.speedY*0.6
      this.sprite.style.top = this.vert + 'px'
    } else {
      if (!this.collideBottom(platform)) {
        this.vert += this.directionY * 20
        this.sprite.style.top = this.vert + 'px'
       } /* else if (this.collidePlayers(enemy)) {
        this.speedY = 40
        this.jumping = false
        this.vert = enemy.vert - this.height
        this.sprite.style.top = this.vert + 'px'
      }  */
      else {
        this.speedY = 40
        this.jumping = false
        this.vert = platform.vert - this.height
        this.sprite.style.top = this.vert + 'px'
      }
    }
  }

  this.bump = function(enemy) {
    this.hor += 5 * this.direction * -1
    this.sprite.style.left = this.hor + 'px'
    enemy.hor += 5 * this.direction 
    enemy.sprite.style.left = enemy.hor + 'px'
  }

  

  this.collideLava = function (lava) {
    if (this.vert + this.height >= lava) {
      return true
    }
    return false
  }

  this.collideBottom = function (platform) {
    if (this.vert + this.height >= platform.vert &&
        this.hor <= platform.hor + platform.width &&
        this.hor + this.wide >= platform.hor) {
      return true
    }
    return false
  }


  this.collidePlayers = function (enemy) {
    if (this.hor <= enemy.hor + enemy.wide &&
      this.hor + this.wide >= enemy.hor &&
      this.vert <= enemy.vert + enemy.height &&
      this.vert + this.height >= enemy.vert) {
       return true
    }
    return false
  }

  this.attack = function (enemy) {
    this.sprite.style.width = 60 + 'px'
    this.sprite.style.background = 'url(../assets/graphics/PLAYER1FIGHT.png)'
    this.punchEnemy(enemy)
    let timerId = setTimeout (function () {
      self.sprite.style.width = 20 + 'px'
    }, 500)
  }

  this.punchEnemy = function (enemy) {
      enemy.speedHit = 40
      enemy.hor += enemy.speedHit
      enemy.speedHit -= enemy.speedHit * 0.6 
      enemy.sprite.style.left = enemy.hor + 'px'
    
  }
    
}







