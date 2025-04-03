const Permiso = require('../models/permisosModel');

exports.getAll = async (req, res) => {
    try {
        const permisos = await Permiso.getAll();
        res.json(permisos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const permiso = await Permiso.getById(req.params.id);
        if (!permiso) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.json(permiso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newId = await Permiso.create(req.body);
        res.status(201).json({ id: newId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await Permiso.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.json({ message: 'Permiso actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Permiso.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.json({ message: 'Permiso eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};