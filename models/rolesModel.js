const { pool } = require('../config/db');

class Rol {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Roles');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Roles WHERE idRoles = ?', [id]);
        return rows[0];
    }

    static async create({ Nombre }) {
        const [result] = await pool.query(
            'INSERT INTO Roles (Nombre) VALUES (?)',
            [Nombre]
        );
        return result.insertId;
    }

    static async update(id, { Nombre }) {
        const [result] = await pool.query(
            'UPDATE Roles SET Nombre = ? WHERE idRoles = ?',
            [Nombre, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM Roles WHERE idRoles = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Rol;