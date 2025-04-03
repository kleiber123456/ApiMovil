const Venta = require('../models/ventasModel');

exports.getAllVentas = async (req, res) => {
    try {
        const ventas = await Venta.getAll();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVentaById = async (req, res) => {
    try {
        const venta = await Venta.getById(req.params.id);
        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        
        // Obtener detalles de repuestos y servicios
        const repuestos = await Venta.getRepuestosByVenta(req.params.id);
        const servicios = await Venta.getServiciosByVenta(req.params.id);
        
        res.json({
            ...venta,
            repuestos,
            servicios
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createVenta = async (req, res) => {
    try {
        const newVentaId = await Venta.create(req.body);
        res.status(201).json({ id: newVentaId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateVenta = async (req, res) => {
    try {
        const updated = await Venta.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.json({ message: 'Venta actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteVenta = async (req, res) => {
    try {
        const deleted = await Venta.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addRepuestoToVenta = async (req, res) => {
    try {
        const { idRepuesto, cantidad, subtotal } = req.body;
        const newItemId = await Venta.addRepuestoToVenta(req.params.idVenta, idRepuesto, cantidad, subtotal);
        res.status(201).json({ id: newItemId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addServicioToVenta = async (req, res) => {
    try {
        const { idServicio, subtotal } = req.body;
        const newItemId = await Venta.addServicioToVenta(req.params.idVenta, idServicio, subtotal);
        res.status(201).json({ id: newItemId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};