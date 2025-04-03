const Proveedor = require('../models/proveedoresModel');

exports.getAllProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.getAll();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProveedorById = async (req, res) => {
    try {
        const proveedor = await Proveedor.getById(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProveedor = async (req, res) => {
    try {
        const newProveedorId = await Proveedor.create(req.body);
        res.status(201).json({ id: newProveedorId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProveedor = async (req, res) => {
    try {
        const updated = await Proveedor.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProveedor = async (req, res) => {
    try {
        const deleted = await Proveedor.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};