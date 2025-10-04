var notaMinAprov = 7;
var qtdeSemestres = 7;
var nota = parseInt(prompt('Informe sua nota: '));
var qtdeSem = parseInt(prompt('Informe a quantidade de semestres que estudou: '));
if((nota >= notaMinAprov) && (qtdeSem >= qtdeSemestres)){
    console.log("aprovado");
        }
else if(nota >= notaMinAprov){
    console.log('Você foi incluído no banco de curricúlos');
}else {
       console.log('Reprovado');
    }