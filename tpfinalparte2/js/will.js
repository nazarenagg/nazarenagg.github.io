class Personaje {
  constructor( posX , posY , imagen ) { 
    
    this.posX = posX;
    this.posY = posY;
    this.vidas = 10; 
    this.imagen = imagen;
    this.imagenDerecha = willder;
    this.imagenIzquierda = willizq;
    this.balasImagenes = [ candyvioleta , candyverde , candyamarillo ];
    this.bala = new Bala( this.posX , this.posY , imagen );
}

  dibujar() { 

    if ( this.imagen ) {
      image( this.imagen , this.posX , this.posY , 60 , 160 );
    this.bala.dibujar();

//dibujo del rectangulo que contabiliza las vidas-------------------------------------
    textSize( 18 );
    rectMode( CENTER );
    fill( 0 );
    push();
    strokeWeight( 1 );
    stroke( 255 );
    rect( 50 , 30 , 80 , 30 );
    pop();
    fill( 255 );
    text( "Vidas: " + this.vidas , 50 , 30 ); 
  }
}

  vidaPerdida(){
    this.vidas--;
}

  movizq(){
    this.posX -= 20;
}
  
  movderch(){
    this.posX += 20;
}
  
  Mover( keyCode ){
    if( keyCode === LEFT_ARROW ){
    this.movizq();
    this.imagen = this.imagenIzquierda;
    }
    else if( keyCode === RIGHT_ARROW ){
     this.imagen = this.imagenDerecha;
     this.movderch();
    }
    else if ( keyCode === ENTER ){
     this.seDisparaBala();
    }
}
  
//metodo que se ejecuta con el keypressed y dibuja a las balas + su metodo de movimiento-------------------------------------  
  seDisparaBala() {
    if( !this.bala.enDisparo ){
       let balaAleatoria = random( this.balasImagenes );
       this.bala.imagen = balaAleatoria;
       this.bala.disparar( this.posX + 20 , this.posY );
    } 
}

  haDisparadoBala() {
    return this.bala.enDisparo;
}
  
}//corchete de cierre de PERSONAJE---------------------------------------------------------------------------------------------------
