const Marca = require('../models/marcasModel');

exports.getAllMarcas = async (req, res) => {
    try {
        const marcas = await Marca.getAll();
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMarcaById = async (req, res) => {
    try {
        const marca = await Marca.getById(req.params.id);
        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json(marca);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMarca = async (req, res) => {
    try {
        const newMarcaId = await Marca.create(req.body);
        res.status(201).json({ id: newMarcaId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMarca = async (req, res) => {
    try {
        const updated = await Marca.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json({ message: 'Marca actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMarca = async (req, res) => {
    try {
        const deleted = await Marca.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};