const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext("2d");
const resultadoElement = document.getElementById('resultado');
const placarUsuarioElement = document.getElementById('placarUsuario');
const placarComputadorElement = document.getElementById('placarComputador');

const opcoes = ['PEDRA', 'PAPEL', 'TESOURA'];
let placarUsuario = 0;
let placarComputador = 0;

// Desenhar mão fechada
function desenharMaoFechada() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenho de circulo de fundo
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
    ctx.fill();

    // Desenho mão fechada
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✊', canvas.width / 2, canvas.height / 2);

    // Texto Instrucional
    ctx.font = '16px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Escolha uma opção abaixo', canvas.width / 2, canvas.height -20);
}

// Função principal do jogo
function jogar(escolhaUsuario) {
    const escolhaComputador = Math.floor(Math.random() * 3);

    // Desenha as escolhas no canvas
    desenharResultado(escolhaUsuario, escolhaComputador);

    // Determina o vencedor
    const resultado = determinarVencedor(escolhaUsuario, escolhaComputador);
    
    // Atualiza placar e resultado
    if (resultado === 'usuario') {
        placarUsuario++;
        resultadoElement.textContent = 'Você Ganhou!';
        resultadoElement.style.color = 'green';
    } else if (resultado === 'computador'){
        placarComputador++;
        resultadoElement.textContent = 'Computador Ganhou!';
        resultadoElement.style.color = 'red';
    } else {
        resultadoElement.textContent = 'Empate!';
        resultadoElement.style.color = 'blue';
    }

    //Atualiza o placar
    placarUsuarioElement.textContent = placarUsuario;
    placarComputadorElement.textContent = placarComputador;
}

function desenharResultado(usuario, computador) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha área do usuario
    ctx.fillStyle = '#e8f5e8';
    ctx.fillRect(20, 50, 160, 200);

    // Desenha área do computador 
    ctx.fillStyle = '#ffe8e8';
    ctx.fillRect(220, 50, 160, 200);

    // Escolha do usuario
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#333';
    ctx.fillText(getChoice(usuario), 103, 150);
    ctx.font = '16px Arial';
    ctx.fillText('Você', 100, 190);

    //Escolha Computador
    ctx.font = '60px Arial';
    ctx.fillText(getChoice(computador), 300, 150);
    ctx.font = '16px Arial';
    ctx.fillText('Computador', 300, 190);

    // VS no meio
    ctx.font = '20px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('VS', canvas.width / 2, 160);
    
}

function getChoice(escolha) {
    const choices = [
        '✊',
        '🖐️',
        '✌️'
    ]
    return choices[escolha];
}

function determinarVencedor(usuario, computador) {
    if (usuario === computador) return 'empate';

    if (
        (usuario === 0 && computador === 2) || // Pedra vence tesoura
        (usuario === 1 && computador === 0) || // Papel vence pedra
        (usuario === 2 && computador === 1) // Tesoura vence papel
    ){
        return 'usuario';
    }

    return 'computador';
}

function reiniciar() {
    placarUsuario = 0;
    placarComputador = 0;
    placarUsuarioElement.textContent = '0';
    placarComputadorElement.textContent = '0';
    resultadoElement.textContent = '';
    desenharMaoFechada();
}

desenharMaoFechada();




