const Usuario = require('../models/usuariosModel');
const saltRounds = 10;

exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.getById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // No devolver la contraseña
        const { password, ...usuarioSinPassword } = usuario;
        res.json(usuarioSinPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUsuario = async (req, res) => {
    try {
        const newUsuarioId = await Usuario.create({
            ...req.body,
            password: req.body.password  
        });
        const { password, ...resto } = req.body;
        res.status(201).json({ id: newUsuarioId, ...resto });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateUsuario = async (req, res) => {
    try {
        const updated = await Usuario.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteUsuario = async (req, res) => {
    try {
        const deleted = await Usuario.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { Correo, password } = req.body;
        const usuario = await Usuario.getByEmail(Correo);
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        if (password !== usuario.password) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const { password: _, ...usuarioSinPassword } = usuario;

        res.json({
            message: 'Inicio de sesión exitoso',
            usuario: usuarioSinPassword
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔧 Mueve aquí la función verificarCorreo
exports.verificarCorreo = async (req, res) => {
    try {
        const { Correo } = req.body;
        const usuario = await Usuario.getByEmail(Correo);

        if (!usuario) {
            return res.status(404).json({ message: 'El correo no está registrado' });
        }

        res.status(200).json({
            message: 'Correo válido',
            usuario: { id: usuario.id, Correo: usuario.Correo }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};



