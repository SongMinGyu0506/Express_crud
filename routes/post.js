const express = require('express');
const router = express.Router();

router.get('/ppost',(req,res)=>{
	res.send("ppost");
});

module.exports = router;
