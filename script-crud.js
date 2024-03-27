// Encontrar o botão adicionar tarefa 

const btAdicionarTarefa = document.querySelector('.app__button--add-task') //Const criada para se referenciar ao botão de tarefa
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea') //Const para interação com o usuario que digitou no formulário
const ulTarefas = document.querySelector('.app__section-task-list')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

//Criação da referência HTML li
function criarElementoTarefa(tarefa){ //Função de criar tarefas, passei tarefa como parâmetro pois preciso saber qual tarefa quero criar
    const li = document.createElement('li') //Criando o elemento li através do createElement
    li.classList.add('app__section-task-list-item') //Agora tenho o elemento li e acessei a classlist seguida do método de add recebendo a classe ja designada no HTML de referência

    const svg = document.createElement('svg') // Criação do elemento svg
    //innerHTML que recebeu um intepolação de strings
    svg.innerHTML = `
    <svg>
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    </svg>
    ` 

    const paragrafo = document.createElement('p') //Criação do elemento paragrafo
    paragrafo.textContent = tarefa.descricao //textContext pois me referi especificamente a texto, o conteúdo do texto é a descrição da tarefa que recebi por parametro, então utilizo o tarefa.descricao.

    const botao = document.createElement('button') //Criação do elemento botão 
    const imagemBotao = document.createElement('img') //Criando imagem do botão que tem no HTML refêrencia
    imagemBotao.setAttribute('src', '/imagen/edit.png') //Definindo a imagem com o setAttibute passando o atributo src e o valor que no caso é o caminho da imagem
    botao.append(imagemBotao) //Chamo o botão append com a imagem do botão para atribuir o botão a sua imagem

    li.append(svg) //Chamando o li e atribhindo cada elemento que criei nas constantes
    li.append(paragrafo)
    li.append(botao)

    return li
}

btAdicionarTarefa.addEventListener('click', () =>{  //Evento de click pro botão adicionar tarefa
    formAdicionarTarefa.classList.toggle('hidden') //Toggle alternancia de classe
})

formAdicionarTarefa.addEventListener('submit', (evento) => { //Adicionando evendo de submit
    evento.preventDefault(); //Impede o comportamento padrão, usado aqui para impedir que a página recarregue a cada submit
    const tarefa = {
        descricao: textarea.value //Criando um objeto para receber uma tarefa = valor do text area
    }
    tarefas.push(tarefa) //Função para receber a tarefa e colocar ela dentro de uma lista
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) //Armazenamento local para guardar a lista, primeiro passamos a string 'tarefas' que é a chave de acesso do valor depois utilizo o JSON.stringfy que vai transformar um objeto em string e assim entendo que o localStorage só sabe trabalhar com strings, se for algo mais complexo temos que utilizar a a API JSON
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});