const express = require('express')
var cors=require('cors')

const app = express();
const port = 3001;

app.use(cors())
app.use(express.json());
require('../routes/routes')(app);
app.listen(port)