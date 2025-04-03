const Mecanico = require('../models/mecanicosModel');

exports.getAllMecanicos = async (req, res) => {
    try {
        const mecanicos = await Mecanico.getAll();
        res.json(mecanicos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMecanicoById = async (req, res) => {
    try {
        const mecanico = await Mecanico.getById(req.params.id);
        if (!mecanico) {
            return res.status(404).json({ message: 'Mecánico no encontrado' });
        }
        res.json(mecanico);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMecanico = async (req, res) => {
    try {
        const newMecanicoId = await Mecanico.create(req.body);
        res.status(201).json({ id: newMecanicoId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMecanico = async (req, res) => {
    try {
        const updated = await Mecanico.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Mecánico no encontrado' });
        }
        res.json({ message: 'Mecánico actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMecanico = async (req, res) => {
    try {
        const deleted = await Mecanico.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Mecánico no encontrado' });
        }
        res.json({ message: 'Mecánico eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};