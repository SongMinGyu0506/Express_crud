const express = require("express");
const router = express.Router();

router.get('/uuser',(req,res)=>{
	res.send("uuser");
});

module.exports = router;
