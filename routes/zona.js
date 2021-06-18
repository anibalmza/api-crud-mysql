const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async(req,res)=>{
   const datos = await pool.query('SELECT * FROM zona');
   // res.json(datos);
   res.json({
      status: 'success',
      codigo: res.statusCode,
      message: 'Exito en la solicitud del usuario',
      data: datos
   })
   console.log('READ ALL ok');
   console.log("statusCode: ", res.statusCode);
});

router.get('/:id', async(req,res)=>{
   const { id } = req.params;
   const datos = await pool.query('SELECT * FROM zona WHERE id = ?',[id]);
   // res.json(datos);
   res.json({
      status: 'success',
      codigo: res.statusCode,
      message: 'Exito en la solicitud del usuario',
      data: datos
   })
   console.log('READ ok');
   console.log("statusCode: ", res.statusCode);
});

router.post('/', async (req, res) => {
   const { nombre,descripcion } = req.body;
   const newZona = {
      nombre,
      descripcion
   };
   await pool.query('INSERT INTO zona set ?', [newZona]);
   // res.json('INSERT ok');
   res.json({
      status: 'success',
      codigo: res.statusCode,
      message: 'Exito en la solicitud del usuario',
      // data: datos
   })
   console.log('INSERT ok');
   console.log("statusCode: ", res.statusCode);
});

router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { nombre,descripcion } = req.body;
   const newZona = {
      nombre,
      descripcion
   };
   await pool.query('UPDATE zona set ? WHERE id = ?', [newZona, id]);
   // res.json('UPDATE ok');
   res.json({
      status: 'success',
      codigo: res.statusCode,
      message: 'Exito en la solicitud del usuario',
      // data: datos
   })
   console.log('UPDATE ok');
   console.log("statusCode: ", res.statusCode);
});

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   await pool.query('DELETE FROM zona WHERE id = ?', [id]);
   // res.json('DELETE ok');
   res.json({
      status: 'success',
      codigo: res.statusCode,
      message: 'Exito en la solicitud del usuario',
      // data: datos
   })
   console.log('DELETE ok');
   console.log("statusCode: ", res.statusCode);
});

module.exports = router;