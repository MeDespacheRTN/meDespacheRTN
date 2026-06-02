import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/midislogoE.png";

function Footers() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="w-full bg-[#0b0b0f] text-white">

      {/* Parte principal */}
      <div className="px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-800">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} className="h-12" />
          <span className="text-xl font-semibold">Me Despache</span>
        </div>

        {/* Links básicos */}
        <div className="flex gap-6 text-sm opacity-80">
          <Link to="/sobre" className="hover:opacity-100 transition">Sobre</Link>
          <Link to="/contato" className="hover:opacity-100 transition">Contato</Link>
          <Link to="/termos" className="hover:opacity-100 transition">Termos</Link>
          <Link to="/privacidade" className="hover:opacity-100 transition">Privacidade</Link>
        </div>

        {/* Botão expandir */}
        <button
          onClick={() => setOpen(!open)}
          className="text-sm text-purple-400 hover:text-purple-300 transition"
        >
          {open ? "Ver menos ▲" : "Mais informações ▼"}
        </button>
      </div>

      {/* Parte expandida (tipo Mercado Livre) */}
      {open && (
        <div className="px-10 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm bg-[#0f0f15]">

          <div>
            <h3 className="font-semibold mb-3 text-white">Empresa</h3>
            <ul className="space-y-2 opacity-80">
              <li><Link to="/sobre" className="hover:text-white transition">Sobre nós</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Produto</h3>
            <ul className="space-y-2 opacity-80">
              <li><Link to="/como-funciona" className="hover:text-white transition">Como funciona</Link></li>
              <li><Link to="/planos" className="hover:text-white transition">Planos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Suporte</h3>
            <ul className="space-y-2 opacity-80">
              <li><Link to="/ajuda" className="hover:text-white transition">Central de ajuda</Link></li>
              <li><Link to="/contato" className="hover:text-white transition">Fale conosco</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Legal</h3>
            <ul className="space-y-2 opacity-80">
              <li><Link to="/termos" className="hover:text-white transition">Termos de uso</Link></li>
              <li><Link to="/privacidade" className="hover:text-white transition">Privacidade</Link></li>
              
            </ul>
          </div>

        </div>
      )}

      {/* Copyright */}
      <div className="text-center text-xs opacity-70 py-4 border-t border-gray-800">
        © 2026 Me Despache — Todos os direitos reservados.
      </div>

    </footer>
  );
}

export default Footers;