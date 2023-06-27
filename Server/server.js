const path = require('path');
const express = require("express");

const publicpath = path.join(__dirname, "/../public");

var app = express();

app.use(express.static(publicpath));
