const { enviarCodigoPorCorreo } = require('../utils/emailSender');
const Usuario = require('../models/usuariosModel');
const Codigo = require('../models/codigoModel');
const saltRounds = 10;

exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.getById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // No devolver la contraseña
        const { password, ...usuarioSinPassword } = usuario;
        res.json(usuarioSinPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUsuario = async (req, res) => {
    try {
        const newUsuarioId = await Usuario.create({
            ...req.body,
            password: req.body.password  
        });
        const { password, ...resto } = req.body;
        res.status(201).json({ id: newUsuarioId, ...resto });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateUsuario = async (req, res) => {
    try {
        const updated = await Usuario.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteUsuario = async (req, res) => {
    try {
        const deleted = await Usuario.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { Correo, password } = req.body;
        const usuario = await Usuario.getByEmail(Correo);
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        if (password !== usuario.password) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const { password: _, ...usuarioSinPassword } = usuario;

        res.json({
            message: 'Inicio de sesión exitoso',
            usuario: usuarioSinPassword
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔧 Mueve aquí la función verificarCorreo
exports.enviarCodigoVerificacion = async (req, res) => {
    try {
        const { Correo } = req.body;
        const usuario = await Usuario.getByEmail(Correo);

        if (!usuario) {
            return res.status(404).json({ message: 'El correo no está registrado' });
        }

        const codigo = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos

        await Codigo.guardar(Correo, codigo);
        await enviarCodigoPorCorreo(Correo, codigo);

        res.status(200).json({ message: 'Código enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar código:', error);
        res.status(500).json({ message: 'Error al enviar código' });
    }
};

// Verificar código
exports.verificarCodigo = async (req, res) => {
    try {
        const { Correo, codigo } = req.body;
        const esValido = await Codigo.verificar(Correo, codigo);

        if (!esValido) {
            return res.status(400).json({ message: 'Código inválido o expirado' });
        }

        // Puedes borrar el código después de verificarlo
        await Codigo.eliminarPorCorreo(Correo);

        res.status(200).json({ message: 'Código verificado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

exports.actualizarPassword = async (req, res) => {
    try {
        const { Correo, nuevaPassword } = req.body;
        const usuario = await Usuario.getByEmail(Correo);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const actualizado = await Usuario.update(usuario.id, { ...usuario, password: nuevaPassword });

        if (!actualizado) {
            return res.status(400).json({ message: 'No se pudo actualizar la contraseña' });
        }

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }
};


