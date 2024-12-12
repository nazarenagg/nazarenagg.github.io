class Bala {
  constructor( posX , posY , imagen ) {
    
     this.posX = posX;
     this.posY = posY;
     this.enDisparo = false;
     this.imagen = imagen;  
}

  dibujar() {
    if( this.enDisparo ){
      image( this.imagen , this.posX , this.posY , 50 , 50 );
    this.mover();
  }
}

//metodo que mueve la bala hacia arriba y la resetea si cumple las condiciones--------------------------
  mover() {
      this.posY -= 10; 
    if ( this.posY < 0 ) {
      this.reset(); 
  }
}
  
  disparar( posX , posY ) {
    this.posX = posX;
    this.posY = posY;
    this.enDisparo = true;
}
  
  reset() {
    this.enDisparo = false;
    this.posY = -10; 
  }
}//corchete de cierre de BALA---------------------------------------------------------------------------------------------------
