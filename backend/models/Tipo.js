const {Schema, model} = require('mongoose');

const TipoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del tipo es obligatorio"],
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        enum: ["activo", "inactivo"],
        default: "activo"
    },
    descripcion: {
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
    }
});

module.exports = model("Tipo", TipoSchema);
