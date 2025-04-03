const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

router.get('/', citasController.getAllCitas);
router.get('/:id', citasController.getCitaById);
router.post('/', citasController.createCita);
router.put('/:id', citasController.updateCita);
router.delete('/:id', citasController.deleteCita);

// Rutas adicionales para filtros
router.get('/mecanico/:idMecanico', citasController.getCitasByMecanico);
router.get('/vehiculo/:idVehiculo', citasController.getCitasByVehiculo);
router.get('/estado/:estadoId', citasController.getCitasByEstado);

module.exports = router;