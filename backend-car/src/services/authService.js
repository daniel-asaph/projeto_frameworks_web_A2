const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = async (nome, email, senha) => { 
    if (!nome || !email || !senha) {
        throw new Error('Nome, email e senha são obrigatórios.');
    }

    email = email.trim().toLowerCase();

    const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
    });

    if (usuarioExistente) {
        throw new Error('Email já cadastrado.');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha: senhaHash,
        },
        select: {
            id: true,
            nome: true,
            email: true,
            dataCadastro: true,
        }
    });

    return novoUsuario;
};

const loginUsuario = async (email, senha) => {
    if (!email || !senha) {
        throw new Error('Email e senha são obrigatórios.');
    }

    email = email.trim().toLowerCase();

    const usuario = await prisma.usuario.findUnique({
        where: { email },
    });
    
    if (!usuario) {
        throw new Error('Email ou senha inválidos.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw new Error('Email ou senha inválidos.');
    }

    const token = jwt.sign(
        { sub: usuario.id },
        process.env.JWT_SECRET || 'chave_secreta_padrao_locacao_veiculos',
        { expiresIn: '1h' }
    );

    const usuarioPublico = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        dataCadastro: usuario.dataCadastro,
    };

    return { usuario: usuarioPublico, token };
};

module.exports = {
    cadastrarUsuario,
    loginUsuario,
};
