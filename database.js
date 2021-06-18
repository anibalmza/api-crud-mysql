const mysql = require('mysql');
const { promisify } = require('util');      //para poder utilizar promesas async await

//const { database } = require('./keys');
const database = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inmobi_app'
};

const pool = mysql.createPool(database);    //para poder utilizar promesas async await

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La Conexion con la BD fue Cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La BD tiene muchas Conexiones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('La Conexion con la BD fue Rechazada');
        }
    }
    if(connection){
        connection.release();
        console.log('Conexión a la BD Exitosa!!');
    }
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;