const express = require('express');
const {urlencoded, json} = require('express');
const signosRoutes = require('./routers/signos.routes.js');
const userRoutes = require('./routers/user.routes.js')
const cors = require('cors');

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/api/signos', signosRoutes);
app.use('/api', userRoutes)


app.listen(4000, ()=>{
    console.log('listening at port 4000');
})