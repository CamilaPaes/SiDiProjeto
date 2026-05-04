import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Formulario from "./Formulario/Formulario";
import Inicio from "./Inicio/Inicio";
import PaginaVisitante from "./Visitante/PaginaVisitante";
import ApresentacaoAssistente from "./Visitante/ApresentacaoAssistente";
import DadosVisita from "./Formulario/DadosVisita";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/paginavisitante" element={<PaginaVisitante />} />
            <Route path="/apresentacaoassistente" element={<ApresentacaoAssistente />}></Route>
            <Route path="/dadosvisita" element={<DadosVisita />}></Route>
          </Routes>
        </main>

      </div >
    </BrowserRouter>
  )
}