const { pool } = require('../config/db');

class Permiso {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Permiso');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Permiso WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(permiso) {
        const { Modulo, Acción } = permiso;
        const [result] = await pool.query(
            'INSERT INTO Permiso (Modulo, Acción) VALUES (?, ?)',
            [Modulo, Acción]
        );
        return result.insertId;
    }

    static async update(id, permiso) {
        const { Modulo, Acción } = permiso;
        const [result] = await pool.query(
            'UPDATE Permiso SET Modulo = ?, Acción = ? WHERE id = ?',
            [Modulo, Acción, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Permiso WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Permiso;