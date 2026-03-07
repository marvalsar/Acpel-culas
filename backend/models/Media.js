const {Shema, model} = require('mongoose');
const Director = require('./Director');
const Productora = require('./Productora');

const MediaShema = Schema({
    serial: {
        type: Number,
        required: [true, "El serial de la media es obligatorio"],
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
        require : true,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        require : true,
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

module.exports = model("Media", MediaShema);