import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Stepper from "../components/Stepper";

export default function InformacoesAdicionais() {

    const navigate = useNavigate();

    const [informacoesAdicionais, setInformacoesAdicionais] = useState({
        tipoVisitante: "",
        placaVeiculo: "",
        observacao: ""
    });

    const [erros, setErro] = useState({
        tipoVisitante: "",
        placaVeiculo: "",
        observacao: ""
    });

    function alterarValor(evento) {
        const nomeCampo = evento.target.name;
        const valor = evento.target.value;

        setInformacoesAdicionais({
            ...informacoesAdicionais,
            [nomeCampo]: valor
        });

        setErro({
            ...erros,
            [nomeCampo]: ""
        });
    }

    function enviarFormulario(evento) {
        evento.preventDefault();

        let novosErros = {
            tipoVisitante: "",
            placaVeiculo: "",
            observacao: ""
        };

        if (!informacoesAdicionais.tipoVisitante) {
            novosErros.tipoVisitante = "Tipo de visitante é obrigatório";
        }

        setErro(novosErros);

        if (novosErros.tipoVisitante) {
            return;
        }

        const dadosPessoais = JSON.parse(localStorage.getItem("dadosPessoais"));
        const dadosVisita = JSON.parse(localStorage.getItem("dadosVisita"));

        const payload = {
            ...dadosPessoais,
            ...dadosVisita,
            ...informacoesAdicionais
        };

        axios.post("http://localhost:8080/cadastro-visitante", payload)
            .then(res => {
                console.log("Salvo com sucesso:", res.data);
                navigate("/ProximaPagina");
            })
            .catch(err => {
                console.log("Erro ao salvar:", err);
            });

        setInformacoesAdicionais({
            tipoVisitante: "",
            placaVeiculo: "",
            observacao: ""
        });
    }

    return (
        <div>
            <Stepper etapaAtual={3} />
            <div>
                <h3>Informações Adicionais</h3>
                <p>Complete com dados complementares</p>
            </div>

            <div>
                <Link to={"/"}>
                    <button type="button">Voltar para Home</button>
                </Link>
            </div>

            <form onSubmit={enviarFormulario}>

                <select
                    name="tipoVisitante"
                    value={informacoesAdicionais.tipoVisitante}
                    onChange={alterarValor}
                >
                    <option value="">Selecione o tipo</option>
                    <option value="visitante">Visitante</option>
                    <option value="fornecedor">Fornecedor</option>
                    <option value="prestador">Prestador de serviço</option>
                    <option value="entrevista">Entrevista</option>
                </select>

                {erros.tipoVisitante && <p>{erros.tipoVisitante}</p>}

                <input
                    type="text"
                    name="placaVeiculo"
                    value={informacoesAdicionais.placaVeiculo}
                    onChange={alterarValor}
                    placeholder="ABC-1234"
                />

                {erros.placaVeiculo && <p>{erros.placaVeiculo}</p>}

                <input
                    type="text"
                    name="observacao"
                    value={informacoesAdicionais.observacao}
                    onChange={alterarValor}
                    placeholder="Ex: necessidades especiais, materiais que trará"
                />

                {erros.observacao && <p>{erros.observacao}</p>}

                <Link to={"/DadosVisita"}>
                    <button type="button">Anterior</button>
                </Link>

                <button type="submit">Próximo</button>

            </form>

        </div>
    );
}