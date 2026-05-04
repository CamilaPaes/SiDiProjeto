import { useState } from "react"
import { Link } from "react-router-dom"


export default function DadosVisita() {
    const [dados, setDados] = useState({
        quemConvidou: "",
        setor: "",
        qntdVisitantes: "",
        data: "",
        horario: "",
    });

    const [erro, setErro] = useState({
        quemConvidou: "",
        setor: "",
        qntdVisitantes: "",
        data: "",
        horario: "",
    })


    function alterarDados(evento) {
        const nomeCampo = evento.target.name;
        const valor = evento.target.value;

        setDados({
            ...dados,
            [nomeCampo]: valor
        });

        setErro({
            ...erro,
            [nomeCampo]: ""
        })


    }

    function enviarFormulario(evento) {
        evento.preventDefault();

        let novosErros = {
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

        if (!dados.qntdVisitantes) {
            novosErros.qntdVisitantes = "Esse campo é obrigatório"
        }

        if (!dados.data) {
            novosErros.data = "Esse campo é obrigatório"
        }

        if (!dados.horario) {
            novosErros.horario = "Esse campo é obrigatório"
        }

        setErro(novosErros)

        setDados({
            quemConvidou: "",
            setor: "",
            qntdVisitantes: "",
            data: "",
            horario: "",
        })
    }

    return (
        <div>
            <div>
                <Link to={"/"}>
                    <button type="button">Voltar para Home</button>
                </Link>
            </div>


            <form onSubmit={enviarFormulario}>

                <label>Quem te convidou*</label>
                <input type="text" name="quemConcidou" value={dados.quemConvidou} onChange={alterarDados} placeholder="Nome do colaborador" />
                {erro.quemConvidou && <p>{erro.quemConvidou}</p>}

                <label>Setor ou Departamento*</label>
                <input type="text" placeholder="Selecione o setor" value={dados.setor} onChange={alterarDados} />
                {erro.setor && <p>{erro.setor}</p>}

                <label>Quantidade de Visitantes*</label>
                <input type="number" value={dados.qntdVisitantes} onChange={alterarDados} />
                {erro.qntdVisitantes && <p>{erro.qntdVisitantes}</p>}

                <label>Data da Visita*</label>
                <input type="date" placeholder="dd/mm/aaaa" value={dados.data} onChange={alterarDados} />
                {erro.data && <p>{erro.data}</p>}

                <label>Horário*</label>
                <input type="time" placeholder="--:--" value={dados.horario} onChange={alterarDados} />
                {erro.horario && <p>{erro.horario}</p>}

                <button type="button">Anterior</button>


                <button type="submit">Próximo</button>
            </form>


        </div>
    )
}