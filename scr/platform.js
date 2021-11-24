function Platform (width, height, posx, posy, id) {
  this.self = document.createElement('div')
  this.self.setAttribute("id",'platform')
  this.self.style.top=posy + 'px'
  this.self.style.left=posx + 'px'
  this.self.style.width=width + 'px'
  this.self.style.height=height + 'px'
  this.vert = posy;
  this.hor = posx
  this.width = width
  this.tall = height
}