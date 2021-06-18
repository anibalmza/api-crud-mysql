const express = require('express');
const morgan = require('morgan');
//const bodyParser = require('body-parser');

//---- inicializar
const app = express();

//-----setting
app.set('port', process.env.PORT || 3000);


//------Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));


//-------Routes
app.use(require('./routes/index'));
app.use('/persona',require('./routes/persona'));
app.use('/propiedad',require('./routes/propiedad'));
app.use('/zona',require('./routes/zona'));


//---- iniciar Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});