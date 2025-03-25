"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
app.get('/', function (req, res) {
    var a = 4;
    if (a > 5) {
        res.send('Ok');
    }
    else {
        res.send('Hello World!');
    }
});
app.get('/samurais', function (req, res) {
    res.send('Hello samurai, Ilya!!!');
});
app.post('/samurais', function (req, res) {
    res.send('We have created samurais!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
