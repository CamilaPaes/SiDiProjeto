import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Stepper from "../components/Stepper";
import "./styles/stepper.css";
import "./styles/revisao.css";

export default function Revisao() {

    const navigate = useNavigate();

    const dadosPessoais =
        JSON.parse(localStorage.getItem("dadosPessoais")) || {};

    const dadosVisita =
        JSON.parse(localStorage.getItem("dadosVisita")) || {};

    const informacoesAdicionais =
        JSON.parse(localStorage.getItem("informacoesAdicionais")) || {};

    function enviarFormulario() {

        const payload = {
            ...dadosPessoais,
            ...dadosVisita,
            ...informacoesAdicionais
        };

        axios.post(
            "http://localhost:8080/cadastro-visitante",
            payload
        )
            .then((resposta) => {

                console.log(
                    "Cadastro realizado com sucesso",
                    resposta.data
                );

                localStorage.removeItem("dadosPessoais");
                localStorage.removeItem("dadosVisita");
                localStorage.removeItem("informacoesAdicionais");
                navigate("/");
            })

            .catch((erro) => {
                console.log("Erro ao cadastrar", erro);
            });
    }

    return (
        <div className="form-page">

            <Stepper etapaAtual={4} />

            <div className="form-header">

                <h3 className="form-title">
                    Revisão dos Dados
                </h3>

                <p className="form-subtitle">
                    Confira todas as informações antes de enviar
                </p>

            </div>

            <div className="form-container">


                <div className="review-card">

                    <h2 className="review-title">
                        Dados Pessoais
                    </h2>

                    <div className="review-item">
                        <span>Nome Completo</span>
                        <strong>{dadosPessoais.nome || "-"}</strong>
                    </div>

                    <div className="review-item">
                        <span>CPF/Documento</span>
                        <strong>{dadosPessoais.cpf || "-"}</strong>
                    </div>

                    <div className="review-item">
                        <span>Email</span>
                        <strong>{dadosPessoais.email || "-"}</strong>
                    </div>

                    <div className="review-item">
                        <span>Telefone</span>
                        <strong>{dadosPessoais.telefone || "-"}</strong>
                    </div>

                    <div className="review-item">
                        <span>Empresa</span>
                        <strong>{dadosPessoais.empresa || "-"}</strong>
                    </div>

                </div>


                <div className="review-card">

                    <h2 className="review-title">
                        Dados da Visita
                    </h2>

                    <div className="review-item">
                        <span>Convidado por</span>
                        <strong>{dadosVisita.quemConvidou || "-"}</strong>
                    </div>

                    <div className="review-item">
                        <span>Setor/Departamento</span>
                        <strong>{dadosVisita.setor || "-"}</strong>
                    </div>

                    <div className="review-item">
                        <span>Quantidade de visitantes</span>
                        <strong>{dadosVisita.qntdVisitantes || "-"}</strong>
                    </div>

                    <div className="review-item">
                        <span>Data</span>
                        <strong>{dadosVisita.data || "-"}</strong>
                    </div>

                    <div className="review-item">
                        <span>Horário</span>
                        <strong>{dadosVisita.horario || "-"}</strong>
                    </div>

                </div>


                <div className="review-card">

                    <h2 className="review-title">
                        Informações Adicionais
                    </h2>

                    <div className="review-item">
                        <span>Tipo de visitante</span>
                        <strong>
                            {informacoesAdicionais.tipoVisitante || "-"}
                        </strong>
                    </div>

                    <div className="review-item">
                        <span>Placa do veículo</span>
                        <strong>
                            {informacoesAdicionais.placaVeiculo || "-"}
                        </strong>
                    </div>

                    <div className="review-item">
                        <span>Observação</span>
                        <strong>
                            {informacoesAdicionais.observacao || "-"}
                        </strong>
                    </div>

                </div>

                <div className="lgpd-box">

                    Seus dados serão utilizados apenas para controle
                    de acesso e identificação conforme a LGPD.

                </div>

                <div className="form-buttons">

                    <Link to={"/InformacoesAdicionais"}>

                        <button
                            type="button"
                            className="form-button form-button-secondary"
                        >
                            Anterior
                        </button>

                    </Link>

                    <button
                        type="button"
                        className="form-button form-button-primary"
                        onClick={enviarFormulario}
                    >
                        Enviar
                    </button>

                </div>

            </div>

        </div>
    );
}