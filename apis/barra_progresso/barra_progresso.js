var canvas = document.getElementById('progress');
var ctx = canvas.getContext('2d');

var x = 0;
var y = 0;
var altura = 5;
var largura = 0;
var fator = 15;
var resolucao = 1920;

ctx.fillStyle = '#4169e1'

function animacao() {
   ctx.fillRect(x, y, largura = largura+fator, altura);
   
   if(largura > resolucao){
    clearInterval(atualiza);
   }
}

var atualiza = setInterval(animacao, 10);