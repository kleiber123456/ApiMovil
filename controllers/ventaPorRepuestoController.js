const VentaPorRepuesto = require('../models/ventaPorRepuestoModel');

exports.getAll = async (req, res) => {
    try {
        const ventasRepuestos = await VentaPorRepuesto.getAll();
        res.json(ventasRepuestos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const ventaRepuesto = await VentaPorRepuesto.getById(req.params.id);
        if (!ventaRepuesto) {
            return res.status(404).json({ message: 'Relación venta-repuesto no encontrada' });
        }
        res.json(ventaRepuesto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByVentaId = async (req, res) => {
    try {
        const ventasRepuestos = await VentaPorRepuesto.getByVentaId(req.params.ventaId);
        res.json(ventasRepuestos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByRepuestoId = async (req, res) => {
    try {
        const ventasRepuestos = await VentaPorRepuesto.getByRepuestoId(req.params.repuestoId);
        res.json(ventasRepuestos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newId = await VentaPorRepuesto.create(req.body);
        res.status(201).json({ id: newId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await VentaPorRepuesto.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Relación venta-repuesto no encontrada' });
        }
        res.json({ message: 'Relación venta-repuesto actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await VentaPorRepuesto.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Relación venta-repuesto no encontrada' });
        }
        res.json({ message: 'Relación venta-repuesto eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};