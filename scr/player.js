function Player(width, height, posx, posy, playernum) {
  var self = this
  this.sprite = document.createElement('div')
  this.sprite.setAttribute('id', `player${playernum}`)
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
  this.speedHit = 25
  this.speedY = 40
  this.directionY = 1
  this.jumping = false
  this.punched = false
  this.playernum = playernum

  this.moveX = function (enemy) {
    if (this.hor >= 0 && this.hor <= 780) {
      this.hor += 5 * this.direction
      this.sprite.style.left = this.hor + 'px'
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
      this.jumpSprite(enemy)
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
        this.loadAfterAttack(enemy)
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
    this.wide = 60
    this.sprite.style.width = this.wide + 'px'
    this.loadAttackSprite(enemy)
    if (this.collidePlayers(enemy)) {
      enemy.punched = true
    }
    let timerId = setTimeout (function () {
      self.wide = 50
      self.sprite.style.width = self.wide + 'px'
      self.loadAfterAttack(enemy)
    }, 500)
  }

this.loadAfterAttack = function(enemy) {
  if (this.hor <= enemy.hor) {
    if (this.playernum === 1) {
      this.sprite.style.background = 'url(../assets/graphics/JUG3CAMINA1.png)'
    } else {
      this.sprite.style.background = 'url(../assets/graphics/JUG4CAMINA1.png)'
    }
  } else {
    if (this.playernum === 1) {
      this.sprite.style.background = 'url(../assets/graphics/JUG5CAMINA1.png)'
    } else {
      this.sprite.style.background = 'url(../assets/graphics/JUG4CAMINA1.png)'
    }
  }
}


this.loadAttackSprite = function(enemy) {
  if (this.hor <= enemy.hor) {
    if (this.playernum === 1) {
      this.sprite.style.background = 'url(../assets/graphics/JUG3PUNCH.png)'
    }  else {
      this.sprite.style.background = 'url(../assets/graphics/JUG6PUNCH.png)'
    }
  } else {
    if (this.playernum === 1) {
      this.sprite.style.background = 'url(../assets/graphics/JUG4PUNCH.png)'
    } else {
      this.sprite.style.background = 'url(../assets/graphics/JUG4PUNCH.png)'
    }
  }
}

this.walkSprite = function() {
  if (this.direction === 1) {
    this.sprite.style.background = 'url(../assets/graphics/JUG3CAMINA1.png)'
  } else if (this.direction === -1) {
    this.sprite.style.background = 'url(../assets/graphics/JUG4CAMINA1.png)'
  }
}

this.jumpSprite = function(enemy) {
  if (this.hor <= enemy.hor) {
    if (this.playernum === 1) {
      this.sprite.style.background = 'url(../assets/graphics/JUG3SALTO1.png)'
    } else {
      this.sprite.style.background = 'url(../assets/graphics/JUG3SALTO2.png)'
    }
  } else {
    if (this.playernum === 1) {
      this.sprite.style.background = 'url(../assets/graphics/JUG4SALTO.png)'
    } else {
      this.sprite.style.background = 'url(../assets/graphics/JUG4CAIDA.png)'
    }
  }
}
  
  this.moveHit = function () {
    if (this.punched && this.speedHit >= 0.15) {
      this.hor += this.speedHit
      this.speedHit -= this.speedHit*0.6
      this.sprite.style.left = this.hor + 'px'
    } else {
      this.punched = false
      this.speedHit = 25
    } 
  }

}
