document.addEventListener('DOMContentLoaded', async () => {
    // 1. Extraer el parámetro ?id= de la barra de direcciones del navegador
    const urlParams = new URLSearchParams(window.location.search);
    const comicId = urlParams.get('id');

    if (!comicId) {
        document.querySelector('#comic-titulo').textContent = "Error: No se definió un ID válido.";
        return;
    }

    try {
        // 2. Consumir la API directamente usando el endpoint dinámico
        const response = await fetch(`/api/comics/${comicId}`);
        
        if (!response.ok) throw new Error("El cómic solicitado no se encuentra en el servidor.");

        const comic = await response.json();

        // Formateador de moneda colombiana integrado
        const formatoPeso = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

        // 3. Modificar los elementos del DOM con la data del backend
        document.querySelector('#comic-titulo').textContent = comic.titulo;
        document.querySelector('#comic-autor').textContent = `✍️ ${comic.autor?.nombre ?? "Autor desconocido"}`;
        document.querySelector('#comic-editorial').textContent = comic.editorial || "N/A";
        document.querySelector('#comic-anio').textContent = comic.anioPublicacion || "N/A";
        document.querySelector('#comic-precio').textContent = formatoPeso.format(comic.precio);
        document.querySelector('#comic-stock').textContent = comic.stock;

    } catch (error) {
        document.querySelector('#detalle-box').innerHTML = `
            <h2 style="color:red;">Error al cargar la información</h2>
            <p>${error.message}</p>
            <a href="index.html">Regresar al catálogo</a>
        `;
    }
});
