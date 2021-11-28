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
  this.width = width
  this.speedX = 0
  this.speedHit = 25
  this.speedY = 40
  this.directionY = 1
  this.jumping = false
  this.attacking = false
  this.punched = false
  this.falling = false
  this.playernum = playernum

  this.moveX = function (enemy, platform) {
    if (this.hor >= 0 && this.hor <= 780 && !this.falling) {
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
      this.speedY -= this.speedY * 0.6
      this.width = 25
      this.sprite.style.top = this.vert + 'px'
      this.sprite.style.width = this.width + 'px'
      this.jumpSprite(enemy)
    } else {
      if (!this.collideBottom(platform)) {
        this.vert += this.directionY * 20
        this.sprite.style.top = this.vert + 'px'
      } 
      else {
        if (!this.attacking) {
          this.loadNormalSprite (enemy)
        this.speedY = 40
        this.jumping = false
        this.vert = platform.vert - this.height
        this.sprite.style.top = this.vert + 'px'
        this.width = 20
        this.sprite.style.width = this.width + 'px'
        } 
      }
    }
  }


  this.bump = function (enemy) {
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
      this.hor + this.width >= platform.hor) {
      this.falling = false
      return true
    }
    if (!this.jumping) {
      this.falling = true
    }
    return false
  }

  this.collidePlayers = function (enemy) {
    if (this.hor <= enemy.hor + enemy.width &&
      this.hor + this.width >= enemy.hor &&
      this.vert <= enemy.vert + enemy.height &&
      this.vert + this.height >= enemy.vert) {
      return true
    }
    return false
  }

  this.attack = function (enemy) {
    this.attacking = true
    this.loadAttackSprite(enemy)
    this.width = 30
    this.sprite.style.width = this.width + 'px'
    if (this.collidePlayers(enemy)) {
      enemy.punched = true
    }
    let timerId = setTimeout(function () {
      self.width = 20
      self.sprite.style.width = self.width + 'px'
      self.loadAfterAttack(enemy)
      self.attacking = false
    }, 500)
  }

  this.loadAfterAttack = function (enemy) {
    if (this.lookAt (enemy) === 'right') {
      if (this.playernum === 1) {
        this.sprite.style.background = 'url(../assets/graphics/player1/BIKERWALKRIGHT1.png) no-repeat'
      } else {
        this.sprite.style.background = 'url(../assets/graphics/player2/PUNKWALKRIGHT1.png) no-repeat'
      }   
    } else {
      if (this.playernum === 1) {
        this.sprite.style.background = 'url(../assets/graphics/player1/BIKERWALKLEFT1.png) ssno-repeat'
        this.hor += 10
        this.sprite.style.left = this.hor + 'px'
      } else {
        this.sprite.style.background = 'url(../assets/graphics/player2/PUNKWALKLEFT1.png) no-repeat'
        this.hor += 10
        this.sprite.style.left = this.hor + 'px'
      }   
    }
  }

  this.lookAt = function (enemy) {
   if( this.hor <= enemy.hor) {
     return 'right'
   } else {
     return 'left'
   }
  }
  
  this.loadNormalSprite = function (enemy) {
    if (this.lookAt (enemy) === 'right') {
      if (this.playernum === 1) {
        this.sprite.style.background = 'url(../assets/graphics/player1/BIKERWALKRIGHT1.png) no-repeat'
      } else {
        this.sprite.style.background = 'url(../assets/graphics/player2/PUNKWALKRIGHT1.png) no-repeat'
      }   
    } else {
      if (this.playernum === 1) {
        this.sprite.style.background = 'url(../assets/graphics/player1/BIKERWALKLEFT1.png) no-repeat'
      } else {
        this.sprite.style.background = 'url(../assets/graphics/player2/PUNKWALKLEFT1.png) no-repeat'
      }
    }
  }

  this.loadAttackSprite = function (enemy) {
    if (this.lookAt(enemy) === 'right') {
      if (this.playernum === 1) {
        this.sprite.style.background = 'url(../assets/graphics/player1/BIKERPUNCHRIGHT.png)no-repeat'
      } else {
        this.sprite.style.background = 'url(../assets/graphics/player2/PUNKPUNCHRIGHT.png) no-repeat'
      }
    } else {
      if (this.playernum === 1) {
        this.sprite.style.background = 'url(../assets/graphics/player1/BIKERPUNCHLEFT.png) no-repeat'
        this.hor -= 10
        this.sprite.style.left = this.hor + 'px'
      } else {
        this.sprite.style.background = 'url(../assets/graphics/player2/PUNKPUNCHLEFT.png) no-repeat'
        this.hor -= 10
        this.sprite.style.left = this.hor + 'px'
      }
    }
  }
  
 /* this.changewidth = function (enemy) {
    if ( this.hor <= enemy.hor) {
      return 30
    } else { 
      return 30
    }
  }*/

  this.walkSprite = function () {
    if (this.direction === 1) {
      if (this.playernum === 1) {
        this.sprite.style.background = 'url(../assets/graphics/player1/BIKERWALKRIGHT1.png) no-repeat'
      } else {
        this.sprite.style.background = 'url(../assets/graphics/player2/PUNKWALKRIGHT1.png) no-repeat'
      } 
    } else if (this.direction === -1) {
      if (this.playernum === 1) {
         this.sprite.style.background = 'url(../assets/graphics/player1/BIKERWALKLEFT1.png) no-repeat'
        } else {
          this.sprite.style.background = 'url(../assets/graphics/player2/PUNKWALKLEFT1.png) no-repeat'
        }
    }
  }

  this.jumpSprite = function (enemy) {
    if (this.hor <= enemy.hor) {
      if (this.playernum === 1) {
        this.sprite.style.background = 'url(../assets/graphics/player1/BIKERJUMPRIGHT1.png) no-repeat'
      } else {
        this.sprite.style.background = 'url(../assets/graphics/player2/PUNKJUMPRIGHT1.png) no-repeat'
      }
    } else {
      if (this.playernum === 1) {
        this.sprite.style.background = 'url(../assets/graphics/player1/BIKERJUMPLEFT1.png) no-repeat'
      } else {
        this.sprite.style.background = 'url(../assets/graphics/player2/PUNKJUMPLEFT1.png) no-repeat'
      }
    }
  }

  this.moveHit = function (enemy) {
    if ( this.lookAt (enemy) === 'left') {
      if (this.punched && this.speedHit >= 0.15) {
        this.hor += this.speedHit
        this.speedHit -= this.speedHit * 0.6
        this.sprite.style.left = this.hor + 'px'
      } else {
        this.punched = false
        this.speedHit = 25
      }
    } else {
      if (this.punched && this.speedHit >= 0.15) {
        this.hor -= this.speedHit
        this.speedHit -= this.speedHit * 0.6
        this.sprite.style.left = this.hor + 'px'
      } else {
        this.punched = false
        this.speedHit = 25
      }
    }
  }
}