const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');

router.get('/', serviciosController.getAllServicios);
router.get('/:id', serviciosController.getServicioById);
router.post('/', serviciosController.createServicio);
router.put('/:id', serviciosController.updateServicio);
router.delete('/:id', serviciosController.deleteServicio);

module.exports = router;