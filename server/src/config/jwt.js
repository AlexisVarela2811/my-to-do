//configuramos el jwt
import jwt from "jsonwebtoken";

//fun para firmar el jwt
export const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//validar jwt
export const validarJWT = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}


