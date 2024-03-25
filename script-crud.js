// Encontrar o botão adicionar tarefa 

const btAdicionarTarefa = document.querySelector('.app__button--add-task') //Const criada para se referenciar ao botão de tarefa
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea') //Const para interação com o usuario que digitou no formulário

const tarefas = []

btAdicionarTarefa.addEventListener('click', () =>{  //Evento de click pro botão adicionar tarefa
    formAdicionarTarefa.classList.toggle('hidden') //Toggle alternancia de classe
})

formAdicionarTarefa.addEventListener('submit', (evento) => { //Adicionando evendo de submit
    evento.preventDefault(); //Impede o comportamento padrão, usado aqui para impedir que a página recarregue a cada submit
    const tarefa = {
        descricao: textarea.value //Criando um objeto para receber uma tarefa = valor do text area
    }
    tarefas.push(tarefa) //Função para receber a tarefa e colocar ela dentro de uma lista
    localStorage.setItem('tarefas', tarefas) //Armazenamento local para guardar a lista, primeiro passamos a string 'tarefa' que é a chave de acesso do valor e depois passamos o valor em si que é a lista de tarefas que no caso é var 'tarefas'
})