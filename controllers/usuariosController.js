const Usuario = require('../models/usuariosModel');
const bcrypt = require('bcrypt');
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
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUsuarioId = await Usuario.create({
            ...req.body,
            password: hashedPassword
        });
        res.status(201).json({ id: newUsuarioId, ...req.body, password: '*****' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        // Si se está actualizando la contraseña, encriptarla
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }
        
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
        
        // Buscar usuario por correo
        const usuario = await Usuario.getByEmail(Correo);
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        
        // Comparar contraseñas
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        
        // No devolver la contraseña en la respuesta
        const { password: _, ...usuarioSinPassword } = usuario;
        
        res.json({
            message: 'Inicio de sesión exitoso',
            usuario: usuarioSinPassword
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};