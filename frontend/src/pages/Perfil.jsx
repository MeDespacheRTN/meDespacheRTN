import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Save, X, Edit2 } from "lucide-react";

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  
  // 🔥 ESTADO DE MODO DE EDIÇÃO
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
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

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) {
      const user = JSON.parse(userStorage);
      setUsuario(user);
      
      // Preenche os campos com os dados do usuário
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
      setIsEditing(true); // Se ele trocar a foto, ativa o modo de edição automaticamente
    }
  };

  const cancelarEdicao = () => {
    setIsEditing(false);
    // Restaura os dados originais se o usuário desistir de editar
    setNome(usuario?.nome || "");
    setEmail(usuario?.email || "");
    setTelefone(usuario?.telefone || "");
    setFotoPreview(usuario?.foto_url || null);
    setFotoPerfil(null);
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
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
        
        // Atualiza o cache local
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        setUsuario(data.usuario);
        
        // Reseta campos de senha e desativa o modo de edição
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
        setIsEditing(false);
      } else {
        alert("Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
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
                {isEditing && (
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera size={32} className="text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleFotoChange} />
                  </label>
                )}
              </div>

              {isEditing && (
                <label className="bg-purple-600 hover:bg-purple-700 cursor-pointer transition px-5 py-2 rounded-xl font-medium shadow-lg flex items-center gap-2">
                  <Camera size={16} /> Alterar Foto
                  <input type="file" className="hidden" accept="image/*" onChange={handleFotoChange} />
                </label>
              )}
            </div>

            {/* INFORMAÇÕES DO TOPO */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {usuario?.nome || "Carregando..."}
                  </h1>
                  <p className="text-purple-300 mt-2 text-sm sm:text-base">
                    {usuario?.tipo === "comerciante" ? "Comerciante Premium" : "Cliente Premium"} • Salvador - BA
                  </p>
                </div>
                
                {/* BOTÃO ATIVAR MODO EDIÇÃO */}
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 rounded-2xl font-semibold shadow-lg flex items-center gap-2"
                  >
                    <Edit2 size={18} /> Editar Perfil
                  </button>
                )}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base max-w-3xl">
                Gerencie as informações da sua conta, adicione uma foto de perfil ou altere sua senha de acesso.
              </p>
            </div>
          </div>
        </section>

        {/* ESTATÍSTICAS (OPCIONAIS) */}
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

        {/* SEÇÃO DOS INPUTS */}
        <section className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* DADOS PESSOAIS */}
          <div className={`backdrop-blur-xl border rounded-3xl p-6 shadow-xl transition-colors duration-300 ${isEditing ? 'bg-white/15 border-purple-500/50' : 'bg-white/5 border-white/10'}`}>
            <h2 className="text-2xl font-bold mb-6">Informações Pessoais</h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-purple-300 block mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={nome}
                  disabled={!isEditing}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  disabled={!isEditing}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">Telefone</label>
                <input
                  type="text"
                  value={telefone}
                  disabled={!isEditing}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(71) 99999-9999"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* SEGURANÇA */}
          <div className={`backdrop-blur-xl border rounded-3xl p-6 shadow-xl transition-colors duration-300 ${isEditing ? 'bg-white/15 border-purple-500/50' : 'bg-white/5 border-white/10'}`}>
            <h2 className="text-2xl font-bold mb-6">Segurança</h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-purple-300 block mb-2">Senha Atual (Opcional)</label>
                <input
                  type="password"
                  value={senhaAtual}
                  disabled={!isEditing}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">Nova Senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  disabled={!isEditing}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  disabled={!isEditing}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AÇÕES DE SALVAR (SÓ APARECEM NO MODO DE EDIÇÃO) */}
        {isEditing && (
          <section className="bg-white/10 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 shadow-xl animate-fade-in-up">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-purple-100">Salvar Alterações</h2>
                <p className="text-gray-300 mt-1 text-sm">
                  Confirme para aplicar as novas informações à sua conta.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={cancelarEdicao} 
                  disabled={loading}
                  className="bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 transition px-6 py-3 rounded-2xl font-medium border border-white/10 hover:border-red-500/30 flex items-center justify-center gap-2"
                >
                  <X size={18} /> Cancelar
                </button>

                <button 
                  onClick={handleSalvar}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-500 text-white transition px-8 py-3 rounded-2xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Salvando..." : <><Save size={18} /> Salvar Alterações</>}
                </button>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}