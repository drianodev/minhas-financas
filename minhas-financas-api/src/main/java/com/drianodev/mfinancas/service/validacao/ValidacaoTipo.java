package com.drianodev.mfinancas.service.validacao;

import com.drianodev.mfinancas.exceptions.RegraDeNegocioException;
import com.drianodev.mfinancas.model.entity.Lancamento;

public class ValidacaoTipo implements ValidacaoStrategy {
    @Override
    public void validar(Lancamento lancamento) {
        if (lancamento.getTipo() == null) {
            throw new RegraDeNegocioException("Informe um tipo de lançamento.");
        }
    }
}

