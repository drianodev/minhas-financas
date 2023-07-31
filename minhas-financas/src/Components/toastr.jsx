import toastr from "toastr";

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export const mostrarMensagem = (tipo, mensagem, titulo) => {
    return toastr[tipo](mensagem, titulo);
}

export const mensagemErro = (mensagem) =>{
    mostrarMensagem('error',mensagem, 'Erro' )
}
export const mensagemSucesso = (mensagem) =>{
    mostrarMensagem('success',mensagem, 'Sucesso' )
}
export const mensagemAlerta = (mensagem) =>{
    mostrarMensagem('warning',mensagem, 'Alerta' )
}