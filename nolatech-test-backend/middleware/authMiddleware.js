const jwt = require("jsonwebtoken");

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No autorizado. Token no proporcionado" });
  }

  // Extraer el token
  const token = authHeader.split(" ")[1];

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar los datos decodificados (por ejemplo, userId y role) en la solicitud
    req.user = decoded;

    // Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(401).json({ message: "No autorizado. Token inválido" });
  }
};



module.exports = authMiddleware;
