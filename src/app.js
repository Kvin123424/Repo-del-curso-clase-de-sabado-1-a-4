import "dotenv/config";
import express from "express";
import { conectarDB } from "./config/db.js";
import autoresRoutes from "./routes/autores.routes.js";
import comicsRoutes from "./routes/comics.routes.js";

const app = express();

// Middleware: permite leer el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API de la Tienda de Cómics funcionando" });
});

// Rutas de la API
app.use("/api/autores", autoresRoutes);
app.use("/api/comics", comicsRoutes);

// Middleware para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;

// Primero conectamos a la base de datos y luego levantamos el servidor
conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});