package com.henrique.mfinancas.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.henrique.mfinancas.model.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	// vai buscar no banco de dados se o email existe
	boolean existsByEmail(String email);
	
	// verifica se existe usuario com o email informado
	Optional<Usuario> findByEmail(String email);

}
