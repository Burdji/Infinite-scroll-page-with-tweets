const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res)=> {
    fs.readFile('./database/database.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Internal Server Error');
          return;
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
    });
});
router.post('/', (req, res)=> {
    res.send('sended');
});
router.put('/', (req, res)=> {
    res.send('sended');
});
router.delete('/', (req, res)=> {
    res.send( 'sended');
});

module.exports = router;

