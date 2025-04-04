const { pool } = require('../config/db');

class Usuario {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM usuario');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        return rows[0];
    }

    static async getByEmail(Correo) {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE Correo = ?', [Correo]);
        return rows[0];
    }

    static async create(usuario) {
        const { Nombre, Apellido, Correo, Estado, Rol_id, password } = usuario;
        const [result] = await pool.query(
            'INSERT INTO usuario (Nombre, Apellido, Correo, Estado, Rol_id, password) VALUES (?, ?, ?, ?, ?, ?)',
            [Nombre, Apellido, Correo, Estado, Rol_id, password]
        );
        return result.insertId;
    }

    static async update(id, usuario) {
        const { Nombre, Apellido, Correo, Estado, Rol_id, password } = usuario;
        
        let query;
        let params;
        
        if (password) {
            query = 'UPDATE usuario SET Nombre = ?, Apellido = ?, Correo = ?, Estado = ?, Rol_id = ?, password = ? WHERE id = ?';
            params = [Nombre, Apellido, Correo, Estado, Rol_id, password, id];
        } else {
            query = 'UPDATE usuario SET Nombre = ?, Apellido = ?, Correo = ?, Estado = ?, Rol_id = ? WHERE id = ?';
            params = [Nombre, Apellido, Correo, Estado, Rol_id, id];
        }
        
        const [result] = await pool.query(query, params);
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM usuario WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Usuario;