package com.drianodev.mfinancas.api.resource;

import java.math.BigDecimal;
import java.util.Optional;

import com.drianodev.mfinancas.exceptions.ErroAutenticacaoException;
import com.drianodev.mfinancas.exceptions.RegraDeNegocioException;
import com.drianodev.mfinancas.model.entity.Usuario;
import com.drianodev.mfinancas.service.LancamentoService;
import com.drianodev.mfinancas.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.drianodev.mfinancas.api.dto.UsuarioDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioResource {
	
	private final UsuarioService usuarioService;
	private final LancamentoService lancamentoService;
	
	@PostMapping("/autenticar")
	public ResponseEntity autenticar(@RequestBody UsuarioDTO dto) {
		try {
			Usuario autenticarUsuario = usuarioService.autenticar(dto.getEmail(), dto.getSenha());
			return ResponseEntity.ok(autenticarUsuario);
		}catch (ErroAutenticacaoException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody UsuarioDTO dto) {
		Usuario usuario = Usuario.builder()
				.nome(dto.getNome())
				.email(dto.getEmail())
				.senha(dto.getSenha()).build();
		try {
			Usuario usuarioSalvo = usuarioService.salvarUsuario(usuario);
			return new ResponseEntity(usuarioSalvo, HttpStatus.CREATED);
		}catch (ErroAutenticacaoException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("{id}/saldo")
	public ResponseEntity obterSaldo(@PathVariable("id") Long id) {
		Optional<Usuario> usuario = usuarioService.obterPorId(id);
		
		if(!usuario.isPresent()) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		BigDecimal saldo = lancamentoService.obterSaldoPorUsuario(id);
		return ResponseEntity.ok(saldo);
	}

	@PutMapping("/{id}")
	public ResponseEntity editar(@PathVariable("id") Long id, @RequestBody UsuarioDTO dto) {

		Optional<Usuario> usuario = usuarioService.obterPorId(id);
		if (!usuario.isPresent()) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		Usuario usuarioAtualizado = usuario.get();
		usuarioAtualizado.setNome(dto.getNome());
		usuarioAtualizado.setEmail(dto.getEmail());
		usuarioAtualizado.setSenha(dto.getSenha());
		try {
			usuarioService.editarUsuario(usuarioAtualizado);
			return ResponseEntity.ok(usuarioAtualizado);
		} catch (RegraDeNegocioException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}


	@DeleteMapping("/{id}")
	public ResponseEntity excluir(@PathVariable("id") Long id) {
		Optional<Usuario> usuario = usuarioService.obterPorId(id);
		if (!usuario.isPresent()) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		usuarioService.excluirUsuario(id);
		return ResponseEntity.noContent().build();
	}

}
