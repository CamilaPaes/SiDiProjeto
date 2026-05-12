import { BrowserRouter, Route, Routes } from "react-router-dom";
import Formulario from "./Formulario/DadosPessoais";
import Inicio from "./Inicio/Inicio";
import PaginaVisitante from "./Visitante/PaginaVisitante";
import ApresentacaoAssistente from "./Visitante/ApresentacaoAssistente";
import DadosVisita from "./Formulario/DadosVisita";
import InformacoesAdicionais from "./Formulario/ InformaçõesAdicionais";
import Colaborador from "./Colaborador/Colaborador";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/paginavisitante" element={<PaginaVisitante />} />
            <Route path="/apresentacaoassistente" element={<ApresentacaoAssistente />} />
            <Route path="/dadosvisita" element={<DadosVisita />} />
            <Route path="/informacoesadicionais" element={<InformacoesAdicionais />}></Route>
            <Route path="/colaborador" element={<Colaborador />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}