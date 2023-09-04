// ----------------------------------------- configuracion------------------------//
const express = require('express'); // importo el módulo express
const app = express(); // se crea una instancia de la aplicación Express llamada app
const path = require("path"); //  importo el módulo path de Node.js, que se utiliza para trabajar con rutas de archivos y directorios de manera más sencilla.

//Esta línea inicia el servidor web en el puerto 3001. Cuando el servidor se inicia correctamente, se ejecuta la función de devolución de llamada (callback) que imprime un mensaje en la consola indicando que el servidor se está ejecutando en el puerto 3001.
app.listen(3001, () => {
    console.log(`server running on port 3001`);
})

// Aquí se configura una ruta HTTP utilizando el método app.get(). Esta ruta es la raíz del sitio web, es decir, cuando alguien accede a la URL base del servidor (en este caso, http://localhost:3001/), esta función se ejecutará. La función de devolución de llamada toma dos parámetros: req (la solicitud entrante) y res (la respuesta que se enviará al navegador del cliente).
//  Cuando alguien accede a la ruta raíz del servidor, esta línea envía un archivo HTML al navegador del cliente como respuesta. El archivo HTML se encuentra en el directorio /views y se llama home.html. Se utiliza path.join() para asegurarse de que la ruta al archivo sea válida independientemente del sistema operativo.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
})
