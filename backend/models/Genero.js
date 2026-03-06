const {Shema, model} = require('mongoose');

const GeneroShema = Shema({
    nombre: {
        type: String,
        required: [true, "El nombre del género es obligatorio"],
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
}, {
    timestamps: true
});