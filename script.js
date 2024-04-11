//constantes que armazenam valores dos query selectors

const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const alterarIconePlay = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('./sons/play.wav')
const audioPausa = new Audio('./sons/pause.mp3')
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change' , () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

//Cria um evento de clique para os botoes, no qual ao clicarmos muda o atributo da html
focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 5
   alterarContexto('foco')
   focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    //ao chegar em 0 no temporizador além de tocar o som e interromper a execução do interval ele reseta o tempo  
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play();
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerarTemporizador()
        return
    }
    tempoDecorridoEmSegundos -= 1
   mostrarTempo()   
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    //se houver algum valor no intervaloId ele tocará o som e interromperá a execução da contagem
    if(intervaloId){
        audioPausa.play()
        zerarTemporizador()
        return
    }
     //irá tocar um som ao clique do botão e executará a subtração do tempo a cada 1000 milisegundos 1s
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    alterarIconePlay.setAttribute('src', `./imagens/pause.png`)
}

//interrompe a execução da contagem assim que for chamada a função
function zerarTemporizador() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    alterarIconePlay.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()