import { Navigate } from "react-router-dom";
import { obterItem } from "../config/localstorageService";
import { isUsuarioAutenticado } from "../config/AuthService";

function RoutePrivate({ children, isPrivate }) {

    const usuarioLogado = isUsuarioAutenticado()

    if (isPrivate && !usuarioLogado) {
        return <Navigate to="/" />
    }

    return (
        <>
            {children}
        </>
    );
}

export default RoutePrivate;