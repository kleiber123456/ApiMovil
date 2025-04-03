const ComprasPorRepuesto = require('../models/comprasPorRepuestoModel');

exports.getAll = async (req, res) => {
    try {
        const comprasRepuestos = await ComprasPorRepuesto.getAll();
        res.json(comprasRepuestos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const compraRepuesto = await ComprasPorRepuesto.getById(req.params.id);
        if (!compraRepuesto) {
            return res.status(404).json({ message: 'Relación compra-repuesto no encontrada' });
        }
        res.json(compraRepuesto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByCompraId = async (req, res) => {
    try {
        const comprasRepuestos = await ComprasPorRepuesto.getByCompraId(req.params.compraId);
        res.json(comprasRepuestos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByRepuestoId = async (req, res) => {
    try {
        const comprasRepuestos = await ComprasPorRepuesto.getByRepuestoId(req.params.repuestoId);
        res.json(comprasRepuestos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newId = await ComprasPorRepuesto.create(req.body);
        res.status(201).json({ id: newId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await ComprasPorRepuesto.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Relación compra-repuesto no encontrada' });
        }
        res.json({ message: 'Relación compra-repuesto actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await ComprasPorRepuesto.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Relación compra-repuesto no encontrada' });
        }
        res.json({ message: 'Relación compra-repuesto eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};