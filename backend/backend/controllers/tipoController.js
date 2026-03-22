const Tipo = require('../models/Tipo');

const {request, response} = require('express');

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

        const tipoDB = await Tipo.findOne({ nombre});
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

module.exports = {
    getTipos,
    createTipo
}