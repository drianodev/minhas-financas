package com.drianodev.mfinancas.model.repository;

import java.util.Optional;

import com.drianodev.mfinancas.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	// vai buscar no banco de dados se o email existe
	boolean existsByEmail(String email);
	
	// verifica se existe usuario com o email informado
	Optional<Usuario> findByEmail(String email);

}
