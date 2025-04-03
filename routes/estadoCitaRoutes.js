const express = require('express');
const router = express.Router();
const estadoCitaController = require('../controllers/estadoCitaController');

router.get('/', estadoCitaController.getAllEstadoCitas);
router.get('/:id', estadoCitaController.getEstadoCitaById);
router.post('/', estadoCitaController.createEstadoCita);
router.put('/:id', estadoCitaController.updateEstadoCita);
router.delete('/:id', estadoCitaController.deleteEstadoCita);

module.exports = router;