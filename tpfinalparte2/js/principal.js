class Principal {
  constructor() {
     this.Juego = new Juego( willder, [thebeast] );
     this.pantalla = new Pantalla( fondo );
     this.estado = 1;
}

  dibujar() {
    if ( this.estado === 1 ) {
      this.pantalla.pantallaInicio(); 
}  
    else if (this.estado === 2) {
      background( fondo );
      this.Juego.crearEnemigosContinuamente(); // crea enemigos
      this.Juego.actualizarTiempo(); // límite de tiempo 
      this.Juego.dibujar();
}
    else if (this.estado === 3) { 
      this.pantalla.pantallaPerdiste(); 
} 
    else if (this.estado === 4) {  
      this.pantalla.pantallaCredito();
} 
    else if (this.estado === 5) { 
      this.pantalla.pantallaGanar(); 
}   
    else if (this.estado === 6) { 
      this.pantalla.pantallaInstrucciones(); 
}
    
}

//metodo para cambiar de pantalla segun mousepressed--------------------------------------------------------
  mousePresionado() {
    if ( this.estado === 1 ) {  
      if ( this.pantalla.boton.clicEnBoton() ) { 
        this.estado = 2; 
} 
    else if ( this.pantalla.botoncreditos.clicEnBoton() ) { 
        this.estado = 4; // pasa a la pantalla de créditos 
}   
    else if ( this.pantalla.botoninstruccion.clicEnBoton() ) {  
        this.estado = 6; // pasa a la pantalla de instrucciones
}
      
} 
    else if ( this.estado === 3 || this.estado === 5 ) { //pantalla de perder o ganar 
      if (this.pantalla.botoninicio.clicEnBoton()) { 
        this.reiniciarJuego();// pasa a la pantalla de inicio 
}
} 
    else if ( this.estado === 4 ) { 
      if ( this.pantalla.botoninicio.clicEnBoton() ) { 
        this.estado = 1; 
}
}
//    else if ( this.estado === 2 ) { 
//      if ( this.pantalla.botoninicio.clicEnBoton() ) {
//        this.estado = 1; 
//}
//}
      else if ( this.estado === 6 ) { 
      if ( this.pantalla.botoninicioins.clicEnBoton() ) { 
        this.estado = 1; 
}
}
}

  reiniciarJuego() {
    this.estado = 1; 
    this.Juego.reiniciarJuego(); // reinicia el juego completo
  }
}//corchete de cierre de PRINCIPAL---------------------------------------------------------------------------------------------------
