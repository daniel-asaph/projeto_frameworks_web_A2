const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }

    const partes = authHeader.trim().split(/\s+/);

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Formato de token inválido.' });
    }
    
    const token = partes[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const usuarioID = Number(payload.sub);

        if (!Number.isInteger(usuarioID) || usuarioID <= 0) {
            return res.status(401).json({ message: 'Token de autenticação inválido.' });
        }
        
        req.usuarioId = usuarioID;
        
        return next();
    }catch (error) {
        return res.status(401).json({ erro: 'Token de autenticação inválido ou expirado.' });
    }
};

module.exports = autenticarToken;