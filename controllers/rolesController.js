const Rol = require('../models/rolesModel');

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Rol.getAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRolById = async (req, res) => {
    try {
        const rol = await Rol.getById(req.params.id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json(rol);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRol = async (req, res) => {
    try {
        const newRolId = await Rol.create(req.body);
        res.status(201).json({ id: newRolId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateRol = async (req, res) => {
    try {
        const updated = await Rol.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRol = async (req, res) => {
    try {
        const deleted = await Rol.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};