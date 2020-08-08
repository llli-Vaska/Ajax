const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.get('/first1', (req, res) => {
    res.status(400).send('hello ajax!')
});
app.get('/first', (req, res) => {
    res.send('hello ajax!')
});
app.get('/responseData', (req, res) => {
    res.send({"name":"llf"})
});

app.get('/get', (req, res) => {
    res.send(req.query);
});

app.post('/post', (req, res) => {
    res.send(req.body);
});

app.post('/json', (req, res) => {
    res.send(req.body);
});

app.get('/readystate', (req, res) => {
    res.send('hello');
});

app.get('/error', (req, res) => {
    res.status(400).send('not ok');
})

app.get('/cache', (req, res) => {
    fs.readFile('./test.txt', (error, result) => {
        res.send(result);
    });
})

app.listen(3000);

console.log('服务器启动成功！');