const express = require('express');
const router = express.Router();
const controller = require('../controllers/permisosRolesController');

router.post('/', controller.create);
router.delete('/:permisoId/:rolId', controller.delete);

module.exports = router;