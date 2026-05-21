import { useState } from "react";
import DashboardCards from "./DashboardCards";
import CheckinRapido from "./CheckinRapido";
import TabelaVisitantes from "./TabelaVisitantes";
import { visitantesIniciais } from "./dadosMock";
import "./style/recepcao.css"

export default function Recepcao() {
    const [visitantes, setVisitantes] = useState(visitantesIniciais);
    const [busca, setBusca] = useState("");

    function atualizarStatus(id) {
        const atualizados = visitantes.map((visitante) => {
            if (visitante.id !== id) return visitante;

            if (
                visitante.status === "aguardando" ||
                visitante.status === "atrasado"
            ) {
                return {
                    ...visitante,
                    status: "presente",
                };
            }

            if (visitante.status === "presente") {
                return {
                    ...visitante,
                    status: "finalizado",
                };
            }

            return visitante;
        });

        setVisitantes(atualizados);
    }

    const visitantesFiltrados = visitantes.filter((visitante) => {
        const texto = busca.toLowerCase();

        return (
            visitante.visitante.toLowerCase().includes(texto) ||
            visitante.cpf.toLowerCase().includes(texto) ||
            visitante.codigo.toLowerCase().includes(texto) ||
            visitante.empresa.toLowerCase().includes(texto)
        );
    });

    const existeAtrasado = visitantes.some(
        (visitante) => visitante.status === "atrasado"
    );

    return (
        <div className="recepcao-container">
            <div className="recepcao-header">
                <h1>Dashboard da Recepção</h1>
                <p>
                    Gerencie a entrada e saída de visitantes em tempo real
                </p>
            </div>

            {existeAtrasado && (
                <div className="alerta-atraso">
                    Há visitantes com atraso. Verifique os detalhes.
                </div>
            )}

            <DashboardCards visitantes={visitantesFiltrados} />

            <CheckinRapido
                busca={busca}
                setBusca={setBusca}
            />

            <TabelaVisitantes
                visitantes={visitantesFiltrados}
                atualizarStatus={atualizarStatus}
            />
        </div>
    );
}