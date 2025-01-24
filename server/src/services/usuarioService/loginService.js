import { User } from "../../models/userModels.js";
import { PasswordService } from './passwordService.js';
import {generarJWT}  from '../../config/jwt.js';

export class LoginService {
    constructor() {
        this.passwordService = new PasswordService();
        this.generarJWT = generarJWT;
    }

    async login(email, password) {
        try {
            const usuario = await User.findOne({ email });
            if (!usuario) {
                throw new Error('El usuario no existe');
            }
            const passwordCorrecto = await this.passwordService.comparePassword(password, usuario.password);
            if (!passwordCorrecto) {
                throw new Error('Contraseña incorrecta');
            }
            const token = generarJWT(usuario._id);
            return { token };
        } catch (error) {
            throw new Error('Error al iniciar sesión: ' + error.message);
        }
    }
}
