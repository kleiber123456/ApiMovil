const { pool } = require('../config/db');

class CategoriaRepuesto {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Categoria_Repuesto');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Categoria_Repuesto WHERE idCategoria_Repuesto = ?', [id]);
        return rows[0];
    }

    static async create(categoria) {
        const { Nombre } = categoria;
        const [result] = await pool.query(
            'INSERT INTO Categoria_Repuesto (Nombre) VALUES (?)',
            [Nombre]
        );
        return result.insertId;
    }

    static async update(id, categoria) {
        const { Nombre } = categoria;
        const [result] = await pool.query(
            'UPDATE Categoria_Repuesto SET Nombre = ? WHERE idCategoria_Repuesto = ?',
            [Nombre, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Categoria_Repuesto WHERE idCategoria_Repuesto = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = CategoriaRepuesto;