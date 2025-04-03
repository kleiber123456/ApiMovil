const { pool } = require('../config/db');

class ComprasPorRepuesto {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT cpr.*, r.Nombre as repuesto_nombre, p.Nombre as proveedor_nombre, c.Fecha as fecha_compra
            FROM Compras_por_repuesto cpr
            JOIN Repuestos r ON cpr.idRepuestos = r.idRepuestos
            JOIN Compras c ON cpr.idCompras = c.idCompras
            JOIN Proveedores p ON c.Proveedores_idProveedores = p.idProveedores
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Compras_por_repuesto WHERE idCompras_por_repuesto = ?', [id]);
        return rows[0];
    }

    static async getByCompraId(compraId) {
        const [rows] = await pool.query(`
            SELECT cpr.*, r.Nombre as repuesto_nombre, r.Cantidad as stock_actual
            FROM Compras_por_repuesto cpr
            JOIN Repuestos r ON cpr.idRepuestos = r.idRepuestos
            WHERE cpr.idCompras = ?
        `, [compraId]);
        return rows;
    }

    static async getByRepuestoId(repuestoId) {
        const [rows] = await pool.query(`
            SELECT cpr.*, c.Fecha as fecha_compra, p.Nombre as proveedor_nombre
            FROM Compras_por_repuesto cpr
            JOIN Compras c ON cpr.idCompras = c.idCompras
            JOIN Proveedores p ON c.Proveedores_idProveedores = p.idProveedores
            WHERE cpr.idRepuestos = ?
        `, [repuestoId]);
        return rows;
    }

    static async create(compraRepuesto) {
        const { idCompras, idRepuestos, Cantidad, SubTotal } = compraRepuesto;
        const [result] = await pool.query(
            'INSERT INTO Compras_por_repuesto (idCompras, idRepuestos, Cantidad, SubTotal) VALUES (?, ?, ?, ?)',
            [idCompras, idRepuestos, Cantidad, SubTotal]
        );
        
        // Actualizar el stock del repuesto
        await pool.query(
            'UPDATE Repuestos SET Cantidad = Cantidad + ? WHERE idRepuestos = ?',
            [Cantidad, idRepuestos]
        );
        
        return result.insertId;
    }

    static async update(id, compraRepuesto) {
        const { idCompras, idRepuestos, Cantidad, SubTotal } = compraRepuesto;
        
        // Obtener la cantidad anterior para ajustar el stock
        const [oldData] = await pool.query(
            'SELECT Cantidad, idRepuestos FROM Compras_por_repuesto WHERE idCompras_por_repuesto = ?',
            [id]
        );
        
        const [result] = await pool.query(
            'UPDATE Compras_por_repuesto SET idCompras = ?, idRepuestos = ?, Cantidad = ?, SubTotal = ? WHERE idCompras_por_repuesto = ?',
            [idCompras, idRepuestos, Cantidad, SubTotal, id]
        );
        
        // Ajustar el stock del repuesto
        if (oldData[0]) {
            const diff = Cantidad - oldData[0].Cantidad;
            await pool.query(
                'UPDATE Repuestos SET Cantidad = Cantidad + ? WHERE idRepuestos = ?',
                [diff, oldData[0].idRepuestos]
            );
        }
        
        return result.affectedRows > 0;
    }

    static async delete(id) {
        // Obtener datos antes de borrar para ajustar el stock
        const [oldData] = await pool.query(
            'SELECT Cantidad, idRepuestos FROM Compras_por_repuesto WHERE idCompras_por_repuesto = ?',
            [id]
        );
        
        const [result] = await pool.query(
            'DELETE FROM Compras_por_repuesto WHERE idCompras_por_repuesto = ?', 
            [id]
        );
        
        // Ajustar el stock del repuesto
        if (oldData[0] && result.affectedRows > 0) {
            await pool.query(
                'UPDATE Repuestos SET Cantidad = Cantidad - ? WHERE idRepuestos = ?',
                [oldData[0].Cantidad, oldData[0].idRepuestos]
            );
        }
        
        return result.affectedRows > 0;
    }
}

module.exports = ComprasPorRepuesto;