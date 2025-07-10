let pinceladas = [];
let cantidad = 50;
let manchas = [];


let FREC_MIN = 70;
let FREC_MAX = 900;
let AMP_MIN = 0.001; // antes 0.03
let AMP_MAX = 0.05;  // antes 0.06
let mic;
let pitch;
let audioContext;
let gestorPitch;
let gestorAmp;

let estado = 1;
let tiempoEstadoAnterior = 0;
let duracionEstado = 6000;

let zonas = {};
let imagenesIzquierdaCirculo = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];
let imagenesIzquierdaRect = [3, 4];
let imagenesDerechaCirculo = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];
let imagenesDerechaRect = [3, 4];

function preload() {
  for (let i = 0; i < cantidad; i++) {
    let nombre = "data/Recurso" + nf(i, 2) + ".png";
    pinceladas[i] = loadImage(nombre);
  }
}

function setup() {
  createCanvas(450, 600);
  tiempoEstadoAnterior = millis();
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio();

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX);

  zonas = {
    izquierda_circulo: {
      x: width / 4,
      y: height / 4,
      r: 80
    },
    izquierda_rect: {
      x: width / 4,
      y: height / 4 + 80 + 50,
      w: 150,
      h: 100
    },
    derecha_circulo: {
      x: width * 3 / 4,
      y: height / 4,
      r: 80
    },
    derecha_rect: {
      x: width * 3 / 4,
      y: height / 4 + 80 + 50,
      w: 150,
      h: 100
    }
  };
}

function draw() {
  background(240);

  let tiempoActual = millis();
  let frecuenciaActual = gestorPitch.filtrada;  // valor normalizado entre 0 y 1
  let amplitud = mic.getLevel();
  let amplitudNormalizada = map(amplitud, AMP_MIN, AMP_MAX, 0, 1);
  amplitudNormalizada = constrain(amplitudNormalizada, 0, 1);

  // Crear manchas si hay sonido
  if (amplitudNormalizada > 0.4) {  // muy sensible, detecta casi cualquier sonido
    // Mapeo para hacer más sensible a cambios pequeños en frecuencia (voz normal 80-300Hz)
    let cantidadManchas = int(map(frecuenciaActual, 0, 0.3, 2, 10));
    cantidadManchas = constrain(cantidadManchas, 2, 10);

    for (let i = 0; i < cantidadManchas; i++) {
      crearMancha();
    }
  }

  // Control de estados y tiempo
  if (tiempoActual - tiempoEstadoAnterior > duracionEstado) {
    estado++;
    if (estado > 3) estado = 1;
    tiempoEstadoAnterior = tiempoActual;

    if (estado === 1) {
      manchas = [];  // limpiar
    }
    if (estado === 2) {
      for (let m of manchas) {
        m.derretible = random() < 0.3;
      }
    }
  }

  // Animaciones por estado
  if (estado === 2) {
    for (let m of manchas) {
      if (m.derretible) {
        m.alto += 2;
      }
    }
  } else if (estado === 3) {
    for (let m of manchas) {
      m.alto += 8;
    }
  }

  // Dibujar manchas con transparencia
  for (let m of manchas) {
    push();
    tint(255, 180); // blanco con alpha -> translúcido
    image(pinceladas[m.cual], m.x, m.y, m.ancho, m.alto);
    pop();
  }

  // Mostrar estado actual
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Estado: " + estado, 10, 10);

}


function crearMancha() {
  let zonaElegida;
  let lado = random() < 0.5 ? "izquierda" : "derecha";

  if (lado === "izquierda") {
    zonaElegida = random() < 0.9 ? "izquierda_circulo" : "izquierda_rect";
  } else {
    zonaElegida = random() < 0.9 ? "derecha_circulo" : "derecha_rect";
  }

  let x, y, cual;

  if (zonaElegida === "izquierda_circulo") {
    let zona = zonas.izquierda_circulo;
    let angle = random(TWO_PI);
    let r = random(zona.r);
    x = zona.x + cos(angle) * r;
    y = zona.y + sin(angle) * r;
    cual = random(imagenesIzquierdaCirculo);
  } 
  else if (zonaElegida === "izquierda_rect") {
    let zona = zonas.izquierda_rect;
    x = zona.x + random(-zona.w/2, zona.w/2);
    y = zona.y + random(-zona.h/2, zona.h/2);
    cual = random(imagenesIzquierdaRect);
  } 
  else if (zonaElegida === "derecha_circulo") {
    let zona = zonas.derecha_circulo;
    let angle = random(TWO_PI);
    let r = random(zona.r);
    x = zona.x + cos(angle) * r;
    y = zona.y + sin(angle) * r;
    cual = random(imagenesDerechaCirculo);
  } 
  else if (zonaElegida === "derecha_rect") {
    let zona = zonas.derecha_rect;
    x = zona.x + random(-zona.w/2, zona.w/2);
    y = zona.y + random(-zona.h/2, zona.h/2);
    cual = random(imagenesDerechaRect);
  }

  let img = pinceladas[cual];
  manchas.push({
    x: x,
    y: y,
    ancho: img.width,
    alto: img.height,
    cual: cual,
    derretible: false
  });
}

function startPitch() {
  const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      gestorPitch.actualizar(frequency);
    }
    getPitch();
  });
}

class GestorSenial {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.filtrada = 0;
  }

  actualizar(valor) {
    let nuevo = map(valor, this.min, this.max, 0, 1);
    this.filtrada = constrain(nuevo, 0, 1);
  }
}
