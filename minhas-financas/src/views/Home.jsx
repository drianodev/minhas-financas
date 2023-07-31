import { useEffect, useState } from 'react';
import Body from '../Components/Body';
import Buttons from '../Components/Buttons';
import Card from '../Components/Card';
import { obterSaldo } from '../config/usuarioService';
import currencyFormatter from 'currency-formatter'
import {  obterUsuarioLogado } from '../config/AuthService';

function Home() {
    const [saldo, setSaldo] = useState()
    const[dados, setDados] = useState()

    useEffect(() => {
        const dadosDoUsuario = obterUsuarioLogado()
        const valor = async () => {
            const request = await obterSaldo(dadosDoUsuario.id)
            setDados(dadosDoUsuario.nome)
            setSaldo(request.data)
        }
        valor()
    }, [])



    return (
        <Body>
            <Card title="Minhas Finanças">
                <h1 className="display-4">Bem vindo, {dados} !</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {currencyFormatter.format(saldo, { locale: 'pt-BR' })}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead" style={{ display: 'flex', gap: '20px' }}>
                    <Buttons classe="success btn-lg" desc={<i className="pi pi-book"> Meus Lançamentos</i>} link linkTo='/consulta-lancamento' />
                    <Buttons classe="danger btn-lg" desc={<i className="pi pi-money-bill"> Cadastrar Lançamento</i>} link linkTo={'/cadastro-lancamento'} />
                </p>
            </Card>
        </Body>
    );
}

export default Home;