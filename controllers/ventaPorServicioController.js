const VentaPorServicio = require('../models/ventaPorServicioModel');

exports.getAll = async (req, res) => {
    try {
        const ventasServicios = await VentaPorServicio.getAll();
        res.json(ventasServicios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const ventaServicio = await VentaPorServicio.getById(req.params.id);
        if (!ventaServicio) {
            return res.status(404).json({ message: 'Relación venta-servicio no encontrada' });
        }
        res.json(ventaServicio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByVentaId = async (req, res) => {
    try {
        const ventasServicios = await VentaPorServicio.getByVentaId(req.params.ventaId);
        res.json(ventasServicios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByServicioId = async (req, res) => {
    try {
        const ventasServicios = await VentaPorServicio.getByServicioId(req.params.servicioId);
        res.json(ventasServicios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newId = await VentaPorServicio.create(req.body);
        res.status(201).json({ id: newId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await VentaPorServicio.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Relación venta-servicio no encontrada' });
        }
        res.json({ message: 'Relación venta-servicio actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await VentaPorServicio.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Relación venta-servicio no encontrada' });
        }
        res.json({ message: 'Relación venta-servicio eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};