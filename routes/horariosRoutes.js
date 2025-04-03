const express = require('express');
const router = express.Router();
const horariosController = require('../controllers/horariosController');

router.get('/', horariosController.getAllHorarios);
router.get('/:id', horariosController.getHorarioById);
router.post('/', horariosController.createHorario);
router.put('/:id', horariosController.updateHorario);
router.delete('/:id', horariosController.deleteHorario);

module.exports = router;