const express = require('express');
const router  = express.Router();

//-------------------ALL PUBLIC ROUTES GO HERE!----------------------//
router.get('/', (req, res, next) => {
  let user = req.session.loggedInUser
  console.log(user ? user.type: '')
  if (user && user.type=='employee'){
    res.render('index', {isEmployee: true });
  }
  else if(user && user.type=='employer'){
    res.render('index', {isEmployer: true });
  }
  else {
    res.render('index');
  }
  
});
router.get('/about', (req, res, next) => {
  res.render('about');
});
router.get('/contact', (req, res, next) => {
  res.render('contact');
});
router.get('/termsAndConditions', (req, res, next) => {
  res.render('termsAndConditions');
});
router.get('/loginEmployee', (req, res, next) => {
  res.render('auth/loginEmployee');
});

router.get('/loginEmployer', (req, res, next) => {
  res.render('auth/loginEmployer');
});
//----------------------------------------//
router.get('/singupEmployee', (req, res, next) => {
  res.render('auth/singupEmployee');
});

router.get('/singupEmployer', (req, res, next) => {
  res.render('auth/singupEmployer');
});
module.exports = router;
