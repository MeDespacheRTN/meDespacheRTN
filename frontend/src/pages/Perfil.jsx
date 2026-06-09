import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Save, X } from "lucide-react";

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  
  // States dos Inputs
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  // State das Fotos
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) {
      const user = JSON.parse(userStorage);
      setUsuario(user);
      setNome(user.nome || "");
      setEmail(user.email || "");
      setTelefone(user.telefone || "");
      if(user.foto_url) setFotoPreview(user.foto_url);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoPerfil(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSalvar = async () => {
    if (novaSenha && novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("email", email);
      formData.append("telefone", telefone);
      if (novaSenha) formData.append("nova_senha", novaSenha);
      if (fotoPerfil) formData.append("foto", fotoPerfil);

      const response = await fetch(`${import.meta.env.VITE_API_URL}auth/perfil/${usuario.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Perfil atualizado com sucesso!");
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
      } else {
        alert("Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070014] text-white relative overflow-hidden">
      {/* BACKGROUND BLOBS */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[180px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-[10%] right-[-150px] w-[400px] h-[400px] bg-fuchsia-500 rounded-full blur-[180px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-200px] left-[20%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[200px] opacity-30 pointer-events-none"></div>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28">
        
        {/* HEADER DO PERFIL */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            
            {/* FOTO E BOTÃO DE ALTERAR */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-5xl font-bold shadow-2xl border-4 border-white/10 overflow-hidden group">
                {fotoPreview ? (
                  <img src={fotoPreview} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <span>{nome ? nome.charAt(0).toUpperCase() : "U"}</span>
                )}
                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera size={32} className="text-white" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleFotoChange} />
                </label>
              </div>

              <label className="bg-purple-600 hover:bg-purple-700 cursor-pointer transition px-5 py-2 rounded-xl font-medium shadow-lg flex items-center gap-2">
                <Camera size={16} /> Alterar Foto
                <input type="file" className="hidden" accept="image/*" onChange={handleFotoChange} />
              </label>
            </div>

            {/* INFORMAÇÕES DO TOPO */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {usuario?.tipo === "comerciante" ? "Comerciante" : "Cliente"}
                  </h1>
                  <p className="text-purple-300 mt-2 text-sm sm:text-base">
                    {usuario?.tipo === "comerciante" ? "Comerciante" : "Cliente"} Premium • Salvador - BA
                  </p>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 rounded-2xl font-semibold shadow-lg">
                  Editar Perfil
                </button>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Apaixonado por tecnologia, design moderno e experiências digitais.
                Utilizando o Me Despache para encontrar os melhores estabelecimentos,
                avaliações e promoções da cidade.
              </p>
            </div>
          </div>
        </section>

        {/* 🔥 SEUS CARDS RESTAURADOS EXATAMENTE AQUI 🔥 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">Pedidos</p>
            <h2 className="text-4xl font-bold">128</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">Avaliações</p>
            <h2 className="text-4xl font-bold">46</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">Favoritos</p>
            <h2 className="text-4xl font-bold">18</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">Pontos</p>
            <h2 className="text-4xl font-bold">2.340</h2>
          </div>
        </section>

        {/* SEÇÃO DOS INPUTS EDITÁVEIS */}
        <section className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* DADOS PESSOAIS */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Informações Pessoais</h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-purple-300 block mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">Telefone</label>
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(71) 99999-9999"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SEGURANÇA */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Segurança</h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-purple-300 block mb-2">Senha Atual</label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">Nova Senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">Confirmar Senha</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AÇÕES DE SALVAR */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Preferências da Conta</h2>
              <p className="text-gray-300 mt-2 text-sm sm:text-base">
                Gerencie notificações, aparência e salve as configurações da sua conta.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate(-1)} 
                className="bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-2xl font-medium border border-white/10 flex items-center justify-center gap-2"
              >
                <X size={18} /> Cancelar
              </button>

              <button 
                onClick={handleSalvar}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white transition px-6 py-3 rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Salvando..." : <><Save size={18} /> Salvar Alterações</>}
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}