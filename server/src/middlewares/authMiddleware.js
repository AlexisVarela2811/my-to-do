import verify from "jsonwebtoken";
import validarJWT from "../config/jwt.js";

const UNAUTHORIZED_STATUS = 401;
//esta variable la usaremos para extraer el token del encabezado
const TOKEN_INDICE = 1;

export const authMiddleware = async (req, res, next) => {
  //Extraemos el token del encabezado
  const token = req.headers.authorization?.split(" ")[TOKEN_INDICE];
  //validamos si existe el token si no existe error
  if (!token) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: "No autorizado" });
  }
  try {
    //validamos el token utilizando la fun validarJWT
    const usuario = await validarJWT(token);
    if (!usuario) {
      //si no se puede validar el usuario, retornamos un error
      return res.status(UNAUTHORIZED_STATUS).json({ message: "No autorizado" });
    }
    //decodificamos el token para obtener el id
    const decodificarToken = verify(token);
    //si el token es valido asignamos el id del usuario al request
    req.usuario = decodificarToken.usuarioId;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: "Token no válido" });
  }
  return next();
};
