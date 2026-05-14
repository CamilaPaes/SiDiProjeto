import { useState } from "react" //Serve para guardar e atualizar os dados dentro do componetnte
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper";

export default function DadosPessoais() { //Criando componente chamado "DadosPessoais" que é tipo uma função que retorna iterface HTML
    const navigate = useNavigate()

    const [dadosPessoais, setDadosPessoais] = useState({ //Criando o estado dos dados pessoais. 'dadosPessoais -> valores atuais', setDadosPessoais -> atualiza
        nome: "",
        email: "",
        empresa: "",
        cpf: "",
        telefone: ""

    });

    const [erros, setErro] = useState({ //Criando um estado chamado "erro". 'erro' -> guarda os erros atuais, 'setErro' -> atualiza os erros
        nome: "",
        email: "",
        empresa: "",
        cpf: "",
        telefone: ""
    })


    function alterarValor(evento) { //Função de mudança. Essa função roda toda vez que o usuario digita
        const nomeCampo = evento.target.name; //Pega QUAL campo foi alterado. Ex: 'nome', 'email' ou 'empresa'
        const valor = evento.target.value; //Pega O QUE o usuario digitou. Ex: 'Camila', 'gmail@email.com'

        setDadosPessoais({ //mantém tudo o que já existia. Atualiza só o campo alterado
            ...dadosPessoais,
            [nomeCampo]: valor
        });

        setErro({ //Limpa o erro daquele campo. Quando o usuario começa a digitar, o erro daquele campo some
            ...erros,
            [nomeCampo]: ""
        });

    }


    async function enviarFormulario(evento) { //Executa quando clica em 'Enviar'
        evento.preventDefault(); //Impede a página de recarregar

        let novosErros = { //Cria novos erros. Começa "zerado"
            nome: "",
            email: "",
            empresa: "",
            cpf: "",
            telefone: "" //Novo campo telefone
        };

        if (!dadosPessoais.nome) { //Valida nome
            novosErros.nome = "Nome é obrigatório"; //Se tiver vazio cria erro
        }

        if (!dadosPessoais.email) { //Valida email
            novosErros.email = "Email é obrigatório"; //Se tiver vazio cria erro
        }

        if (!dadosPessoais.empresa) { //Valida empresa
            novosErros.empresa = "Empresa é obrigatória";
        }

        if (!dadosPessoais.cpf) { //Valida cpf
            novosErros.cpf = "CPF é obrigatório";
        }

        if (!dadosPessoais.telefone) { //Valida telefone
            novosErros.telefone = "Telefone é obrigatório";
        }

        setErro(novosErros); //Atualiza estado de erro. Mostra os erros na tela

        if (novosErros.nome || novosErros.email || novosErros.empresa || novosErros.cpf || novosErros.telefone) { //Verifica se tem erro. 
            return; //Se qualquer campo tiver erro -> PARA aqui. Não envia.
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


        <div>
            <Stepper etapaAtual={1} />
            <div>
                <h3>Dados Pessoais</h3>
                <p>Preencha suas informações</p>
            </div>

            <div>
                <Link to={"/"}>
                    <button type="button">Voltar para Home</button>
                </Link>
            </div>

            <form onSubmit={enviarFormulario}> {/*Quando clicar em Enviar, chama a função*/}
                <input name="nome" type="text" value={dadosPessoais.nome} onChange={alterarValor} placeholder="Digite seu nome" />
                {erros.nome && <p>{erros.nome}</p>}

                <input type="text" name="cpf" value={dadosPessoais.cpf} onChange={alterarValor} placeholder="Digite seu cpf" />
                {erros.cpf && <p>{erros.cpf}</p>}

                <input type="text" name="telefone" value={dadosPessoais.telefone} onChange={alterarValor} placeholder="Digite seu telefone" />
                {erros.telefone && <p>{erros.telefone}</p>}

                <input name="email" type="email" value={dadosPessoais.email} onChange={alterarValor} placeholder="Digite seu email" />
                {erros.email && <p>{erros.email}</p>}

                <input name="empresa" type="text" value={dadosPessoais.empresa} onChange={alterarValor} placeholder="Digite o nome da empresa" />
                {erros.empresa && <p>{erros.empresa}</p>}

                <Link to={"/ApresentacaoAssistente"}>
                    <button type="button">Anterior</button>
                </Link>

                <button type="submit">Próximo</button>

            </form>

        </div>
    )

}