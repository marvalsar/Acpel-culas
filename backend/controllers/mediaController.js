const Media = require('../models/Media');
const { request, response } = require('express');

const getMedias = async (req = request, res = response) => {
    try {
        const medias = await Media.find()
            .populate('directorPrincipal', 'nombres')
            .populate('generoPrincipal', 'nombre')
            .populate('productora', 'nombre')
            .populate('tipo', 'nombre');

        // PARCHE PEREZOSO DE RETROCOMPATIBILIDAD
        let migrados = false;
        for (let m of medias) {
            if (!m.serial || !/^PEL-\d{4}$/.test(m.serial)) {
                m.serial = undefined; 
                await m.save(); // Activa el pre('save') que arreglamos
                migrados = true;
            }
        }

        if (migrados) {
            const actualizadas = await Media.find()
                .populate('directorPrincipal', 'nombres')
                .populate('generoPrincipal', 'nombre')
                .populate('productora', 'nombre')
                .populate('tipo', 'nombre');
            return res.status(200).json(actualizadas);
        }

        res.status(200).json(medias);
    } catch (error) {
        console.error("❌ Error al obtener media:", error);
        res.status(500).json({ message: "Ocurrió un error al listar las medias" });
    }
}

const createMedia = async (req = request, res = response) => {
    try {
        // Excluimos 'serial', generacion automatica en base de datos.
        const { titulo, sinopsis, URL, Imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo } = req.body;

        const mediaDB = await Media.findOne({ titulo });
        if (mediaDB) {
            return res.status(400).json({ message: `La media "${titulo}" ya existe` });
        }

        const media = new Media({ titulo, sinopsis, URL, Imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo });
        await media.save();
        
        res.status(201).json(media);
    } catch (error) {
        console.error("❌ Error al crear media:", error);
        res.status(500).json({ message: `Ocurrió un error al guardar la media: ${error.message}` });
    }
}

const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { titulo, sinopsis, URL, Imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo } = req.body;

        const fechaActualizacion = new Date();
        const mediaActualizada = await Media.findByIdAndUpdate(
            id,
            { titulo, sinopsis, URL, Imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo, fechaActualizacion },
            { new: true }
        );

        if (!mediaActualizada) {
            return res.status(404).json({ message: "Media no encontrada" });
        }

        res.status(200).json(mediaActualizada);
    } catch (error) {
        console.error("❌ Error al actualizar media:", error);
        res.status(500).json({ message: "Ocurrió un error al actualizar la media" });
    }
}

const deleteMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const mediaEliminada = await Media.findByIdAndDelete(id);

        if (!mediaEliminada) {
            return res.status(404).json({ message: "Media no encontrada" });
        }

        res.status(200).json({ message: "Media eliminada correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar media:", error);
        res.status(500).json({ message: "Ocurrió un error al eliminar la media" });
    }
}

module.exports = {
    getMedias,
    createMedia,
    updateMedia,
    deleteMedia
}