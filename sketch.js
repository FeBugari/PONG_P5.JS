/*
PONG EM JAVASCRIPT
Criado por FeBugari 
AULA DE LOGICA DE PROGRAMAÇÃO PELA ALURA
PROFESSOR: Guilherme Lima.
Versão v0.0.1 | 11 de Agosto de 2023.
*/

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;


//variável de dificuldade
let dificuldadeGame = 0;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;


//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150; 
let velocidadeYOponente;


//variável colisao biblioteca
let colidiu = false;


//Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;


//sons do jogo
let ponto;
let raquetada;
let trilha;


function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(50,205,50);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  colisaoMinhaRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoMinhaRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluirPlacar(meusPontos, 150, 26);
  incluirPlacar(pontosDoOponente, 450, 26);
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}


function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete, 0, 310);
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoMinhaRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento/2 -30
  yRaqueteOponente += velocidadeYOponente + dificuldadeGame
  
  calculaChanceDeErrar()

  yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
  
}

function incluirPlacar(pontos, x, y){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(x, 10, 40, 20);
  fill(255);
  text(pontos, x + 20, y);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  } 
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
    
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    dificuldadeGame += 1
    if (dificuldadeGame >= 39){
    dificuldadeGame = 40
    }
  } else {
    dificuldadeGame -= 1
    if (dificuldadeGame <= 35){
    dificuldadeGame = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
