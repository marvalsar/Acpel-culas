const Media = require('../models/Media');

const {request, response} = require('express');

const getMedias = async (req = request, res = response) => {
    try {
        const medias = await Media.find();
        res.status(200).json(medias);
    } catch (error) {
        console.error("❌ Error al obtener media:", error);
        res.status(500).json({ message: "Ocurrió un error al listar las medias" });
    }
}

const createMedia = async (req = request, res = response) => {
    try {
        const { serial, titulo, sinopsis, URL, imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo } = req.body;

        const mediaDB = await Media.findOne({serial, titulo, sinopsis, URL, imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo});
        if (mediaDB) {
            return res.status(400).json({ message: `La media "${titulo}" ya existe` });
        }

        const media = new Media({ serial, titulo, sinopsis, URL, imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo });

        await media.save();
        res.status(201).json(media);
    } catch (error) {
        console.error("❌ Error al crear media:", error);
        res.status(500).json({ message: "Ocurrió un error al guardar la media" });
    }
}

module.exports = {
    getMedias,
    createMedia
}