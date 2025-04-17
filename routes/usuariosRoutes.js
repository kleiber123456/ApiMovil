const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario);
router.post('/login', usuariosController.login);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);
router.post('/enviar-codigo', usuariosController.enviarCodigoVerificacion);
router.post('/verificar-codigo', usuariosController.verificarCodigo);
router.post('/actualizar-password', usuariosController.actualizarPassword);


module.exports = router;