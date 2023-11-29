package com.drianodev.mfinancas.service.validacao;

import com.drianodev.mfinancas.exceptions.RegraDeNegocioException;
import com.drianodev.mfinancas.model.entity.Lancamento;

public class ValidacaoDescricao implements ValidacaoStrategy {
    @Override
    public void validar(Lancamento lancamento) {
        if (lancamento.getDescricao() == null || lancamento.getDescricao().trim().equals("")) {
            throw new RegraDeNegocioException("Digite uma Descrição!");
        }
    }
}
