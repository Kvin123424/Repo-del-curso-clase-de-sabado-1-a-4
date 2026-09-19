const API_URL = 'https://jsonplaceholder.typicode.com/posts';
//obtenemos referencia  al formulario accediendo al DOM
const formulario = document.getElementById('form-reporte');

formulario.addEventListener('submit', async function (evento) {
  
  
    evento.preventDefault();

//armamos un registro con lo que vamos a enviar al servidor:
const nuevoCaso = {
    title: document.getElementById('lugar').value,
    body: document.getElementById('descripcion').value,
    autoridad: document.getElementById('autoridad').value,
    fecha: document.getElementById('fecha').value,
  };

   try {
    //REQUEST ASINCRONO AL SERVIDOR:
    const response = await fetch(API_URL, {
      method: 'POST',                                 // <-- aquí está la diferencia con GET
      headers: {
        'Content-Type': 'application/json',           // le decimos al servidor qué formato enviamos
      },
      body: JSON.stringify(nuevoCaso),                 // convertimos el objeto JS a texto JSON
    });

}
catch(error)


async function obtenerCasosDelServidor()
{
try {
    /** Request al servidor de forma asincrona */
    const response = await fetch(`${API_URL}?_limit=6`);

    if (!response.ok) 
    {
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    // los datos llegan como texto; .json() los convierte a objetos javascript
    const casos = await response.json();
    return datos;
    } 
    catch (error) 
    {
      console.error('No se pudieron obtener los casos:', error);
    return [];
  }
}
}
