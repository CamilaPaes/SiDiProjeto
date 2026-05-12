import { useState } from "react" //Serve para guardar e atualizar os dados dentro do componetnte
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function InformacoesAdicionais() { //Criando componente chamado "InformacoesAdicionais" que é tipo uma função que retorna iterface HTML
    const navigate = useNavigate()

    const [informacoesAdicionais, setInformacoesAdicionais] = useState({ //Criando o estado das informações adicionais. 'informacoesAdicionais -> valores atuais', setInformacoesAdicionais -> atualiza
        tipoVisitante: "",
        placaVeiculo: "",
        observacao: ""
    });

    const [erros, setErro] = useState({ //Criando um estado chamado "erro". 'erro' -> guarda os erros atuais, 'setErro' -> atualiza os erros
        tipoVisitante: "",
        placaVeiculo: "",
        observacao: ""
    })


    function alterarValor(evento) { //Função de mudança. Essa função roda toda vez que o usuario digita
        const nomeCampo = evento.target.name; //Pega QUAL campo foi alterado
        const valor = evento.target.value; //Pega O QUE o usuario digitou

        setInformacoesAdicionais({ //mantém tudo o que já existia. Atualiza só o campo alterado
            ...informacoesAdicionais,
            [nomeCampo]: valor
        });

        setErro({ //Limpa o erro daquele campo
            ...erros,
            [nomeCampo]: ""
        });

    }


    function enviarFormulario(evento) { //Executa quando clica em 'Enviar'
        evento.preventDefault(); //Impede a página de recarregar

        let novosErros = { //Cria novos erros. Começa "zerado"
            tipoVisitante: "",
            placaVeiculo: "",
            observacao: ""
        };

        if (!informacoesAdicionais.tipoVisitante) { //Valida tipo de visitante
            novosErros.tipoVisitante = "Tipo de visitante é obrigatório";
        }

        setErro(novosErros); //Atualiza estado de erro. Mostra os erros na tela

        if (novosErros.tipoVisitante) { //Verifica se tem erro
            return; //Se tiver erro -> PARA aqui. Não envia.
        }

        //Só navega se estiver tudo certo
        navigate("/ProximaPagina"); //Ajuste essa rota se necessário

        console.log(informacoesAdicionais); //Mostra os dados no console

        setInformacoesAdicionais({
            tipoVisitante: "",
            placaVeiculo: "",
            observacao: ""
        });
    }



    return ( //Aqui é o que aparece na tela

        <div>

            <div>
                <h3>Informações Adicionais</h3>
                <p>Complete com dados complementares</p>
            </div>

            <div>
                <Link to={"/"}>
                    <button type="button">Voltar para Home</button>
                </Link>
            </div>

            <form onSubmit={enviarFormulario}> {/*Quando clicar em Enviar, chama a função*/}

                {/* Tipo de visitante */}
                <select name="tipoVisitante" value={informacoesAdicionais.tipoVisitante} onChange={alterarValor}>
                    <option value="">Selecione o tipo</option>
                    <option value="visitante">Visitante</option>
                    <option value="fornecedor">Fornecedor</option>
                    <option value="prestador">Prestador de serviço</option>
                    <option value="entrevista">Entrevista</option>
                </select>
                {erros.tipoVisitante && <p>{erros.tipoVisitante}</p>}

                {/* Placa do veículo */}
                <input
                    type="text"
                    name="placaVeiculo"
                    value={informacoesAdicionais.placaVeiculo}
                    onChange={alterarValor}
                    placeholder="ABC-1234"
                />
                {erros.placaVeiculo && <p>{erros.placaVeiculo}</p>}

                {/* Observações */}
                <input
                    type="text"
                    name="observacao"
                    value={informacoesAdicionais.observacao}
                    onChange={alterarValor}
                    placeholder="Ex: necessidades especiais, materiais que trará, etc."
                />
                {erros.observacao && <p>{erros.observacao}</p>}

                <Link to={"/DadosVisita"}>
                    <button type="button">Anterior</button>
                </Link>

                <button type="submit">Próximo</button>

            </form>

        </div>
    )
}