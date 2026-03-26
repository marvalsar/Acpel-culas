const Tipo = require('../models/Tipo');
const { request, response } = require('express');

const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await Tipo.find();
        res.status(200).json(tipos);
    } catch (error) {
        console.error("❌ Error al obtener tipos:", error);
        res.status(500).json({ message: "Ocurrió un error al listar los tipos" });
    }
}

const createTipo = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;

        const tipoDB = await Tipo.findOne({ nombre });
        if (tipoDB) {
            return res.status(400).json({ message: `El tipo "${nombre}" ya existe` });
        }

        const tipo = new Tipo({ nombre, descripcion });
        await tipo.save();
        res.status(201).json(tipo);
    } catch (error) {
        console.error("❌ Error al crear tipo:", error);
        res.status(500).json({ message: "Ocurrió un error al guardar el tipo" });
    }
}

const updateTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado } = req.body;

        const fechaActualizacion = new Date();
        const tipoActualizado = await Tipo.findByIdAndUpdate(
            id,
            { nombre, descripcion, estado, fechaActualizacion },
            { new: true }
        );

        if (!tipoActualizado) {
            return res.status(404).json({ message: "Tipo no encontrado" });
        }

        res.status(200).json(tipoActualizado);
    } catch (error) {
        console.error("❌ Error al actualizar tipo:", error);
        res.status(500).json({ message: "Ocurrió un error al actualizar el tipo" });
    }
}

const deleteTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipoEliminado = await Tipo.findByIdAndDelete(id);

        if (!tipoEliminado) {
            return res.status(404).json({ message: "Tipo no encontrado" });
        }

        res.status(200).json({ message: "Tipo eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar tipo:", error);
        res.status(500).json({ message: "Ocurrió un error al eliminar el tipo" });
    }
}

module.exports = {
    getTipos,
    createTipo,
    updateTipo,
    deleteTipo
}