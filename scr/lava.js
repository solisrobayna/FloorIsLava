function Lava (width, height, posx, posy) {
    this.self = document.createElement('div')
    this.self.setAttribute("id", 'lava')
    this.self.style.bottom='0px'
    this.self.style.left=posx + 'px'
    this.self.style.width=width + 'px'
    this.self.style.height=height + 'px'
    this.height = height
    
    this.grow = function () {
      if (this.height >= 0 && this.height <= 600) {
        this.height += 0.5
        this.self.style.height = this.height + 'px'
      }
    }
  }