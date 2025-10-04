let nota, conceito;
let count = 1;

while (count <= 10){
    nota = parseFloat(prompt("Informe a nota do estudante: "));
    if (nota) {
        if ((nota <= 10) && (nota >=8)) {
            console.log('conceito A');
        }
        if ((nota < 8) && (nota >= 5)) {
            console.log('conceito B');
        }
    }else {
        console.log('Você precisa se dedicar um pouco mais');
    }
    count++;
}