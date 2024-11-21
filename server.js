const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://admin:contraseñaDB@cluster0.vzb2h.mongodb.net/mercaditobaratitoDB?retryWrites=true&w=majority')
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas', err));

// Esquema de usuario
const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  contraseña: String,
});

const User = mongoose.model('User', userSchema);

// Ruta de registro
app.post('/register', async (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;
  const newUser = new User({ nombre, apellido, email, contraseña });
  try {
    await newUser.save();
    console.log('Usuario registrado:', newUser);
    res.send('Usuario registrado');
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).send('Error al registrar usuario');
  }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const user = await User.findOne({ email, contraseña });
    if (user) {
      console.log('Inicio de sesión exitoso:', user);
      res.send('Inicio de sesión exitoso');
    } else {
      console.log('Credenciales incorrectas');
      res.send('Credenciales incorrectas');
    }
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).send('Error al iniciar sesión');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});