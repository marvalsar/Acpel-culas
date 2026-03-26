const {Schema, model} = require('mongoose');
const Director = require('./Director');
const Productora = require('./Productora');

const MediaSchema = Schema({
    serial: {
        type: String,
        unique: true,
        trim: true
    },
    titulo: {
        type: String,
        trim: true
    },
    sinopsis: {
        type: String,
        trim: true
    },
    URL: {
        type: String,
        unique: true,
        trim: true
    },
    Imagen: {
        type: String,
        trim: true
    },
    fechaCreacion: {
        type: Date,
        required : true,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        required : true,
        default: Date.now
    },
    anioEstreno: {
        type: Number,
        trim: true
    },
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    },
});

MediaSchema.pre('save', async function() {
    if (this.serial && /^PEL-\d{4}$/.test(this.serial)) {
        return;
    }
    try {
        // Encontrar la última película creada cuyo serial empiece por PEL-
        const lastMedia = await this.constructor.findOne({ serial: /^PEL-/ }).sort({ serial: -1 });
        let newSerialNum = 1;

        if (lastMedia && lastMedia.serial) {
            const lastSerialMatch = lastMedia.serial.match(/^PEL-(\d+)$/);
            if (lastSerialMatch && lastSerialMatch[1]) {
                newSerialNum = parseInt(lastSerialMatch[1], 10) + 1;
            }
        }

        // Formatear a 4 dígitos, ej: PEL-0001, PEL-0002...
        this.serial = `PEL-${newSerialNum.toString().padStart(4, '0')}`;

    } catch (error) {
        throw error;
    }
});

module.exports = model("Media", MediaSchema);
