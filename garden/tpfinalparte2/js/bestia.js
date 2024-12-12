class Enemigo {
  constructor( posX , posY , imagen ) {
    
    this.posX = posX;
    this.posY = posY;
    this.vida = true;
    this.velocidad = 5;
    this.imagen = imagen;
}

  dibujar() {
    if ( this.vida ) {
      image( this.imagen , this.posX , this.posY , 50 , 50 ); // dibuja enemigo
    }
}

  caer() {
    this.posY += this.velocidad;
}

  matar() {
    this.vida = false; 
}

//resetea valores pocision aleatoria, vuelve a generar enemigos aleatorios a lo largo del ancho de la ventana----------------------
  reiniciar() {
    this.posX = random( 0 , width - 40 ); 
    this.posY =- 40; 
    this.vida = true; 
}

//metodo que se ejecuta cuando el enemigo hace contacto con bala y resetea su valor-----------------------------------------------
  haTocadoLaBala( bala ) {
    if ( this.vida && dist( this.posX , this.posY , bala.posX , bala.posY ) < 25) { 
      this.matar(); 
      bala.reset();
    }
  }
}//corchete de cierre de ENEMIGO---------------------------------------------------------------------------------------------------
