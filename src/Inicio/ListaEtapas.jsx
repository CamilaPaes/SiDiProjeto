export default function ListaEtapas(props) {
    return (
        <div className="Etapas">
            <div className="numeros">
                {props.numero}
            </div>

            <p>
                {props.topico}
            </p>

            <p>
                {props.descricao}
            </p>
        </div>
    )
}