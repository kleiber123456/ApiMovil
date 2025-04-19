const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.getAllUsuarios);
router.get('/buscar-por-correo', (req, res, next) => {
    if (!req.query.correo) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro "correo" es requerido en la URL (?correo=valor)',
        example: 'GET /api/usuarios/buscar-por-correo?correo=ejemplo@mail.com'
      });
    }
    next();
  }, usuariosController.buscarUsuarioPorCorreo);
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario);
router.post('/login', usuariosController.login);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);
router.post('/enviar-codigo', usuariosController.enviarCodigoVerificacion);
router.post('/verificar-codigo', usuariosController.verificarCodigo);
router.post('/actualizar-password', usuariosController.actualizarPassword);



module.exports = router;