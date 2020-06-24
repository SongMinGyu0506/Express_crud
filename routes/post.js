const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const router = express.Router();

const connection = mysql.createConnection({
	host: 'localhost',
	post: '3306',
	user: 'root',
	password: '',
	database: 'cruddb',
	multipleStatements: true
});

connection.connect();

router.use(bodyParser.urlencoded({extended:false}));

router.get('/',(req,res)=>{
	res.redirect('/post/list');
});

router.get('/list',(req,res)=>{
	var sql = "SELECT BRDNO, title, writer, memo, dt FROM tbl_board;";
	connection.query(sql,(err,rows)=>{
		if (err) console.error("err: "+err);
		res.render('list',{rows:rows?rows:{}});
	});
});

router.get('/create',(req,res)=>{
	res.render("create");
});

router.post('/create',(req,res)=> {
	var data = [req.body.title, req.body.writer, req.body.memo];
	var sql = "INSERT INTO tbl_board(title,writer,memo,dt) VALUES(?,?,?,now())";
	connection.query(sql,data,(err,rows)=> {
		if(err) console.error("err: " + err);
});
	res.redirect('/post/list');
});

module.exports = router;
