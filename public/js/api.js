// Como el cliente lo sirve la misma API, basta con una ruta relativa
const API_URL = "/api";

// Función base: hace la petición, convierte la respuesta a JSON y lanza un error si algo falla
async function peticion(ruta, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    headers: { "Content-Type": "application/json" },
    ...opciones
  });

  const datos = await respuesta.json();

  // respuesta.ok es false cuando el código HTTP es 400, 404, 500...
  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error en la petición");
  }

  return datos;
}

// ---------- Autores ----------

// GET /api/autores
export function listarAutores() {
  return peticion("/autores");
}

// POST /api/autores
export function crearAutor(autor) {
  return peticion("/autores", {
    method: "POST",
    body: JSON.stringify(autor)
  });
}

// ---------- Cómics ----------

// GET /api/comics  o  GET /api/comics?autor=...&editorial=...
export function listarComics(filtros = {}) {
  const params = new URLSearchParams();

  // Solo agregamos los filtros que tengan valor
  Object.entries(filtros).forEach(([clave, valor]) => {
    if (valor) params.set(clave, valor);
  });

  const query = params.toString();
  return peticion(`/comics${query ? `?${query}` : ""}`);
}

// POST /api/comics
export function crearComic(comic) {
  return peticion("/comics", {
    method: "POST",
    body: JSON.stringify(comic)
  });
}