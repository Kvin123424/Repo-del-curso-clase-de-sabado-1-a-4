import { Router } from "express";
import { crearAutor, listarAutores, obtenerAutor } from "../controllers/autores.controller.js";

const router = Router();

router.post("/", crearAutor);
router.get("/", listarAutores);
router.get("/:id", obtenerAutor);

export default router;