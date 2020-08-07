const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')
const employeeModel = require('../models/employee.Model');
const employerModel = require('../models/employer.Model');


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

//------------------------------???????????????????????----------------------------//

// router.get('/employeeProfile', (req, res, next) => {
//   res.render('users/employeeProfile');
// });

// router.get('/employerProfile', (req, res, next) => {
//   res.render('users/employerProfile');
// });

//----------------------------------EMPLOYEE SIGN UP-----------------------------------//



router.post('/singupEmployee', (req, res) => {
  const {name, secondname, age, email, password } = req.body
  console.log(req.body)
//checking for all the required inputs on the form.
  if(!name|| !secondname || !age || !email || !password ){
      res.status(500).render('auth/singupEmployee.hbs', {errorMessage: 'Please fill the form'})
      return;
  }
//email format validation.
  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(email)){
    res.status(500).render('auth/singupEmployee.hbs', {errorMessage: 'Please enter valid email'})
    return;
    //change class from valid to invalid and so
  }
//password format validation (6chars,numbers and strings)
  const passReg = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
  if (!passReg.test(password)){
    res.status(500).render('auth/singupEmployee.hbs', {errorMessage: 'Password must be 6 characters and must have a number and a string'})
    return;
  }

  if (age<18){
    res.status(500).render('auth/singupEmployee.hbs', {errorMessage: 'You must be 18+ to sign up '})
    return;
  }

  bcryptjs.genSalt(10)
    .then((salt) => {
        bcryptjs.hash(password , salt)
          .then((hashPass) => {
              console.log(hashPass)
              // create that user in the db
              employeeModel.create({nameEmployee: name, secondnameEmployee: secondname, age, emailEmployee: email, passwordHashEmployee: hashPass }) // nameEmployee: name
                .then(() => {
                    res.redirect('/')
                })
          })
    })
})



//----------------------------------EMPLOYER SIGN UP-----------------------------------//


router.post('/singupEmployer', (req, res) => {
  const {name, email, password } = req.body
  console.log(req.body)
//checking for all the required inputs on the form.
  if(!name|| !email || !password ){
      res.status(500).render('auth/singupEmployer.hbs', {errorMessage: 'Please fill the form'})
      return;
  }
//email format validation.
  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(email)){
    res.status(500).render('auth/singupEmployer.hbs', {errorMessage: 'Please enter valid email'})
    return;
    //change class from valid to invalid and so
  }
//password format validation (6chars,numbers and strings)
  const passReg = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
  if (!passReg.test(password)){
    res.status(500).render('auth/singupEmployer.hbs', {errorMessage: 'Password must be 6 characters and must have a number and a string'})
    return;
  }

  bcryptjs.genSalt(10)
    .then((salt) => {
        bcryptjs.hash(password , salt)
          .then((hashPass) => {
              console.log(hashPass)
              // create that user in the db
              employerModel.create({nameEmployer:name, emailEmployer:email, passwordHashEmployer: hashPass })
                .then(() => {
                    res.redirect('/')
                })
                .catch((err)=>{
                  console.log('error is', err)
                })
          })
    })
})



//----------------------------------EMPLOYEE LOG IN-----------------------------------//


router.post('/loginEmployee', (req, res) => {
  const { emailEmployee, password} = req.body
console.log(req.body)
  if( !emailEmployee || !password){
      res.status(500).render('auth/loginEmployee', {errorMessage: 'Please enter all details'})
      return;
  }

  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(emailEmployee)){
    res.status(500).render('auth/loginEmployee', {errorMessage: 'Please enter valid email'})
    return;
  }

  const passReg = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
  if (!passReg.test(password)){
    res.status(500).render('auth/loginEmployee.hbs', {errorMessage: 'Password must be 6 characters and must have a nu ber and a string'})
    return;
  }
  
  employeeModel.findOne({emailEmployee})
  
      .then((employeeData) => {          
          let doesItMatch = bcryptjs.compareSync(password, employeeData.passwordHashEmployee); 
          if (doesItMatch){
              req.session.loggedInUser = employeeData 
              res.redirect('/employeeProfile')
          }
          else {
            res.status(500).render('auth/loginEmployee', {errorMessage: 'Passwords do not match'})
          }
      })
      .catch((err) => {
          console.log('Error', err)
      })
})


//----------------------------------------//
router.get('/employeeProfile', (req, res) => {
  res.render('users/employeeProfile.hbs', {loggedInUser: req.session.loggedInUser})
})
//----------------------------------EMPLOYER LOG IN-----------------------------------//


router.post('/loginEmployer', (req, res) => {
  const { emailEmployer, password} = req.body
console.log(req.body)
  if( !emailEmployer || !password){
      res.status(500).render('auth/loginEmployer', {errorMessage: 'Please enter all details'})
      return;
  }

  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(emailEmployer)){
    res.status(500).render('auth/loginEmployer', {errorMessage: 'Please enter valid email'})
    return;
  }

  const passReg = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
  if (!passReg.test(password)){
    res.status(500).render('auth/loginEmployer.hbs', {errorMessage: 'Password must be 6 characters and must have a nu ber and a string'})
    return;
  }
  
  employerModel.findOne({emailEmployer})
      .then((employerData) => {          
          let doesItMatch = bcryptjs.compareSync(password, employerData.passwordHashEmployer); 
          if (doesItMatch){
              req.session.loggedInUser = employerData 
              res.redirect('/employerProfile')
          }
          else {
            res.status(500).render('auth/loginEmployer', {errorMessage: 'Passwords do not match'})
          }
      })
      .catch((err) => {
          console.log('Error', err)
      })
})

//--------------------------------------------------------//
router.get('/employerProfile', (req, res) => {
  res.render('users/employerProfile.hbs', {loggedInUser: req.session.loggedInUser})
})


module.exports = router;
