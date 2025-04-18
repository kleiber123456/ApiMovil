const { pool } = require('../config/db');

class Venta {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT v.*, 
                   ve.Placa as VehiculoPlaca,
                   ve.Color as VehiculoColor,
                   ref.Nombre as ReferenciaNombre,
                   m.Nombre as MarcaNombre,
                   e.Nombre as EstadoNombre
            FROM Ventas v
            JOIN Vehiculos ve ON v.Vehiculos_idVehiculos = ve.idVehiculos
            JOIN Referencia ref ON ve.Referencia_idReferencia = ref.idReferencia
            JOIN Marcas m ON ref.idMarcas = m.idMarcas
            JOIN Estados e ON v.Estados_idEstados = e.idEstados
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT v.*, 
                   ve.Placa as VehiculoPlaca,
                   ve.Color as VehiculoColor,
                   ref.Nombre as ReferenciaNombre,
                   m.Nombre as MarcaNombre,
                   e.Nombre as EstadoNombre
            FROM Ventas v
            JOIN Vehiculos ve ON v.Vehiculos_idVehiculos = ve.idVehiculos
            JOIN Referencia ref ON ve.Referencia_idReferencia = ref.idReferencia
            JOIN Marcas m ON ref.idMarcas = m.idMarcas
            JOIN Estados e ON v.Estados_idEstados = e.idEstados
            WHERE v.idVentas = ?
        `, [id]);
        return rows[0];
    }

    static async create(venta) {
        const { Fecha, Vehiculos_idVehiculos, Estados_idEstados, Total } = venta;
        const [result] = await pool.query(
            'INSERT INTO Ventas (Fecha, Vehiculos_idVehiculos, Estados_idEstados, Total) VALUES (?, ?, ?, ?)',
            [Fecha || new Date(), Vehiculos_idVehiculos, Estados_idEstados, Total || 0]
        );
        return result.insertId;
    }

    static async update(id, venta) {
        const { Fecha, Vehiculos_idVehiculos, Estados_idEstados, Total } = venta;
        const [result] = await pool.query(
            'UPDATE Ventas SET Fecha = ?, Vehiculos_idVehiculos = ?, Estados_idEstados = ?, Total = ? WHERE idVentas = ?',
            [Fecha, Vehiculos_idVehiculos, Estados_idEstados, Total, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Venta_Por_Repuesto WHERE idVentas = ?', [id]);
        await pool.query('DELETE FROM Venta_Por_Servicio WHERE Ventas_idVentas = ?', [id]);
        const [result] = await pool.query('DELETE FROM Ventas WHERE idVentas = ?', [id]);
        return result.affectedRows > 0;
    }

    static async getRepuestosByVenta(idVenta) {
        const [rows] = await pool.query(`
            SELECT vpr.*, 
                   r.Nombre as RepuestoNombre,
                   r.Precio_Venta as PrecioUnitario
            FROM Venta_Por_Repuesto vpr
            JOIN Repuestos r ON vpr.idRepuestos = r.idRepuestos
            WHERE vpr.idVentas = ?
        `, [idVenta]);
        return rows;
    }

    static async getServiciosByVenta(idVenta) {
        const [rows] = await pool.query(`
            SELECT vps.*, 
                   s.Nombre as ServicioNombre,
                   s.Precio as PrecioUnitario
            FROM Venta_Por_Servicio vps
            JOIN Servicios s ON vps.Servicios_idServicios = s.idServicios
            WHERE vps.Ventas_idVentas = ?
        `, [idVenta]);
        return rows;
    }

    static async addRepuestoToVenta(idVenta, idRepuesto, cantidad, precioUnitario) {
        const subtotal = cantidad * precioUnitario;
        const [result] = await pool.query(
            'INSERT INTO Venta_Por_Repuesto (idRepuestos, idVentas, Cantidad, Precio_Unitario, SubTotal) VALUES (?, ?, ?, ?, ?)',
            [idRepuesto, idVenta, cantidad, precioUnitario, subtotal]
        );
        
        // Actualizar total de la venta
        await this.updateVentaTotal(idVenta);
        return result.insertId;
    }

    static async addServicioToVenta(idVenta, idServicio, precioUnitario) {
        const [result] = await pool.query(
            'INSERT INTO Venta_Por_Servicio (Ventas_idVentas, Servicios_idServicios, Subtotal) VALUES (?, ?, ?)',
            [idVenta, idServicio, precioUnitario]
        );
        
        // Actualizar total de la venta
        await this.updateVentaTotal(idVenta);
        return result.insertId;
    }

    static async updateVentaTotal(idVenta) {
        const [repuestos] = await pool.query('SELECT SUM(SubTotal) as totalRepuestos FROM Venta_Por_Repuesto WHERE idVentas = ?', [idVenta]);
        const [servicios] = await pool.query('SELECT SUM(Subtotal) as totalServicios FROM Venta_Por_Servicio WHERE Ventas_idVentas = ?', [idVenta]);
        
        const total = (repuestos[0].totalRepuestos || 0) + (servicios[0].totalServicios || 0);
        
        await pool.query('UPDATE Ventas SET Total = ? WHERE idVentas = ?', [total, idVenta]);
        return total;
    }
}

module.exports = Venta;