const { pool } = require('../config/db');

class Rol {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Rol');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Rol WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(rol) {
        const { Nombre, Descripcion, Estado } = rol;
        const [result] = await pool.query(
            'INSERT INTO Rol (Nombre, Descripcion, Estado) VALUES (?, ?, ?)',
            [Nombre, Descripcion, Estado]
        );
        return result.insertId;
    }

    static async update(id, rol) {
        const { Nombre, Descripcion, Estado } = rol;
        const [result] = await pool.query(
            'UPDATE Rol SET Nombre = ?, Descripcion = ?, Estado = ? WHERE id = ?',
            [Nombre, Descripcion, Estado, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Rol WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Rol;