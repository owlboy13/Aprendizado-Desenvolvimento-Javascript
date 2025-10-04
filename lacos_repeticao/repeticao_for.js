for (let i = 0; i<2; i++) {
    let peso = parseFloat(prompt("Informe o seu peso: "));

    if (peso <= 40){
        alert('Você é peso pena');
    }
    else if (peso >= 40 && peso <=60){
        alert('Você é peso mosca');
    }else {
        alert('Voce é peso pesado');
    }
    console.log("No valor " + i + " foi informado o peso " + peso + "Kg");
}