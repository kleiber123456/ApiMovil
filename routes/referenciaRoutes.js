const express = require('express');
const router = express.Router();
const referenciaController = require('../controllers/referenciaController');

router.get('/', referenciaController.getAllReferencias);
router.get('/:id', referenciaController.getReferenciaById);
router.post('/', referenciaController.createReferencia);
router.put('/:id', referenciaController.updateReferencia);
router.delete('/:id', referenciaController.deleteReferencia);

module.exports = router;