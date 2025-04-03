const { pool } = require('../config/db');

class Servicio {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Servicios');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Servicios WHERE idServicios = ?', [id]);
        return rows[0];
    }

    static async create(servicio) {
        const { Nombre, Precio, Descripcion, estado } = servicio;
        const [result] = await pool.query(
            'INSERT INTO Servicios (Nombre, Precio, Descripcion, estado) VALUES (?, ?, ?, ?)',
            [Nombre, Precio, Descripcion, estado]
        );
        return result.insertId;
    }

    static async update(id, servicio) {
        const { Nombre, Precio, Descripcion, estado } = servicio;
        const [result] = await pool.query(
            'UPDATE Servicios SET Nombre = ?, Precio = ?, Descripcion = ?, estado = ? WHERE idServicios = ?',
            [Nombre, Precio, Descripcion, estado, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Servicios WHERE idServicios = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Servicio;