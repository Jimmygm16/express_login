import express from 'express';
import pool from '../config/connection.js';

const router = express.Router();

// Usar async/await para manejar la consulta a la base de datos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error en la consulta a la base de datos:', err);
    res.status(500).send('Error al obtener los usuarios');
  }
});

router.post('/', async (req, res) => {
  console.log(req.body); // Verifica lo que se recibe en el cuerpo
  try {
    const { username, email, password } = req.body;

    // Aquí puedes agregar validaciones para username, email y password

    const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    res.status(201).send({ message: "Usuario creado con éxito" });
  } catch (err) {
    console.error('Error en la consulta a la base de datos:', err);
    res.status(500).send({message: "error en la base de datos"}) // Cambiar a 500 en caso de error
  }
});



export default router;
