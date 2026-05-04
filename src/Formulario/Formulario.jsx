import { useState } from "react" //Serve para guardar e atualizar os dados dentro do componetnte
import { Link } from "react-router-dom";

export default function Formulario() { //Criando componente chamado "Formulario" que é tipo uma função que retorna iterface HTML
    const [formulario, setFormulario] = useState({ //Criando o estado do formulario. 'formulario -> valores atuais', setFormulario -> atualiza
        nome: "",
        email: "",
        empresa: ""

    });

    const [erros, setErro] = useState({ //Criando um estado chamado "erro". 'erro' -> guarda os erros atuais, 'setErro' -> atualiza os erros
        nome: "",
        email: "",
        empresa: ""
    })


    function alterarValor(evento) { //Função de mudança. Essa função roda toda vez que o usuario digita
        const nomeCampo = evento.target.name; //Pega QUAL campo foi alterado. Ex: 'nome', 'email' ou 'empresa'
        const valor = evento.target.value; //Pega O QUE o usuario digitou. Ex: 'Camila', 'gmail@email.com'

        setFormulario({ //mantém tudo o que já existia. Atualiza só o campo alterado
            ...formulario,
            [nomeCampo]: valor
        });

        setErro({ //Limpa o erro daquele campo. Quando o usuario começa a digitar, o erro daquele campo some
            ...erros,
            [nomeCampo]: ""
        });

    }


    function enviarFormulario(evento) { //Executa quando clica em 'Enviar'
        evento.preventDefault(); //Impede a página de recarregar

        let novosErros = { //Cria novos erros. Começa "zerado"
            nome: "",
            email: "",
            empresa: ""
        };

        if (!formulario.nome) { //Valida nome
            novosErros.nome = "Nome é obrigatório"; //Se tiver vazio cria erro
        }

        if (!formulario.email) { //Valida email
            novosErros.email = "Email é obrigatório"; //Se tiver vazio cria erro
        }

        if (!formulario.empresa) { //Valida empresa
            novosErros.empresa = "Empresa é obrigatória";
        }

        setErro(novosErros); //Atualiza estado de erro. Mostra os erros na tela

        if (novosErros.nome || novosErros.email || novosErros.empresa) { //Verifica se tem erro. 
            return; //Se qualquer campo tiver erro -> PARA aqui. Não envia.
        }

        console.log(formulario); //Se passou na validação, mostra os dados no console

        setFormulario({
            nome: "",
            email: "",
            empresa: ""
        });
    }



    return ( //Aqui é o que aparece na tela
        <div>
            <div>
                <Link to={"/"}>
                    <button type="button">Voltar para Home</button>
                </Link>
            </div>

            <form onSubmit={enviarFormulario}> {/*Quando clicar em Enviar, chama a função*/}
                <input name="nome" type="text" value={formulario.nome} onChange={alterarValor} placeholder="Digite seu nome" />
                {erros.nome && <p>{erros.nome}</p>}
                <input name="email" type="email" value={formulario.email} onChange={alterarValor} placeholder="Digite seu email" />
                {erros.email && <p>{erros.email}</p>}
                <input name="empresa" type="text" value={formulario.empresa} onChange={alterarValor} placeholder="Digite o nome da empresa" />
                {erros.empresa && <p>{erros.empresa}</p>}
                <button type="submit">Enviar</button>
                <button type="button">Próximo</button>
            </form>

        </div>
    )

}