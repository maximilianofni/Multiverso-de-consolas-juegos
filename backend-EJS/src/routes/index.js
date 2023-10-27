const express = require("express");
const router = express.Router();
const conexion = require('../database/db'); // importando la conexión a la base de datos

// mostrar todos los registros
router.get("/", function (req, res) {
    const mensaje = req.query.mensaje; // Obtén el valor de 'mensaje' de la URL
    conexion.query('SELECT * FROM consoles', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('index', { title: "crud de consolas", results: results, mensaje: mensaje }); // Pasa "results" a la vista
        }
    });
    
});

// ruta a la vista crear registros
router.get('/create', (req,res)=>{
    res.render('create')
})

// ruta para guardar el registro nuevo a la base de datos
router.post('/save', async (req, res) => {
    const { titulo } = req.body;

    // Primero, verifica si ya existe una consola con el mismo título
    conexion.query('SELECT * FROM consoles WHERE title = ?', [titulo], (error, results) => {
        if (error) {
            console.error('Error al verificar el título:', error);
            res.status(500).send('Error interno del servidor');
            const mensaje = {
                type: 'error',
                text: 'Error al verificar el título.'
            };
            res.redirect(`/?mensaje=${JSON.stringify(mensaje)}`);
        } else if (results.length > 0) {
            // Si ya existe una consola con el mismo título, muestra un mensaje de error
            const mensaje = {
                type: 'error',
                text: 'Ya existe una consola con este título.'
            };
            res.redirect(`/?mensaje=${JSON.stringify(mensaje)}`);
        } else {
            // Si no existe una consola con el mismo título, crea el registro
            conexion.query('INSERT INTO consoles (title) VALUES (?)', [titulo], (error, insertResults) => {
                if (error) {
                    console.error('Error al crear el registro:', error);
                    res.status(500).send('Error interno del servidor');
                    const mensaje = {
                        type: 'error',
                        text: 'Error al crear el registro.'
                    };
                    res.redirect(`/?mensaje=${JSON.stringify(mensaje)}`);
                } else {
                    const mensaje = {
                        type: 'success',
                        text: 'El registro se ha creado exitosamente.'
                    };
                    res.redirect(`/?mensaje=${JSON.stringify(mensaje)}`);
                }
            });
        }
    });
});

  
// Ruta para mostrar el formulario de edición de registros
router.get('/edit/:id', (req, res)=>{
    const id = req.params.id;
    const mensaje = req.query.mensaje; // Obtén el valor de 'mensaje' de la URL
    conexion.query('SELECT * FROM consoles WHERE id=?', [id], (error, results) =>{
        if (error) {
            throw error;
        } else {
            res.render('edit', {console:results[0], mensaje});
        }
    })

});

// ruta para modificar el registro a la base de datos
router.post('/update', async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    // modificar registro en la base de datos
    try {
        conexion.query('UPDATE consoles SET ? WHERE id = ?', [{title:title}, id], (error, results) => {
            if (error) {
                console.error('Error al modificar el registro:', error);
                res.status(500).send('Error interno del servidor');
            } else {
                console.log('Registro modificado:', title);
                // res.redirect('/'); // Redirige al índice
                //res.redirect('/?mensaje=editado'); // Redirige con mensaje de éxito
                const mensaje = {
                    type: 'success',
                    text: 'El registro se ha editado exitosamente.'
                };
                res.redirect(`/?mensaje=${JSON.stringify(mensaje)}`); // Redirige al índice con mensaje de éxito
            }
        });
        } catch (error) {
            console.error('Error al modificar el registro:', error);
            res.status(500).send('Error interno del servidor');
            const mensaje = {
                type: 'error',
                text: 'Error al modificar el registro.'
            };
            res.redirect(`/?mensaje=${JSON.stringify(mensaje)}`); // Redirige al índice con mensaje de error
           // res.redirect('/?mensaje=error'); // Redirige con mensaje de error
        }
    });


// ruta para eliminar el registro de la base de datos
router.get('/delete/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM consoles WHERE id = ?', [id], (error, results)=>{
        if (error) {
            const mensaje = {
                type: 'error',
                text: 'Error al eliminar el registro.'
            };
            res.redirect('/?mensaje=' + encodeURIComponent(JSON.stringify(mensaje)));
            throw error;
        } else {
            //res.redirect('/');
            const mensaje = {
                type: 'success',
                text: 'El registro se ha eliminado exitosamente.'
            };
            res.redirect('/?mensaje=' + encodeURIComponent(JSON.stringify(mensaje)));
        }
    })


})

// ruta para acceder a la vista del login de usuarios
router.get('/user', (req, res) => {
    res.render('auth/user',{ title: "Login"}); // Renderiza la vista user
});

// ruta para acceder a la vista home
router.get('/home', (req, res) => {
    res.render('home', { title: "home"}); // Renderiza la vista user
});


module.exports = router;
