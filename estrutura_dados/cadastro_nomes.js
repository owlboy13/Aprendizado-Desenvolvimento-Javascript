var dadosLista = [];

// FUNÇÃO PARA EXCLUIR LISTA
function excluir(i) {
    dadosLista.splice((i - 1), 1);
    document.getElementById("tabela").deleteRow(i);
    console.log(dadosLista);
}

// FUNÇÃO PARA EDITAR ITENS DA LISTA
function editar(i) {
    document.getElementById("nomeUser").value = dadosLista[(i - 1)];
    dadosLista.splice(dadosLista[(i - 1)], 1);
    criarLista();
    console.log(dadosLista);
}

// FUNÇÃO PARA CRIAR LISTA
function criarLista(){
    let tabela = document.getElementById("tabela").innerHTML = "<tr><th>Nome usuário</th><th>Ações</th></tr>";
    for (let i = 0; i <= (dadosLista.length -1); i++) {
                tabela += `<tr>
            <td>${dadosLista[i]}</td>
            <td>
                <button onclick='editar(${i + 1})'>Editar</button>
                <button onclick='excluir(${i + 1})'>Excluir</button>
            </td>
        </tr>`;
        document.getElementById("tabela").innerHTML = tabela;
    }
}

//FUNÇÃO DE CRIAÇÃO DE ARRAY PARA ARMAZENAMENTO DE DADOS
function salvarUser() {
    let nomeUser = document.getElementById("nomeUser").value;
    
    if(nomeUser) {
        dadosLista.push(nomeUser);
        criarLista();
        console.log(dadosLista);
        document.getElementById("nomeUser").value = "";
    } else {
        alert("Usuário favor preencher o campo nome");
    }
}


