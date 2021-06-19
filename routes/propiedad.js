const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async(req,res)=>{
   const datos = await pool.query('SELECT * FROM propiedad');
   if(datos.length > 0){
      res.json({
         codigo: res.statusCode,
         status: 'success',         
         message: 'Exito en la petición GET - Todas las propiedades',
         data: datos
      })
      console.log("read all OK - statusCode: ", res.statusCode);
   }else{
      res.json("No hay propiedades registradas");
      console.log("No hay propiedades registradas");
   }
});

router.get('/:id', async(req,res)=>{
   const { id } = req.params;
   const datos = await pool.query('SELECT * FROM propiedad WHERE id = ?',[id]);
   if(datos.length > 0){
      res.json({
         codigo: res.statusCode,
         status: 'success',         
         message: 'Exito en la petición GET - Una propiedad',
         data: datos
      })
      console.log("read OK - statusCode: ", res.statusCode);
   }else{
      res.json("propiedad No encontrada");
      console.log("propiedad No encontrada");
   }
});

router.post('/', async (req, res) => {
   const { tipo, domicilio, numero } = req.body;
   const newPropiedad = {
      tipo,
      domicilio,
      numero
   };
   const datos = await pool.query('INSERT INTO propiedad set ?', [newPropiedad]);
   if(datos.affectedRows > 0){   
      res.json({
         codigo: 201,
         status: 'success',      
         message: 'Exito en la petición POST',
         data: newPropiedad
      })
      console.log("INSERT ok - statusCode: ", res.statusCode);
   }
});

router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { tipo, domicilio, numero } = req.body;
   const newPropiedad = {
      tipo,
      domicilio,
      numero
   };
   const datos = await pool.query('UPDATE propiedad set ? WHERE id = ?', [newPropiedad, id]);
   if(datos.affectedRows > 0){
      res.json({
         codigo: 204,
         status: 'success',         
         message: 'Exito en la petición PUT',
         data: newPropiedad
      })
      console.log("UPDATE ok - statusCode: ", res.statusCode);
   }else{
      res.json("propiedad No encontrada");
      console.log("propiedad No encontrada");
   }
});

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   const datos = await pool.query('DELETE FROM propiedad WHERE id = ?', [id]);
   if(datos.affectedRows > 0){
      res.json({
         codigo: res.statusCode,
         status: 'success',      
         message: 'Exito en la petición DELETE'
      })
      console.log("DELETE ok - statusCode: ", res.statusCode);
   }else{
    res.json("propiedad No encontrada");
    console.log("propiedad No encontrada");
   }
});

module.exports = router;