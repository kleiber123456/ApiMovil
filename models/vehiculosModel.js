const { pool } = require('../config/db');

class Vehiculo {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Vehiculos');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Vehiculos WHERE idVehiculos = ?', [id]);
        return rows[0];
    }

    static async create(vehiculo) {
        const { Placa, Color, Tipo_Vehiculo, Referencia_idReferencia, Clientes_idClientes, Estado } = vehiculo;
        const [result] = await pool.query(
            'INSERT INTO Vehiculos (Placa, Color, Tipo_Vehiculo, Referencia_idReferencia, Clientes_idClientes, Estado) VALUES (?, ?, ?, ?, ?, ?)',
            [Placa, Color, Tipo_Vehiculo, Referencia_idReferencia, Clientes_idClientes, Estado]
        );
        return result.insertId;
    }

    static async update(id, vehiculo) {
        const { Placa, Color, Tipo_Vehiculo, Referencia_idReferencia, Clientes_idClientes, Estado } = vehiculo;
        const [result] = await pool.query(
            'UPDATE Vehiculos SET Placa = ?, Color = ?, Tipo_Vehiculo = ?, Referencia_idReferencia = ?, Clientes_idClientes = ?, Estado = ? WHERE idVehiculos = ?',
            [Placa, Color, Tipo_Vehiculo, Referencia_idReferencia, Clientes_idClientes, Estado, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Vehiculos WHERE idVehiculos = ?', [id]);
        return result.affectedRows > 0;
    }

    static async getByClienteId(clienteId) {
        const [rows] = await pool.query('SELECT * FROM Vehiculos WHERE Clientes_idClientes = ?', [clienteId]);
        return rows;
    }
}

module.exports = Vehiculo;