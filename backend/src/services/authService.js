const bcrypt = require("bcrypt");
const User = require("../models/User");
const Empresa = require("../models/Empresa");
const supabase = require('../config/db');

const GetMelhoresEmpresas = async () => {
 
  const { data: empresas, error } = await supabase
    .from('empresas')
    .select(`
      id,
      nome_loja,
      avaliacoes (
        nota
      )
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

  // verificar se já existe
  const { data: usuarioExistente } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (usuarioExistente) {
    throw new Error('Esse usuário já existe');
  }

  // criptografar senha
  const senhaHash = await bcrypt.hash(senha, 10);

  // inserir no banco
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

  return { message: "Usuário cadastrado com sucesso" };

};

// =======================
// LOGIN
// =======================
const login = async (email, senha) => {

   if (!email || !senha) {
    throw new Error("Preencha todos os campos");
  }

  // buscar usuário pelo email dele rs
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

  // comparar senha do cara
  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  //verificar se tem empresa (se for comerciante)
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
    telefone: usuario.telefone || "", // Retornando o telefone no login se existir
    foto_url: usuario.foto_url || null, // Retornando a foto no login se existir
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

// 🔥 FUNÇÃO DE ATUALIZAR PERFIL ADICIONADA AQUI
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

    // Upload no storage do supabase (crie o bucket 'perfis' lá no painel)
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

const GetRankingMensal = async () => {
  // 1. Busca todas as empresas e as fotos dos donos
  const { data: empresas, error: errEmpresas } = await supabase
    .from('empresas')
    .select(`
      id,
      nome_loja,
      usuarios (
        foto_url
      )
    `);

  if (errEmpresas) {
    throw new Error("Erro ao buscar dados do ranking: " + errEmpresas.message);
  }

  // 2. Busca TODOS os pedidos reais da tabela 'pedidos'
  const { data: pedidos, error: errPedidos } = await supabase
    .from('pedidos')
    .select('empresa_id'); 

  if (errPedidos) {
    throw new Error("Erro ao buscar pedidos: " + errPedidos.message);
  }

  // 3. Monta o ranking contando quantos pedidos cada loja tem
  const ranking = empresas.map((empresa) => {
    // Filtra os pedidos que pertencem ao ID dessa empresa e conta o tamanho do array
    const totalVendas = pedidos ? pedidos.filter(p => p.empresa_id === empresa.id).length : 0;

    return {
      id: empresa.id,
      nome_loja: empresa.nome_loja,
      foto_perfil: empresa.usuarios?.foto_url || null, 
      vendas_mes: totalVendas // 🔥 AGORA O NÚMERO É 100% REAL DO BANCO!
    };
  });

  // 4. Ordena do maior vendedor para o menor
  ranking.sort((a, b) => b.vendas_mes - a.vendas_mes);

  // 5. Retorna o Top 10
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