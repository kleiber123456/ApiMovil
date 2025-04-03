const express = require('express');
const router = express.Router();
const marcasController = require('../controllers/marcasController');

router.get('/', marcasController.getAllMarcas);
router.get('/:id', marcasController.getMarcaById);
router.post('/', marcasController.createMarca);
router.put('/:id', marcasController.updateMarca);
router.delete('/:id', marcasController.deleteMarca);

module.exports = router;