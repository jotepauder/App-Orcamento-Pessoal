class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] === undefined || this[i] === '' || this[i] === null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
}

let bd = new Bd()

function cadastrarDepesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    
        //Valida se todos os campos estão preenchidos
    let funcao = despesa.validarDados()
    if (funcao) {
        bd.gravar(despesa)
        alterarModal(funcao)

    } else {
        alterarModal(funcao)
    }

}
//Altera informações do modal do Boostraṕ
function alterarModal(funcao){
    if (funcao == true){
        document.getElementById('titulo-modal').innerHTML = 'Gravado com sucesso'
        document.getElementById('corpo-modal').innerHTML = 'A despesa foi registrada com sucesso!'
        document.getElementById('btn-modal').className = "btn btn-sucess"
        document.getElementById('btn-modal').innerHTML = 'Ok'
        $('#modalRegistroDespesa').modal('show')
    }else{
        document.getElementById('titulo-modal').innerHTML = 'Erro na gravação'
        document.getElementById('corpo-modal').innerHTML = 'Existem campos a serem preenchidos'
        document.getElementById('btn-modal').className = "btn btn-danger"
        document.getElementById('btn-modal').innerHTML = 'Voltar e corrigir'
        $('#modalRegistroDespesa').modal('show')
    }
}

function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0   
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}
