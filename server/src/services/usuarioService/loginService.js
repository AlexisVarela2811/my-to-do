import { User } from "../../models/userModels.js";
import { PasswordService } from "./passwordService.js";
import { GENERAR_ACCESS_TOKEN, GENERAR_REFRESH_TOKEN } from "../../config/jwt.js";

export class LoginService {
  constructor() {
    this.passwordService = new PasswordService();
    this.generarAccessToken = GENERAR_ACCESS_TOKEN;
    this.generarRefreshToken = GENERAR_REFRESH_TOKEN;
  }

  async login(email, password) {
    try {
      const USUARIO = await User.findOne({ email });
      if (!USUARIO) {
        throw new Error("El usuario no existe");
      }
      const PASSWORD_CORRECTO = await this.passwordService.comparePassword(
        password,
        USUARIO.password
      );
      if (!PASSWORD_CORRECTO) {
        throw new Error("Contraseña incorrecta");
      }
      const TOKEN = this.generarAccessToken(USUARIO._id);
      const REFRESH_TOKEN = this.generarRefreshToken(USUARIO._id);
      return { TOKEN, REFRESH_TOKEN };
    } catch (error) {
      throw new Error("Error al iniciar sesión: " + error.message);
    }
  }
}
