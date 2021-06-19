const express = require('express');
const router = express.Router();
const pool = require('../database');

// Persona
router.get('/', async(req,res)=>{
    const datos = await pool.query('SELECT * FROM persona',(err,result)=>{
        if (err){
            throw err;
        }else{            
            if(result.length > 0){
                res.json({
                    codigo: res.statusCode,
                    status: 'success',                    
                    message: 'Exito en la petición GET - Todas las personas',
                    data: result
                })
                console.log("read all OK - statusCode: ", res.statusCode);
            }else{
                res.json("No hay personas registradas");
                console.log("No hay personas registradas");
            }    
        }
    });
});

router.get('/:id', async(req,res)=>{
    const { id } = req.params;
    const datos = await pool.query('SELECT * FROM persona WHERE id = ?',[id],(err,result)=>{
        if (err){
            throw err;
        }else{
            if(result.length > 0){
                res.json({
                    codigo: res.statusCode,
                    status: 'success',                    
                    message: 'Exito en la petición GET - Una persona',
                    data: result
                })
                console.log("read OK - statusCode: ", res.statusCode);
            }else{
                res.json("persona No encontrada");
                console.log("persona No encontrada");
            }
        }   
    });
});

router.post('/', async (req, res) => {
    const { apellido,nombre,dni,telefono,direccion } = req.body;
    const newPersona = {
        apellido,
        nombre,
        dni,
        telefono,
        direccion
    };
    await pool.query('INSERT INTO persona set ?', [newPersona],(err,result)=>{
        if (err){
            throw err;
        }else{    
            // console.log("resultado->", result)
            // console.log("resultado->", result.affectedRows)        
            if(result.affectedRows > 0){                
                res.json({
                    codigo: 201,
                    status: 'success',
                    message: 'Exito en la petición POST',
                    data: newPersona
                })
                console.log("INSERT ok - statusCode: ", res.statusCode);
            }
        }
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { apellido,nombre,dni,telefono,direccion } = req.body;
    const newPersona = {
        apellido,
        nombre,
        dni,
        telefono,
        direccion
    };
    await pool.query('UPDATE persona set ? WHERE id = ?', [newPersona, id],(err,result)=>{
        if (err){
            throw err;
        }else{
            if(result.affectedRows > 0){
                res.json({
                    codigo: 204,
                    status: 'success',
                    message: 'Exito en la petición PUT',
                    data: newPersona
                })
                console.log("UPDATE ok - statusCode: ", res.statusCode);
            }else{
                res.json("persona No encontrada");
                console.log("persona No encontrada");
            }
        }
    });        
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM persona WHERE id = ?', [id],(err,result)=>{
        if (err){
            throw err;
        }else{
            if(result.affectedRows > 0){
                res.json({
                    codigo: res.statusCode,
                    status: 'success',
                    message: 'Exito en la petición DELETE'
                })
                console.log("DELETE ok - statusCode: ", res.statusCode);
            }else{
                res.json("persona No encontrada");
                console.log("persona No encontrada");
            }
        }
    });
});

// Persona Propiedad
router.get('/ver/propiedad', async(req, res)=>{
    //console.log('Persona + Propiedad');
    var sql = "SELECT p.apellido, p.nombre, d.tipo, d.domicilio, d.numero, z.zona, z.descripcion FROM persona p JOIN propiedad d ON p.id = d.persona_id JOIN zona z ON d.zona_id = z.id ORDER BY p.apellido";    
    const datos = await pool.query(sql,(err,result)=>{
        if (err){
            throw err;
        }else{
            if(result.length > 0){
                res.json({
                    codigo: res.statusCode,
                    status: 'success',                    
                    message: 'Exito en la petición GET - Todas las propiedades de todas las personas',
                    data: result
                })
                // res.json(datos);
                console.log('READ ALL Propiedades ok');
                console.log("statusCode: ", res.statusCode);
            }else{
                res.json("No hay personas o propiedades registradas");
                console.log("No hay personas o propiedades registradas");
            }   
        }
    });    
});


router.get('/:id/propiedad', async(req, res)=>{
    const { id } = req.params;
    var sql = "SELECT p.apellido, p.nombre, d.tipo, d.domicilio, d.numero FROM persona p JOIN propiedad d ON d.persona_id = p.id WHERE p.id = ? ORDER BY p.apellido";
    const datos = await pool.query(sql,[id],(err,result)=>{
        if (err){
            throw err;
        }else{
            if(result.length > 0){
                // res.json(datos);
                res.json({
                    codigo: res.statusCode,
                    status: 'success',                    
                    message: 'Exito en la petición GET - Todas las propiedades de Una persona',
                    data: result
                })
                console.log('READ Propiedad ok');
                console.log("statusCode: ", res.statusCode);
            }else{
                res.json("persona No encontrada");
                console.log("persona No encontrada");
            }
        }
    });    
});

module.exports = router;