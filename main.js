const form = document.getElementById('form-atividade');//identificação do formulário do html
const imgAprovado = '<img src="./aprovado.png" alt="emoji celebrando" />';//inserindo emoji
const imgReprovado = '<img src="./reprovado.png" alt="emoji decepcionado" />';//inserindo emoji
const atividades = []; //calcular a média
const notas = []; //armazena todas as informações
const spanAprovado = '<span class="resultado aprovado">aprovado</span>';
const spanreprovado = '<span class="resultado reprovado">reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:" ));

let linhas = ''; //manter o conteúdo das linhas adicionadas

form.addEventListener('submit', function(e) { //cancela o evento do formulário de quando submetido, atualizar a tela
    e.preventDefault(); //remove o comportamento de atualizar a página no navegador

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();   
});

function adicionaLinha() { //função lógica de adicionar eventos na tabela
    const inputNomeAtividade = document.getElementById('nome-atividade');//captura os nomes (cola no html:id)
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`); 
    } else {
        atividades.push(inputNomeAtividade.value); //push dos arrays para adicionar conteúdos
        notas.push(parseFloat(inputNotaAtividade.value));
    
        let linha = '<tr>';//adicionando informações do html
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ?  imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`;

        linhas += linha;
    }
    inputNomeAtividade.value = '';//limpa o campo
    inputNotaAtividade.value = '';//limpa o campo
}   

function atualizaTabela(){  //função de atualiza a tabela
    const corpoTabela = document.querySelector('tbody');//recupera o corpo da tabela
    corpoTabela.innerHTML = linhas;//inserir o conteúdo dentro de uma tag
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanreprovado;
}

function calculaMediaFinal(){
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }
    return somaDasNotas / notas.length;
    }
