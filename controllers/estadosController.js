const Estado = require('../models/estadosModel');

exports.getAllEstados = async (req, res) => {
    try {
        const estados = await Estado.getAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEstadoById = async (req, res) => {
    try {
        const estado = await Estado.getById(req.params.id);
        if (!estado) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }
        res.json(estado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEstado = async (req, res) => {
    try {
        const newEstadoId = await Estado.create(req.body);
        res.status(201).json({ id: newEstadoId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateEstado = async (req, res) => {
    try {
        const updated = await Estado.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }
        res.json({ message: 'Estado actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteEstado = async (req, res) => {
    try {
        const deleted = await Estado.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }
        res.json({ message: 'Estado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};