package com.drianodev.mfinancas.service.validacao;

import com.drianodev.mfinancas.model.entity.Lancamento;

public interface ValidacaoStrategy {
    void validar(Lancamento lancamento);
}
