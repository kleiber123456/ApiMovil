const EstadoCita = require('../models/estadoCitaModel');

exports.getAllEstadoCitas = async (req, res) => {
    try {
        const estadoCitas = await EstadoCita.getAll();
        res.json(estadoCitas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEstadoCitaById = async (req, res) => {
    try {
        const estadoCita = await EstadoCita.getById(req.params.id);
        if (!estadoCita) {
            return res.status(404).json({ message: 'Estado de cita no encontrado' });
        }
        res.json(estadoCita);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEstadoCita = async (req, res) => {
    try {
        const newEstadoCitaId = await EstadoCita.create(req.body);
        res.status(201).json({ id: newEstadoCitaId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateEstadoCita = async (req, res) => {
    try {
        const updated = await EstadoCita.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Estado de cita no encontrado' });
        }
        res.json({ message: 'Estado de cita actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteEstadoCita = async (req, res) => {
    try {
        const deleted = await EstadoCita.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Estado de cita no encontrado' });
        }
        res.json({ message: 'Estado de cita eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};