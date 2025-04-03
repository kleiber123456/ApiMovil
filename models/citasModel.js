const  { pool } = require('../config/db');

class Cita {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT c.*, 
                   v.Placa as VehiculoPlaca, 
                   m.Nombre as MecanicoNombre,
                   ec.Nombre as EstadoCitaNombre
            FROM Citas c
            JOIN Vehiculos v ON c.idVehiculos = v.idVehiculos
            JOIN Mecanicos m ON c.idMecanicos = m.idMecanicos
            JOIN Estado_cita ec ON c.Estado_cita_idEstado_cita = ec.idEstado_cita
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT c.*, 
                   v.Placa as VehiculoPlaca, 
                   m.Nombre as MecanicoNombre,
                   ec.Nombre as EstadoCitaNombre
            FROM Citas c
            JOIN Vehiculos v ON c.idVehiculos = v.idVehiculos
            JOIN Mecanicos m ON c.idMecanicos = m.idMecanicos
            JOIN Estado_cita ec ON c.Estado_cita_idEstado_cita = ec.idEstado_cita
            WHERE c.idCitas = ?
        `, [id]);
        return rows[0];
    }

    static async create(cita) {
        const { Fecha, Hora, idVehiculos, idMecanicos, Ventas_idVentas, Estado_cita_idEstado_cita } = cita;
        const [result] = await pool.query(
            'INSERT INTO Citas (Fecha, Hora, idVehiculos, idMecanicos, Ventas_idVentas, Estado_cita_idEstado_cita) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [Fecha, Hora, idVehiculos, idMecanicos, Ventas_idVentas, Estado_cita_idEstado_cita]
        );
        return result.insertId;
    }

    static async update(id, cita) {
        const { Fecha, Hora, idVehiculos, idMecanicos, Ventas_idVentas, Estado_cita_idEstado_cita } = cita;
        const [result] = await pool.query(
            'UPDATE Citas SET Fecha = ?, Estado = ?, Hora = ?, idVehiculos = ?, idMecanicos = ?, Ventas_idVentas = ?, Estado_cita_idEstado_cita = ? WHERE idCitas = ?',
            [Fecha, Hora, idVehiculos, idMecanicos, Ventas_idVentas, Estado_cita_idEstado_cita, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Citas WHERE idCitas = ?', [id]);
        return result.affectedRows > 0;
    }

    static async getByMecanico(idMecanico) {
        const [rows] = await pool.query('SELECT * FROM Citas WHERE idMecanicos = ?', [idMecanico]);
        return rows;
    }

    static async getByVehiculo(idVehiculo) {
        const [rows] = await pool.query('SELECT * FROM Citas WHERE idVehiculos = ?', [idVehiculo]);
        return rows;
    }

    static async getByEstado(estadoId) {
        const [rows] = await pool.query('SELECT * FROM Citas WHERE Estado_cita_idEstado_cita = ?', [estadoId]);
        return rows;
    }
}

module.exports = Cita;