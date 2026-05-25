import logo from "../assets/midislogoE.png";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const [usuario, setUsuario] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("usuario");

    if (!user) return;

    try {
      const parsedUser = JSON.parse(user);

      if (typeof parsedUser === "object" && parsedUser !== null) {
        setUsuario(parsedUser);
      } else {
        throw new Error("Formato inválido");
      }
    } catch (error) {
      console.error("Erro ao ler usuário:", error);
      localStorage.removeItem("usuario");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-3 sm:top-4
        left-1/2 -translate-x-1/2
        w-[95%] max-w-6xl
        z-50
        transition-all duration-300
        ${
          showHeader
            ? "translate-y-0 opacity-100"
            : "-translate-y-20 opacity-0"
        }
      `}
    >
      <nav
        className="
          bg-white rounded-2xl
          shadow-md border border-gray-200
          px-4 sm:px-6 py-3
        "
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={logo}
              className="h-10 sm:h-14 w-auto object-contain"
              alt="Logo"
            />

            <h1
              className="
                text-sm sm:text-lg
                font-semibold text-purple-600
                truncate
              "
            >
              Me Despache
            </h1>
          </div>

          {/* MENU DESKTOP */}
          <ul
            className="
              hidden md:flex
              items-center gap-6
              text-gray-700 font-medium text-sm
            "
          >
            <li>
              <a
                href="/home"
                className="hover:text-black transition"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/sobre"
                className="hover:text-black transition"
              >
                Sobre
              </a>
            </li>

            <li>
              <a
                href="#"
                className="hover:text-black transition"
              >
                Contato
              </a>
            </li>
          </ul>

          {/* AÇÕES DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            {usuario ? (
              <>
                <span className="text-gray-700 font-medium">
                  Olá, {usuario.nome}
                </span>

                <button
                  onClick={() => {
                    localStorage.removeItem("usuario");
                    navigate("/login");
                  }}
                  className="
                    bg-purple-500 text-white
                    px-4 py-2 rounded-full
                    text-sm hover:bg-purple-700
                    transition
                  "
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                    flex items-center gap-2
                    text-gray-700 hover:text-black
                    transition
                  "
                >
                  <FaUser />
                  Login
                </Link>

                <Link
                  to="/cadastro"
                  className="
                    bg-black text-white
                    px-4 py-2 rounded-full
                    text-sm font-medium
                    hover:bg-gray-800
                    transition
                  "
                >
                  Criar conta
                </Link>
              </>
            )}
          </div>

          {/* BOTÃO MOBILE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden
              text-gray-700
              text-xl
            "
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {menuOpen && (
          <div
            className="
              md:hidden
              mt-4
              border-t border-gray-200
              pt-4
              flex flex-col gap-4
            "
          >
            <a
              href="/home"
              className="text-gray-700 hover:text-black transition"
            >
              Home
            </a>

            <a
              href="/sobre"
              className="text-gray-700 hover:text-black transition"
            >
              Sobre
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-black transition"
            >
              Contato
            </a>

            <div className="pt-2 border-t border-gray-200">
              {usuario ? (
                <div className="flex flex-col gap-3">
                  <span className="text-gray-700 font-medium">
                    Olá, {usuario.nome}
                  </span>

                  <button
                    onClick={() => {
                      localStorage.removeItem("usuario");
                      navigate("/login");
                    }}
                    className="
                      w-full
                      bg-purple-500 text-white
                      px-4 py-2 rounded-xl
                      text-sm hover:bg-purple-700
                      transition
                    "
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="
                      flex items-center justify-center gap-2
                      border border-gray-300
                      text-gray-700
                      px-4 py-2 rounded-xl
                      hover:bg-gray-100
                      transition
                    "
                  >
                    <FaUser />
                    Login
                  </Link>

                  <Link
                    to="/cadastro"
                    className="
                      bg-black text-white
                      px-4 py-2 rounded-xl
                      text-center text-sm font-medium
                      hover:bg-gray-800
                      transition
                    "
                  >
                    Criar conta
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;