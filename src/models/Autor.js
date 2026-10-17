import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: [true, "El nombre es obligatorio"], trim: true },
    nacionalidad: { type: String, trim: true },
    fechaNacimiento: { type: Date }
  },
  { timestamps: true } // agrega createdAt y updatedAt automáticamente
);

export default mongoose.model("Autor", autorSchema, "autores");