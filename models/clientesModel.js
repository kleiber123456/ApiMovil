const { pool } = require('../config/db');

class Cliente {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Clientes');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Clientes WHERE idClientes = ?', [id]);
        return rows[0];
    }

    static async create(cliente) {
        const { Nombre, Apellido, Direccion, documento, Correo, Telefono, Estado } = cliente;
        const [result] = await pool.query(
            'INSERT INTO Clientes (Nombre, Apellido, Direccion, documento, Correo, Telefono, Estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [Nombre, Apellido, Direccion, documento, Correo, Telefono, Estado]
        );
        return result.insertId;
    }

    static async update(id, cliente) {
        const { Nombre, Apellido, Direccion, documento, Correo, Telefono, Estado } = cliente;
        const [result] = await pool.query(
            'UPDATE Clientes SET Nombre = ?, Apellido = ?, Direccion = ?, documento = ?, Correo = ?, Telefono = ?, Estado = ? WHERE idClientes = ?',
            [Nombre, Apellido, Direccion, documento, Correo, Telefono, Estado, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Clientes WHERE idClientes = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Cliente;