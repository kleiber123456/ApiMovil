const { pool } = require('../config/db');

class Codigo {
    static async guardar(Correo, codigo, minutosExpiracion = 10) {
        const fecha_expiracion = new Date(Date.now() + minutosExpiracion * 60000);
        await pool.query(
            'INSERT INTO codigos_verificacion (Correo, codigo, fecha_expiracion) VALUES (?, ?, ?)',
            [Correo, codigo, fecha_expiracion]
        );
    }

    static async verificar(Correo, codigo) {
        const [rows] = await pool.query(
            'SELECT * FROM codigos_verificacion WHERE Correo = ? AND codigo = ? AND fecha_expiracion > NOW() ORDER BY fecha_expiracion DESC LIMIT 1',
            [Correo, codigo]
        );
        return rows.length > 0;
    }

    static async eliminarPorCorreo(Correo) {
        await pool.query('DELETE FROM codigos_verificacion WHERE Correo = ?', [Correo]);
    }
}

module.exports = Codigo;
