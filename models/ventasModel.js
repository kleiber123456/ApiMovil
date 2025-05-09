const { pool } = require('../config/db');

class Venta {
    // Listar todas las ventas (puedes ajustarlo si necesitas más campos)
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

    // Traer el detalle completo de una venta
    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT 
                v.idVentas,
                v.Fecha,
                v.Total,
                e.Nombre AS estado,
                ve.Placa AS placa_vehiculo,
                ve.color AS color,
                ve.tipo_vehiculo AS tipo_vehiculo,
                CONCAT(u.Nombre, ' ', u.Apellido) AS nombre_cliente,
                v.Vehiculos_idVehiculos,
                v.Estados_idEstados,
                c.Descripcion AS descripcion
            FROM Ventas v
            LEFT JOIN Estados e ON v.Estados_idEstados = e.idEstados
            LEFT JOIN Vehiculos ve ON v.Vehiculos_idVehiculos = ve.idVehiculos
            LEFT JOIN usuario u ON ve.usuario_idUsuario = u.id
            LEFT JOIN Citas c ON c.Ventas_idVentas = v.idVentas
            WHERE v.idVentas = ?
        `, [id]);

        return rows[0];
    }

    // Crear una nueva venta
    static async create(venta) {
        const { Fecha = new Date(), Vehiculos_idVehiculos, Estados_idEstados, Total = 0 } = venta;
        const totalDecimal = parseFloat(Total);
        const [result] = await pool.query(
            'INSERT INTO Ventas (Fecha, Vehiculos_idVehiculos, Estados_idEstados, Total) VALUES (?, ?, ?, ?)',
            [Fecha, Vehiculos_idVehiculos, Estados_idEstados, isNaN(totalDecimal) ? 0 : totalDecimal]
        );
        return result.insertId;
    }

    // Actualizar una venta existente
    // Actualizar una venta existente
static async update(id, venta) {
    const campos = [];
    const valores = [];
  
    if (venta.Fecha) {
      campos.push('Fecha = ?');
      valores.push(venta.Fecha);
    }
    if (venta.Vehiculos_idVehiculos) {
      campos.push('Vehiculos_idVehiculos = ?');
      valores.push(venta.Vehiculos_idVehiculos);
    }
    if (venta.Estados_idEstados) {
      campos.push('Estados_idEstados = ?');
      valores.push(venta.Estados_idEstados);
    }
    if (venta.Total !== undefined) {
      campos.push('Total = ?');
      valores.push(parseFloat(venta.Total) || 0);
    }
  
    if (campos.length === 0) return false;
  
    valores.push(id);
    const query = `UPDATE Ventas SET ${campos.join(', ')} WHERE idVentas = ?`;
    const [result] = await pool.query(query, valores);
    return result.affectedRows > 0;
  }
  

    // Eliminar una venta
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Ventas WHERE idVentas = ?', [id]);
        return result.affectedRows > 0;
    }

    // Obtener repuestos por venta (con nombres como espera Flutter)
    static async getRepuestosByVenta(idVenta) {
        const [rows] = await pool.query(`
            SELECT 
                r.Nombre AS nombre_repuesto,
                vpr.Cantidad,
                vpr.Precio_Unitario,
                vpr.Subtotal
            FROM Venta_Por_Repuesto vpr
            JOIN Repuestos r ON vpr.idRepuestos = r.idRepuestos
            WHERE vpr.idVentas = ?
        `, [idVenta]);
        return rows;
    }

    // Obtener servicios por venta (con nombres como espera Flutter)
    static async getServiciosByVenta(idVenta) {
        const [rows] = await pool.query(`
            SELECT 
                s.Nombre AS nombre_servicio,
                vps.Subtotal
            FROM Venta_Por_Servicio vps
            JOIN Servicios s ON vps.Servicios_idServicios = s.idServicios
            WHERE vps.Ventas_idVentas = ?
        `, [idVenta]);
        return rows;
    }

    // Agregar repuesto a una venta
    static async addRepuestoToVenta(idVenta, idRepuesto, cantidad, subtotal) {
        const [result] = await pool.query(
            'INSERT INTO Venta_Por_Repuesto (idRepuestos, idVentas, cantidad, Subtotal) VALUES (?, ?, ?, ?)',
            [idRepuesto, idVenta, cantidad, subtotal]
        );
        return result.insertId;
    }

    // Agregar servicio a una venta
    static async addServicioToVenta(idVenta, idServicio, subtotal) {
        const [result] = await pool.query(
            'INSERT INTO Venta_Por_Servicio (Ventas_idVentas, Servicios_idServicios, Subtotal) VALUES (?, ?, ?)',
            [idVenta, idServicio, subtotal]
        );
        return result.insertId;
    }

    // Recalcular el total de una venta sumando repuestos y servicios
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

