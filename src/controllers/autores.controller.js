import mongoose from "mongoose";
import Autor from "../models/Autor.js";

// POST /api/autores  → crear un autor
export async function crearAutor(req, res) {
  try {
    const autor = await Autor.create(req.body);
    res.status(201).json(autor);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

// GET /api/autores  → listar todos los autores
export async function listarAutores(req, res) {
  try {
    const autores = await Autor.find().sort({ nombre: 1 });
    res.json(autores);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

// GET /api/autores/:id  → consultar un autor por su id
export async function obtenerAutor(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const autor = await Autor.findById(id);
    if (!autor) {
      return res.status(404).json({ mensaje: "Autor no encontrado" });
    }

    res.json(autor);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}