import { createContext, useState} from "react";
import { logar, removerUsuarioAutenticado } from "../AuthService";

const DadosContext = createContext({})

export const DadosContextProvider = ({children}) =>{
    const [lancamentoId, setLancamentoId] = useState()
    const [usuario, setUsuario] = useState({
        isAutenticado: false,
        usuarioAutenticado: null
    })

    const iniciarSessao = (usuario) =>{
        logar(usuario)
        setUsuario({
            isAutenticado: true,
            usuarioAutenticado: usuario
        })

    }

    const encerrarSessao = () =>{
        removerUsuarioAutenticado()
        setUsuario({
            isAutenticado: false,
            usuarioAutenticado: null
        })
    }

    return(
        <DadosContext.Provider value={{lancamentoId, setLancamentoId, usuario,  iniciarSessao, encerrarSessao}}>
            {children}
        </DadosContext.Provider>
    )
}

export default DadosContext;