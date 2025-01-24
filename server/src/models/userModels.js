import mongoose from "mongoose";

// Definimos constantes del esquema
const MIN_USUARIO_LENGTH = 3;
const MAX_USUARIO_LENGTH = 31;
const MIN_PASSWORD_LENGTH = 6;

// Definimos el esquema
const userSchema = new mongoose.Schema({
    // NOMBRE DE USUARIO
    usuario: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        trim: true,
        minlength: [MIN_USUARIO_LENGTH, `El nombre de usuario debe tener al menos ${MIN_USUARIO_LENGTH} caracteres`],
        maxlength: [MAX_USUARIO_LENGTH, `El nombre de usuario no debe exceder los ${MAX_USUARIO_LENGTH} caracteres`],
        unique: true // Aseguramos que el nombre de usuario sea único
    },
    // CONTRASEÑA
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [MIN_PASSWORD_LENGTH, `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`],
    },
    // EMAIL
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        match: [/.+@.+\..+/, 'Por favor ingresa un correo electrónico válido']
    },
});

// Exportamos el modelo
export const User = mongoose.model('User', userSchema);