'use strict'; 
const express = require('express');
const http = require('http');
const PORT = 8081;
const HOST = '127.0.0.1';
const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello world\n');
    console.log('get => /');
    console.log(req.query);
});
app.post('/', (req, res) => {
    res.send('Hello world\n');
    console.log('get => /');
    console.log(req.query);
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);