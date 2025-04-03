const { pool } = require('../config/db');

class Permiso {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Permisos');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Permisos WHERE idPermisos = ?', [id]);
        return rows[0];
    }

    static async create({ Nombre }) {
        const [result] = await pool.query(
            'INSERT INTO Permisos (Nombre) VALUES (?)',
            [Nombre]
        );
        return result.insertId;
    }

    static async update(id, { Nombre }) {
        const [result] = await pool.query(
            'UPDATE Permisos SET Nombre = ? WHERE idPermisos = ?',
            [Nombre, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM Permisos WHERE idPermisos = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Permiso;