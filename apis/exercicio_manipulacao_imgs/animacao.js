// Variáveis globais
let animacaoId;
let animacaoAtiva = false;

// Estado dos objetos
const estadoObjetos = {
    circulo: {
        x: 50,
        y: 50,
        raio: 30,
        velocidadeX: 2,
        velocidadeY: 3,
        cor: 'blue',
        corOriginal: 'blue'
    },
    retangulo: {
        x: 100,
        y: 150,
        largura: 80,
        altura: 50,
        cor: 'red',
        corOriginal: 'red'
    },
    texto: {
        x: 300,
        y: 50,
        texto: 'Animação Canvas',
        cor: 'green',
        corOriginal: 'green'
    }
};

// Inicialização
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Adicionar eventos de mouse
canvas.addEventListener('click', handleCanvasClick);
canvas.addEventListener('mousemove', handleMouseMove);

// Variáveis para interação do mouse
let mouseX = 0;
let mouseY = 0;

function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    
    // Mudar cursor quando estiver sobre objetos
    if (isMouseOverCirculo(mouseX, mouseY) || isMouseOverRetangulo(mouseX, mouseY)) {
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default';
    }
}

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Verificar qual objeto foi clicado
    if (isMouseOverCirculo(clickX, clickY)) {
        mudarCorCirculo();
    } else if (isMouseOverRetangulo(clickX, clickY)) {
        mudarCorRetangulo();
    } else if (isMouseOverTexto(clickX, clickY)) {
        mudarCorTexto();
    }
}

// Funções de verificação de colisão com mouse
function isMouseOverCirculo(x, y) {
    const circ = estadoObjetos.circulo;
    const distancia = Math.sqrt((x - circ.x) ** 2 + (y - circ.y) ** 2);
    return distancia <= circ.raio;
}

function isMouseOverRetangulo(x, y) {
    const rect = estadoObjetos.retangulo;
    return x >= rect.x && 
           x <= rect.x + rect.largura && 
           y >= rect.y && 
           y <= rect.y + rect.altura;
}

function isMouseOverTexto(x, y) {
    const texto = estadoObjetos.texto;
    ctx.font = '20px Arial';
    const metrics = ctx.measureText(texto.texto);
    return x >= texto.x && 
           x <= texto.x + metrics.width && 
           y >= texto.y - 20 && 
           y <= texto.y;
}

// Funções para mudar cores
function mudarCorCirculo() {
    const cores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const novaCor = cores[Math.floor(Math.random() * cores.length)];
    estadoObjetos.circulo.cor = novaCor;
    
    // Efeito visual - círculo maior momentaneamente
    estadoObjetos.circulo.raio = 35;
    setTimeout(() => {
        estadoObjetos.circulo.raio = 30;
    }, 200);
}

function mudarCorRetangulo() {
    const cores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const novaCor = cores[Math.floor(Math.random() * cores.length)];
    estadoObjetos.retangulo.cor = novaCor;
    
    // Efeito visual - retângulo pisca
    estadoObjetos.retangulo.largura = 85;
    estadoObjetos.retangulo.altura = 55;
    setTimeout(() => {
        estadoObjetos.retangulo.largura = 80;
        estadoObjetos.retangulo.altura = 50;
    }, 200);
}

function mudarCorTexto() {
    const cores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const novaCor = cores[Math.floor(Math.random() * cores.length)];
    estadoObjetos.texto.cor = novaCor;
    
    // Efeito visual - texto aumenta momentaneamente
    estadoObjetos.texto.texto = 'ANIMAÇÃO CANVAS!';
    setTimeout(() => {
        estadoObjetos.texto.texto = 'Animação Canvas';
    }, 500);
}

function resetarCores() {
    estadoObjetos.circulo.cor = estadoObjetos.circulo.corOriginal;
    estadoObjetos.retangulo.cor = estadoObjetos.retangulo.corOriginal;
    estadoObjetos.texto.cor = estadoObjetos.texto.corOriginal;
}

// Funções de desenho
function desenharCirculo() {
    const circ = estadoObjetos.circulo;
    ctx.beginPath();
    ctx.arc(circ.x, circ.y, circ.raio, 0, Math.PI * 2);
    ctx.fillStyle = circ.cor;
    ctx.fill();
    ctx.closePath();
    
    // Destacar quando mouse estiver sobre
    if (isMouseOverCirculo(mouseX, mouseY)) {
        ctx.beginPath();
        ctx.arc(circ.x, circ.y, circ.raio + 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
}

function desenharRetangulo() {
    const rect = estadoObjetos.retangulo;
    ctx.fillStyle = rect.cor;
    ctx.fillRect(rect.x, rect.y, rect.largura, rect.altura);
    
    // Destacar quando mouse estiver sobre
    if (isMouseOverRetangulo(mouseX, mouseY)) {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeRect(rect.x - 2, rect.y - 2, rect.largura + 4, rect.altura + 4);
    }
}

function desenharTexto() {
    const texto = estadoObjetos.texto;
    ctx.fillStyle = texto.cor;
    ctx.font = '20px Arial';
    ctx.fillText(texto.texto, texto.x, texto.y);
    
    // Destacar quando mouse estiver sobre
    if (isMouseOverTexto(mouseX, mouseY)) {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 1;
        ctx.strokeText(texto.texto, texto.x, texto.y);
    }
}

// Animação
function iniciarAnimacao() {
    if (animacaoAtiva) {
        pararAnimacao();
        return;
    }
    
    animacaoAtiva = true;
    animar();
}

function pararAnimacao() {
    animacaoAtiva = false;
    if (animacaoId) {
        cancelAnimationFrame(animacaoId);
    }
}

function animar() {
    if (!animacaoAtiva) return;
    
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Atualizar posição do círculo
    const circ = estadoObjetos.circulo;
    circ.x += circ.velocidadeX;
    circ.y += circ.velocidadeY;
    
    // Detectar colisão com bordas
    if (circ.x + circ.raio > canvas.width || circ.x - circ.raio < 0) {
        circ.velocidadeX = -circ.velocidadeX;
        // Efeito ao bater na borda
        circ.cor = '#FF6B6B';
        setTimeout(() => {
            circ.cor = estadoObjetos.circulo.corOriginal;
        }, 300);
    }
    
    if (circ.y + circ.raio > canvas.height || circ.y - circ.raio < 0) {
        circ.velocidadeY = -circ.velocidadeY;
        // Efeito ao bater na borda
        circ.cor = '#4ECDC4';
        setTimeout(() => {
            circ.cor = estadoObjetos.circulo.corOriginal;
        }, 300);
    }
    
    // Desenhar objetos
    desenharCirculo();
    desenharRetangulo();
    desenharTexto();
    
    // Continuar animação
    animacaoId = requestAnimationFrame(animar);
}

// Iniciar desenho inicial (sem animação)
desenharCirculo();
desenharRetangulo();
desenharTexto();