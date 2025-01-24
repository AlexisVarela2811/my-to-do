import {UserRegistro} from "../services/usuarioService/userRegistro.js";
import {LoginService} from "../services/usuarioService/loginService.js";

// Definir constantes para los estados HTTP
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};

export class UserController {
    constructor() {
        this.userRegistro = new UserRegistro();
        this.loginService = new LoginService();
    }

    // Use arrow functions to maintain context
    register = async (req, res) => {
        try {
            const { usuario, email, password } = req.body;

            // Validar datos requeridos
            if (!usuario || !email || !password) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: 'Todos los campos son obligatorios (usuario, email, password)'
                });
            }

            const result = await this.userRegistro.registrarUsuario({ usuario, email, password });
            
            return res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: result.message
            });

        } catch (error) {
            // Manejar errores específicos
            if (error.message.includes('ya existe')) {
                return res.status(HTTP_STATUS.CONFLICT).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error al registrar usuario',
                error: error.message
            });
        }
    };

//! Aplicar biblioteca rateLimit para limitar el número de solicitudes
//? bun install express-rate-limit

    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validar datos requeridos
            if (!email || !password) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: 'Email y password son requeridos'
                });
            }

            const result = await this.loginService.login(email, password);
            
            return res.status(HTTP_STATUS.OK).json({
                success: true,
                message: 'Login exitoso',
                token: result.token
            });

        } catch (error) {
            // Manejar errores específicos de autenticación
            if (error.message.includes('no existe') || error.message.includes('incorrecta')) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error en el servidor',
                error: error.message
            });
        }
    };
}
