const { pool } = require('../config/db');

class Marca {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Marcas');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Marcas WHERE idMarcas = ?', [id]);
        return rows[0];
    }

    static async create(marca) {
        const { Nombre } = marca;
        const [result] = await pool.query(
            'INSERT INTO Marcas (Nombre) VALUES (?)',
            [Nombre]
        );
        return result.insertId;
    }

    static async update(id, marca) {
        const { Nombre } = marca;
        const [result] = await pool.query(
            'UPDATE Marcas SET Nombre = ? WHERE idMarcas = ?',
            [Nombre, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Marcas WHERE idMarcas = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Marca;