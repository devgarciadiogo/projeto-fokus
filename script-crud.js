// Encontrar o botão adicionar tarefa 

const btAdicionarTarefa = document.querySelector('.app__button--add-task') //Const criada para se referenciar ao botão de tarefa
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea') //Const para interação com o usuario que digitou no formulário
const ulTarefas = document.querySelector('.app__section-task-list') // Const da ul para fazer append do li

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // Troquei o array vazio e chamei localStorage recebendo a chave de acesso 'tarefas' e fiz o inverso do stringfy da linha 47, agora fiz o inverso então antes do localStorage chamei o JSON.parse

//Quando usamos o método JSON.parse(), ele converte uma string em um objeto JavaScript, assumindo que a string seja um JSON válido. Se a string não estiver formatada corretamente como JSON, ou se algo estiver fora do lugar, isso resultará em um erro no console. Se o retorno for algo que não é um array, ou seja for um 'undefined' ou um 'null', tem que fazer um || e colocar um array vazio.

//Criação da referência HTML li
function criarElementoTarefa(tarefa){ //Função de criar tarefas, passei tarefa como parâmetro pois preciso saber qual tarefa quero criar
    const li = document.createElement('li') //Criando o elemento li através do createElement
    li.classList.add('app__section-task-list-item') //Agora tenho o elemento li e acessei a classlist seguida do método de add recebendo a classe ja designada no HTML de referência

    const svg = document.createElement('svg') // Criação do elemento svg
    //innerHTML que recebeu um intepolação de strings
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"   xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    ` 

    const paragrafo = document.createElement('p') //Criação do elemento paragrafo
    paragrafo.textContent = tarefa.descricao //textContext pois me referi especificamente a texto, o conteúdo do texto é a descrição da tarefa que recebi por parametro, então utilizo o tarefa.descricao. 
    paragrafo.classList.add('app__section-task-list-item-description') //Adicionando classe para o paragrafo do nosso html de referencia

    const botao = document.createElement('button') //Criação do elemento botão 
    botao.classList.add('app_button-edit') //Adicionando classe para o botão do nosso html de referencia
    
    const imagemBotao = document.createElement('img') //Criando imagem do botão que tem no HTML refêrencia
    imagemBotao.setAttribute('src', '/imagens/edit.png') //Definindo a imagem com o setAttibute passando o atributo src e o valor que no caso é o caminho da imagem
    botao.append(imagemBotao) //Chamo o botão append com a imagem do botão para atribuir o botão a sua imagem

    li.append(svg) //Chamando o li e atribuindo cada elemento que criei nas constantes
    li.append(paragrafo)
    li.append(botao)

    return li //Vai criar o elemento li e retornar
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
    const elementoTarefa =  criarElementoTarefa(tarefa) //Const para colocar item da tarefa na tela
    ulTarefas.append(elementoTarefa) //Recebe o elemento tarefa que acabei de criar
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) //Armazenamento local para guardar a lista, primeiro passamos a string 'tarefas' que é a chave de acesso do valor depois utilizo o JSON.stringfy que vai transformar um objeto em string e assim entendo que o localStorage só sabe trabalhar com strings, se for algo mais complexo temos que utilizar a a API JSON
    textarea.value = '' //Limpa o formulário
    formAdicionarTarefa.classList.add('hidden') //Esconde o formulário
})

tarefas.forEach(tarefa => { //Função que da acesso à tarefas da vez, ou seja ele vai iterar todas as tarefas
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa) //Metódo para para receber o elemento tarefa
});