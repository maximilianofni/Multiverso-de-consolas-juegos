const platillos = require('../data/menu');

const controller = {
    home: function (req, res){
        res.render('index')
    },

    detail: function (req, res){

        const platillo = req.params.platillo
        res.render('detalleMenu', platillos[platillo])
    }
}

module.exports = controller;