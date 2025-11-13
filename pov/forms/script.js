const btnLogin = document.querySelector(".btn");
const form = document.querySelector("form");

btnLogin.addEventListener('click', event => {
    event.preventDefault();

    const fields = [...document.querySelectorAll("blockInput input")];

    fields.forEach(field => {
        if (field.value === "") form.classList.add("validateErro");
    });

    const formError = document.querySelector(".validateErro");
    if (formError) {
        formError.addEventListener("animationend", event => {
            formError.classList.remove("validateErro");
        });
    } else {
        alert('Tudo certo');
    }
});