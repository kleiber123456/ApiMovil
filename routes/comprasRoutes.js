const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

router.get('/', comprasController.getAllCompras);
router.get('/:id', comprasController.getCompraById);
router.post('/', comprasController.createCompra);
router.put('/:id', comprasController.updateCompra);
router.delete('/:id', comprasController.deleteCompra);

// Ruta para agregar repuestos a la compra
router.post('/:idCompra/repuestos', comprasController.addRepuestoToCompra);

module.exports = router;