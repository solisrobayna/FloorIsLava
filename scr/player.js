function Player(width, height, posx, posy) {
  this.self = document.createElement('div')
  var self = this.self
  this.self.setAttribute('id', 'player')
  this.self.style.top = posy + 'px'
  this.self.style.left = posx + 'px'
  this.self.style.width = width + 'px'
  this.self.style.height = height + 'px'
  this.direction = 0
  this.hor = posx
  this.vert = posy
  this.height = height
  this.wide = width
  this.speedX = 3  // velocidad horizontal para el salto
  this.speedY = 40
  this.directionY = 1
  this.jumping = false

  this.moveX = function () {
    if (this.hor >= 0 && this.hor <= 780) {
      this.hor += 5 * this.direction
      if(this.direction != 0) {
        this.self.style.transform = `scaleX(${this.direction})`
      }
      this.self.style.left = this.hor + 'px'
    }
  }

  this.moveY = function (platform) {
    if (this.jumping && this.speedY >= 0.15) {
      this.vert -= this.speedY
      this.hor += this.speedX*this.direction  //para que coja impulso hacia la dirección a la que camina
      this.speedY -= this.speedY*0.55
      this.self.style.top = this.vert + 'px'
      this.self.style.left = this.hor + 'px'
    } else {
      if (!this.collideBottom(platform)) {
        this.vert += this.directionY * 20
        this.self.style.top = this.vert + 'px'
      } else {
        this.speedY = 40
        this.jumping = false
      }
    }
  }

  this.attack = function () {
    this.self.style.background = 'url(assets/sprites/Punk_attack1.png) 100px 0px'
    setTimeout(function (self) {
      self.style.background = 'url(assets/sprites/Punk_idle.png)'
    },1000)
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

}







