import { useState } from "react";
import "./AssistenteIA.css"

export default function AssistenteIA() {

    const [mensagem, setMensagem] = useState("");
    const [resposta, setResposta] = useState("");

    async function enviarMensagem() {

        const response = await fetch(
            "http://localhost:8080/ia",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mensagem: mensagem,
                }),
            }
        );

        const data = await response.json();

        setResposta(data.resposta);
    }

    return (
        <div className="assistant-container">

            <h2>Assistente IA</h2>

            <input
                type="text"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Digite sua dúvida"
            />

            <button onClick={enviarMensagem}>
                Enviar
            </button>

            <p>{resposta}</p>

        </div>
    );
}