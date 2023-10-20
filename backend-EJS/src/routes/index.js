const express = require("express");
const router = express.Router();
const conexion = require('../database/db'); // importando la conexión a la base de datos

// mostrar todos los registros
router.get("/", function (req, res) {
    conexion.query('SELECT * FROM consoles', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('index', { title: "consolas multiverso", results: results }); // Pasa "results" a la vista
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
    // Crea un nuevo registro en la base de datos
    try {
        conexion.query('INSERT INTO consoles (title) VALUES (?)', [titulo], (error, results) => {
            if (error) {
                console.error('Error al crear el registro:', error);
                res.status(500).send('Error interno del servidor');
            } else {
                console.log('Registro creado:', titulo);
                res.redirect('/'); // Redirige al índice
            }
        });
        } catch (error) {
            console.error('Error al crear el registro:', error);
            res.status(500).send('Error interno del servidor');
        }
    });
  
// Ruta para mostrar el formulario de edición de registros
router.get('/edit/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM consoles WHERE id=?', [id], (error, results) =>{
        if (error) {
            throw error;
        } else {
            res.render('edit', {console:results[0]});
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
                res.redirect('/'); // Redirige al índice
            }
        });
        } catch (error) {
            console.error('Error al modificar el registro:', error);
            res.status(500).send('Error interno del servidor');
        }
    });


// ruta para eliminar el registro de la base de datos
router.get('/delete/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM consoles WHERE id = ?', [id], (error, results)=>{
        if (error) {
            throw error;
        } else {
            res.redirect('/');
        }
    })


})



module.exports = router;
