process.loadEnvFile();

const { MONGODB_URI, JWT_SECRET, PORT, JWT_ISSUER, JWT_AUDIENCE } = process.env;

// Objeto de configuración
export const config = {
  MONGODB_URI,
  JWT_SECRET,
  PORT,
  JWT_ISSUER,
  JWT_AUDIENCE,
};
