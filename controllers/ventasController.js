const Venta = require('../models/ventasModel');
const { enviarComprobanteVenta } = require('../utils/emailSender');
const Usuario = require('../models/usuariosModel'); // Asumiendo que tienes un modelo de Usuario

exports.getAllVentas = async (req, res) => {
    try {
        const ventas = await Venta.getAll();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVentaById = async (req, res) => {
    try {
        const venta = await Venta.getById(req.params.id);
        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        
        const repuestos = await Venta.getRepuestosByVenta(req.params.id);
        const servicios = await Venta.getServiciosByVenta(req.params.id);
        
        res.json({
            ...venta,
            repuestos,
            servicios
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createVenta = async (req, res) => {
    try {
        const { Vehiculos_idVehiculos, Estados_idEstados } = req.body;
        const newVentaId = await Venta.create({
            Vehiculos_idVehiculos,
            Estados_idEstados,
            Total: 0
        });
        res.status(201).json({ id: newVentaId, message: 'Venta creada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateVenta = async (req, res) => {
    try {
        const updated = await Venta.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.json({ message: 'Venta actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteVenta = async (req, res) => {
    try {
        const deleted = await Venta.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addRepuestoToVenta = async (req, res) => {
    try {
        const { idRepuesto, cantidad, precioUnitario } = req.body;
        const newItemId = await Venta.addRepuestoToVenta(
            req.params.idVenta, 
            idRepuesto, 
            cantidad, 
            precioUnitario
        );
        res.status(201).json({ 
            id: newItemId, 
            message: 'Repuesto añadido a la venta' 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addServicioToVenta = async (req, res) => {
    try {
        const { idServicio, precioUnitario } = req.body;
        const newItemId = await Venta.addServicioToVenta(
            req.params.idVenta, 
            idServicio, 
            precioUnitario
        );
        res.status(201).json({ 
            id: newItemId, 
            message: 'Servicio añadido a la venta' 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.completarVenta = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Actualizar el estado de la venta a "Completada"
        const [result] = await pool.query(
            'UPDATE Ventas SET Estados_idEstados = ? WHERE idVentas = ?',
            [ESTADO_COMPLETADA, id] // Define ESTADO_COMPLETADA según tu DB
        );
        
        if (!result.affectedRows) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        // 2. Obtener información completa de la venta
        const venta = await Venta.getById(id);
        const repuestos = await Venta.getRepuestosByVenta(id);
        const servicios = await Venta.getServiciosByVenta(id);
        
        // 3. Obtener información del usuario (asumiendo que hay relación Vehículo -> Usuario)
        const [usuario] = await pool.query(`
            SELECT u.* FROM Usuarios u
            JOIN Vehiculos v ON u.id = v.usuario_idUsuario
            WHERE v.idVehiculos = ?
        `, [venta.Vehiculos_idVehiculos]);

        if (!usuario || !usuario.length) {
            return res.status(404).json({ message: 'Usuario no encontrado para esta venta' });
        }

        const userEmail = usuario[0].Correo;
        const userName = usuario[0].Nombre;

        // 4. Preparar datos para el correo
        const ventaInfo = {
            idVenta: venta.idVentas,
            fecha: venta.Fecha,
            total: venta.Total,
            vehiculoPlaca: venta.VehiculoPlaca,
            vehiculoMarca: venta.MarcaNombre,
            vehiculoReferencia: venta.ReferenciaNombre
        };

        const items = [
            ...repuestos.map(r => ({
                nombre: r.RepuestoNombre,
                cantidad: r.Cantidad,
                precioUnitario: r.Precio_Unitario,
                subtotal: r.SubTotal
            })),
            ...servicios.map(s => ({
                nombre: s.ServicioNombre,
                cantidad: 1,
                precioUnitario: s.Subtotal,
                subtotal: s.Subtotal
            }))
        ];

        // 5. Enviar correo electrónico
        await enviarComprobanteVenta(userEmail, userName, ventaInfo, items);

        res.json({ 
            message: 'Venta completada y correo enviado exitosamente',
            ventaId: venta.idVentas
        });
    } catch (error) {
        console.error('Error al completar venta:', error);
        res.status(500).json({ message: error.message });
    }
};