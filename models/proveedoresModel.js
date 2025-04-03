const { pool } = require('../config/db');

class Proveedor {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Proveedores');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Proveedores WHERE idProveedores = ?', [id]);
        return rows[0];
    }

    static async create(proveedor) {
        const { Nombre, Telefono, Nombre_Empresa, Nit, Direccion, Estado } = proveedor;
        const [result] = await pool.query(
            'INSERT INTO Proveedores (Nombre, Telefono, Nombre_Empresa, Nit, Direccion, Estado) VALUES (?, ?, ?, ?, ?, ?)',
            [Nombre, Telefono, Nombre_Empresa, Nit, Direccion, Estado]
        );
        return result.insertId;
    }

    static async update(id, proveedor) {
        const { Nombre, Telefono, Nombre_Empresa, Nit, Direccion, Estado } = proveedor;
        const [result] = await pool.query(
            'UPDATE Proveedores SET Nombre = ?, Telefono = ?, Nombre_Empresa = ?, Nit = ?, Direccion = ?, Estado = ? WHERE idProveedores = ?',
            [Nombre, Telefono, Nombre_Empresa, Nit, Direccion, Estado, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Proveedores WHERE idProveedores = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Proveedor;