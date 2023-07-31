import { useContext, useEffect, useState } from "react";
import Body from "../Components/Body";
import Buttons from "../Components/Buttons";
import Card from "../Components/Card";
import FormGroup from "../Components/FormGroup";
import LancamentoList from "../Components/LancamentoList";
import SelectMenu from "../Components/SelectMenu";
import { atualizarStatus, buscarLancamento, deletarLancamento } from "../config/lancamentoService";
import { obterItem } from "../config/localstorageService";
import { listaMes, listaTipo } from "../config/listas/listas";
import { mensagemAlerta, mensagemErro, mensagemSucesso } from "../Components/toastr";
import { ConfirmDialog } from 'primereact/confirmdialog';
import DadosContext from "../config/context/DadosContext";
import { useNavigate } from "react-router-dom";
import { USUARIO_LOGADO } from "../config/AuthService";



function ConsultaLancamento() {
    const [filtro, setFiltro] = useState({ ano: '', mes: '', tipo: '', descricao: '' })
    const [lancamento, setLancamento] = useState([])
    const [dialogData, setDialogData] = useState({ show: false, data: {} })
    const { setLancamentoId } = useContext(DadosContext)
    const navigator = useNavigate()


    useEffect(() => {
        const dados = async () => {
            const usuarioLogado = obterItem('_USUARIO_LOGADO')

            const lancamentoFiltro = { usuario: usuarioLogado.id }
            try {

                const dados = await buscarLancamento(lancamentoFiltro)
                const mostrarDados = dados.data.slice(0, 5)
                setLancamento(mostrarDados)
            } catch (error) {
                if (error.response) {
                    mensagemErro(error.response.data)
                }
            }

        }
        dados()
    }, [])


    useEffect(() => {
    }, [dialogData])

    const buscar = async () => {
        const usuarioLogado = obterItem(USUARIO_LOGADO)
        const lancamentoFiltro = {
            ano: filtro.ano,
            mes: filtro.mes,
            tipo: filtro.tipo,
            usuario: usuarioLogado.id,
            descricao: filtro.descricao
        }
        try {
            const dados = await buscarLancamento(lancamentoFiltro)
            if (dados.data.length < 1) {
                mensagemAlerta("Não foi encontrado lançamento para os parametros")
                setLancamento([])
            } else {
                setLancamento(dados.data)
            }
        } catch (error) {
            if (error.response) {
                mensagemErro(error.response.data)
            }
        }

    }

    const alteraStatus = async (id, status) => {

        try {
            const response = await atualizarStatus(id, status)
            if (response.status === 200) {
                mensagemSucesso("Lancamento alterado com sucesso")
                buscar()
            }
        } catch (error) {
            mensagemErro(error.response.data)
        }
    }

    const handleEditChange = (id) => {
        setLancamentoId(id)
        navigator("/cadastro-lancamento")

    }

    const mostraDialog = (lancamento) => {
        setDialogData({ show: true, data: lancamento })
    }

    const handleDeleteChange = async () => {

        try {
            const deletar = await deletarLancamento(dialogData.data.id)
            if (deletar.status === 204) {
                const novaLista = lancamento.filter(item => item.id !== dialogData.data.id)
                setLancamento(novaLista)
                mensagemSucesso("Lancamento deletado com sucesso")
            }
        } catch (error) {
            mensagemErro(error.response.data)
        }
    }

    const handleRejectChange = () => {
        setDialogData({ show: false, data: {} })
    }

    return (
        <>
            <Body>
                <Card title="Consulta Lançamento">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <fieldset style={{ display: 'flex', flexDirection: "column", gap: '20px' }}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={listaMes}
                                                    label="Mês: *"
                                                    id="mes"
                                                    value={filtro.mes}
                                                    change={e => setFiltro({ ...filtro, mes: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <FormGroup
                                                    value={filtro.ano}
                                                    change={e => setFiltro({ ...filtro, ano: e.target.value })}
                                                    type="text"
                                                    className="form-control"
                                                    id="inputAno"
                                                    label="Ano: *"
                                                    placeholder="Digite o Ano"
                                                    name="inputAno" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <FormGroup
                                                    value={filtro.descricao}
                                                    change={e => setFiltro({ ...filtro, descricao: e.target.value })}
                                                    type="text"
                                                    className="form-control"
                                                    id="inputDescricao"
                                                    label="Descricao: "
                                                    placeholder="Digite a Descricao"
                                                    name="inputDescricao" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={listaTipo}
                                                    label="Tipo de Lançamento:"
                                                    id="tipoLancamento"
                                                    value={filtro.tipo}
                                                    change={e => setFiltro({ ...filtro, tipo: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Buttons desc={<i className="pi pi-search"> Buscar</i>} classe="success" onClick={buscar} />
                                        <Buttons desc={<i className="pi pi-plus"> Cadastrar</i>} classe="danger" link linkTo="/cadastro-lancamento" />
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LancamentoList
                                    caption="# Lista de Lançamentos"
                                    lancamento={lancamento}
                                    atualizaStatusEfetivado={alteraStatus}
                                    atualizaStatusCancelado={alteraStatus}
                                    edit={handleEditChange}
                                    del={mostraDialog} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <ConfirmDialog visible={dialogData.show}
                            onHide={() => setDialogData({ show: false, data: {} })}
                            message="Tem certeza que deseja deletar?"
                            header="Confirmation"
                            icon="pi pi-exclamation-triangle"
                            accept={handleDeleteChange}
                            reject={handleRejectChange}
                        />
                    </div>
                </Card>
            </Body>
        </>
    );
}

export default ConsultaLancamento;