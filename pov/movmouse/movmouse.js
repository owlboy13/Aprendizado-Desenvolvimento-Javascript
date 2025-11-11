window.addEventListener('mousemove', (event) => {
    const localiza = document.getElementById('position')

    let posicaoX = document.getElementById('posicaoX')
    let posicaoY = document.getElementById('posicaoY')

    localiza.style.top = event.clientY + 'px'
    localiza.style.left = event.clientX + (5) + 'px'

    posicaoY.innerText = event.clientY + 'px'
    posicaoX.innerText = event.clientX + 'px'
});