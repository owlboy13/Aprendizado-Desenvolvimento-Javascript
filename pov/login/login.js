// Seleciona o botao pelo id
// var button = document.getElementById("button");
// var email = document.getElementById("email");
// var senha = document.getElementById("senha");

// button.addEventListener('click', function(){
//     if (email.value == '' || senha.value == '') {
//         alert("Campo e-mail ou senha não preenchidos");
//     } else {
//         alert("Campos preenchidos com sucesso");
//     }
// });

const btnLogin = document.querySelector('#button');
const form = document.querySelector('form');

btnLogin.addEventListener('click', event => {
    event.preventDefault(); //impede carregamento de página
    form.classList.add('oculta-form')
});

form.addEventListener('animationend', event => {
    if(event.animationName == 'top') {
        form.style.display = 'none';
        window.location.href = 'site.html'
    }
})