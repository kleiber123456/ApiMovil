const Horario = require('../models/horariosModel');

exports.getAllHorarios = async (req, res) => {
    try {
        const horarios = await Horario.getAll();
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getHorarioById = async (req, res) => {
    try {
        const horario = await Horario.getById(req.params.id);
        if (!horario) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        res.json(horario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createHorario = async (req, res) => {
    try {
        const newHorarioId = await Horario.create(req.body);
        res.status(201).json({ id: newHorarioId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateHorario = async (req, res) => {
    try {
        const updated = await Horario.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        res.json({ message: 'Horario actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteHorario = async (req, res) => {
    try {
        const deleted = await Horario.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        res.json({ message: 'Horario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};