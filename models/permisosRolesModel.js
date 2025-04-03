const { pool } = require('../config/db');

class PermisoRol {
    static async create(permisoId, rolId) {
        const [result] = await pool.query(
            'INSERT INTO Permisos_has_Roles (Permisos_idPermisos, Roles_idRoles) VALUES (?, ?)',
            [permisoId, rolId]
        );
        return result.affectedRows > 0;
    }

    static async delete(permisoId, rolId) {
        const [result] = await pool.query(
            'DELETE FROM Permisos_has_Roles WHERE Permisos_idPermisos = ? AND Roles_idRoles = ?',
            [permisoId, rolId]
        );
        return result.affectedRows > 0;
    }

    static async getByRol(rolId) {
        const [rows] = await pool.query(
            'SELECT * FROM Permisos_has_Roles WHERE Roles_idRoles = ?',
            [rolId]
        );
        return rows;
    }
}

module.exports = PermisoRol;