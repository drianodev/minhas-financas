package com.drianodev.mfinancas.service;

import java.util.Optional;

import com.drianodev.mfinancas.api.dto.UsuarioDTO;
import org.springframework.stereotype.Service;

import com.drianodev.mfinancas.model.entity.Usuario;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface UsuarioService {

	Usuario autenticar(String email, String senha);
	
	Usuario salvarUsuario(Usuario usuario);
	
	void validarEmail(String email);

	Optional<Usuario> obterPorId(Long id);

	Usuario editarUsuario(Usuario usuario);

	void excluirUsuario(Long id);
}
