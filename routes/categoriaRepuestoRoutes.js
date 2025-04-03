const express = require('express');
const router = express.Router();
const categoriaRepuestoController = require('../controllers/categoriaRepuestoController');

router.get('/', categoriaRepuestoController.getAllCategoriasRepuesto);
router.get('/:id', categoriaRepuestoController.getCategoriaRepuestoById);
router.post('/', categoriaRepuestoController.createCategoriaRepuesto);
router.put('/:id', categoriaRepuestoController.updateCategoriaRepuesto);
router.delete('/:id', categoriaRepuestoController.deleteCategoriaRepuesto);

module.exports = router;