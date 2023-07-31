package com.henrique.mfinancas.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.henrique.mfinancas.model.entity.Usuario;

@Service
public interface UsuarioService {

	Usuario autenticar(String email, String senha);
	
	Usuario salvarUsuario(Usuario usuario);
	
	void validarEmail(String email);
	
	Optional<Usuario> obterPorId(Long id);
}
