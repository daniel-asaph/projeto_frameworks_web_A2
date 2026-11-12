const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

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

module.exports = {
    cadastrarUsuario,
};
