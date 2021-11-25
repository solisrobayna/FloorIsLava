function Platform (width, height, posx, posy, id) {
  this.sprite = document.createElement('div')
  this.sprite.setAttribute("id",'platform')
  this.sprite.style.top=posy + 'px'
  this.sprite.style.left=posx + 'px'
  this.sprite.style.width=width + 'px'
  this.sprite.style.height=height + 'px'
  this.vert = posy;
  this.hor = posx
  this.width = width
  this.tall = height
}