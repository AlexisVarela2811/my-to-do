import { User } from "../../models/userModels.js";
import { PasswordService } from "./passwordService.js";

export class UserRegistro {
    constructor() {
        this.passwordService = new PasswordService();
    }

    async registrarUsuario(usuarioData) {
        try {
            // Verificación de campos obligatorios
            if (!usuarioData.email || !usuarioData.password || !usuarioData.usuario) {
                throw new Error('Email, Usuario y Contraseña son obligatorios');
            }

            // Verifica si el usuario ya existe
            const existingUser = await User.findOne({ email: usuarioData.email });
            if (existingUser) {
                throw new Error('El usuario ya existe');
            }

            // Hash de la contraseña
            const hashedPassword = await this.passwordService.hashPassword(usuarioData.password);

            // Crear un nuevo usuario
            const newUser = new User({
                usuario: usuarioData.usuario,
                password: hashedPassword,
                email: usuarioData.email,
            });

            // Guardar el nuevo usuario
            await newUser.save();
            return { message: 'Usuario registrado exitosamente' };
        } catch (error) {
            throw new Error('Error al registrar el usuario: ' + error.message);
        }
    }
}
