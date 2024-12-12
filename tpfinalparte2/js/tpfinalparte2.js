//Gareca, Emelyn--- GarciasGimenez Nazarena
// TPFINALPARTE2 COM2
// VIDEO: 

let principal; 
let willder , willizq , thebeast , candyverde , candyvioleta , candyamarillo , fondo , inicio , win , lose ,instrucciones , creditos;

 
function preload() { 
  
  lodesconocido = loadFont('data/Tomeoftheunknown-3gL3.ttf');
 
//carga de imagen de JUGADOR Y ENEMIGO------------------------
  willder = loadImage("data/willright.png");
  willizq = loadImage("data/willleft.png");
  thebeast = loadImage("data/thebeast.png");
  
//carga de imagen de MUNICIONES-------------------------------
  candyvioleta = loadImage("data/candyvioleta.png");
  candyverde = loadImage("data/candyverde.png");
  candyamarillo = loadImage("data/candyamarillo.png");
  
//carga de imagen de FONDOS-----------------------------------
  fondo = loadImage("data/fondo.png");
  inicio = loadImage("data/inicio.png");
  win = loadImage("data/win.png");
  lose = loadImage("data/lose.png");
  creditos = loadImage("data/creditos.png");
  instrucciones = loadImage("data/instrucciones.png");

}

function setup() {
  textFont( lodesconocido );
  createCanvas(640, 480);
  principal = new Principal();
}

function draw() { 
  principal.dibujar();
}

//movimieneto del personaje------------------------------------------------------------------
function keyPressed() {
  if ( principal.estado === 2 ) {
    principal.Juego.mover( keyCode ); 
  }
}

//para el cambio de pantallas--------------------------------------------------------------------------------
function mousePressed() {
    if ( principal ) {
        principal.mousePresionado(); // Llama al método mousePresionado
    }
}
