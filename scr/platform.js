function Platform (width, height, posx, posy, id) {
    this.self = document.createElement('div')
    this.self.setAttribute("id",id)
    this.self.style.top=posy
    this.self.style.left=posx
    this.self.style.width=width
    this.self.style.height=height
  }