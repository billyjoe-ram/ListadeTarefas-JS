// REFERENCIANDO CAMPO INPUT
const inpTrfa = document.querySelector("input[name=tarefa]")

// REFERENCIANDO BOTÃO DE CADASTRO
const btnCad = document.querySelector("#botao")

// REFERENCIANDO LISTA
const lstTrfa = document.querySelector("#lista")

// REFERENCIADO DIV.CARD PARA MANIPULAÇÃO DE ELEMENTOS
const divCard = document.querySelector(".card")

// ARRAY VAZIO PARA TAREFAS
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

// FUNÇÃO PARA RENDERIZAR AS TAREFAS NO ARRAY PARA A LISTA
function renderizarTarefas(){
    // LIMPAR A LISTAGEM DE ITENS ANTES DE RENDERIZAR 
    lstTrfa.innerHTML = ""

    // OPTEI POR USAR O FOREACH    
    tarefas.forEach(tarefa => {
        // CRIANDO O ITEM DA LISTA
        let itemLst = document.createElement('li')

        // ADICIONANDO OS ATRIBUTOS
        itemLst.setAttribute('class', 'list-group-item list-group-item-action')

        // ADICIONANDO EVENTO DO CLIQUE NO ELEMENTO
        itemLst.onclick = () => deletarTarefa(itemLst)

        // CRIANDO TEXTNODE COM O TEXTO DO ARRAY
        let txtTrfa = document.createTextNode(tarefa)

        // ADICIONANDO O TEXTNODE AO <li> CRIADO
        itemLst.appendChild(txtTrfa)

        // ADICIONANDO O ITEM NA LISTA DE TAREFAS
        lstTrfa.appendChild(itemLst)
    })
}

// RENDERIZANDO TAREFAS AO INICIAR A PÁGINA PARA CARREGAR OS DADOS
renderizarTarefas()

// FUNÇÃO PARA REMOVER AS MENSAGENS DE ERRO (SE HOUVER)
function removerSpans() {
    let spans = document.querySelectorAll("span")

    spans.forEach(span => {
        divCard.removeChild(span)
    })
}

// FUNÇÃO PARA ADICIONAR TAREFAS
function criarTarefas() {
    // CAPTURAR VALOR DIGITADO NO INPUT
    let novaTrfa = inpTrfa.value.trim()
    
    if (novaTrfa !== "") {
        // ATUALIZAR O ARRAY DE TAREFAS E RENDERIZAR A TELA
        tarefas.push(novaTrfa)
    } else {
        //alert("Preencha o campo!")
        let aviso = document.createElement('span')

        aviso.setAttribute('class', 'alert alert-warning')
        
        txtAviso = document.createTextNode("Informe a tarefa")

        aviso.appendChild(txtAviso)

        divCard.appendChild(aviso)
    }

    // SALVAR DADOS
    saveStorage()
}

// REMOVER TAREFAS DO ARRAY
function deletarTarefa(tarefa) {
    // REMOVER ITEM
    tarefas.splice(tarefas.indexOf(tarefa.textContent), 1)

    // RENDERIZAR TELA NOVAMENTE
    renderizarTarefas()

    // SALVAR DADOS
    saveStorage()  
}

// ADICIONAR EVENTO DE CLICK NO BOTÃO
btnCad.onclick = () => {    
    // REMOVENDO MENSAGENS DE ERRO PARA CAMPO VAZIO
    removerSpans()
    // CRIANDO AS TAREFAS NO ARRAY
    criarTarefas()
    // EXIBINDO VALORES DO ARRAY NA <ul>
    renderizarTarefas()
    // LIMPAR TEXTO DO INPUT
    inpTrfa.value = ""
}

// ADICIONAR EVENTO ACIONADO POR 'Enter' NO INPUT
inpTrfa.onkeyup = event => {
    event.preventDefault()
    if (event.keyCode === 13) {        
        btnCad.click()
    }
}

// SALVANDO DADOS NO STORAGE
function saveStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}