const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Rutas básicas de CRUD
router.get('/', ventasController.getAllVentas);
router.get('/:id', ventasController.getVentaById);
router.post('/', ventasController.createVenta);
router.put('/:id', ventasController.updateVenta);
router.delete('/:id', ventasController.deleteVenta);

// Rutas para ítems de venta
router.post('/:idVenta/repuestos', ventasController.addRepuestoToVenta);
router.post('/:idVenta/servicios', ventasController.addServicioToVenta);
router.post('/:id/completar', ventasController.completarVenta);

module.exports = router;