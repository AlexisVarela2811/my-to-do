import bcrypt from "bcrypt";

//DEFINIMOS UNA CONST PARA LAS CONTRASEÑAS
const SALT_ROUNDS = 10;

export class PasswordService {
    constructor(saltRounds = SALT_ROUNDS) {
        this.saltRounds = saltRounds;

    }
    async hashPassword(password) {
        return await bcrypt.hash(password, this.saltRounds);
    }
    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

