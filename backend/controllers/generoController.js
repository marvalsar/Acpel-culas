const Genero = require('../models/Genero');
const { request, response } = require('express');

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        console.error("❌ Error al obtener géneros:", error);
        res.status(500).json({ message: "Ocurrió un error al listar los géneros" });
    }
}

const createGenero = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;

        const generoDB = await Genero.findOne({ nombre });
        if (generoDB) {
            return res.status(400).json({ message: `El género "${nombre}" ya existe` });
        }

        const genero = new Genero({ nombre, descripcion });
        await genero.save();
        res.status(201).json(genero);
    } catch (error) {
        console.error("❌ Error al crear género:", error);
        res.status(500).json({ message: "Ocurrió un error al guardar el género" });
    }
}

const updateGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado } = req.body;

        const fechaActualizacion = new Date();
        const generoActualizado = await Genero.findByIdAndUpdate(
            id,
            { nombre, descripcion, estado, fechaActualizacion },
            { new: true }
        );

        if (!generoActualizado) {
            return res.status(404).json({ message: "Género no encontrado" });
        }

        res.status(200).json(generoActualizado);
    } catch (error) {
        console.error("❌ Error al actualizar género:", error);
        res.status(500).json({ message: "Ocurrió un error al actualizar el género" });
    }
}

const deleteGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const generoEliminado = await Genero.findByIdAndDelete(id);

        if (!generoEliminado) {
            return res.status(404).json({ message: "Género no encontrado" });
        }

        res.status(200).json({ message: "Género eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar género:", error);
        res.status(500).json({ message: "Ocurrió un error al eliminar el género" });
    }
}

module.exports = {
    getGeneros,
    createGenero,
    updateGenero,
    deleteGenero
}