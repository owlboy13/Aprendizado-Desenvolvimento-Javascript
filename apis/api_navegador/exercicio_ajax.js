function Conexao(){
    // Cria um novo objeto XMLHttpRequest
    const xhr = new XMLHttpRequest;

    // Configura a solicitação, especificando o método (GET) e a url
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);

    // Define uma função de callback para lidar com a resposta
    xhr.onload = function () {
        if (xhr.status === 200) {
            // A solicitação foi bem-sucedida, e o status da resposta é 200 (ok)
            const response = JSON.parse(xhr.responseText);
            console.log("Titulo do post:", response.title);
        } else {
            // a solicitação falhou
            console.log("Ocorreu um erro durante a instalação");
        }
    }

    // envia a solicitação 
    xhr.send();
}
