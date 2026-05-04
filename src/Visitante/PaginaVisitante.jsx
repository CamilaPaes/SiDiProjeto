import { Check, Shield, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

import BeneficiosVisit from "./BeneficiosVisit"

export default function PaginaVisitante() {
    return (
        <div>
            <h2>Bem-vindo ao VisitControl</h2>
            <p>Nosso sistema de pré-cadastro foi desenvolvido para tornar sua visita mais ágil e segura. Em poucos minutos, você estará pronto!</p>

            <div className="Beneficios-container">
                <BeneficiosVisit
                    icone={<Check />}
                    titulo="Rapido"
                    conteudo="Processo simples em poucos passos"
                />

                <BeneficiosVisit
                    icone={<Shield />}
                    titulo="Seguro"
                    conteudo="Seus dados protegidos pela LGPD"
                />

                <BeneficiosVisit
                    icone={<Sparkles />}
                    titulo="Assistido"
                    conteudo="IA para auxiliar no cadastro"
                />
            </div>

            <div>
                <Link to="/ApresentacaoAssistente">
                    <button type="button">Iniciar Cadastro</button>
                </Link>
            </div>
        </div>

    )
}