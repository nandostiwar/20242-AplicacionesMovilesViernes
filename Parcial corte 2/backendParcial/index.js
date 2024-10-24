const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/login.routes');
const cors = require('cors');
const app = express();

const db = require('./db/mongo');
app.use(urlencoded({extended: true}))
app.use(json())

db.dbInit().then(() => console.log('Conexion realizada'))
app.use(cors())
app.use('/auth', router);

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})