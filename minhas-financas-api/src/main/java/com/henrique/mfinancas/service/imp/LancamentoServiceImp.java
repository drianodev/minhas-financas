package com.henrique.mfinancas.service.imp;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.henrique.mfinancas.exceptions.RegraDeNegocioException;
import com.henrique.mfinancas.model.entity.Lancamento;
import com.henrique.mfinancas.model.enums.StatusLancamento;
import com.henrique.mfinancas.model.repository.LancamentoRepository;
import com.henrique.mfinancas.service.LancamentoService;
import com.henrique.mfinancas.model.enums.TipoLancamento;


@Service
public class LancamentoServiceImp implements LancamentoService {

	private LancamentoRepository repository;
	
	public LancamentoServiceImp(LancamentoRepository repository) {
		super();
		this.repository = repository;
	}

	@Override
	@Transactional
	public Lancamento salvar(Lancamento lancamento) {
		lancamento.setStatus(StatusLancamento.PENDENTE);
		validar(lancamento);
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

	@Override
	public void validar(Lancamento lancamento) {
		if(lancamento.getDescricao() == null || lancamento.getDescricao().trim().equals("")) {
			throw new RegraDeNegocioException(("Digite uma Descrição!"));
		}
		
		if(lancamento.getMes() == null || lancamento.getMes() < 1 || lancamento.getMes() > 12) {
			throw new RegraDeNegocioException(("Digite um Mês válido!"));
		}
		if(lancamento.getAno() == null || lancamento.getAno().toString().length() != 4) {
			throw new RegraDeNegocioException(("Digite um Ano válido!"));
		}
		if(lancamento.getUsuario() == null || lancamento.getUsuario().getId() == null) {
			throw new RegraDeNegocioException(("Usuário inválido !"));
		}
		if(lancamento.getValor() == null || lancamento.getValor().compareTo(BigDecimal.ZERO) < 1) {
			throw new RegraDeNegocioException(("Digite um Valor válido!"));
		}
		if(lancamento.getTipo() == null) {
			throw new RegraDeNegocioException(("Informe um tipo de lancamento."));
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
