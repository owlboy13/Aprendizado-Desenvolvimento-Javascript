function gerarTabuada(){
    let numberUser = document.getElementById("numberUser").value.trim();
    if (numberUser <= 0){
        alert("O número deve ser positivo");
        return;
    } else {

        let tabuada = `<tr>Tabuada do número ${numberUser}<th>`;

        for (let i = 0; i < 11; i++){
            let resultado = numberUser * i;
            tabuada += `<tr>
            <td>${numberUser} X ${i} = ${resultado}</td>  
            </tr>`;
        }
        document.getElementById("lista").innerHTML = tabuada;
    }
}