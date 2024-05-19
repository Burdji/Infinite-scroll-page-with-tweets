const express = require("express")
const rout = require("./router");
const app= express();
const fs = require('fs');
app.use(express.json()); 
let jsonData = fs.readFileSync('./database/database.json', 'utf8');
jsonData = JSON.parse(jsonData);
app.use(express.static('app'));
app.use("/media",express.static('./database/media'));
app.use("/icons",express.static('./database/icons'));
console.log(jsonData.profile[0].img)

app.use('/database',rout);

app.get('/home',(req,res)=>{
   res.json(jsonData);
})
app.listen(8080, ()=>{
    console.log("on");
});


