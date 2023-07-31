import { get, post } from "./api"

const URL = '/api/usuarios'

export const autenticar = (credenciais) => {
    return post(`${URL}/autenticar`, credenciais)
}

export const obterSaldo = (id) =>{
    return get(`${URL}/${id}/saldo`)
}

export const salvarUsuario = (dados) =>{
    return post(URL, dados)
}