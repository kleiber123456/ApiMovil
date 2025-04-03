const { pool } = require('../config/db');

class VentaPorRepuesto {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT vpr.*, r.Nombre as repuesto_nombre, c.Nombre as cliente_nombre, 
                   c.Apellido as cliente_apellido, v.Fecha as fecha_venta
            FROM Venta_Por_Repuesto vpr
            JOIN Repuestos r ON vpr.idRepuestos = r.idRepuestos
            JOIN Ventas v ON vpr.idVentas = v.idVentas
            JOIN Clientes c ON v.Clientes_idClientes = c.idClientes
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Venta_Por_Repuesto WHERE idVenta_Por_Repuesto = ?', [id]);
        return rows[0];
    }

    static async getByVentaId(ventaId) {
        const [rows] = await pool.query(`
            SELECT vpr.*, r.Nombre as repuesto_nombre, r.Cantidad as stock_actual
            FROM Venta_Por_Repuesto vpr
            JOIN Repuestos r ON vpr.idRepuestos = r.idRepuestos
            WHERE vpr.idVentas = ?
        `, [ventaId]);
        return rows;
    }

    static async getByRepuestoId(repuestoId) {
        const [rows] = await pool.query(`
            SELECT vpr.*, v.Fecha as fecha_venta, c.Nombre as cliente_nombre, c.Apellido as cliente_apellido
            FROM Venta_Por_Repuesto vpr
            JOIN Ventas v ON vpr.idVentas = v.idVentas
            JOIN Clientes c ON v.Clientes_idClientes = c.idClientes
            WHERE vpr.idRepuestos = ?
        `, [repuestoId]);
        return rows;
    }

    static async create(ventaRepuesto) {
        const { idRepuestos, idVentas, Cantidad, Subtotal } = ventaRepuesto;
        
        // Verificar stock disponible
        const [repuesto] = await pool.query(
            'SELECT Cantidad FROM Repuestos WHERE idRepuestos = ?',
            [idRepuestos]
        );
        
        if (repuesto[0].Cantidad < Cantidad) {
            throw new Error('Stock insuficiente para este repuesto');
        }
        
        const [result] = await pool.query(
            'INSERT INTO Venta_Por_Repuesto (idRepuestos, idVentas, Cantidad, Subtotal) VALUES (?, ?, ?, ?)',
            [idRepuestos, idVentas, Cantidad, Subtotal]
        );
        
        // Actualizar el stock del repuesto
        await pool.query(
            'UPDATE Repuestos SET Cantidad = Cantidad - ? WHERE idRepuestos = ?',
            [Cantidad, idRepuestos]
        );
        
        return result.insertId;
    }

    static async update(id, ventaRepuesto) {
        const { idRepuestos, idVentas, Cantidad, Subtotal } = ventaRepuesto;
        
        // Obtener la cantidad anterior para ajustar el stock
        const [oldData] = await pool.query(
            'SELECT Cantidad, idRepuestos FROM Venta_Por_Repuesto WHERE idVenta_Por_Repuesto = ?',
            [id]
        );
        
        const [result] = await pool.query(
            'UPDATE Venta_Por_Repuesto SET idRepuestos = ?, idVentas = ?, Cantidad = ?, Subtotal = ? WHERE idVenta_Por_Repuesto = ?',
            [idRepuestos, idVentas, Cantidad, Subtotal, id]
        );
        
        // Ajustar el stock del repuesto
        if (oldData[0]) {
            const diff = Cantidad - oldData[0].Cantidad;
            await pool.query(
                'UPDATE Repuestos SET Cantidad = Cantidad - ? WHERE idRepuestos = ?',
                [diff, oldData[0].idRepuestos]
            );
        }
        
        return result.affectedRows > 0;
    }

    static async delete(id) {
        // Obtener datos antes de borrar para ajustar el stock
        const [oldData] = await pool.query(
            'SELECT Cantidad, idRepuestos FROM Venta_Por_Repuesto WHERE idVenta_Por_Repuesto = ?',
            [id]
        );
        
        const [result] = await pool.query(
            'DELETE FROM Venta_Por_Repuesto WHERE idVenta_Por_Repuesto = ?', 
            [id]
        );
        
        // Ajustar el stock del repuesto
        if (oldData[0] && result.affectedRows > 0) {
            await pool.query(
                'UPDATE Repuestos SET Cantidad = Cantidad + ? WHERE idRepuestos = ?',
                [oldData[0].Cantidad, oldData[0].idRepuestos]
            );
        }
        
        return result.affectedRows > 0;
    }
}

module.exports = VentaPorRepuesto;