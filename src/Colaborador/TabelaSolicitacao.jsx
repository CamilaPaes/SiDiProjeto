export default function TabelaSolicitacao({ requests }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Empresa</th>
                    <th>Data/Hora</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
                {requests.map((req) => (
                    <tr key={req.id}>
                        <td>{req.code}</td>

                        <td>
                            <div>{req.name}</div>
                            <div>{req.email}</div>
                        </td>

                        <td>{req.company}</td>

                        <td>
                            <div>{req.date}</div>
                            <div>{req.time}</div>
                        </td>

                        <td>{req.type}</td>

                        <td>{req.status}</td>

                        <td>
                            <button>Aprovar</button>
                            <button>Recusar</button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}