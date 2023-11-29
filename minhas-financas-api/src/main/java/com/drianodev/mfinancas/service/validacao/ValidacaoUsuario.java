package com.drianodev.mfinancas.service.validacao;

import com.drianodev.mfinancas.exceptions.RegraDeNegocioException;
import com.drianodev.mfinancas.model.entity.Lancamento;

public class ValidacaoUsuario implements ValidacaoStrategy {
    @Override
    public void validar(Lancamento lancamento) {
        if (lancamento.getUsuario() == null || lancamento.getUsuario().getId() == null) {
            throw new RegraDeNegocioException("Usuário inválido!");
        }
    }
}

