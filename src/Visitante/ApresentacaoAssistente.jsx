import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function ApresentacaoAssistente() {
    return (
        <div>
            <h2>Olá! Sou seu Assistente Virtual</h2>
            <p>Vou te ajudar durante todo o processo de cadastro. Se tiver alguma dúvida sobre como preencher os campos, é só me chamar!</p>

            <section>
                <p>Como posso ajudar:</p>
                <li>
                    <ul>Explicar cada etapa do cadastro</ul>
                    <ul>Tirar dúvidas sobre preenchimento</ul>
                    <ul>Validar informações em tempo real</ul>
                    <ul>Esclarecer questões sobre privacidade</ul>
                </li>
            </section>

            <p>Dica: Você pode me acessar a qualquer momento pelo chat no canto da tela!</p>


            <Link to={"/DadosPessoais"}>
                <button type="button">Vamos começar!</button>
            </Link>


        </div>
    )

}