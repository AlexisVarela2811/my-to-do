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
        throw new Error("Email, Usuario y Contraseña son obligatorios");
      }

      // Verifica si el usuario ya existe
      const EXISTING_USER = await User.findOne({ email: usuarioData.email });
      if (EXISTING_USER) {
        throw new Error("El usuario ya existe");
      }

      // Hash de la contraseña
      const HASHED_PASSWORD = await this.passwordService.hashPassword(
        usuarioData.password
      );

      // Crear un nuevo usuario
      const NEW_USER = new User({
        usuario: usuarioData.usuario,
        password: HASHED_PASSWORD,
        email: usuarioData.email,
      });

      // Guardar el nuevo usuario
      await NEW_USER.save();
      return { message: "Usuario registrado exitosamente" };
    } catch (error) {
      throw new Error("Error al registrar el usuario: " + error.message);
    }
  }
}
