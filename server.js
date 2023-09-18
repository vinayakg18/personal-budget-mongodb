const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));
app.use('/jn',express.static('data.json'));

app.get('/hello', (req,res) =>{
    res.send('Hello World!');
})

app.get('/budget', (req, res) => {
    const url = 'http://localhost:3000/jn';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        res.json(data);
  });
    //res.json(budget);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});