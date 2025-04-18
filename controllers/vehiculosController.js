const Vehiculo = require('../models/vehiculosModel');

exports.getAllVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.getAll();
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVehiculoById = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.getById(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json(vehiculo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createVehiculo = async (req, res) => {
    try {
        const newVehiculoId = await Vehiculo.create(req.body);
        res.status(201).json({ id: newVehiculoId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateVehiculo = async (req, res) => {
    try {
        const updated = await Vehiculo.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json({ message: 'Vehículo actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteVehiculo = async (req, res) => {
    try {
        const deleted = await Vehiculo.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json({ message: 'Vehículo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVehiculosByUsuarioId = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.getByUsuarioId(req.params.usuarioId);
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};