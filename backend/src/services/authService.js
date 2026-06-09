const bcrypt = require("bcrypt");
const supabase = require('../config/db');

// =======================
// MELHORES EMPRESAS
// =======================
const GetMelhoresEmpresas = async () => {
  const { data: empresas, error } = await supabase
    .from('empresas')
    .select(`
      id,
      nome_loja,
      avaliacoes ( nota )
    `);

  if (error) {
    throw new Error("Erro ao buscar empresas e avaliações: " + error.message);
  }

  const empresasComMedia = empresas.map((empresa) => {
    const totalAvaliacoes = empresa.avaliacoes.length;
    let media = 0;

    if (totalAvaliacoes > 0) {
      const somaNotas = empresa.avaliacoes.reduce((acumulador, avaliacao) => {
        return acumulador + avaliacao.nota;
      }, 0);
      media = somaNotas / totalAvaliacoes;
    }

    return {
      id: empresa.id,
      nome_loja: empresa.nome_loja,
      nota: media,
      quantidade_avaliacoes: totalAvaliacoes 
    };
  });

  empresasComMedia.sort((a, b) => b.nota - a.nota);
  return empresasComMedia.slice(0, 10);
};

// =======================
// CADASTRO
// =======================
const register = async (nome, email, senha, tipo, nomeLoja, cnpj) => {
  if (!nome || !email || !senha) {
    throw new Error("Preencha todos os campos");
  }

  const { data: usuarioExistente } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (usuarioExistente) {
    throw new Error('Esse usuário já existe');
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const { data: usuario, error } = await supabase
    .from('usuarios')
    .insert([{ nome, email, senha: senhaHash, tipo }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (tipo === "comerciante") {
    const { error: errorEmpresa } = await supabase
      .from('empresas')
      .insert([{
        nome_loja: nomeLoja,
        cnpj,
        usuario_id: usuario.id
      }]);

    if (errorEmpresa) {
      throw new Error(errorEmpresa.message);
    }
  }

  // 🔥 ALTERAÇÃO AQUI: Retorna o usuário criado para o frontend fazer auto-login
  return { 
    message: "Usuário cadastrado com sucesso", 
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo } 
  };
};

// =======================
// LOGIN
// =======================
const login = async (email, senha) => {
   if (!email || !senha) {
    throw new Error("Preencha todos os campos");
  }

  const { data: usuario, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  let temEmpresa = false;

  if (usuario.tipo === "comerciante") {
    const { data: empresa } = await supabase
      .from('empresas')
      .select('*')
      .eq('usuario_id', usuario.id)
      .maybeSingle();

    temEmpresa = !!empresa;
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
    telefone: usuario.telefone || "", 
    foto_url: usuario.foto_url || null, 
    temEmpresa
  };
};

const GetLoja = async (id) => {
  if (!id) {
    throw new Error("ID inválido");
  }

  const { data, error } = await supabase
    .from('empresas')
    .select(`
      id,
      nome_loja,
      cnpj
    `)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw new Error("Erro ao buscar loja: " + error.message);
  }

  if (!data) {
    throw new Error("Loja não encontrada");
  }

  return data;
};

// 🔥 ATUALIZAR PERFIL
const AtualizarPerfil = async (id, dados) => {
  const { nome, email, telefone, nova_senha, foto } = dados;

  let updates = {};
  if (nome) updates.nome = nome;
  if (email) updates.email = email;
  if (telefone) updates.telefone = telefone;

  if (nova_senha) {
    updates.senha = await bcrypt.hash(nova_senha, 10);
  }

  // Lógica de upload da foto
  if (foto) {
    const fileExt = foto.originalname.split('.').pop();
    const fileName = `perfil_${id}_${Date.now()}.${fileExt}`;

    // Upload no storage do supabase no bucket 'perfis'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('perfis') 
      .upload(fileName, foto.buffer, {
        contentType: foto.mimetype,
        upsert: true
      });

    if (uploadError) {
      throw new Error("Erro ao fazer upload da foto: " + uploadError.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from('perfis')
      .getPublicUrl(fileName);

    updates.foto_url = publicUrlData.publicUrl;
  }

  // Atualizar banco de dados
  const { data: usuarioAtualizado, error } = await supabase
    .from('usuarios')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error("Erro ao atualizar o banco de dados: " + error.message);
  }

  delete usuarioAtualizado.senha; // Segurança

  return { message: "Perfil atualizado com sucesso", usuario: usuarioAtualizado };
};

// 🔥 RANKING MENSAL
const GetRankingMensal = async () => {
  const { data: empresas, error: errEmpresas } = await supabase
    .from('empresas')
    .select(`
      id,
      nome_loja,
      usuarios ( foto_url )
    `);

  if (errEmpresas) {
    throw new Error("Erro ao buscar dados do ranking: " + errEmpresas.message);
  }

  const { data: pedidos, error: errPedidos } = await supabase
    .from('pedidos')
    .select('empresa_id'); 

  if (errPedidos) {
    throw new Error("Erro ao buscar pedidos: " + errPedidos.message);
  }

  const ranking = empresas.map((empresa) => {
    const totalVendas = pedidos ? pedidos.filter(p => p.empresa_id === empresa.id).length : 0;

    return {
      id: empresa.id,
      nome_loja: empresa.nome_loja,
      foto_perfil: empresa.usuarios?.foto_url || null, 
      vendas_mes: totalVendas 
    };
  });

  ranking.sort((a, b) => b.vendas_mes - a.vendas_mes);
  return ranking.slice(0, 10);
};

module.exports = {
  register,
  login,
  GetMelhoresEmpresas,
  GetLoja,
  AtualizarPerfil,
  GetRankingMensal
};