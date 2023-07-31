import Rotas from './rotas'
import Navbar from "../Components/Navbar";
import { DadosContextProvider } from '../config/context/DadosContext';
import "bootstrap/dist/css/bootstrap.min.css";
import 'toastr/build/toastr.css'
import '../custom.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css'

import 'toastr/build/toastr.min.js'
function App() {


    return (
        <>
            <DadosContextProvider>
                <Navbar />
                <Rotas />
            </DadosContextProvider>
        </>
    );
}

export default App;
