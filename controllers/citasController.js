const Cita = require('../models/citasModel');

exports.getAllCitas = async (req, res) => {
    try {
        const citas = await Cita.getAll();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCitaById = async (req, res) => {
    try {
        const cita = await Cita.getById(req.params.id);
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json(cita);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCita = async (req, res) => {
    try {
        const newCitaId = await Cita.create(req.body);
        res.status(201).json({ id: newCitaId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCita = async (req, res) => {
    try {
        const updated = await Cita.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCita = async (req, res) => {
    try {
        const deleted = await Cita.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCitasByMecanico = async (req, res) => {
    try {
        const citas = await Cita.getByMecanico(req.params.idMecanico);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCitasByVehiculo = async (req, res) => {
    try {
        const citas = await Cita.getByVehiculo(req.params.idVehiculo);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCitasByEstado = async (req, res) => {
    try {
        const citas = await Cita.getByEstado(req.params.estadoId);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};