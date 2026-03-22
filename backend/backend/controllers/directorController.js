const Director = require('../models/Director');

const {request, response} = require('express');

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
        const { nombre } = req.body;

        const directorDB = await Director.findOne({ nombre});
        if (directorDB) {
            return res.status(400).json({ message: `El director "${nombre}" ya existe` });
        }

        const director = new Director({ nombre });

        await director.save();
        res.status(201).json(director);
    } catch (error) {
        console.error("❌ Error al crear director:", error);
        res.status(500).json({ message: "Ocurrió un error al guardar el director" });
    }
}

module.exports = {
    getDirectores,
    createDirector
}