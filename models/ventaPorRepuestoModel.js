const { pool } = require('../config/db');

class VentaPorRepuesto {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT vpr.*, 
                   r.Nombre AS RepuestoNombre,
                   r.Precio_Venta AS PrecioUnitario
            FROM Venta_Por_Repuesto vpr
            JOIN Repuestos r ON vpr.idRepuestos = r.idRepuestos
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT vpr.*, 
                   r.Nombre AS RepuestoNombre,
                   r.Precio_Venta AS PrecioUnitario
            FROM Venta_Por_Repuesto vpr
            JOIN Repuestos r ON vpr.idRepuestos = r.idRepuestos
            WHERE vpr.idVenta_Por_Repuesto = ?
        `, [id]);
        return rows[0];
    }

    static async getByVentaId(idVenta) {
        const [rows] = await pool.query(`
            SELECT vpr.*, 
                   r.Nombre AS RepuestoNombre,
                   r.Precio_Venta AS PrecioUnitario
            FROM Venta_Por_Repuesto vpr
            JOIN Repuestos r ON vpr.idRepuestos = r.idRepuestos
            WHERE vpr.idVentas = ?
        `, [idVenta]);
        return rows;
    }

    static async create({ idRepuestos, idVentas, Cantidad, Precio_Unitario }) {
        const Subtotal = Cantidad * Precio_Unitario;
        const [result] = await pool.query(`
            INSERT INTO Venta_Por_Repuesto (idRepuestos, idVentas, Cantidad, Precio_Unitario, SubTotal)
            VALUES (?, ?, ?, ?, ?)
        `, [idRepuestos, idVentas, Cantidad, Precio_Unitario, Subtotal]);
        return result.insertId;
    }

    static async update(id, { idRepuestos, idVentas, Cantidad, Precio_Unitario }) {
        const Subtotal = Cantidad * Precio_Unitario;
        const [result] = await pool.query(`
            UPDATE Venta_Por_Repuesto 
            SET idRepuestos = ?, idVentas = ?, Cantidad = ?, Precio_Unitario = ?, SubTotal = ?
            WHERE idVenta_Por_Repuesto = ?
        `, [idRepuestos, idVentas, Cantidad, Precio_Unitario, Subtotal, id]);
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query(`
            DELETE FROM Venta_Por_Repuesto WHERE idVenta_Por_Repuesto = ?
        `, [id]);
        return result.affectedRows > 0;
    }

    static async deleteByVenta(idVenta) {
        const [result] = await pool.query(`
            DELETE FROM Venta_Por_Repuesto WHERE idVentas = ?
        `, [idVenta]);
        return result.affectedRows > 0;
    }
}

module.exports = VentaPorRepuesto;
