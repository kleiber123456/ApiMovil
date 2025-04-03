const { pool } = require('../config/db');

class Compra {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT c.*, p.Nombre as ProveedorNombre, p.Nombre_Empresa 
            FROM Compras c
            JOIN Proveedores p ON c.Proveedores_idProveedores = p.idProveedores
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT c.*, p.Nombre as ProveedorNombre, p.Nombre_Empresa 
            FROM Compras c
            JOIN Proveedores p ON c.Proveedores_idProveedores = p.idProveedores
            WHERE c.idCompras = ?
        `, [id]);
        return rows[0];
    }

    static async create(compra) {
        const { Fecha, Proveedores_idProveedores, total, estado } = compra;
        const [result] = await pool.query(
            'INSERT INTO Compras (Fecha, Proveedores_idProveedores, total, estado) VALUES (?, ?, ?, ?)',
            [Fecha, Proveedores_idProveedores, total, estado]
        );
        return result.insertId;
    }

    static async update(id, compra) {
        const { Fecha, Proveedores_idProveedores, total, estado } = compra;
        const [result] = await pool.query(
            'UPDATE Compras SET Fecha = ?, Proveedores_idProveedores = ?, total = ?, estado = ? WHERE idCompras = ?',
            [Fecha, Proveedores_idProveedores, total, estado, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Compras WHERE idCompras = ?', [id]);
        return result.affectedRows > 0;
    }

    static async getRepuestosByCompra(idCompra) {
        const [rows] = await pool.query(`
            SELECT cpr.*, r.Nombre as RepuestoNombre 
            FROM Compras_por_repuesto cpr
            JOIN Repuestos r ON cpr.idRepuestos = r.idRepuestos
            WHERE cpr.idCompras = ?
        `, [idCompra]);
        return rows;
    }

    static async addRepuestoToCompra(idCompra, idRepuesto, cantidad, subtotal) {
        const [result] = await pool.query(
            'INSERT INTO Compras_por_repuesto (idCompras, idRepuestos, Cantidad, SubTotal) VALUES (?, ?, ?, ?)',
            [idCompra, idRepuesto, cantidad, subtotal]
        );
        return result.insertId;
    }
}

module.exports = Compra;