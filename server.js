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
console.log(jsonData.profile[0].img);

app.use('/database',rout);

app.get('/home',(req,res)=>{
   res.json(jsonData);
})

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
let users = [];
try {
  const data = fs.readFileSync('./database/database.json', 'utf8');
  users = JSON.parse(data);
} catch (err) {
  console.error('Error reading users.json:', err);
}
app.use(upload.single('image'));

app.post('/api/register', (req, res) => {
  const { userName, displayName } = req.body;
  const image = req.file ? req.file.path : null;

  const newUser = {
    image,
    id: users.profile.length + 1,
    displayName,
    userName,
  };
  users.profile.push(newUser);

  fs.writeFileSync('./database/database.json', JSON.stringify(users, null, 2));

  res.status(200).json({ message: 'Registration successful' });
});

app.listen(8080, ()=>{
    console.log("on");
});


