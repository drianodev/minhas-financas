import NavBarItem from "./NavBarItem";
import { removerUsuarioAutenticado, obterUsuarioLogado } from "../config/AuthService";
import { useContext, useState } from "react";
import DadosContext from "../config/context/DadosContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { usuario, encerrarSessao } = useContext(DadosContext)


  const usuarioAutenticado = () => {
    const usuarioLog = obterUsuarioLogado()
    if (usuario || usuarioLog) {
      return usuarioLog
    }
  }

  const logout = () => {
    encerrarSessao()
  }

  const navbar = [
    {
      descricao: 'Home',
      linkTo: '/home',
      onClick: '',
      icon: '',
      render: usuarioAutenticado()
    },
    {
      descricao: 'Login',
      linkTo: '/',
      onClick: '',
      icon: '',
      render: !usuarioAutenticado()
    },
    {
      descricao: 'Cadastrar usuário',
      linkTo: '/cadastro-usuario',
      onClick: '',
      icon: 'user-plus',
      render: !usuarioAutenticado()
    },
    {
      descricao: 'Meus Lançamentos',
      linkTo: '/consulta-lancamento',
      onClick: '',
      icon: '',
      render: usuarioAutenticado()
    },
    {
      descricao: 'Cadastrar Lancamentos',
      linkTo: '/cadastro-lancamento',
      onClick: '',
      icon: '',
      render: usuarioAutenticado()
    },
    {
      descricao: 'Sair',
      linkTo: '/',
      onClick: logout,
      icon: 'sign-out',
      render: usuarioAutenticado()
    },
  ]



  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark p-2"  >
      <div className="container-fluid" >
        <Link to="/home" className="navbar-brand ps-4" style={{ fontSize: '30px', fontWeight: 'bolder' }}>Minhas Finanças</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end " id="navbarResponsive">
          <ul className="navbar-nav justify-content-end pe-4" >
            {navbar.map((item, index) => (
              item.render ?
                <NavBarItem key={index} descricao={item.descricao} linkTo={item.linkTo} onClick={item.onClick} render={item.render} icon={item.icon} />

                : null))}
            {/*  <NavBarItem descricao="Home" linkTo='/home' />
            <NavBarItem descricao="Usuários" linkTo='/cadastro-usuario' />
            <NavBarItem descricao="Lançamentos" linkTo='/consulta-lancamento' />
            <NavBarItem descricao="Sair" linkTo='/' onClick={e => { logout() }} /> */}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Navbar;