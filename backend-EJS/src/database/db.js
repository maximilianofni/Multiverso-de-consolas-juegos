const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'consoles_db'
});

conexion.connect((error)=>{
    if(error){
        console.error('error de conexion es: ' +error);
        return
    }
    console.log('¡Conectado a la BD Mysql');
})

module.exports = conexion;