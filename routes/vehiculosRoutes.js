const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculosController');

router.get('/', vehiculosController.getAllVehiculos);
router.get('/', vehiculosController.getAll);
router.get('/:id', vehiculosController.getVehiculoById);
router.post('/', vehiculosController.createVehiculo);
router.put('/:id', vehiculosController.updateVehiculo);
router.delete('/:id', vehiculosController.deleteVehiculo);
router.get('/usuario/:usuarioId', vehiculosController.getVehiculosByUsuarioId);

module.exports = router;