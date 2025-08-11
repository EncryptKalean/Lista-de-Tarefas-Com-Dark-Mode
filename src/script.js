// Pesquisa os Elementos no index
const adicionar_btn = document.querySelector('.addTarefa'),
    apagar_btn = document.querySelector('.apagarTudo'),
    caixaTexto = document.querySelector('input'),
    lista = document.querySelector('.lista'),
    menssage = document.querySelector('.menssage'),
    contagem = document.querySelector('.contagem'),
    container_confirmacao = document.querySelector('.apagar_confirm'),
    btn_confirmacao = document.getElementById('confirmacao_btn'),
    modoEscuro = document.querySelector('.toggle-mode');

let toggleModoEscuro = localStorage.getItem("modoEscuro") ?? false, // procura no localStorage o ultimo valor do DarkMode, se não tiver, cria um valor padrão
    tarefas = JSON.parse(localStorage.getItem("tarefas")) || [
        {tarefa: "Ao clicar em cima, a tarefa fica riscada", classe: "feito"},
        {tarefa: "essa tarefa está em progresso", classe: "nao-feita"},
        {tarefa: "cada tarefa pode ser apagada individualmente", classe: "feito"},
        {tarefa: 'ou você pode clicar no "apagar tudo"', classe: "nao-feita"},
    ]; // Procura no localStorage as tarefas já adicionadas, se não tiver, cria uma array vazia.


//---------- Adiciona o evento de ativar o botão de "Adicionar Tarefa" ao apertar Enter ----------
caixaTexto.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionar_btn.click();
    }
});


//---------- Define as informações da tarefa ao clicar em "Adicionar Tarefa" ----------
adicionar_btn.addEventListener('click', () => {
    if (caixaTexto.value.trim() == '') {
        caixaTexto.style.borderColor = 'red'
    }
    else {
        caixaTexto.style.borderColor = 'var(--cortema-1)'
        tarefas.push({
            tarefa: caixaTexto.value.trim(),
            classe: "nao-feita",
        })
        renderizar();
        caixaTexto.value = '';
        menssage.textContent = "tarefa adicionada"
        setTimeout(() => {
            menssage.textContent = ""
        }, 2000)
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
})


//---------- Renderiza os itens na lista ----------
renderizar()
function renderizar() {
    if (tarefas.length < 1) {
        contagem.textContent = `sem tarefas...`
        apagar_btn.style.display = 'none'
    }
    else if(tarefas.length == 1){
        contagem.textContent = `você tem ${tarefas.length} tarefa`
    }
    else {
        apagar_btn.style.display = 'block'
        contagem.textContent = `você tem ${tarefas.length} tarefas`
    }

    lista.innerHTML = ''
    tarefas.forEach((tarefa,index) => {
        lista.innerHTML += `
            <li class="${tarefa.classe}">
                <h3 class="tarefaTexto" index="${index}">${tarefa.tarefa}</h3>
                <a>
                    <i index="${index}" class="fa-solid fa-xmark deletar"></i>
                </a>
            </li>
        `
    })
}


//---------- Confirmação para apagar todas as tarefas ----------
apagar_btn.addEventListener('click', () => {
    container_confirmacao.style.display = 'block'
})

function apagarTudo(){
    container_confirmacao.style.display = 'none'
    localStorage.removeItem('tarefas');
    tarefas = [];
    renderizar();
}

function cancelar(){
    container_confirmacao.style.display = 'none'
}


//---------- Modifica as tarefas (ex: deletar ou riscar como feito) ----------
lista.addEventListener('click',(click)=>{
    let index = click.target.getAttribute('index');

    if(click.target.classList.contains('deletar')){
        tarefas.splice(index, 1)
    }
    
    if(click.target.classList.contains('tarefaTexto')){
        if(tarefas[index].classe == "feito"){
            tarefas[index].classe = "nao-feito"
        }
        else{
            tarefas[index].classe = 'feito'
        }
    }

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    renderizar()
})


//---------- Evento do botão toggle do modo escuro ----------
modoEscuro.addEventListener('click',()=>{
    if(modoEscuro.classList.contains('dark-mode')){
        toggleModoEscuro = false
        darkmode()
    }
    else{
        toggleModoEscuro = true
        darkmode()
    }

    localStorage.setItem("modoEscuro", toggleModoEscuro);
})


//---------- Verifica o modo do Darkmode ----------
darkmode()
function darkmode(){
    if(!toggleModoEscuro){
        modoEscuro.classList.remove('dark-mode')
        lista.classList.remove('dark-mode')
        document.body.classList.remove('dark-mode')
        document.querySelector('.center').classList.remove('dark-mode')
        document.querySelector('.apagar_confirm').classList.remove('dark-mode')

    }else{
        modoEscuro.classList.add('dark-mode')
        lista.classList.add('dark-mode')
        document.body.classList.add('dark-mode')
        document.querySelector('.center').classList.add('dark-mode')
        document.querySelector('.apagar_confirm').classList.add('dark-mode')
    }

}
