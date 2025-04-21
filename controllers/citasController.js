const Cita = require('../models/citasModel');

exports.getAllCitas = async (req, res) => {
    try {
        const citas = await Cita.getAll();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCitaById = async (req, res) => {
    try {
        const cita = await Cita.getById(req.params.id);
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json(cita);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCita = async (req, res) => {
    try {
        const newCitaId = await Cita.create(req.body);
        res.status(201).json({ id: newCitaId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCita = async (req, res) => {
    try {
        const updated = await Cita.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCita = async (req, res) => {
    try {
        const deleted = await Cita.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCitasByMecanico = async (req, res) => {
    try {
        const citas = await Cita.getByMecanico(req.params.idMecanico);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCitasByVehiculo = async (req, res) => {
    try {
        const citas = await Cita.getByVehiculo(req.params.idVehiculo);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCitasByEstado = async (req, res) => {
    try {
        const citas = await Cita.getByEstado(req.params.estadoId);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.verificarDisponibilidad = async (req, res) => {
    try {
        const { mecanico_id, fecha } = req.query;
        
        if (!mecanico_id || !fecha) {
            return res.status(400).json({ 
                success: false,
                message: 'Se requieren mecanico_id y fecha como parámetros de consulta' 
            });
        }
        
        // Validar que la fecha sea válida
        if (isNaN(new Date(fecha).getTime())) {
            return res.status(400).json({ 
                success: false,
                message: 'Formato de fecha inválido. Use formato ISO 8601 (ej: 2025-04-24T14:30:00)' 
            });
        }
        
        const disponible = await Cita.checkDisponibilidad(mecanico_id, fecha);
        
        res.json({ 
            success: true,
            disponible,
            mecanico_id,
            fecha_solicitada: fecha,
            message: disponible ? 'El mecánico está disponible en este horario' : 'El mecánico no está disponible en este horario'
        });
        
    } catch (error) {
        console.error('Error en verificarDisponibilidad:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error al verificar disponibilidad',
            error: error.message 
        });
    }
};