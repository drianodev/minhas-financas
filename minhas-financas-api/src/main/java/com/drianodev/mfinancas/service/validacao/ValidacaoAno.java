package com.drianodev.mfinancas.service.validacao;

import com.drianodev.mfinancas.exceptions.RegraDeNegocioException;
import com.drianodev.mfinancas.model.entity.Lancamento;

public class ValidacaoAno implements ValidacaoStrategy {
    @Override
    public void validar(Lancamento lancamento) {
        if (lancamento.getAno() == null || lancamento.getAno().toString().length() != 4) {
            throw new RegraDeNegocioException("Digite um Ano válido!");
        }
    }
}
