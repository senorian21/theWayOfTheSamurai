

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = (0, express.default)();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
