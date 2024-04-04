// Encontrar o botão para adicionar tarefa 

const btAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea') // Referência ao campo de texto do formulário
const ulTarefas = document.querySelector('.app__section-task-list') // Referência à lista de tarefas    

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // Recupera as tarefas do armazenamento local, ou cria um array vazio se não houver

function atualizarTarefas () { //Função de atualizar tarefas para fazer encapsulamento do local storage
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

// Função para criar um elemento de tarefa HTML referencia 
function criarElementoTarefa(tarefa){
    const li = document.createElement('li') // Cria um elemento <li>
    li.classList.add('app__section-task-list-item') // Adiciona classe ao elemento <li>

    const svg = document.createElement('svg') // Cria um elemento <svg>
    // Define o conteúdo interno do <svg> com um círculo e um ícone de tarefa
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"   xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    ` 
    const paragrafo = document.createElement('p') // Cria um elemento <p>
    paragrafo.textContent = tarefa.descricao // Define o texto do parágrafo como a descrição da tarefa
    paragrafo.classList.add('app__section-task-list-item-description') // Adiciona classe ao parágrafo

    const botao = document.createElement('button') // Cria um elemento <button>
    botao.classList.add('app_button-edit') // Adiciona classe ao botão

    botao.onclick = () => { // Recebe a função que queremos executar quando esse elemento for clicado
        const novaDescrição = prompt("Qual é o novo nome da tarefa?") //prompt para o usuario informar o nome correto da tarefa 
        paragrafo.textContent = novaDescrição // Código pra sobreescrever a descrição com a nova descrição digitada pelo usuario no prompt
        tarefa.descricao = novaDescrição //Pegamos a nova descrição do prompt pra fazer o update do local storage
        atualizarTarefas() // Chamando a função de alterar tarefa do localStorage
    }
    
    const imagemBotao = document.createElement('img') // Cria um elemento <img> para o botão do HTML de referencia
    imagemBotao.setAttribute('src', '/imagens/edit.png') // Define o atributo src da imagem
    botao.append(imagemBotao)  // Adiciona a imagem ao botão

    li.append(svg) // Adiciona o elemento <svg> ao <li>
    li.append(paragrafo) // Adiciona o parágrafo ao <li>
    li.append(botao) // Adiciona o botão ao <li>

    return li // Retorna o elemento <li> criado
}

btAdicionarTarefa.addEventListener('click', () =>{ // Adiciona um ouvinte de eventos para o botão de adicionar tarefa
    formAdicionarTarefa.classList.toggle('hidden') // Alternância de classe para mostrar ou ocultar o formulário
})

formAdicionarTarefa.addEventListener('submit', (evento) => { /// Adiciona um ouvinte de eventos para o envio do formulário
    evento.preventDefault(); //Impede o comportamento padrão de envio do formulário, usado para impedir que a página recarregue a cada submit
    const tarefa = {
        descricao: textarea.value // Cria um objeto de tarefa com base no valor do campo de texto
    }
    tarefas.push(tarefa) // Adiciona a nova tarefa ao array de tarefas
    const elementoTarefa =  criarElementoTarefa(tarefa) //Const para colocar item da tarefa na tela
    ulTarefas.append(elementoTarefa)  // Adiciona o elemento de tarefa à lista de tarefas
    atualizarTarefas() // Chamando a função de atualizar tarefa do local storage
    formAdicionarTarefa.classList.add('hidden') //Esconde o formulário
})

tarefas.forEach(tarefa => { // Itera sobre todas as tarefas, criando elementos HTML para cada uma e adicionando-os à lista de tarefas
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa) // Adiciona o elemento de tarefa à lista de tarefas
});