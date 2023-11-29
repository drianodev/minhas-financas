package com.drianodev.mfinancas.service.imp;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.drianodev.mfinancas.service.validacao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.drianodev.mfinancas.exceptions.RegraDeNegocioException;
import com.drianodev.mfinancas.model.entity.Lancamento;
import com.drianodev.mfinancas.model.enums.StatusLancamento;
import com.drianodev.mfinancas.model.repository.LancamentoRepository;
import com.drianodev.mfinancas.service.LancamentoService;
import com.drianodev.mfinancas.model.enums.TipoLancamento;

@Service
public class LancamentoServiceImp implements LancamentoService {

	private LancamentoRepository repository;

	private ValidacaoStrategy validacaoStrategy;

	@Autowired
	public LancamentoServiceImp(LancamentoRepository repository) {
		this.repository = repository;
	}

	@Override
	@Transactional
	public Lancamento salvar(Lancamento lancamento) {
		lancamento.setStatus(StatusLancamento.PENDENTE);
		List<ValidacaoStrategy> estrategiasDeValidacao = Arrays.asList(
				new ValidacaoDescricao(),
				new ValidacaoMes(),
				new ValidacaoAno(),
				new ValidacaoUsuario(),
				new ValidacaoValor(),
				new ValidacaoTipo()
		);
		validar(lancamento, estrategiasDeValidacao);
		return repository.save(lancamento);
	}

	@Override
	@Transactional
	public Lancamento atualizar(Lancamento lancamento) {
		Objects.requireNonNull(lancamento.getId());
		return repository.save(lancamento);
	}

	@Override
	@Transactional
	public void deletar(Lancamento lancamento) {
		Objects.requireNonNull(lancamento.getId());
		repository.delete(lancamento);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Lancamento> buscar(Lancamento FiltroLancamento) {
		Example example = Example.of(FiltroLancamento, ExampleMatcher.matching()
				.withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING));
		return repository.findAll(example);
	}

	@Override
	public void atualizarStatus(Lancamento lancamento, StatusLancamento status) {
		// TODO Auto-generated method stub
		
	}

	public void setValidacaoStrategy(ValidacaoStrategy validacaoStrategy) {
		this.validacaoStrategy = validacaoStrategy;
	}

	@Override
	public void validar(Lancamento lancamento, List<ValidacaoStrategy> estrategias) {
		for (ValidacaoStrategy estrategia : estrategias) {
			estrategia.validar(lancamento);
		}
	}

	@Override
	public Optional<Lancamento> obterPorId(Long id) {
		return repository.findById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public BigDecimal obterSaldoPorUsuario(Long id) {
		BigDecimal receita = repository.obterSaldoPorTipoLancamentoEUsuarioEStatus(id, TipoLancamento.RECEITA, StatusLancamento.EFETIVADO);
		BigDecimal despesa = repository.obterSaldoPorTipoLancamentoEUsuarioEStatus(id, TipoLancamento.DESPESA, StatusLancamento.EFETIVADO);
		
		receita = (receita == null) ? BigDecimal.ZERO : receita;
		despesa = (despesa == null) ? BigDecimal.ZERO : despesa;

		
		return receita.subtract(despesa);
	}
}
