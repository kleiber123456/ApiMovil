const Compra = require('../models/comprasModel');

exports.getAllCompras = async (req, res) => {
    try {
        const compras = await Compra.getAll();
        res.json(compras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCompraById = async (req, res) => {
    try {
        const compra = await Compra.getById(req.params.id);
        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        
        // Obtener detalles de repuestos
        const repuestos = await Compra.getRepuestosByCompra(req.params.id);
        
        res.json({
            ...compra,
            repuestos
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCompra = async (req, res) => {
    try {
        const newCompraId = await Compra.create(req.body);
        res.status(201).json({ id: newCompraId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCompra = async (req, res) => {
    try {
        const updated = await Compra.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.json({ message: 'Compra actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCompra = async (req, res) => {
    try {
        const deleted = await Compra.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.json({ message: 'Compra eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addRepuestoToCompra = async (req, res) => {
    try {
        const { idRepuesto, cantidad, subtotal } = req.body;
        const newItemId = await Compra.addRepuestoToCompra(req.params.idCompra, idRepuesto, cantidad, subtotal);
        res.status(201).json({ id: newItemId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};