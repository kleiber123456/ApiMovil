const PermisoRol = require('../models/permisosRolesModel');

exports.getAllPermisosRoles = async (req, res) => {
    try {
        const permisosRoles = await PermisoRol.getAll();
        res.json(permisosRoles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPermisoRolById = async (req, res) => {
    try {
        const permisoRol = await PermisoRol.getById(req.params.id);
        if (!permisoRol) {
            return res.status(404).json({ message: 'Relación Permiso-Rol no encontrada' });
        }
        res.json(permisoRol);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPermisoRol = async (req, res) => {
    try {
        const newPermisoRolId = await PermisoRol.create(req.body);
        res.status(201).json({ id: newPermisoRolId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePermisoRol = async (req, res) => {
    try {
        const deleted = await PermisoRol.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Relación Permiso-Rol no encontrada' });
        }
        res.json({ message: 'Relación Permiso-Rol eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};