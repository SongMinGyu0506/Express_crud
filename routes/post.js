const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const router = express.Router();

const connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
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

router.get('/delete/:id',(req,res)=>{
	var boardNo = req.params.id;
	var sql = "delete from tbl_board where BRDNO = ?";
	connection.query(sql,boardNo,(err,rows)=> {
		if(err) console.error("err: " + err);
	});
	res.redirect('/post/list');
})

var tempboardNo = 0;
router.get('/list/:id',(req,res)=>{
	var boardNo = parseInt(req.params.id);
	tempboardNo = boardNo;
	var sql = "select memo,title from tbl_board where BRDNO = " + boardNo;
	connection.query(sql,(err,data)=> {
		if(err) console.error("err: " + err);
		res.render('memo',{data:data[0]});
	});
});

router.post('/list/comment',(req,res)=>{
	var writer = req.body.writer;
	var memo = req.body.memo;
	var tempNo = tempboardNo;

	var data = [writer, memo, tempNo];
	var sql="INSERT INTO tbl_comment(writer,memo,memoNo,dt) VALUES(?,?,?,current_timestamp());";
	connection.query(sql,data,(err,rows)=>{
		if(err) console.error("err: " + err);
	})
	res.redirect('/list/'+tempNo);
})

var tempid=0
router.get('/update/:id',(req,res)=>{
	var boardNo = parseInt(req.params.id);
	var sql = "select memo from tbl_board where BRDNO = " + boardNo;
	connection.query(sql,(err,data)=> {
		if(err) console.error("err: " + err);
		res.render('update',{data:data[0]});
	});
	tempid = parseInt(req.params.id);
});
router.post('/update',(req,res)=>{
	var data = req.body.memo;
	var number = parseInt(req.params.id);
	var sql = "UPDATE tbl_board SET memo=? WHERE BRDNO="+tempid;
	connection.query(sql,data,(err)=>{
		if(err) console.error("err: "+err);
	});
	res.redirect('/post/list')
});

router.get('/create',(req,res)=>{
	res.render("create");
});

router.post('/create',(req,res)=> {
	var data = [req.body.title, req.body.writer, req.body.memo];
	var sql = "INSERT INTO tbl_board(title,writer,memo,dt) VALUES(?,?,?,current_timestamp());";
	connection.query(sql,data,(err,rows)=> {
		if(err) console.error("err: " + err);
});
	res.redirect('/post/list');
});

module.exports = router;
