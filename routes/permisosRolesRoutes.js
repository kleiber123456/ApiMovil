const express = require('express');
const router = express.Router();
const permisosRolesController = require('../controllers/permisosRolesController');

router.get('/', permisosRolesController.getAllPermisosRoles);
router.get('/:id', permisosRolesController.getPermisoRolById);
router.post('/', permisosRolesController.createPermisoRol);
router.delete('/:id', permisosRolesController.deletePermisoRol);

module.exports = router;