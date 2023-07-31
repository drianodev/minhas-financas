import { adicionarItem, obterItem, removerItem } from "./localstorageService"

export const USUARIO_LOGADO = '_USUARIO_LOGADO'

export const isUsuarioAutenticado = () => {
    const usuario = obterItem(USUARIO_LOGADO)
    return usuario && usuario.id;
}

export const removerUsuarioAutenticado = () => {
    removerItem(USUARIO_LOGADO)
}

export const logar = (usuario) =>{
    adicionarItem(USUARIO_LOGADO, usuario)
}

export const obterUsuarioLogado = () =>{
    return obterItem(USUARIO_LOGADO)
}