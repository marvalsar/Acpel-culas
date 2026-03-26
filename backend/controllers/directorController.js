const Director = require('../models/Director');
const { request, response } = require('express');

const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        console.error("❌ Error al obtener directores:", error);
        res.status(500).json({ message: "Ocurrió un error al listar los directores" });
    }
}

const createDirector = async (req = request, res = response) => {
    try {
        const { nombres } = req.body;

        const directorDB = await Director.findOne({ nombres });
        if (directorDB) {
            return res.status(400).json({ message: `El director "${nombres}" ya existe` });
        }

        const director = new Director({ nombres });
        await director.save();
        res.status(201).json(director);
    } catch (error) {
        console.error("❌ Error al crear director:", error);
        res.status(500).json({ message: "Ocurrió un error al guardar el director" });
    }
}

const updateDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombres, estado } = req.body;
        
        const fechaActualizacion = new Date();
        const directorActualizado = await Director.findByIdAndUpdate(
            id, 
            { nombres, estado, fechaActualizacion }, 
            { new: true }
        );

        if (!directorActualizado) {
            return res.status(404).json({ message: "Director no encontrado" });
        }

        res.status(200).json(directorActualizado);
    } catch (error) {
        console.error("❌ Error al actualizar director:", error);
        res.status(500).json({ message: "Ocurrió un error al actualizar el director" });
    }
}

const deleteDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const directorEliminado = await Director.findByIdAndDelete(id);

        if (!directorEliminado) {
            return res.status(404).json({ message: "Director no encontrado" });
        }

        res.status(200).json({ message: "Director eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar director:", error);
        res.status(500).json({ message: "Ocurrió un error al eliminar el director" });
    }
}

module.exports = {
    getDirectores,
    createDirector,
    updateDirector,
    deleteDirector
}