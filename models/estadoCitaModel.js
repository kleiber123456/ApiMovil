const { pool } = require('../config/db');

class EstadoCita {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Estado_cita');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Estado_cita WHERE idEstado_cita = ?', [id]);
        return rows[0];
    }

    static async create(estadoCita) {
        const { Nombre } = estadoCita;
        const [result] = await pool.query(
            'INSERT INTO Estado_cita (Nombre) VALUES (?)',
            [Nombre]
        );
        return result.insertId;
    }

    static async update(id, estadoCita) {
        const { Nombre } = estadoCita;
        const [result] = await pool.query(
            'UPDATE Estado_cita SET Nombre = ? WHERE idEstado_cita = ?',
            [Nombre, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Estado_cita WHERE idEstado_cita = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = EstadoCita;