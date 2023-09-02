package com.drianodev.mfinancas.model.repository;

import java.math.BigDecimal;

import com.drianodev.mfinancas.model.entity.Lancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.drianodev.mfinancas.model.enums.StatusLancamento;
import com.drianodev.mfinancas.model.enums.TipoLancamento;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

	@Query(value="select sum(lancamento.valor) from Lancamento lancamento join lancamento.usuario user "
			+ "where user.id = :idUsuario and lancamento.tipo = :tipo and lancamento.status = :status group by user")
	BigDecimal obterSaldoPorTipoLancamentoEUsuarioEStatus(@Param("idUsuario") Long idUsuario,
			@Param("tipo") TipoLancamento tipo, @Param("status") StatusLancamento status );
}
