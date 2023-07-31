import { useContext, useEffect, useState } from "react";
import Body from "../Components/Body";
import Buttons from "../Components/Buttons";
import Card from "../Components/Card";
import FormGroup from "../Components/FormGroup";
import SelectMenu from "../Components/SelectMenu";
import { listaMes, listaTipo } from "../config/listas/listas";
import { obterItem } from "../config/localstorageService";
import { atualizar, obterPorId, salvar } from "../config/lancamentoService";
import { mensagemErro, mensagemSucesso } from "../Components/toastr";
import { useNavigate } from "react-router-dom";
import dadosContext from "../config/context/DadosContext";

function CadastroLancamento() {

    const [dadosFormulario, setDadosFormulario] = useState({ id: null, descricao: '', mes: '', ano: '', valor: '', tipo: '', status: '', usuario: null })
    const { lancamentoId, setLancamentoId } = useContext(dadosContext)
    const navigator = useNavigate()


    useEffect(() => {
        const editarItem = async () => {
            if (lancamentoId) {
                const data = await obterPorId(lancamentoId)
                setDadosFormulario({ ...data.data })
            }
        }
        editarItem()
    }, [])

    const handleChangeState = ({ name, value }) => {
        setDadosFormulario(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }



    const atualizarLancamento = async () => {
        const { descricao, mes, ano, valor, tipo, usuario, id, status } = dadosFormulario
        const lancamento = { descricao, mes, ano, valor, tipo, usuario, id, status }
        try {
            const dados = await atualizar(lancamento)
            if (dados.status === 200) {
                mensagemSucesso("Lancamento atualizado com sucesso")
                setLancamentoId('')
                return navigator("/consulta-lancamento")
            }
        } catch (error) {
            mensagemErro(error.response.data)
        }

    }

    const salvarLancamento = async () => {
        const usuarioLogado = obterItem("_USUARIO_LOGADO")
        const { descricao, mes, ano, valor, tipo } = dadosFormulario
        const lancamento = { descricao, mes, ano, valor, tipo, usuario: usuarioLogado.id }


        try {

            if (tipo === '') {
                mensagemErro("Selecione um tipo para o lancamento")
            }
            if (mes === '') {
                mensagemErro("Selecione o mes para o lancamento")
            }
            if (tipo && mes) {
                const salvo = await salvar(lancamento)
                if (salvo.status === 201) {
                    mensagemSucesso("Lancamento cadastrado com sucesso")
                    setDadosFormulario({ id: null, descricao: '', mes: '', ano: '', valor: '', tipo: '', status: '' })
                    navigator("/consulta-lancamento")
                }
            }


        } catch (error) {
            mensagemErro(error.response.data)
        }
    }

    const cancelar = () => {
        setDadosFormulario({ id: null, descricao: '', mes: '', ano: '', valor: '', tipo: '', status: '' })
        setLancamentoId('')
    }

    return (
        <>
            <Body>
                <Card title={lancamentoId ? "Atualização de Lancamento" : "Cadastro de Lancamento"}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <fieldset style={{ display: 'flex', flexDirection: "column", gap: '20px' }}>


                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="bs-component">
                                                <FormGroup
                                                    label="Descrição: *"
                                                    id="inputDescricao"
                                                    placeholder="Digite a Descrição"
                                                    type="text"
                                                    name="descricao"
                                                    value={dadosFormulario.descricao}
                                                    change={e => { handleChangeState(e.target) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={listaMes}
                                                    label="Mês: *"
                                                    id="mes"
                                                    value={dadosFormulario.mes}
                                                    change={e => { handleChangeState(e.target) }}
                                                    name="mes" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <FormGroup
                                                    label="Ano: *"
                                                    id="inputAno"
                                                    placeholder="Digite o ano"
                                                    type="number"
                                                    name="ano"
                                                    change={e => { handleChangeState(e.target) }}
                                                    value={dadosFormulario.ano}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="bs-component">
                                                <FormGroup
                                                    label="Valor: *"
                                                    id="inputValor"
                                                    placeholder="Digite o valor"
                                                    type="number"
                                                    name="valor"
                                                    change={e => { handleChangeState(e.target) }}
                                                    value={dadosFormulario.valor}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={listaTipo}
                                                    label="Tipo: *"
                                                    value={dadosFormulario.tipo}
                                                    change={e => { handleChangeState(e.target) }}
                                                    name="tipo"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="bs-component">
                                                <FormGroup label="Status:"
                                                    value={dadosFormulario.status}
                                                    disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Buttons classe="success" desc={lancamentoId ? <i className="pi pi-refresh"> Atualizar</i> : <i className="pi pi-save"> Salvar</i>}
                                            onClick={lancamentoId ? atualizarLancamento : salvarLancamento} />
                                        <Buttons classe="danger" desc={<i className="pi pi-times"> Cancelar</i>} link linkTo="/home" onClick={cancelar} />
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

export default CadastroLancamento;