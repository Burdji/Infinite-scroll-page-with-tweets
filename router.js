const express = require('express');
const router = express.Router();
router.use(express.json()); 
const fs = require('fs');
let jsonData = fs.readFileSync('./database/database.json', 'utf8');
jsonData = JSON.parse(jsonData);
let rawData=[];
for(let i=0;i<jsonData.profile.length;i++){
    rawData.push(jsonData.profile[i]=[
    `id: ${jsonData.profile[i].id}<br/>
    img: ${jsonData.profile[i].img}<br/>
    displayName: ${jsonData.profile[i].displayName}<br/>
    userName: ${jsonData.profile[i].userName}<br/>`]);
}
router.get('/', (req, res)=> {
    res.send(`<h4>${rawData.join('<br/>')}<h4/>`);
});
// router.post('/', (req, res)=> {
//     res.send('sended');
// });
// router.put('/', (req, res)=> {
//     res.send('sended');
// });
// router.delete('/', (req, res)=> {
//     res.send( 'sended');
// });
module.exports = router;

