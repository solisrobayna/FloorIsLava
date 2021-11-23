function Player (width, height, posx, posy) {
    this.self = document.createElement('div')
    this.self.setAttribute('id','player')
    this.self.style.top=posy + 'px'
    this.self.style.left=posx + 'px'
    this.self.style.width=width + 'px'
    this.self.style.height=height + 'px'
    this.direction = 0
    this.pos = posx
}

Player.move = function (player) {
    player.pos += 2*player.direction
    if (player.pos >= 0 && player.pos <= 780) {
            player.self.style.left = player.pos + 'px'
        } else {
            player.pos -= 2*player.direction
        }
}



  