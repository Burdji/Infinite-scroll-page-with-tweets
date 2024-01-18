const express = require('express');
const path = require('path');
const app= express();
app.use(express.static('app'));
app.use(express.json());
app.get('/', (req, res)=> {
})
app.post('/', (req, res)=> {
    
})
app.listen(8080, ()=>{
    console.log("kur");
});
