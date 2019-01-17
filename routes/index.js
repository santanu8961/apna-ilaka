var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user');
var bcrtypt = require('bcrypt');

var isLoggedIn = (req,res,next)=>{
  if(req.session.isLoggedin){
    next();
  }else{
    res.redirect('/login');
  }
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home_page', { title: 'Express' });
 
});

// sign up
router.get('/signup', function(req, res) {
  res.render('sign_up');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login_service', function(req, res) {
  user.find({email:req.body.email},(err,doc)=>{
    console.log(doc)
    if(doc.length == 0){
      console.log(`0`);
      res.send({passed:0});
    }else{
      console.log(`password : `,doc[0].password);
      if(bcrtypt.compareSync(req.body.password,doc[0].password)){
        req.session.isLoggedin = true;
        req.session.email = doc[0].email
        res.send({passed:1});
      }else{
        res.send({passed:0});
      }
    }
  })
 console.log(req.body)
});

router.post('/signup_service',(req,res)=>{
  console.log(req.body)
  user.find({email:req.body.email},(err,response)=>{
    console.log(response)
    if(err){res.send({success:0,info:"Something Went Wrong ,Please try again"})};
    if(response.length > 0){ res.send({success:0,info:"Email Id Exists!"}) }
   if(response.length == 0){ 
    bcrtypt.hash(req.body.password,10,(err,hash)=>{
     req.body.password = hash
    user.insertMany([req.body],(err,doc)=>{
      if(err){
        res.send({success:0,info:"Something Went Wrong ,Please try again"});
      }else{
        console.log(doc);
        res.send({success:1,info:"Successfully Signed Up!"})
      }
    });
    // console.log(hash)
    });
    
  };
  });
});

router.get('/timeline',isLoggedIn,(req,res)=>{
  console.log(req.session);
  user.find({email:req.session.email},(err,doc)=>{
    if(doc.length == 0){
      res.render('timeline',{user:{}});    
    }
    else{
      res.render('timeline',{user:doc[0]});
    }
  })
  
})



module.exports = router;
