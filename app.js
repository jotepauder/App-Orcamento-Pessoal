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

//Garante que o campo valor só aceite números
function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;

    if (charCode != 8 && charCode != 9) {
        if (charCode < 48 || charCode > 57) {
            return false;
        }
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

    recuperarRegistros() {
        let despesas = []
        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa != null) {
                despesas.push(despesa)
            } else {
                continue
            }
        }

        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = []
        despesasFiltradas = bd.recuperarRegistros()

        console.log('Antes do filtro: ', despesasFiltradas)

        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //console.log('Depois do filtro: ', despesasFiltradas)
        return despesasFiltradas
    }
}

//Instância global de bd
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
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao = ''
        valor.value = ''

    } else {
        alterarModal(funcao)
    }

}
//Altera informações do modal do Boostrap
function alterarModal(funcao) {
    if (funcao == true) {
        document.getElementById('titulo-modal').innerHTML = 'Gravado com sucesso'
        document.getElementById('corpo-modal').innerHTML = 'A despesa foi registrada com sucesso!'
        document.getElementById('btn-modal').className = "btn btn-sucess"
        document.getElementById('btn-modal').innerHTML = 'Ok'
        $('#modalRegistroDespesa').modal('show')
    } else {
        document.getElementById('titulo-modal').innerHTML = 'Erro na gravação'
        document.getElementById('corpo-modal').innerHTML = 'Existem campos a serem preenchidos'
        document.getElementById('btn-modal').className = "btn btn-danger"
        document.getElementById('btn-modal').innerHTML = 'Voltar e corrigir'
        $('#modalRegistroDespesa').modal('show')
    }
}



//Carrega o array de despesas para a view
function carregaListasDespesas() {
    let despesas = []
    despesas = bd.recuperarRegistros()

    preencheTabela(despesas)
}

function preencheTabela(despesas) {
    let tabela = document.getElementById('tabela')

    //percorrer o array despesas listando cada despesa
    despesas.forEach(element => {
        //criando a linha <tr>
        let linha = tabela.insertRow()
        //criando a coluna
        linha.insertCell(0).innerHTML = `${addZero(element.dia)}/${addZero(element.mes)}/${element.ano}`
        linha.insertCell(1).innerHTML = escolheTipoDespesa(element.tipo)
        linha.insertCell(2).innerHTML = element.descricao
        linha.insertCell(3).innerHTML = element.valor
        linha.insertCell(4).innerHTML = `<button class="btn btn-danger">Excluir</button>`
    });

}

// Retorna a atividade de acordo com o seu value
function escolheTipoDespesa(elemento) {
    switch (elemento) {
        case '1':
            return 'Alimentação'
            break
        case '2':
            return 'Educação'
            break
        case '3':
            return 'Lazer'
            break
        case '4':
            return 'Saúde'
            break
        case '5':
            return 'Transporte'
            break
    }
}

//Adiciona um zero a esquerda na data para valores > 0 e <=9
function addZero(dia) {
    if (dia > 0 && dia <= 9) {
        return `0${dia}`
    } else {
        return `${dia}`
    }
}

function pesquisaDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesasFiltradas = bd.pesquisar(despesa)
    let tabela = document.getElementById('tabela')
    tabela.innerHTML = ''
    preencheTabela(despesasFiltradas)
    console.log('Depois do filtro: ', despesasFiltradas)
}
