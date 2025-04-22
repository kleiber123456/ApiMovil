const { pool } = require('../config/db');

class Venta {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT v.*, 
                   ve.Placa as VehiculoPlaca, 
                   e.Nombre as EstadoNombre 
            FROM Ventas v
            JOIN Vehiculos ve ON v.Vehiculos_idVehiculos = ve.idVehiculos
            JOIN Estados e ON v.Estados_idEstados = e.idEstados
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT v.*, 
                   ve.Placa as VehiculoPlaca, 
                   e.Nombre as EstadoNombre 
            FROM Ventas v
            JOIN Vehiculos ve ON v.Vehiculos_idVehiculos = ve.idVehiculos
            JOIN Estados e ON v.Estados_idEstados = e.idEstados
            WHERE v.idVentas = ?
        `, [id]);
        return rows[0];
    }

    static async create(venta) {
        const { Fecha = new Date(), Vehiculos_idVehiculos, Estados_idEstados, Total = 0 } = venta;
        const totalDecimal = parseFloat(Total);
        const [result] = await pool.query(
            'INSERT INTO Ventas (Fecha, Vehiculos_idVehiculos, Estados_idEstados, Total) VALUES (?, ?, ?, ?)',
            [Fecha, Vehiculos_idVehiculos, Estados_idEstados, isNaN(totalDecimal) ? 0 : totalDecimal]
        );
        return result.insertId;
    }

    static async update(id, venta) {
        let { Fecha, Vehiculos_idVehiculos, Estados_idEstados, Total = 0 } = venta;
        if (!Fecha) Fecha = new Date();
        const totalDecimal = parseFloat(Total);
        const [result] = await pool.query(
            'UPDATE Ventas SET Fecha = ?, Vehiculos_idVehiculos = ?, Estados_idEstados = ?, Total = ? WHERE idVentas = ?',
            [Fecha, Vehiculos_idVehiculos, Estados_idEstados, isNaN(totalDecimal) ? 0 : totalDecimal, id]
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
            'INSERT INTO Venta_Por_Servicio (Ventas_idVentas, Servicios_idServicios, Subtotal) VALUES (?, ?, ?)',
            [idVenta, idServicio, subtotal]
        );
        return result.insertId;
    }

    static async recalcularTotal(idVenta) {
        const [repuestos] = await pool.query(`
            SELECT SUM(Subtotal) as totalRepuestos 
            FROM Venta_Por_Repuesto 
            WHERE idVentas = ?
        `, [idVenta]);

        const [servicios] = await pool.query(`
            SELECT SUM(Subtotal) as totalServicios 
            FROM Venta_Por_Servicio 
            WHERE Ventas_idVentas = ?
        `, [idVenta]);

        const total = (repuestos[0].totalRepuestos || 0) + (servicios[0].totalServicios || 0);

        const [result] = await pool.query(`
            UPDATE Ventas SET Total = ?, Estados_idEstados = ? WHERE idVentas = ?
        `, [total, total > 0 ? 2 : 1, idVenta]);

        return total;
    }
}

module.exports = Venta;
