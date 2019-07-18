const express = require('express')
const app = express()
const port = 9000;
var DateDiff = require('date-diff');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.json());

app.use(express.static('public'))


require('../routes/routes')(app);
app.listen(port)