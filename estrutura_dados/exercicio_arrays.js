var hora = 8;
var minutos = 20;
var total_entrevistas = 0;
const saida = 11;

var entrevistados = [
    "João Mariano",
    "Adélia de Sousa",
    "Fábio Almeida",
    "Carla Silva",
    "Paulo Arruda",
    "Leonardo Rocha",
    "Tiago de Lima",
    "Patricia de Lima",
    "Fernanda da Conceicao",
    "Maria da Conceicao",
]

entrevistados.sort();

for (i = hora; i <= saida; i++) {
    if ((i == 12) || (i == 13)){
        continue
    }
    for (j = 0; j < 60; j = j + minutos) {
        total_entrevistas++;
        if (j == 0){
            console.log(i + ":" + j + "0",":", entrevistados[total_entrevistas - 1]);
        }
        else {
            console.log(i + ":" + j, ":", entrevistados[total_entrevistas - 1]);
        }
    }
}