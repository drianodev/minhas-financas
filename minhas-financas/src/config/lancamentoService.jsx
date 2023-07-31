import { del, get, post, put } from "./api"

const URL = '/api/lancamentos'

export const buscarLancamento = (lancamentoFiltro) =>{
    let params = `?usuario=${lancamentoFiltro.usuario}`

    if(lancamentoFiltro.ano){
        params = `${params}&ano=${lancamentoFiltro.ano}`
    }

    if(lancamentoFiltro.mes){
        params = `${params}&mes=${lancamentoFiltro.mes}`
    }

    if(lancamentoFiltro.tipo){
        params = `${params}&tipo=${lancamentoFiltro.tipo}`
    }

    if(lancamentoFiltro.status){
        params = `${params}&status=${lancamentoFiltro.status}`
    }
    if(lancamentoFiltro.descricao){
        params = `${params}&descricao=${lancamentoFiltro.descricao}`
    }

    return get(`${URL}${params}`)
}

export const deletarLancamento = (id) =>{
    return del(`${URL}/${id}`)
}


export const salvar = (lancamento) =>{
    return post(`${URL}`,lancamento)
}

export const obterPorId = (id) =>{
    return get(`${URL}/${id}`)
}

export const atualizar = (lancamento) =>{
    return put(`${URL}/${lancamento.id}`, lancamento)
}

export const atualizarStatus = (id, status) =>{
    return put(`${URL}/${id}/atualiza-status`, {status})
}