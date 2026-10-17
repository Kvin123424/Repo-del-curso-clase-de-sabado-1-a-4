import { Router } from "express";
import { crearComic, listarComics, obtenerComic } from "../controllers/comics.controller.js";

const router = Router();

router.post("/", crearComic);
router.get("/", listarComics);
router.get("/:id", obtenerComic);

export default router;