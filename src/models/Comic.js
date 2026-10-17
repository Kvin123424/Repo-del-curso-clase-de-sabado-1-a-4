import mongoose from "mongoose";

const comicSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: [true, "El título es obligatorio"], trim: true, unique: true },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Autor", // referencia a la colección de autores
      required: [true, "El autor es obligatorio"]
    },
    editorial: { type: String, trim: true },
    anioPublicacion: { type: Number, min: 1900 },
    precio: { type: Number, required: [true, "El precio es obligatorio"], min: 0 },
    stock: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Comic", comicSchema, "comics");