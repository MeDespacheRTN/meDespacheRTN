import { useState } from "react";
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
          <a href="/sobre" className="hover:opacity-100 transition">Sobre</a>
          <a href="#" className="hover:opacity-100 transition">Contato</a>
          <a href="#" className="hover:opacity-100 transition">Termos</a>
          <a href="#" className="hover:opacity-100 transition">Privacidade</a>
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
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Produto</h3>
            <ul className="space-y-2 opacity-80">
              <li><a href="#">Como funciona</a></li>
              <li><a href="#">Planos</a></li>
              <li><a href="#">Integrações</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Suporte</h3>
            <ul className="space-y-2 opacity-80">
              <li><a href="#">Central de ajuda</a></li>
              <li><a href="#">Fale conosco</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Legal</h3>
            <ul className="space-y-2 opacity-80">
              <li><a href="#">Termos de uso</a></li>
              <li><a href="#">Privacidade</a></li>
              <li><a href="#">Segurança</a></li>
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