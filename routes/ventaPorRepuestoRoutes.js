const express = require('express');
const router = express.Router();
const controller = require('../controllers/ventaPorRepuestoController');

// CRUD básico
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

// Rutas adicionales
router.get('/venta/:ventaId', controller.getByVentaId);
router.get('/repuesto/:repuestoId', controller.getByRepuestoId);

module.exports = router;