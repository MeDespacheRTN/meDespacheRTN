import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// 🔥 IMPORT DO CONTEXTO DO CARRINHO
import { CartProvider } from "./contexts/CartContext";

import Login from "./pages/Autenticacao/Login";
import Cadastro from "./pages/Autenticacao/Cadastro";
import Header from "./components/Header";
import Footers from "./components/Footers";
import Landing from "./pages/Landing";
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
import Perfil from "./pages/Perfil";
import CadProduto from "./pages/Comerciante/CadProduto";

// 🔥 IMPORT DA PÁGINA DO CARRINHO (Certifique-se de ter esse arquivo criado)
import Carrinho from "./pages/Carrinho"; 

// Footer Pages
import ComoFunciona from "./pages/FooterPages/ComoFunciona";
import Planos from "./pages/FooterPages/Planos";
import Contato from "./pages/FooterPages/Contato";
import FAQ from "./pages/FooterPages/FAQ";
import CentralAjuda from "./pages/FooterPages/CentralAjuda";
import Termos from "./pages/FooterPages/Termos";
import Privacidade from "./pages/FooterPages/Privacidade";
import Seguranca from "./pages/FooterPages/Seguranca";

function Layout() {
  const location = useLocation();

  const esconderLayout = [
    "/dashboard",
    "/cad-estabelecimento",
    "/painel-comerciante/1",
    "/cad-produto",
    "/pagamento",
    "/"
  ];

  const ocultar = esconderLayout.includes(location.pathname);

  return (
    <>
      {!ocultar && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loja/:id" element={<Loja />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cad-estabelecimento" element={<CadEstabelecimento />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/pendente" element={<Pendente />} />
        <Route path="/erro" element={<Erro />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/" element={<Landing />} />

        {/* 🔥 ROTA DO CARRINHO */}
        <Route path="/carrinho" element={<Carrinho />} />

        <Route path="/painel-comerciante/:id" element={<PainelComerciante />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cad-produto" element={<CadProduto />} />

        {/* FOOTER PAGES */}
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/ajuda" element={<CentralAjuda />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/seguranca" element={<Seguranca />} />
      </Routes>

      {!ocultar && <Footers />}
    </>
  );
}

function App() {
  return (
    // 🔥 ENVOLVENDO A APLICAÇÃO INTEIRA COM O CART PROVIDER
    <CartProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;