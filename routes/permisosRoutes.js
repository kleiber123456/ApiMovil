const express = require('express');
const router = express.Router();
const permisosController = require('../controllers/permisosController');

router.get('/', permisosController.getAll);
router.get('/:id', permisosController.getById);
router.post('/', permisosController.create);
router.put('/:id', permisosController.update);
router.delete('/:id', permisosController.delete);

module.exports = router;