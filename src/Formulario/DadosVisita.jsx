import { useState } from "react" //Serve para guardar e atualizar os dados dentro do componetnte
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper";

export default function DadosVisita() { //Criando componente chamado "DadosVisita" que é tipo uma função que retorna iterface HTML
    const navigate = useNavigate()

    const [dados, setDados] = useState({ //Criando o estado dos dados. 'dados -> valores atuais', setDados -> atualiza
        quemConvidou: "",
        setor: "",
        qntdVisitantes: 0, // agora começa como número
        data: "",
        horario: "",
    });

    const [erro, setErro] = useState({ //Criando um estado chamado "erro". 'erro -> guarda os erros atuais', setErro -> atualiza
        quemConvidou: "",
        setor: "",
        qntdVisitantes: "",
        data: "",
        horario: "",
    })


    function alterarDados(evento) { //Função de mudança. Essa função roda toda vez que o usuario digita
        const nomeCampo = evento.target.name; //Pega QUAL campo foi alterado
        let valor = evento.target.value; //Pega O QUE o usuario digitou

        // Se for número, converte
        if (nomeCampo === "qntdVisitantes") {
            valor = Number(valor);
        }

        setDados({ //mantém tudo o que já existia. Atualiza só o campo alterado
            ...dados,
            [nomeCampo]: valor
        });

        setErro({ //Limpa o erro daquele campo
            ...erro,
            [nomeCampo]: ""
        })
    }

    function enviarFormulario(evento) { //Executa quando clica em 'Enviar'
        evento.preventDefault();

        let novosErros = { //Cria novos erros. Começa "zerado"
            quemConvidou: "",
            setor: "",
            qntdVisitantes: "",
            data: "",
            horario: "",
        }

        if (!dados.quemConvidou) {
            novosErros.quemConvidou = "Esse campo é obrigatório"
        }

        if (!dados.setor) {
            novosErros.setor = "Esse campo é obrigatório"
        }

        if (!dados.qntdVisitantes || dados.qntdVisitantes <= 0) { //validação ajustada
            novosErros.qntdVisitantes = "Esse campo é obrigatório"
        }

        if (!dados.data) {
            novosErros.data = "Esse campo é obrigatório"
        }

        if (!dados.horario) {
            novosErros.horario = "Esse campo é obrigatório"
        }

        setErro(novosErros); //Atualiza estado de erro. Mostra os erros na tela

        if (
            novosErros.quemConvidou ||
            novosErros.setor ||
            novosErros.qntdVisitantes ||
            novosErros.data ||
            novosErros.horario
        ) {
            return; //Se qualquer campo tiver erro -> PARA aqui. Não envia.
        }

        //Só navega se estiver tudo certo
        localStorage.setItem("dadosVisita", JSON.stringify(dados));
        navigate("/InformacoesAdicionais");

        setDados({
            quemConvidou: "",
            setor: "",
            qntdVisitantes: 0,
            data: "",
            horario: "",
        })
    }

    return (
        <div>
            <Stepper etapaAtual={2} />
            <div>
                <h3>Dados da Visita</h3>
                <p>Preencha as informações da visita</p>
            </div>

            <div>
                <Link to={"/"}>
                    <button type="button">Voltar para Home</button>
                </Link>
            </div>

            <form onSubmit={enviarFormulario}>

                <input
                    type="text"
                    name="quemConvidou"
                    value={dados.quemConvidou}
                    onChange={alterarDados}
                    placeholder="Nome do colaborador"
                />
                {erro.quemConvidou && <p>{erro.quemConvidou}</p>}

                <input
                    type="text"
                    name="setor"
                    placeholder="Selecione o setor"
                    value={dados.setor}
                    onChange={alterarDados}
                />
                {erro.setor && <p>{erro.setor}</p>}

                <input
                    type="number"
                    name="qntdVisitantes"
                    value={dados.qntdVisitantes}
                    onChange={alterarDados}
                    placeholder="Quantidade de visitantes"
                    min="1" // impede valores inválidos
                />
                {erro.qntdVisitantes && <p>{erro.qntdVisitantes}</p>}

                <input
                    type="date"
                    name="data"
                    value={dados.data}
                    onChange={alterarDados}
                />
                {erro.data && <p>{erro.data}</p>}

                <input
                    type="time"
                    name="horario"
                    value={dados.horario}
                    onChange={alterarDados}
                />
                {erro.horario && <p>{erro.horario}</p>}

                <Link to={"/Formulario"}>
                    <button type="button">Anterior</button>
                </Link>

                <button type="submit">Próximo</button>

            </form>

        </div>
    )
}