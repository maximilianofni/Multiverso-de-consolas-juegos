
const conexion = require('../database/db');

const consoleController = {
    'list':(req, res) => {
        Consoles.findAll().then((consoles)=>{
            res.render('consolesList.ejs', {consoles})
        })
    },
    'save':(req, res)=>{
        const titulo = req.body.titulo;
        console.log(titulo);
        res.render('index')
   },
   'update':(req, res)=>{
    const id = req.body.id;
    const titulo = req.body.titulo;
    res.render('index');
    }
}


module.exports = consoleController;