import { Routes, Route } from 'react-router-dom'
import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';
import Home from '../views/Home';
import ConsultaLancamento from '../views/ConsultaLancamento';
import CadastroLancamento from '../views/CadastroLancamento';
import RoutePrivate from './RoutePrivate';

function rotas() {

    const routes = [
        {
            path: '/',
            component: <Login />,
            isPrivate: false
        },
        {
            path: '/cadastro-usuario',
            component: <CadastroUsuario />,
            isPrivate: false
        },
        {
            path: '/home',
            component: <Home />,
            isPrivate: true
        },
        {
            path: '/consulta-lancamento',
            component: <ConsultaLancamento />,
            isPrivate: true
        },
        {
            path: '/cadastro-lancamento',
            component: <CadastroLancamento />,
            isPrivate: true
        },
    ]


    return (

        <Routes>
            {routes.map((item, index) => (
                <Route key={index}
                    path={item.path}
                    element={
                        <RoutePrivate isPrivate={item.isPrivate}>
                            {item.component}
                        </RoutePrivate>
                    } />
            ))}
            {/* <Route path='/' element={<Login />} />
            <Route path='/home' element={
                <RoutePrivate>
                    <Home />
                </RoutePrivate>
            } />
            <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
            <Route path='/consulta-lancamento' element={<ConsultaLancamento />} />
            <Route path='/cadastro-lancamento' element={<CadastroLancamento />} /> */}
        </Routes>

    );
}

export default rotas;