const { pool } = require('../config/db');

class VentaPorServicio {
  // Obtener todas las relaciones venta-servicio
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT vps.*, s.Nombre AS servicio_nombre, s.Precio AS precio_servicio, v.Fecha AS fecha_venta
      FROM Venta_Por_Servicio vps
      JOIN Servicios s ON vps.Servicios_idServicios = s.idServicios
      JOIN Ventas v ON vps.Ventas_idVentas = v.idVentas
    `);
    return rows;
  }

  // Obtener una por ID
  static async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM Venta_Por_Servicio WHERE idVenta_Por_Servicio = ?',
      [id]
    );
    return rows[0];
  }

  // Obtener todas por venta
  static async getByVentaId(ventaId) {
    const [rows] = await pool.query(`
      SELECT vps.*, s.Nombre AS servicio_nombre, s.Precio AS precio_servicio
      FROM Venta_Por_Servicio vps
      JOIN Servicios s ON vps.Servicios_idServicios = s.idServicios
      WHERE vps.Ventas_idVentas = ?
    `, [ventaId]);
    return rows;
  }

  // Obtener todas por servicio
  static async getByServicioId(servicioId) {
    const [rows] = await pool.query(`
      SELECT vps.*, v.Fecha AS fecha_venta
      FROM Venta_Por_Servicio vps
      JOIN Ventas v ON vps.Ventas_idVentas = v.idVentas
      WHERE vps.Servicios_idServicios = ?
    `, [servicioId]);
    return rows;
  }

  // Crear nueva relación venta-servicio
  static async create(ventaServicio) {
    const { Subtotal, Ventas_idVentas, Servicios_idServicios } = ventaServicio;

    // Validar si el servicio está Activo
    const [servicio] = await pool.query(
      'SELECT estado FROM Servicios WHERE idServicios = ?',
      [Servicios_idServicios]
    );

    if (servicio.length === 0 || servicio[0].estado !== 'Activo') {
      throw new Error('El servicio no está disponible actualmente');
    }

    const [result] = await pool.query(
      'INSERT INTO Venta_Por_Servicio (Subtotal, Ventas_idVentas, Servicios_idServicios) VALUES (?, ?, ?)',
      [Subtotal, Ventas_idVentas, Servicios_idServicios]
    );

    return result.insertId;
  }

  // Actualizar relación
  static async update(id, ventaServicio) {
    const { Subtotal, Ventas_idVentas, Servicios_idServicios } = ventaServicio;
    const [result] = await pool.query(
      'UPDATE Venta_Por_Servicio SET Subtotal = ?, Ventas_idVentas = ?, Servicios_idServicios = ? WHERE idVenta_Por_Servicio = ?',
      [Subtotal, Ventas_idVentas, Servicios_idServicios, id]
    );
    return result.affectedRows > 0;
  }

  // Eliminar relación
  static async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM Venta_Por_Servicio WHERE idVenta_Por_Servicio = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = VentaPorServicio;
