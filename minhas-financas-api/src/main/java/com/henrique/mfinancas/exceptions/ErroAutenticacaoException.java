package com.henrique.mfinancas.exceptions;

public class ErroAutenticacaoException extends RuntimeException {
	public ErroAutenticacaoException(String mensagem) {
		super(mensagem);
	}
}
