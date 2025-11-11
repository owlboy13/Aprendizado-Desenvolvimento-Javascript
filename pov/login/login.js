// Seleciona o botao pelo id
var button = document.getElementById("button");
var email = document.getElementById("email");
var senha = document.getElementById("senha");

button.addEventListener('click', function(){
    if (email.value == '' || senha.value == '') {
        alert("Campo e-mail ou senha não preenchidos");
    } else {
        alert("Campos preenchidos com sucesso");
    }
});