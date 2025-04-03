const CategoriaRepuesto = require('../models/categoriaRepuestoModel');

exports.getAllCategoriasRepuesto = async (req, res) => {
    try {
        const categorias = await CategoriaRepuesto.getAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoriaRepuestoById = async (req, res) => {
    try {
        const categoria = await CategoriaRepuesto.getById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría de repuesto no encontrada' });
        }
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCategoriaRepuesto = async (req, res) => {
    try {
        const newCategoriaId = await CategoriaRepuesto.create(req.body);
        res.status(201).json({ id: newCategoriaId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCategoriaRepuesto = async (req, res) => {
    try {
        const updated = await CategoriaRepuesto.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Categoría de repuesto no encontrada' });
        }
        res.json({ message: 'Categoría de repuesto actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategoriaRepuesto = async (req, res) => {
    try {
        const deleted = await CategoriaRepuesto.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Categoría de repuesto no encontrada' });
        }
        res.json({ message: 'Categoría de repuesto eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};