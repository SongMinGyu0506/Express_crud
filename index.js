const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const connection = mysql.createConnection({

});
const port = 3000

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://ggp04114.iptime.org:2${port}`))