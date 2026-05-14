import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper";
import "./styles/formulario.css";
import "./styles/stepper.css";

export default function DadosPessoais() {
    const navigate = useNavigate();

    const [dadosPessoais, setDadosPessoais] = useState({
        nome: "",
        email: "",
        empresa: "",
        cpf: "",
        telefone: ""
    });

    const [erros, setErro] = useState({
        nome: "",
        email: "",
        empresa: "",
        cpf: "",
        telefone: ""
    });

    function alterarValor(evento) {
        const nomeCampo = evento.target.name;
        const valor = evento.target.value;

        setDadosPessoais({
            ...dadosPessoais,
            [nomeCampo]: valor
        });

        setErro({
            ...erros,
            [nomeCampo]: ""
        });
    }

    async function enviarFormulario(evento) {
        evento.preventDefault();

        let novosErros = {
            nome: "",
            email: "",
            empresa: "",
            cpf: "",
            telefone: ""
        };

        if (!dadosPessoais.nome) novosErros.nome = "Nome é obrigatório";
        if (!dadosPessoais.email) novosErros.email = "Email é obrigatório";
        if (!dadosPessoais.empresa) novosErros.empresa = "Empresa é obrigatória";
        if (!dadosPessoais.cpf) novosErros.cpf = "CPF é obrigatório";
        if (!dadosPessoais.telefone) novosErros.telefone = "Telefone é obrigatório";

        setErro(novosErros);

        if (
            novosErros.nome ||
            novosErros.email ||
            novosErros.empresa ||
            novosErros.cpf ||
            novosErros.telefone
        ) {
            return;
        }

        try {
            localStorage.setItem("dadosPessoais", JSON.stringify(dadosPessoais));
            navigate("/DadosVisita");
        } catch (erro) {
            console.error("Erro ao salvar usuário:", erro);
        }

        setDadosPessoais({
            nome: "",
            email: "",
            empresa: "",
            cpf: "",
            telefone: ""
        });
    }

    return (
        <div className="form-page">
            <Stepper etapaAtual={1} />

            <div className="form-header">
                <h3 className="form-title">Dados Pessoais</h3>
                <p className="form-subtitle">Preencha suas informações</p>
            </div>

            <div className="form-nav">
                <Link to={"/"}>
                    <button type="button" className="form-button form-button-secondary">
                        Voltar para Home
                    </button>
                </Link>
            </div>

            <form onSubmit={enviarFormulario} className="form-container">

                <input
                    className="form-input"
                    name="nome"
                    type="text"
                    value={dadosPessoais.nome}
                    onChange={alterarValor}
                    placeholder="Digite seu nome"
                />
                {erros.nome && <p className="form-error">{erros.nome}</p>}

                <input
                    className="form-input"
                    name="cpf"
                    type="text"
                    value={dadosPessoais.cpf}
                    onChange={alterarValor}
                    placeholder="Digite seu CPF"
                />
                {erros.cpf && <p className="form-error">{erros.cpf}</p>}

                <input
                    className="form-input"
                    name="telefone"
                    type="text"
                    value={dadosPessoais.telefone}
                    onChange={alterarValor}
                    placeholder="Digite seu telefone"
                />
                {erros.telefone && <p className="form-error">{erros.telefone}</p>}

                <input
                    className="form-input"
                    name="email"
                    type="email"
                    value={dadosPessoais.email}
                    onChange={alterarValor}
                    placeholder="Digite seu email"
                />
                {erros.email && <p className="form-error">{erros.email}</p>}

                <input
                    className="form-input"
                    name="empresa"
                    type="text"
                    value={dadosPessoais.empresa}
                    onChange={alterarValor}
                    placeholder="Digite o nome da empresa"
                />
                {erros.empresa && <p className="form-error">{erros.empresa}</p>}

                <div className="form-buttons">
                    <Link to={"/ApresentacaoAssistente"}>
                        <button
                            type="button"
                            className="form-button form-button-secondary"
                        >
                            Anterior
                        </button>
                    </Link>

                    <button
                        type="submit"
                        className="form-button form-button-primary"
                    >
                        Próximo
                    </button>
                </div>
            </form>
        </div>
    );
}