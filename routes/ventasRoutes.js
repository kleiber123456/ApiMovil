const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.getAllVentas);
router.get('/:id', ventasController.getVentaById);
router.post('/', ventasController.createVenta);
router.put('/:id', ventasController.updateVenta);
router.delete('/:id', ventasController.deleteVenta);

// Rutas para agregar items a la venta
router.post('/:idVenta/repuestos', ventasController.addRepuestoToVenta);
router.post('/:idVenta/servicios', ventasController.addServicioToVenta);

module.exports = router;