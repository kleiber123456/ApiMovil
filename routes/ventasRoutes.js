const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');
const ventaPorRepuestoController = require('../controllers/ventaPorRepuestoController');
const ventaPorServicioController = require('../controllers/ventaPorServicioController');

// Rutas básicas de CRUD
router.get('/', ventasController.getAllVentas);
// Obtener repuestos de una venta específica
router.get('/:id/repuestos', ventaPorRepuestoController.getByVentaId);

// Obtener servicios de una venta específica
router.get('/:id/servicios', ventaPorServicioController.getByVentaId);
router.get('/:id', ventasController.getVentaById);
router.post('/', ventasController.createVenta);
router.put('/:id', ventasController.updateVenta);
router.delete('/:id', ventasController.deleteVenta);

// Rutas para ítems de venta
router.post('/:idVenta/repuestos', ventasController.addRepuestoToVenta);
router.post('/:idVenta/servicios', ventasController.addServicioToVenta);
router.post('/:id/completar', ventasController.completarVenta);

module.exports = router;