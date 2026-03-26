const Productora = require('../models/Productora');
const { request, response } = require('express');

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find();
        res.status(200).json(productoras);
    } catch (error) {
        console.error("❌ Error al obtener la productora:", error);
        res.status(500).json({ message: "Ocurrió un error al listar las productoras" });
    }
}

const createProductora = async (req = request, res = response) => {
    try {
        const { nombre, descripcion, slogan } = req.body;

        const productoraDB = await Productora.findOne({ nombre });
        if (productoraDB) {
            return res.status(400).json({ message: `La productora "${nombre}" ya existe` });
        }

        const productora = new Productora({ nombre, descripcion, slogan });
        await productora.save();
        res.status(201).json(productora);
    } catch (error) {
        console.error("❌ Error al crear productora:", error);
        res.status(500).json({ message: "Ocurrió un error al guardar la productora" });
    }
}

const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado, slogan } = req.body;

        const fechaActualizacion = new Date();
        const productoraActualizada = await Productora.findByIdAndUpdate(
            id,
            { nombre, descripcion, estado, slogan, fechaActualizacion },
            { new: true }
        );

        if (!productoraActualizada) {
            return res.status(404).json({ message: "Productora no encontrada" });
        }

        res.status(200).json(productoraActualizada);
    } catch (error) {
        console.error("❌ Error al actualizar productora:", error);
        res.status(500).json({ message: "Ocurrió un error al actualizar la productora" });
    }
}

const deleteProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const productoraEliminada = await Productora.findByIdAndDelete(id);

        if (!productoraEliminada) {
            return res.status(404).json({ message: "Productora no encontrada" });
        }

        res.status(200).json({ message: "Productora eliminada correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar productora:", error);
        res.status(500).json({ message: "Ocurrió un error al eliminar la productora" });
    }
}

module.exports = {
    getProductoras,
    createProductora,
    updateProductora,
    deleteProductora
}