const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const connection = mysql.createConnection({
    host: "ggp04114.iptime.org",
    port: "23306",
    user: "root",
    password: "1234",
    database: "cruddb"
});
const port = 3000

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.set('views',__dirname+'/views');
app.set('view engine','ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user',userRouter);
app.use('/post',postRouter);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://ggp04114.iptime.org:2${port}`))
