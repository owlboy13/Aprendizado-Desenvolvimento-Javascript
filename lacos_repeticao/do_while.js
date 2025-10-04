let i = 0;
let idade;
do {
    idade = parseInt(prompt("Informe a sua idade: "));
    if (idade < 18){
        alert("Você não tem idade suficiente");
    }
    i++;
} while (idade < 18);
console.log("Voce tem idade suficiente")