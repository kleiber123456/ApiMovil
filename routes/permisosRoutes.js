const express = require('express');
const router = express.Router();
const permisosController = require('../controllers/permisosController');

router.get('/', permisosController.getAllPermisos);
router.get('/:id', permisosController.getPermisoById);
router.post('/', permisosController.createPermiso);
router.put('/:id', permisosController.updatePermiso);
router.delete('/:id', permisosController.deletePermiso);

module.exports = router;