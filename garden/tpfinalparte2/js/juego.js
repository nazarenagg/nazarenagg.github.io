class Juego {
  constructor( will , imagenesEnemigos) {
    
    this.imagenesEnemigos = imagenesEnemigos;
    this.crearPersonaje( will );
    this.enemigos = []; 
    this.intervaloEnemigos = 80;
    this.contadorCuadros = 0; // para manejar el intervalo de enemigos
    this.tiempoTranscurrido = 0; 
    this.tiempoLimiteCuadros = 1500;
}

  dibujar() {
    this.personaje.dibujar(); 
      for ( let i = 0 ; i < this.enemigos.length ; i++ ) { // aumenta la cantidad de enemigos
        let enemigo = this.enemigos[ i ];
      enemigo.dibujar(); // dibuja al enemigo 
      enemigo.caer(); // hace caer al enemigo 
      if ( enemigo.posY > height ) { 
        enemigo.reiniciar();
  }
}
    this.controlarColisiones(); // colisión por cuerpo 
    this.controlarDisparosAEnemigos(); // disparos a enemigos

//dibuja el rectangulo que contiene el contador--------------------------------------------
    rectMode(CENTER); 
    fill( 0 );
    push();
    strokeWeight( 3 );
    stroke( 255 );
    rect( 560, 30, 120, 30 );
    pop();
    fill( 255 );
    textSize( 18 );
    text( "Tiempo: " + this.tiempoTranscurrido , 560 , 30 );
}

  crearEnemigosContinuamente() {
    this.contadorCuadros++; 
      if ( this.contadorCuadros >= this.intervaloEnemigos ) { //cada 80 cuadros genera un enemigo
        let posX = random( 0 , width - 50 );
        let imagenEnemigo = random( this.imagenesEnemigos );
        this.enemigos.push( new Enemigo( posX , 0 , imagenEnemigo )); // posición en donde debe generarse el enemigo 
        this.contadorCuadros = 0;
    }
  }
  
//metodo para colisiones por cuerpo ------------------------------------------------------
  controlarColisiones() {
    for ( let i = 0 ; i < this.enemigos.length ; i++ ) { // ciclo for para que aumente la cantidad de enemigos 
      let enemigo = this.enemigos[i];
     if ( enemigo.vida && this.colisionaConPersonaje( enemigo )) { // colisión entre el enemigo y el personaje principal 
        this.personaje.vidaPerdida();
        enemigo.matar(); // hace desaparecer al enemigo 
       if ( this.personaje.vidas <= 0 ) { 
          principal.estado = 3 //pantalla de perder 
      }
    }
  }
}
//metodo que verifica la colision por cuerpo-----------------------------------------
  colisionaConPersonaje(enemigo) { // los personajes son representados por cuadrados de 50x50 píxeles
    return (
      enemigo.posX < this.personaje.posX + 50 &&
      enemigo.posX + 50 > this.personaje.posX &&
      enemigo.posY < this.personaje.posY + 50 &&
      enemigo.posY + 50 > this.personaje.posY
      );
}

  crearPersonaje(imagen) {
    this.personaje = new Personaje( width / 2 , 300 , imagen );
}

  mover(keyCode) {
    if (this.personaje) {
      this.personaje.Mover(keyCode);
  }
}

//metodo de control del tiempo--------------------------------------------------------
  actualizarTiempo() {
    this.tiempoTranscurrido++; 
    if ( this.tiempoTranscurrido >= this.tiempoLimiteCuadros ) { // tiempo llega a su límite 
        principal.estado = 5; //pantalla de ganar 
   }
}

  reiniciarJuego() {
    this.estado = 1; 
    this.tiempoTranscurrido = 0; 
    this.enemigos = []; 
    this.contadorCuadros = 0; 
    this.personaje.vidas = 10; 
    this.personaje = new Personaje( width / 2 , 300 , this.personaje.imagen ); 
    this.temporizador = null; // detiene el tiempo
}

  controlarDisparosAEnemigos() {
    if ( this.personaje.haDisparadoBala() ) { // reinicia bala 
      for ( let i = 0; i < this.enemigos.length; i++ ) { // ciclo for para aumentar la cantidad de enemigos 
      let enemigo = this.enemigos[ i ];
      enemigo.haTocadoLaBala ( this.personaje.bala ); 
      }
    }
  }
  
}//corchete de cierre de JUEGO---------------------------------------------------------------------------------------------------
