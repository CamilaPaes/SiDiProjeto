export default function Stepper({ etapaAtual }) {
    const steps = [
        "Dados Pessoais",
        "Dados da Visita",
        "Informações Adicionais",
        "Revisão",
    ];

    return (
        <div style={{ marginBottom: "30px" }}>
            <h2>Pré-Cadastro</h2>
            <p>Etapa {etapaAtual} de {steps.length}</p>

            {/* Barra de progresso simples */}
            <div style={{
                height: "6px",
                background: "#ddd",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "20px"
            }}>
                <div
                    style={{
                        width: `${(etapaAtual / steps.length) * 100}%`,
                        height: "100%",
                        background: "#000",
                        transition: "0.3s"
                    }}
                />
            </div>

            {/* Steps */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                {steps.map((step, index) => {
                    const numero = index + 1;

                    return (
                        <div key={step} style={{ textAlign: "center" }}>
                            <div style={{
                                width: 35,
                                height: 35,
                                borderRadius: "50%",
                                background: etapaAtual >= numero ? "#2f6bff" : "#ccc",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto"
                            }}>
                                {numero}
                            </div>

                            <small>{step}</small>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}