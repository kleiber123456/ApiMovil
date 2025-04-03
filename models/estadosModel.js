const { pool } = require('../config/db');

class Estado {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Estados');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Estados WHERE idEstados = ?', [id]);
        return rows[0];
    }

    static async create(estado) {
        const { Nombre } = estado;
        const [result] = await pool.query(
            'INSERT INTO Estados (Nombre) VALUES (?)',
            [Nombre]
        );
        return result.insertId;
    }

    static async update(id, estado) {
        const { Nombre } = estado;
        const [result] = await pool.query(
            'UPDATE Estados SET Nombre = ? WHERE idEstados = ?',
            [Nombre, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Estados WHERE idEstados = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Estado;