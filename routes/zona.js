const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async(req,res)=>{
   const datos = await pool.query('SELECT * FROM zona');
   if(datos.length > 0){
      res.json({
         codigo : res.statusCode,
         status : 'success',         
         message: 'Exito en la petición GET - Todas las zonas',
         data: datos
      });
      console.log("read all OK - statusCode: ", res.statusCode);
   }else{
      res.json("No hay zonas registradas");
      console.log("No hay zonas registradas");
   }
});

router.get('/:id', async(req,res)=>{
   const { id } = req.params;
   const datos = await pool.query('SELECT * FROM zona WHERE id = ?',[id]);
   if(datos.length > 0){
      res.json({
         codigo: res.statusCode,
         status: 'success',         
         message: 'Exito en la petición GET - Una zona',
         data: datos
      });
      console.log("read OK - statusCode: ", res.statusCode);
   }else{
      res.json("zona No encontrada");
      console.log("zona No encontrada");
   }
});

router.post('/', async (req, res) => {
   const { zona,descripcion } = req.body;
   const newZona = {
      zona,
      descripcion
   };
   const datos = await pool.query('INSERT INTO zona set ?', [newZona]);
   if(datos.affectedRows > 0){   
      res.json({
         codigo: 201,
         status: 'success',         
         message: 'Exito en la petición POST',
         data: newZona
      })
      console.log("INSERT ok - statusCode: ", res.statusCode);
   }
});

router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { zona,descripcion } = req.body;
   const newZona = {
      zona,
      descripcion
   };
   const datos = await pool.query('UPDATE zona set ? WHERE id = ?', [newZona, id]);
   if(datos.affectedRows > 0){
      res.json({
         codigo: 204,
         status: 'success',
         message: 'Exito en la petición PUT',
         data: newZona
      })
      console.log("UPDATE ok - statusCode: ", res.statusCode);
   }else{
      res.json("zona No encontrada");
      console.log("zona No encontrada");
   }
});

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   const datos = await pool.query('DELETE FROM zona WHERE id = ?', [id]);
   if(datos.affectedRows > 0){
      res.json({
         codigo : res.statusCode,
         status : 'success',         
         message: 'Exito en la petición DELETE'
      })
      console.log("DELETE ok - statusCode: ", res.statusCode);
   }else{
    res.json("zona No encontrada");
    console.log("zona No encontrada");
   }
});

module.exports = router;