const express = require('express');

const router = express.Router();

router.get('/', (req, res, next)=>{
    console.log("GET /auth");
    res.json({message:"Hello World"});
})

module.exports = router;