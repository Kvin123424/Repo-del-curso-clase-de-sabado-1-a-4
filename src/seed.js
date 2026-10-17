import "dotenv/config";
import { readFile } from "node:fs/promises";
import mongoose from "mongoose";
import Autor from "./models/Autor.js";
import Comic from "./models/Comic.js";

// Lee un archivo JSON relativo a este archivo
async function leerJSON(ruta) {
  const contenido = await readFile(new URL(ruta, import.meta.url), "utf-8");
  return JSON.parse(contenido);
}

async function seed() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Conectado a MongoDB Atlas");

  const autoresData = await leerJSON("../data/autores.json");
  const comicsData = await leerJSON("../data/comics.json");

  // Borra lo que haya, para poder ejecutar el seed varias veces
  await Comic.deleteMany();
  await Autor.deleteMany();

  // 1. Insertar autores
  const autores = await Autor.insertMany(autoresData);

  // 2. Diccionario nombre → _id
  const idPorNombre = Object.fromEntries(autores.map((a) => [a.nombre, a._id]));

  // 3. Reemplazar autorNombre por la referencia real
  const comics = comicsData.map(({ autorNombre, ...resto }) => ({
    ...resto,
    autor: idPorNombre[autorNombre]
  }));
  await Comic.insertMany(comics);

  console.log(`Insertados ${autores.length} autores y ${comics.length} cómics`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(" Error en el seed:", error.message);
  process.exit(1);
});