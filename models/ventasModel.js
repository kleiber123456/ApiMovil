const { pool } = require('../config/db');

class Venta {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT v.*, c.Nombre as ClienteNombre, c.Apellido as ClienteApellido, e.Nombre as EstadoNombre 
            FROM Ventas v
            JOIN Clientes c ON v.Clientes_idClientes = c.idClientes
            JOIN Estados e ON v.Estados_idEstados = e.idEstados
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT v.*, c.Nombre as ClienteNombre, c.Apellido as ClienteApellido, e.Nombre as EstadoNombre 
            FROM Ventas v
            JOIN Clientes c ON v.Clientes_idClientes = c.idClientes
            JOIN Estados e ON v.Estados_idEstados = e.idEstados
            WHERE v.idVentas = ?
        `, [id]);
        return rows[0];
    }

    static async create(venta) {
        const { Fecha, Clientes_idClientes, Estados_idEstados, Total } = venta;
        const [result] = await pool.query(
            'INSERT INTO Ventas (Fecha, Clientes_idClientes, Estados_idEstados, Total) VALUES (?, ?, ?, ?)',
            [Fecha, Clientes_idClientes, Estados_idEstados, Total]
        );
        return result.insertId;
    }

    static async update(id, venta) {
        const { Fecha, Clientes_idClientes, Estados_idEstados, Total } = venta;
        const [result] = await pool.query(
            'UPDATE Ventas SET Fecha = ?, Clientes_idClientes = ?, Estados_idEstados = ?, Total = ? WHERE idVentas = ?',
            [Fecha, Clientes_idClientes, Estados_idEstados, Total, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Ventas WHERE idVentas = ?', [id]);
        return result.affectedRows > 0;
    }

    static async getRepuestosByVenta(idVenta) {
        const [rows] = await pool.query(`
            SELECT vpr.*, r.Nombre as RepuestoNombre 
            FROM Venta_Por_Repuesto vpr
            JOIN Repuestos r ON vpr.idRepuestos = r.idRepuestos
            WHERE vpr.idVentas = ?
        `, [idVenta]);
        return rows;
    }

    static async getServiciosByVenta(idVenta) {
        const [rows] = await pool.query(`
            SELECT vps.*, s.Nombre as ServicioNombre 
            FROM Venta_Por_Servicio vps
            JOIN Servicios s ON vps.Servicios_idServicios = s.idServicios
            WHERE vps.Ventas_idVentas = ?
        `, [idVenta]);
        return rows;
    }

    static async addRepuestoToVenta(idVenta, idRepuesto, cantidad, subtotal) {
        const [result] = await pool.query(
            'INSERT INTO Venta_Por_Repuesto (idRepuestos, idVentas, cantidad, Subtotal) VALUES (?, ?, ?, ?)',
            [idRepuesto, idVenta, cantidad, subtotal]
        );
        return result.insertId;
    }

    static async addServicioToVenta(idVenta, idServicio, subtotal) {
        const [result] = await pool.query(
            'INSERT INTO Venta_Por_Servicio (Ventas_idVentas, Servicios_idServicios, Subotal) VALUES (?, ?, ?)',
            [idVenta, idServicio, subtotal]
        );
        return result.insertId;
    }
}

module.exports = Venta;