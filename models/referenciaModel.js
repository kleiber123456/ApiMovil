const { pool } = require('../config/db');

class Referencia {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT r.*, m.Nombre as MarcaNombre 
            FROM Referencia r
            JOIN Marcas m ON r.idMarcas = m.idMarcas
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT r.*, m.Nombre as MarcaNombre 
            FROM Referencia r
            JOIN Marcas m ON r.idMarcas = m.idMarcas
            WHERE r.idReferencia = ?
        `, [id]);
        return rows[0];
    }

    static async create(referencia) {
        const { Nombre, Descripcion, idMarcas } = referencia;
        const [result] = await pool.query(
            'INSERT INTO Referencia (Nombre, Descripcion, idMarcas) VALUES (?, ?, ?)',
            [Nombre, Descripcion, idMarcas]
        );
        return result.insertId;
    }

    static async update(id, referencia) {
        const { Nombre, Descripcion, idMarcas } = referencia;
        const [result] = await pool.query(
            'UPDATE Referencia SET Nombre = ?, Descripcion = ?, idMarcas = ? WHERE idReferencia = ?',
            [Nombre, Descripcion, idMarcas, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Referencia WHERE idReferencia = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Referencia;