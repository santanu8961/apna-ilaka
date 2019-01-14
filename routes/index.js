var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home_page', { title: 'Express' });
});

// sign up
router.get('/signup', function(req, res) {
  res.render('sign_up');
});

router.post('/signup_service',(req,res)=>{
  console.log(req.body)
})



module.exports = router;
