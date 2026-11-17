const authService = require('../services/authService');

const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const usuario = await authService.cadastrarUsuario(nome, email, senha);

        return res.status(201).json(usuario);

    } catch (error) {
        if (error.message === 'Email já cadastrado.') {
            return res.status(409).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        const resultado = await authService.loginUsuario(email, senha);
        
        return res.status(200).json(resultado);
    } catch (error) {
        if (error.message === 'Email ou senha inválidos.') {
            return res.status(401).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
    }
};
    

module.exports = {
    cadastrarUsuario,
    login,
};