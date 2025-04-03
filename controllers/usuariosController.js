const Usuario = require('../models/usuariosModel');

exports.getAll = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener los usuarios',
            error: error.message 
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const usuario = await Usuario.getById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            });
        }
        res.json({
            success: true,
            data: usuario
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener el usuario',
            error: error.message 
        });
    }
};

exports.create = async (req, res) => {
    try {
        // Validación básica de campos requeridos
        if (!req.body.Celular || !req.body.Correo || !req.body.Contraseña || !req.body.Roles_idRoles) {
            return res.status(400).json({ 
                success: false,
                message: 'Faltan campos requeridos: Celular, Correo, Contraseña o Roles_idRoles' 
            });
        }

        const newUserId = await Usuario.create(req.body);
        
        res.status(201).json({ 
            success: true,
            message: 'Usuario creado correctamente',
            id: newUserId,
            data: req.body
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al crear el usuario',
            error: error.message 
        });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await Usuario.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            });
        }
        
        res.json({ 
            success: true,
            message: 'Usuario actualizado correctamente',
            id: req.params.id
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al actualizar el usuario',
            error: error.message 
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Usuario.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            });
        }
        
        res.json({ 
            success: true,
            message: 'Usuario eliminado correctamente',
            id: req.params.id
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al eliminar el usuario',
            error: error.message 
        });
    }
};

// Opcional: Endpoint adicional para buscar usuarios por rol
exports.getByRol = async (req, res) => {
    try {
        const usuarios = await Usuario.getByRol(req.params.rolId);
        res.json({ 
            success: true,
            count: usuarios.length,
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener usuarios por rol',
            error: error.message 
        });
    }
};

