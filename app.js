const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas existentes
const clientesRoutes = require('./routes/clientesRoutes');
const comprasRoutes = require('./routes/comprasRoutes');
const repuestosRoutes = require('./routes/repuestosRoutes');
const ventasRoutes = require('./routes/ventasRoutes');
const serviciosRoutes = require('./routes/serviciosRoutes');
const citasRoutes = require('./routes/citasRoutes');
const vehiculosRoutes = require('./routes/vehiculosRoutes');
const mecanicosRoutes = require('./routes/mecanicosRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes');
const horariosRoutes = require('./routes/horariosRoutes');
const estadosRoutes = require('./routes/estadosRoutes');
const estadoCitaRoutes = require('./routes/estadoCitaRoutes');
const categoriaRepuestoRoutes = require('./routes/categoriaRepuestoRoutes');
const marcasRoutes = require('./routes/marcasRoutes');
const referenciaRoutes = require('./routes/referenciaRoutes');
const comprasPorRepuestoRoutes = require('./routes/comprasPorRepuestoRoutes');
const ventaPorRepuestoRoutes = require('./routes/ventaPorRepuestoRoutes');
const ventaPorServicioRoutes = require('./routes/ventaPorServicioRoutes');

const rolesRoutes = require('./routes/rolesRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const permisosRoutes = require('./routes/permisosRoutes');
const permisosRolesRoutes = require('./routes/permisosRolesRoutes');



// Configuración de rutas existentes
app.use('/api/clientes', clientesRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/repuestos', repuestosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/mecanicos', mecanicosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/horarios', horariosRoutes);
app.use('/api/estados', estadosRoutes);
app.use('/api/estado-cita', estadoCitaRoutes);
app.use('/api/categoria-repuesto', categoriaRepuestoRoutes);
app.use('/api/marcas', marcasRoutes);
app.use('/api/referencias', referenciaRoutes);
app.use('/api/compras-repuestos', comprasPorRepuestoRoutes);
app.use('/api/ventas-repuestos', ventaPorRepuestoRoutes);
app.use('/api/ventas-servicios', ventaPorServicioRoutes);

app.use('/api/roles', rolesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/permisos', permisosRoutes);
app.use('/api/permisos-roles', permisosRolesRoutes);



// Ruta de prueba actualizada
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API del Taller MotOrtega',
        endpoints: {
            clientes: '/api/clientes',
            compras: '/api/compras',
            repuestos: '/api/repuestos',
            ventas: '/api/ventas',
            servicios: '/api/servicios',
            citas: '/api/citas',
            vehiculos: '/api/vehiculos',
            mecanicos: '/api/mecanicos',
            proveedores: '/api/proveedores',
            horarios: '/api/horarios',
            estados: '/api/estados',
            estadoCita: '/api/estado-cita',
            categoriasRepuesto: '/api/categoria-repuesto',
            marcas: '/api/marcas',
            referencias: '/api/referencias',
            comprasRepuestos: '/api/compras-repuestos',
            ventasRepuestos: '/api/ventas-repuestos',
            ventasServicios: '/api/ventas-servicios',

            roles: '/api/roles',
            usuarios: '/api/usuarios',
            permisos: '/api/permisos',
            permisosRoles: '/api/permisos-roles',
            login: '/api/usuarios/login (POST)',
            recuperarpasword: '/api/usuarios/recuperar-password (POST)'
            


        }
    });
});

// Manejo de errores (se mantiene igual)
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Error en el análisis JSON' });
    }
    
    if (err.status === 404) {
        return res.status(404).json({ error: 'Recurso no encontrado' });
    }
    
    res.status(500).json({ 
        error: 'Algo salió mal en el servidor',
        message: err.message || 'Error interno del servidor'
    });
});

// Manejo de rutas no encontradas (se mantiene igual)
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe en este servidor`
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}`);
});