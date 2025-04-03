const PermisoRol = require('../models/permisosRolesModel');

exports.create = async (req, res) => {
    try {
        const { permisoId, rolId } = req.body;
        const created = await PermisoRol.create(permisoId, rolId);
        if (!created) {
            return res.status(400).json({ message: 'No se pudo crear la relación' });
        }
        res.status(201).json({ message: 'Relación creada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { permisoId, rolId } = req.params;
        const deleted = await PermisoRol.delete(permisoId, rolId);
        if (!deleted) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }
        res.json({ message: 'Relación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};