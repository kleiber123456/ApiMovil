const express = require('express');
const router = express.Router();
const mecanicosController = require('../controllers/mecanicosController');

router.get('/', mecanicosController.getAllMecanicos);
router.get('/:id', mecanicosController.getMecanicoById);
router.post('/', mecanicosController.createMecanico);
router.put('/:id', mecanicosController.updateMecanico);
router.delete('/:id', mecanicosController.deleteMecanico);

module.exports = router;