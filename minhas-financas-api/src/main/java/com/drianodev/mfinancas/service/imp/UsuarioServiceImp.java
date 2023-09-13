package com.drianodev.mfinancas.service.imp;

import java.util.Optional;

import com.drianodev.mfinancas.exceptions.UsuarioNaoEncontradoException;
import com.drianodev.mfinancas.exceptions.RegraDeNegocioException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.drianodev.mfinancas.exceptions.ErroAutenticacaoException;
import com.drianodev.mfinancas.model.entity.Usuario;
import com.drianodev.mfinancas.model.repository.UsuarioRepository;
import com.drianodev.mfinancas.service.UsuarioService;


@Service
public class UsuarioServiceImp implements UsuarioService {
	
	private UsuarioRepository usuarioRepository;
	
	public UsuarioServiceImp(UsuarioRepository usuarioRepository) {
		super();
		this.usuarioRepository = usuarioRepository;
	}

	@Override
	public Usuario autenticar(String email, String senha) {
		Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
		
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
		return usuarioRepository.save(usuario);
	}

	@Override
	public void validarEmail(String email) {
		boolean existeEmail = usuarioRepository.existsByEmail(email);
		
		if(existeEmail) {
			throw new ErroAutenticacaoException(("Email já cadastrado"));
		}
		
	}

	@Override
	public Optional<Usuario> obterPorId(Long id) {
		return usuarioRepository.findById(id);
	}

	@Override
	@Transactional
	public Usuario editarUsuario(Usuario usuario) {
		if (usuario == null || usuario.getId() == null) {
			throw new RegraDeNegocioException("Usuário inválido.");
		}
//		validarEmail(usuario.getEmail());
		return usuarioRepository.save(usuario);
	}

	@Override
	@Transactional
	public void excluirUsuario(Long id) {
		Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
		if (!usuarioOpt.isPresent()) {
			throw new UsuarioNaoEncontradoException("Usuário não encontrado com o ID: " + id);
		}
		usuarioRepository.delete(usuarioOpt.get());
	}
}
