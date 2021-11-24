function Player(width, height, posx, posy) {
  this.self = document.createElement('div')
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
  this.speedX = 0
  this.speedY = 10
  this.directionY = 1
  this.jumping = false

  this.moveX = function () {
    if (this.hor >= 0 && this.hor <= 780) {
      this.hor += 5 * this.direction
      this.self.style.left = this.hor + 'px'
    }
  }

  this.moveY = function (platform) {
    if(!this.collideBottom(platform)) {
      this.vert += this.directionY * this.speedY        
      this.self.style.top = this.vert + 'px'
    }
//posición y - velocidad vertical
//veloc vertical + gravedad
  }

  this.jump = function () {

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







