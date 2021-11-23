function Player (width, height, posx, posy) {
    this.self = document.createElement('div')
    this.self.setAttribute('id','player')
    this.self.style.bottom=posy + 'px'
    this.self.style.left=posx + 'px'
    this.self.style.width=width + 'px'
    this.self.style.height=height + 'px'
    this.direction = 0
    this.hor = posx
    this.vert = posy
    this.speedx = 0
    this.speedy = 0
    this.isJumping = false

    this.move = function () {
        this.vert -= 0.6 * this.vert
        this.self.style.bottom = this.vert + 'px'
        if (this.hor >= 0 && this.hor <= 780) {
            this.hor += 2 * this.direction
            this.self.style.left = this.hor + 'px'
        }
    }

    this.jump = function() {
    
    }
}







  