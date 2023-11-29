package com.drianodev.mfinancas.service.validacao;

import com.drianodev.mfinancas.exceptions.RegraDeNegocioException;
import com.drianodev.mfinancas.model.entity.Lancamento;

import java.math.BigDecimal;

public class ValidacaoValor implements ValidacaoStrategy {
    @Override
    public void validar(Lancamento lancamento) {
        if (lancamento.getValor() == null || lancamento.getValor().compareTo(BigDecimal.ZERO) < 1) {
            throw new RegraDeNegocioException("Digite um Valor válido!");
        }
    }
}
