const Referencia = require('../models/referenciaModel');

exports.getAllReferencias = async (req, res) => {
    try {
        const referencias = await Referencia.getAll();
        res.json(referencias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReferenciaById = async (req, res) => {
    try {
        const referencia = await Referencia.getById(req.params.id);
        if (!referencia) {
            return res.status(404).json({ message: 'Referencia no encontrada' });
        }
        res.json(referencia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createReferencia = async (req, res) => {
    try {
        const newReferenciaId = await Referencia.create(req.body);
        res.status(201).json({ id: newReferenciaId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateReferencia = async (req, res) => {
    try {
        const updated = await Referencia.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Referencia no encontrada' });
        }
        res.json({ message: 'Referencia actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteReferencia = async (req, res) => {
    try {
        const deleted = await Referencia.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Referencia no encontrada' });
        }
        res.json({ message: 'Referencia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};