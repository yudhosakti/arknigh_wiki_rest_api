const express = require('express');
const middleware=  require('./src/middleware/log');
const operatorRoute = require('./src/route/operator'); 
const eventRoute = require('./src/route/event');
const bannerRoute = require('./src/route/banner');
const materialRoute = require('./src/route/material');
const enemyRoute = require('./src/route/enemy');
const themeRoute = require('./src/route/theme')

const app = express();
let port  = 4000;

app.use(middleware.logRequest);;
app.use(express.json())

app.use('/operator',operatorRoute)
app.use('/event',eventRoute)
app.use('/banner',bannerRoute)
app.use('/material',materialRoute)
app.use('/enemy',enemyRoute)
app.use('/theme',themeRoute)

app.listen(port,()=> {
    console.log('Server Running At Port',port);
})

