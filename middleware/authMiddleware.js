// middleware/authMiddleware.js
const Usuario = require('../models/usuariosModel');
// const bcrypt = require('bcrypt');

exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ message: 'Autenticación requerida' });
        }
        
        const [email, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
            .toString()
            .split(':');
            
        const usuario = await Usuario.getByEmail(email);
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        
        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};