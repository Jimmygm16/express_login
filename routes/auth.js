import express from "express";
import jwt from "jsonwebtoken";
import pool from "../config/connection.js";

const secret = "my secret key"; // clave secreta

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación de entrada
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Consulta a la base de datos
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).send("Usuario o contraseña incorrectos");
    }

    // Generar el token JWT
    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
    return res.status(200).json({ token });

  } catch (err) {
    console.error("Error en la consulta a la base de datos:", err);
    res.status(500).send("Error en el servidor");
  }
});

// Middleware para verificar el token
function verifyToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1]; // Obtener token del encabezado

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const payload = jwt.verify(token, secret); // Verificar el token
    req.username = payload.username; // Asignar usuario a la petición
    next(); // Pasar al siguiente middleware o ruta
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

// Ruta protegida
router.get("/protected", verifyToken, (req, res) => {
  return res
    .status(200)
    .json({ message: "You have access", user: req.username });
});

router.post("/logout", (req, res) => {
    return res.status(200).send("Logout successful");
    }
);


export default router;
