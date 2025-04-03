const { pool } = require('../config/db');

class Repuesto {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT r.*, cr.Nombre as CategoriaNombre 
            FROM Repuestos r
            JOIN Categoria_Repuesto cr ON r.idCategoria_Repuesto = cr.idCategoria_Repuesto
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT r.*, cr.Nombre as CategoriaNombre 
            FROM Repuestos r
            JOIN Categoria_Repuesto cr ON r.idCategoria_Repuesto = cr.idCategoria_Repuesto
            WHERE r.idRepuestos = ?
        `, [id]);
        return rows[0];
    }

    static async create(repuesto) {
        const { Nombre, Cantidad, idCategoria_Repuesto } = repuesto;
        const [result] = await pool.query(
            'INSERT INTO Repuestos (Nombre, Cantidad, idCategoria_Repuesto) VALUES (?, ?, ?)',
            [Nombre, Cantidad, idCategoria_Repuesto]
        );
        return result.insertId;
    }

    static async update(id, repuesto) {
        const { Nombre, Cantidad, idCategoria_Repuesto } = repuesto;
        const [result] = await pool.query(
            'UPDATE Repuestos SET Nombre = ?, Cantidad = ?, idCategoria_Repuesto = ? WHERE idRepuestos = ?',
            [Nombre, Cantidad, idCategoria_Repuesto, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Repuestos WHERE idRepuestos = ?', [id]);
        return result.affectedRows > 0;
    }

    static async updateCantidad(id, cantidad) {
        const [result] = await pool.query(
            'UPDATE Repuestos SET Cantidad = ? WHERE idRepuestos = ?',
            [cantidad, id]
        );
        return result.affectedRows > 0;
    }

    static async getByCategoria(idCategoria) {
        const [rows] = await pool.query('SELECT * FROM Repuestos WHERE idCategoria_Repuesto = ?', [idCategoria]);
        return rows;
    }
}

module.exports = Repuesto;