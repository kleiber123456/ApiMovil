const { pool } = require('../config/db');

class PermisoRol {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM `Permiso-Rol`');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM `Permiso-Rol` WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(permisoRol) {
        const { Rol_id, Permiso_id } = permisoRol;
        const [result] = await pool.query(
            'INSERT INTO `Permiso-Rol` (Rol_id, Permiso_id) VALUES (?, ?)',
            [Rol_id, Permiso_id]
        );
        return result.insertId;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM `Permiso-Rol` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    static async getPermisosByRolId(rolId) {
        const [rows] = await pool.query(`
            SELECT p.* 
            FROM Permiso p
            JOIN \`Permiso-Rol\` pr ON p.id = pr.Permiso_id
            WHERE pr.Rol_id = ?
        `, [rolId]);
        return rows;
    }
}

module.exports = PermisoRol;