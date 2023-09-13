import { useEffect, useState } from 'react';
import Body from '../Components/Body';
import Card from '../Components/Card';
import {  obterUsuarioLogado } from '../config/AuthService';

function ConfiguracoesConta() {
    const[dados, setDados] = useState()

    useEffect(() => {
        const dadosDoUsuario = obterUsuarioLogado()
        console.log(dadosDoUsuario);
        const valor = async () => {
            setDados(dadosDoUsuario.nome)
        }
        valor()
    }, [])

    return (
        <Body>
            <Card title="Configurações do seu perfil:">
                <h1 className="display-4">Bem vindo {dados}!</h1>
            </Card>
        </Body>
    );
}

export default ConfiguracoesConta;