import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Autenticacao/Login";
import Cadastro from "./pages/Autenticacao/Cadastro";
import Header from "./components/Header";
import Footers from "./components/Footers";
import Landing from "./pages/landing";
import Home from "./pages/Home";
import Dashboard from "./pages/Cliente/Dashboard";
import Pagamento from "./pages/Pagamento";
import Sucesso from "./pages/Sucesso";
import Pendente from "./pages/Pendente";
import Erro from "./pages/Erro";
import Sobre from "./pages/Cliente/Sobre";
import Loja from "./pages/Loja";
import CadEstabelecimento from "./pages/Comerciante/CadEstabelecimento";
import PainelComerciante from "./pages/Comerciante/PainelComerciante";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loja/:id" element={<Loja />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<CadEstabelecimento />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/pendente" element={<Pendente />} />
        <Route path="/erro" element={<Erro />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/painel-comerciante" element={<PainelComerciante />} />
      </Routes>
      <Footers />
    </BrowserRouter>
  );
}

export default App;