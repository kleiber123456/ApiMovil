const Servicio = require('../models/serviciosModel');

exports.getAllServicios = async (req, res) => {
    try {
        const servicios = await Servicio.getAll();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getServicioById = async (req, res) => {
    try {
        const servicio = await Servicio.getById(req.params.id);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createServicio = async (req, res) => {
    try {
        const newServicioId = await Servicio.create(req.body);
        res.status(201).json({ id: newServicioId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateServicio = async (req, res) => {
    try {
        const updated = await Servicio.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Servicio actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteServicio = async (req, res) => {
    try {
        const deleted = await Servicio.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};