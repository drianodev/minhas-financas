package com.drianodev.mfinancas.service.imp;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.drianodev.mfinancas.exceptions.ErroAutenticacaoException;
import com.drianodev.mfinancas.model.entity.Usuario;
import com.drianodev.mfinancas.model.repository.UsuarioRepository;
import com.drianodev.mfinancas.service.UsuarioService;


@Service
public class UsuarioServiceImp implements UsuarioService {
	
	private UsuarioRepository repository;
	
	public UsuarioServiceImp(UsuarioRepository repository) {
		super();
		this.repository = repository;
	}

	@Override
	public Usuario autenticar(String email, String senha) {
		Optional<Usuario> usuario = repository.findByEmail(email);
		
		if(!usuario.isPresent()) {
			throw new ErroAutenticacaoException(("Usuario não encontrado"));
		}
		
		if(!usuario.get().getSenha().equals(senha)){
			throw new ErroAutenticacaoException(("Senha inválida"));
		}
		return usuario.get();
	}

	@Override
	@Transactional
	public Usuario salvarUsuario(Usuario usuario) {
		validarEmail(usuario.getEmail());
		return repository.save(usuario);
	}

	@Override
	public void validarEmail(String email) {
		boolean existeEmail = repository.existsByEmail(email);
		
		if(existeEmail) {
			throw new ErroAutenticacaoException(("Email já cadastrado"));
		}
		
	}

	@Override
	public Optional<Usuario> obterPorId(Long id) {
		return repository.findById(id);
	}
	
	

}
