import { useEffect, useState } from "react";
import Body from "../Components/Body";
import Card from "../Components/Card";
import FormGroup from "../Components/FormGroup";
import Buttons from "../Components/Buttons";
import { salvarUsuario } from "../config/usuarioService";
import { useNavigate } from "react-router-dom";
import { mensagemErro, mensagemSucesso } from "../Components/toastr";
import { obterItem } from "../config/localstorageService";

function CadastroUsuario() {
    const [userDados, setUserDados] = useState({ nome: '', email: '', senha: '', confirmaSenha: '' })
    const [formError, setFormError] = useState({})
    const navigator = useNavigate()

    // verifica se tem alguma alteração no formError, e se caso tenha, quando clicar no botão cadastrar ira disparar as mensagens
    useEffect(() => {
        Object.entries(formError).forEach(value => {
            mensagemErro(value[1])
        })
    }, [formError])

    // Alimenta o userDados
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDados((prevUserDados) => ({
            ...prevUserDados,
            [name]: value
        }))

    }
    // verifica se os campos estão vazios
    const verificaCampo = (campo) => {
        return campo.trim() === '' ? true : false
    }

    // validações dos campos do form
    const validarForm = () => {
        let erros = {}
        const validaNome = verificaCampo(userDados.nome)
        const validaEmail = verificaCampo(userDados.email)
        const validaSenha = verificaCampo(userDados.senha)
        const validaConfirmarSenha = verificaCampo(userDados.confirmaSenha)

        validaNome ? erros["nome"] = 'Digite seu nome' : ''
        validaEmail ? erros["email"] = 'Digite um email valido' : ''
        if (!validaEmail) {
            const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/
            userDados.email.match(re) ? '' : erros["email"] = 'Digite um email valido'
        }

        if (validaSenha) {
            erros['senha'] = 'Digite a sua senha'
        } else if (!validaSenha && validaConfirmarSenha) {
            erros['senha'] = 'Repita a sua senha'
        } else if (!validaSenha && !validaConfirmarSenha && userDados.senha !== userDados.confirmaSenha) {
            erros['senha'] = 'Senha não confere'
        }
        setFormError(erros)

        if (Object.entries(erros).length < 1) {
            cadastrar()
        }
    }


    const cadastrar = async () => {
        try {
            const request = await salvarUsuario(userDados)
            if (request.status === 201) {
                mensagemSucesso('Dados salvos com sucesso, faça login para acessar o sistema')
                navigator('/')
            }
        } catch (erro) {
            mensagemErro(erro.response.data)
            setUserDados({ nome: '', email: '', senha: '', confirmaSenha: '' })
        }
    }

    return (
        <Body>
            <Card title="Cadastro de Usuario">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset style={{ display: 'flex', flexDirection: "column", gap: '20px' }}>
                                <FormGroup
                                    value={userDados.nome}
                                    change={handleChange}
                                    label="Nome: *"
                                    id="inputNome"
                                    placeholder="Digite o seu nome"
                                    describedby="nameHelp"
                                    type="text"
                                    name="nome"
                                    required
                                />
                                <FormGroup
                                    value={userDados.email}
                                    change={handleChange}
                                    label="Email: *"
                                    id="inputEmail"
                                    placeholder="Digite o seu email"
                                    type="email"
                                    name="email"
                                    required
                                />
                                <FormGroup
                                    value={userDados.senha}
                                    change={handleChange}
                                    label="Senha: *"
                                    id="inputSenha"
                                    placeholder="Digite a sua senha"
                                    type="password"
                                    name="senha"
                                    required
                                />
                                <FormGroup
                                    value={userDados.confirmaSenha}
                                    change={handleChange}
                                    label="Repita a sua senha: *"
                                    id="inputRepitaSenha"
                                    placeholder="Digite a sua senha"
                                    type="password"
                                    name="confirmaSenha"
                                    required
                                />
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Buttons classe="success" desc="Salvar" onClick={validarForm} />
                                    <Buttons classe="danger" desc="Cancelar" link linkTo={obterItem("_USUARIO_LOGADO") ? "/home" : "/"} />
                                </div>

                            </fieldset>
                        </div>
                    </div>
                </div>
            </Card>
        </Body>
    );
}

export default CadastroUsuario;