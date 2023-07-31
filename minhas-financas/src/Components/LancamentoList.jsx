import currencyFormatter from 'currency-formatter'
import Buttons from './Buttons';



function LancamentoList({ caption, lancamento, edit, del, atualizaStatusEfetivado, atualizaStatusCancelado }) {

  const lancamentos = lancamento.map(item => (
    <tr key={item.id}>
      <td>{item.descricao}</td>
      <td>{currencyFormatter.format(item.valor, { locale: 'pt-BR' })}</td>
      <td>{item.tipo}</td>
      <td>{item.mes.toString().padStart(2, '0')}/{item.ano}</td>
      <td>{item.status}</td>
      <td style={{ display: 'flex', gap: '10px' }}>

        <Buttons
          desc={<i className="pi pi-check"></i>}
          classe="success"
          disabled={item.status !== "PENDENTE" ? true : false}
          onClick={e => atualizaStatusEfetivado(item.id, "EFETIVADO")} />

        <Buttons
          desc={<i className="pi pi-times "></i>}
          classe="warning" disabled={item.status !== "PENDENTE" ? true : false}
          onClick={e => atualizaStatusCancelado(item.id, "CANCELADO")} />

        <Buttons
          desc={<i className="pi pi-pencil "></i>}
          classe="primary"
          onClick={e => edit(item.id)} />

        <Buttons
          desc={<i className="pi pi-trash "></i>}
          classe="danger"
          onClick={e => del(item)} />
      </td>

    </tr>
  ))


  return (
    <table className="table table-hover table-striped caption-top">
      <caption>{caption}</caption>
      <thead className="table-light">
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Data</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {lancamentos}
      </tbody>
    </table>
  );
}

export default LancamentoList;