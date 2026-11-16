const authService = require('../services/authService');

const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const usuario = await authService.cadastrarUsuario(nome, email, senha);

        return res.status(201).json(usuario);

    } catch (error) {
        if (error.message === 'Email já cadastrado') {
            return res.status(409).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    cadastrarUsuario,
};