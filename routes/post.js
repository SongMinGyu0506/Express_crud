const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.get('/',(req,res)=>{
	res.send("/ => TEST PAGE");
});

router.get('/create',(req,res)=>{
	res.render("create");
});

router.post('/create',(req,res)=> {
	var testname = req.body.testname;
	res.send(testname);
	console.log(testname);
});

module.exports = router;
