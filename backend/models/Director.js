const {Shema, model} = require('mongoose');

const DirectorShema = Shema({
    nombres: {
        type: String,
        required: [true, "El nombre del director es obligatorio"],
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        enum: ["activo", "inactivo"],
        default: "activo"
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

module.exports = model("Director", DirectorShema);