const { pool }= require('../config/db');

class Horario {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Horarios');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Horarios WHERE idHorarios = ?', [id]);
        return rows[0];
    }

    static async create(horario) {
        const { Hora_Inicio, Hora_final, Motivo } = horario;
        const [result] = await pool.query(
            'INSERT INTO Horarios (Hora_Inicio, Hora_final, Motivo) VALUES (?, ?, ?)',
            [Hora_Inicio, Hora_final, Motivo]
        );
        return result.insertId;
    }

    static async update(id, horario) {
        const { Hora_Inicio, Hora_final, Motivo } = horario;
        const [result] = await pool.query(
            'UPDATE Horarios SET Hora_Inicio = ?, Hora_final = ?, Motivo = ? WHERE idHorarios = ?',
            [Hora_Inicio, Hora_final, Motivo, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Horarios WHERE idHorarios = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Horario;