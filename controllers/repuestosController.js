const Repuesto = require('../models/repuestosModel');

exports.getAllRepuestos = async (req, res) => {
    try {
        const repuestos = await Repuesto.getAll();
        res.json(repuestos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRepuestoById = async (req, res) => {
    try {
        const repuesto = await Repuesto.getById(req.params.id);
        if (!repuesto) {
            return res.status(404).json({ message: 'Repuesto no encontrado' });
        }
        res.json(repuesto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRepuesto = async (req, res) => {
    try {
        const newRepuestoId = await Repuesto.create(req.body);
        res.status(201).json({ id: newRepuestoId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateRepuesto = async (req, res) => {
    try {
        const updated = await Repuesto.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Repuesto no encontrado' });
        }
        res.json({ message: 'Repuesto actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRepuesto = async (req, res) => {
    try {
        const deleted = await Repuesto.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Repuesto no encontrado' });
        }
        res.json({ message: 'Repuesto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCantidadRepuesto = async (req, res) => {
    try {
        const { cantidad } = req.body;
        const updated = await Repuesto.updateCantidad(req.params.id, cantidad);
        if (!updated) {
            return res.status(404).json({ message: 'Repuesto no encontrado' });
        }
        res.json({ message: 'Cantidad de repuesto actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRepuestosByCategoria = async (req, res) => {
    try {
        const repuestos = await Repuesto.getByCategoria(req.params.idCategoria);
        res.json(repuestos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};