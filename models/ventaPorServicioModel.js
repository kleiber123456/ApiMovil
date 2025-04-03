const { pool } = require('../config/db');

class VentaPorServicio {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT vps.*, s.Nombre as servicio_nombre, s.Precio as precio_servicio,
                   c.Nombre as cliente_nombre, c.Apellido as cliente_apellido, v.Fecha as fecha_venta
            FROM Venta_Por_Servicio vps
            JOIN Servicios s ON vps.Servicios_idServicios = s.idServicios
            JOIN Ventas v ON vps.Ventas_idVentas = v.idVentas
            JOIN Clientes c ON v.Clientes_idClientes = c.idClientes
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Venta_Por_Servicio WHERE idVenta_Por_Servicio = ?', [id]);
        return rows[0];
    }

    static async getByVentaId(ventaId) {
        const [rows] = await pool.query(`
            SELECT vps.*, s.Nombre as servicio_nombre, s.Precio as precio_servicio
            FROM Venta_Por_Servicio vps
            JOIN Servicios s ON vps.Servicios_idServicios = s.idServicios
            WHERE vps.Ventas_idVentas = ?
        `, [ventaId]);
        return rows;
    }

    static async getByServicioId(servicioId) {
        const [rows] = await pool.query(`
            SELECT vps.*, v.Fecha as fecha_venta, c.Nombre as cliente_nombre, c.Apellido as cliente_apellido
            FROM Venta_Por_Servicio vps
            JOIN Ventas v ON vps.Ventas_idVentas = v.idVentas
            JOIN Clientes c ON v.Clientes_idClientes = c.idClientes
            WHERE vps.Servicios_idServicios = ?
        `, [servicioId]);
        return rows;
    }

    static async create(ventaServicio) {
        const { Subtotal, Ventas_idVentas, Servicios_idServicios } = ventaServicio;
        
        // Verificar que el servicio esté disponible
        const [servicio] = await pool.query(
            'SELECT estado FROM Servicios WHERE idServicios = ?',
            [Servicios_idServicios]
        );
        
        if (servicio[0].estado !== 'Disponible') {
            throw new Error('El servicio no está disponible actualmente');
        }
        
        const [result] = await pool.query(
            'INSERT INTO Venta_Por_Servicio (Subtotal, Ventas_idVentas, Servicios_idServicios) VALUES (?, ?, ?)',
            [Subtotal, Ventas_idVentas, Servicios_idServicios]
        );
        
        return result.insertId;
    }

    static async update(id, ventaServicio) {
        const { Subtotal, Ventas_idVentas, Servicios_idServicios } = ventaServicio;
        const [result] = await pool.query(
            'UPDATE Venta_Por_Servicio SET Subtotal = ?, Ventas_idVentas = ?, Servicios_idServicios = ? WHERE idVenta_Por_Servicio = ?',
            [Subtotal, Ventas_idVentas, Servicios_idServicios, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM Venta_Por_Servicio WHERE idVenta_Por_Servicio = ?', 
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = VentaPorServicio;