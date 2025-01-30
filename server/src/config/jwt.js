//configuramos el jwt
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

//fun para firmar el jwt
export const GENERAR_ACCESS_TOKEN = (id) => {
  return jwt.sign(
    { id, iat: Math.floor(Date.now() / 1000) }, // Incluye un timestamp de emisión
    config.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "15m" }
  );
};
//fun para validar el jwt
export const GENERAR_REFRESH_TOKEN = (id) => {
  return jwt.sign(
    { id, iat: Math.floor(Date.now() / 1000) }, // Incluye un timestamp de emisión
    config.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "7h" }
  );
};

//validar jwt
export const validarJWT = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUDIENCE,
    });
  } catch (error) {
    return null;
  }
};
