const express = require('express');
const router = express.Router();
const repuestosController = require('../controllers/repuestosController');

router.get('/', repuestosController.getAllRepuestos);
router.get('/:id', repuestosController.getRepuestoById);
router.post('/', repuestosController.createRepuesto);
router.put('/:id', repuestosController.updateRepuesto);
router.delete('/:id', repuestosController.deleteRepuesto);

// Rutas adicionales
router.put('/:id/cantidad', repuestosController.updateCantidadRepuesto);
router.get('/categoria/:idCategoria', repuestosController.getRepuestosByCategoria);

module.exports = router;