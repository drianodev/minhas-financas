import Buttons from "../Components/Buttons";
import Body from "../Components/Body";
import Card from "../Components/Card";
import FormGroup from "../Components/FormGroup";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { autenticar } from "../config/usuarioService";
import { adicionarItem } from "../config/localstorageService";

import { mensagemErro } from "../Components/toastr";
import { logar } from "../config/AuthService";
import DadosContext from "../config/context/DadosContext";

function Login() {
  const [userData, setUserData] = useState({ email: '', senha: '' });
  const navigate = useNavigate()
  const { iniciarSessao } = useContext(DadosContext)

  const entrar = async () => {
    try {
      const login = await autenticar({
        email: userData.email,
        senha: userData.senha
      })
      login.status === 200 ?
        (
          iniciarSessao(login.data),
          navigate('/home')
        ) : null
    } catch (error) {
      error ?
        mensagemErro(error.response.data)
        : null
      setUserData({ email: '', senha: '' })
    }
  }

  return (
    <>
      <Body width="6">
        <Card title="Login">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <fieldset style={{ display: 'flex', flexDirection: "column", gap: '20px' }}>
                  <FormGroup
                    value={userData.email}
                    change={e => setUserData({ ...userData, email: e.target.value })}
                    label="Email: *"
                    id="exampleInputEmail1"
                    placeholder="Digite o seu email"
                    describedby="emailHelp"
                    type="email"
                  />
                  <FormGroup
                    value={userData.senha}
                    change={e => setUserData({ ...userData, senha: e.target.value })}
                    label="Senha: *"
                    id="exampleInputPassword1"
                    placeholder="Digite a sua senha"
                    describedby="passwordHelp"
                    type="password"
                  />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Buttons desc={<i className="pi pi-sign-in"> Entrar</i>} classe="success" onClick={entrar} />
                    <Buttons desc={<i className="pi pi-user-plus"> Cadastrar</i>} classe="danger" link linkTo="/cadastro-usuario" />
                  </div>

                </fieldset>
              </div>
            </div>
          </div>
        </Card>
      </Body>
    </>
  );
}

export default Login;
