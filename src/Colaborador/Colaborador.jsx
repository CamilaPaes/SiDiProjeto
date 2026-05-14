import TabelaSolicitacao from "./TabelaSolicitacao";


export default function Colaborador() {

    const requests = [
        {
            id: 1,
            code: "REG-2024-005",
            name: "Carlos Ferreira",
            email: "carlos@empresa.com",
            company: "Tech Solutions",
            date: "09/04/2026",
            time: "14:00",
            type: "Fornecedor",
            status: "Pendente",
        },
        {
            id: 2,
            code: "REG-2024-006",
            name: "Ana Costa",
            email: "ana@empresa.com",
            company: "Consultoria ABC",
            date: "10/04/2026",
            time: "10:00",
            type: "Visitante",
            status: "Pendente",
        },
        {
            id: 3,
            code: "REG-2024-007",
            name: "Roberto Lima",
            email: "roberto@empresa.com",
            company: "Serviços Express",
            date: "11/04/2026",
            time: "09:00",
            type: "Prestador",
            status: "Pendente",
        },
    ];

    return (
        <div>
            <div>
                <h2>Painel do Colaborador</h2>
                <p>Gerencie os cadastros vinculados ao seu nome</p>
            </div>
            <div>
                <h4>Você tem 3 cadastros pendentes de aprovação</h4>
                <p>Revise e aprove os cadastros para liberar o acesso dos visitantes</p>
            </div>
            <TabelaSolicitacao requests={requests} />
        </div>


    )
}