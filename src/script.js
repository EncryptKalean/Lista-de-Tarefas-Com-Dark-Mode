const adicionar_btn = document.querySelector('.addTarefa'),
    apagar_btn = document.querySelector('.apagarTudo'),
    caixaTexto = document.querySelector('input'),
    lista = document.querySelector('.lista'),
    menssage = document.querySelector('.menssage'),
    contagem = document.querySelector('.contagem'),
    modoEscuro = document.querySelector('.toggle-mode');

let toggleModoEscuro = localStorage.getItem("modoEscuro") ?? "claro",
    tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

caixaTexto.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionar_btn.click();
    }
});

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

renderizar()
function renderizar() {
    if (tarefas.length < 1) {
        contagem.textContent = `sem tarefas...`
    }
    else if(tarefas.length == 1){
        apagar_btn.style.display = 'none'
        contagem.textContent = `você tem ${tarefas.length} tarefa`
    }
    else {
        apagar_btn.style.display = 'block'
        contagem.textContent = `você tem ${tarefas.length} tarefas`
    }

    lista.innerHTML = ''
    tarefas.forEach((val,index) => {
        lista.innerHTML += `
            <li class="${val.classe}">
                <h3 class="tarefaTexto" index="${index}">${val.tarefa}</h3>
                <a>
                    <i class="fa-solid fa-xmark deletar"></i>
                </a>
            </li>
        `
    })
}

apagar_btn.addEventListener('click', () => {
    if(confirm('Tem certeza que deseja apagar todas as tarefas?')){
        localStorage.removeItem('tarefas')
        tarefas = []
        renderizar();
    }
})

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

modoEscuro.addEventListener('click',()=>{
    if(modoEscuro.classList.contains('dark-mode')){
        toggleModoEscuro = "claro"
        darkmode()
    }
    else{
        toggleModoEscuro = "escuro"
        darkmode()
    }

    localStorage.setItem("modoEscuro", toggleModoEscuro);
})

darkmode()
function darkmode(){
    if(toggleModoEscuro == "claro"){
        modoEscuro.classList.remove('dark-mode')
        lista.classList.remove('dark-mode')
        document.body.classList.remove('dark-mode')
        document.querySelector('.center').classList.remove('dark-mode')

    }else{
        modoEscuro.classList.add('dark-mode')
        lista.classList.add('dark-mode')
        document.body.classList.add('dark-mode')
        document.querySelector('.center').classList.add('dark-mode')
    }
}