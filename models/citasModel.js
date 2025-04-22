const { pool } = require('../config/db');

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
    const {
      Fecha,
      Hora,
      idVehiculos,
      idMecanicos,
      Ventas_idVentas,
      Descripcion,
      Estado_cita_idEstado_cita,
    } = cita;

    const ventaFinal = (!Ventas_idVentas || Ventas_idVentas === 0 || Ventas_idVentas === '0')
      ? null
      : Ventas_idVentas;

    const [result] = await pool.query(
      'INSERT INTO Citas (Fecha, Hora, idVehiculos, idMecanicos, Ventas_idVentas, Descripcion, Estado_cita_idEstado_cita) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Fecha, Hora, idVehiculos, idMecanicos, ventaFinal, Descripcion, Estado_cita_idEstado_cita]
    );

    return result.insertId;
  }

  static async update(id, cita) {
    const {
      Fecha,
      Hora,
      idVehiculos,
      idMecanicos,
      Ventas_idVentas,
      Descripcion,
      Estado_cita_idEstado_cita,
    } = cita;

    const ventaFinal = (!Ventas_idVentas || Ventas_idVentas === 0 || Ventas_idVentas === '0')
      ? null
      : Ventas_idVentas;

    const [result] = await pool.query(
      'UPDATE Citas SET Fecha = ?, Hora = ?, idVehiculos = ?, idMecanicos = ?, Ventas_idVentas = ?, Descripcion = ?, Estado_cita_idEstado_cita = ? WHERE idCitas = ?',
      [Fecha, Hora, idVehiculos, idMecanicos, ventaFinal, Descripcion, Estado_cita_idEstado_cita, id]
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

  static async checkDisponibilidad(mecanicoId, fechaHora) {
    try {
      const fechaSolicitada = new Date(fechaHora);
      const horaSolicitada = fechaHora.split('T')[1].substring(0, 8); // Extraer HH:MM:SS

      const [rows] = await pool.query(`
        SELECT COUNT(*) as count 
        FROM Citas 
        WHERE idMecanicos = ? 
        AND Fecha = ? 
        AND (
          (? BETWEEN Hora AND ADDTIME(Hora, '01:00:00') OR
           (ADDTIME(?, '01:00:00') BETWEEN Hora AND ADDTIME(Hora, '01:00:00')) OR
           (? <= Hora AND ADDTIME(?, '01:00:00') >= ADDTIME(Hora, '01:00:00'))
        )
      `, [
        mecanicoId,
        fechaHora.split('T')[0],
        horaSolicitada,
        horaSolicitada,
        horaSolicitada,
        horaSolicitada
      ]);

      return rows[0].count === 0;
    } catch (error) {
      console.error('Error en checkDisponibilidad (SQL):', error);
      throw error;
    }
  }
}

module.exports = Cita;

