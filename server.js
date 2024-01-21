const express = require('express');
const path = require('path');
const rout = require("./router");
const app= express();
app.use(express.static('app'));

app.use('/database',rout);

app.use(express.json());
app.get('/', (req, res)=> {
    
});
app.post('/', (req, res)=> {
    
});
app.listen(8080, ()=>{
    console.log("on");
});

module.exports= rout

