const { pool } = require('../config/db');

class Mecanico {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT m.*, h.Hora_Inicio, h.Hora_final, h.Motivo 
            FROM Mecanicos m
            JOIN Horarios h ON m.idHorarios = h.idHorarios
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT m.*, h.Hora_Inicio, h.Hora_final, h.Motivo 
            FROM Mecanicos m
            JOIN Horarios h ON m.idHorarios = h.idHorarios
            WHERE m.idMecanicos = ?
        `, [id]);
        return rows[0];
    }

    static async create(mecanico) {
        const { Nombre, documento, Direccion, Telefono, Telefono_Emergencia, idHorarios, Estado } = mecanico;
        const [result] = await pool.query(
            'INSERT INTO Mecanicos (Nombre, documento, Direccion, Telefono, Telefono_Emergencia, idHorarios, Estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [Nombre, documento, Direccion, Telefono, Telefono_Emergencia, idHorarios, Estado]
        );
        return result.insertId;
    }

    static async update(id, mecanico) {
        const { Nombre, documento, Direccion, Telefono, Telefono_Emergencia, idHorarios, Estado } = mecanico;
        const [result] = await pool.query(
            'UPDATE Mecanicos SET Nombre = ?, documento = ?, Direccion = ?, Telefono = ?, Telefono_Emergencia = ?, idHorarios = ?, Estado = ? WHERE idMecanicos = ?',
            [Nombre, documento, Direccion, Telefono, Telefono_Emergencia, idHorarios, Estado, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Mecanicos WHERE idMecanicos = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Mecanico;