const Cliente = require('../models/clientesModel');

exports.getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.getAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.getById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCliente = async (req, res) => {
    try {
        const newClienteId = await Cliente.create(req.body);
        res.status(201).json({ id: newClienteId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCliente = async (req, res) => {
    try {
        const updated = await Cliente.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCliente = async (req, res) => {
    try {
        const deleted = await Cliente.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};