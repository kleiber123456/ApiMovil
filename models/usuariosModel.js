const { pool } = require('../config/db');

class Usuario {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Usuarios');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Usuarios WHERE idUsuarios = ?', [id]);
        return rows[0];
    }

    static async create({ Celular, Correo, Contraseña, Roles_idRoles }) {
        const [result] = await pool.query(
            'INSERT INTO Usuarios (Celular, Correo, Contraseña, Roles_idRoles) VALUES (?, ?, ?, ?)',
            [Celular, Correo, Contraseña, Roles_idRoles]
        );
        return result.insertId;
    }

    static async update(id, { Celular, Correo, Contraseña, Roles_idRoles }) {
        const [result] = await pool.query(
            'UPDATE Usuarios SET Celular = ?, Correo = ?, Contraseña = ?, Roles_idRoles = ? WHERE idUsuarios = ?',
            [Celular, Correo, Contraseña, Roles_idRoles, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM Usuarios WHERE idUsuarios = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Usuario;