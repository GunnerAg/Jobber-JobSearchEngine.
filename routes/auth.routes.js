const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')
const employeeModel = require('../models/employee.Model');
const employerModel = require('../models/employer.Model');





//----------------------------------EMPLOYEE SIGN UP-----------------------------------//



router.post('/signupEmployee', (req, res) => {
  const {name, secondname, age, emailEmployee, password } = req.body


//checking for all the required inputs on the form.
  if(!name|| !secondname || !age || !emailEmployee || !password ){
      res.status(500).render('auth/signupEmployee.hbs', {errorMessage: 'Please fill the form'})
      return;
  }
  if(name == 'Manish' && secondname == 'Poduval'){
    res.status(500).render('auth/signupEmployee.hbs', {errorMessage: 'Enter your real age manish...'})
    return;
}
//email format validation.
  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(emailEmployee)){
    res.status(500).render('auth/signupEmployee.hbs', {errorMessage: 'Please enter valid email'})
    return;
    //change class from valid to invalid and so
  }
//password format validation (6chars,numbers and strings)
  const passReg = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
  if (!passReg.test(password)){
    res.status(500).render('auth/signupEmployee.hbs', {errorMessage: 'Password must be 6 characters and must have a number and a string'})
    return;
  }

  if (age<18){
    res.status(500).render('auth/signupEmployee.hbs', {errorMessage: 'You must be 18+ to sign up '})
    return;
  }



  //check if user exist with the same email
   employeeModel.findOne({emailEmployee})
   .then((employeeData) => { 
     if(employeeData){res.status(500).render('auth/loginEmployee', {errorMessage: 'You already have an account, please Log In'})}
     else{
     bcryptjs.genSalt(10)
     .then((salt) => {
         bcryptjs.hash(password , salt)
           .then((hashPass) => {
               // create that user in the db
               employeeModel.create({nameEmployee: name, secondnameEmployee: secondname, age, emailEmployee, passwordHashEmployee: hashPass }) // nameEmployee: name
                 .then(() => {
                     res.redirect('/')
                 })
           })
      })
    }
  })
})



//----------------------------------EMPLOYER SIGN UP-----------------------------------//


router.post('/signupEmployer', (req, res) => {
  const {name, emailEmployer, password } = req.body
  
//checking for all the required inputs on the form.
  if(!name|| !emailEmployer || !password ){
      res.status(500).render('auth/signupEmployer.hbs', {errorMessage: 'Please fill the form'})
      return;
  }
//email format validation.
  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(emailEmployer)){
    res.status(500).render('auth/signupEmployer.hbs', {errorMessage: 'Please enter valid email'})
    return;
    //change class from valid to invalid and so
  }
//password format validation (6chars,numbers and strings)
  const passReg = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
  if (!passReg.test(password)){
    res.status(500).render('auth/signupEmployer.hbs', {errorMessage: 'Password must be 6 characters and must have a number and a string'})
    return;
  }

  //check if user exist with the same email
  employerModel.findOne({emailEmployer})
  .then((employerData) => {  
    if(employerData !== null){res.status(500).render('auth/loginEmployer', {errorMessage: 'You already have an account, please Log In'})}
  })
  bcryptjs.genSalt(10)
    .then((salt) => {
        bcryptjs.hash(password , salt)
          .then((hashPass) => {
              // create that user in the db
              employerModel.create({nameEmployer:name, emailEmployer, passwordHashEmployer: hashPass })
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
    res.status(500).render('auth/loginEmployee.hbs', {errorMessage: 'Password must be 6 characters and must have a number and a string'})
    return;
  }
  
  employeeModel.findOne({emailEmployee})
      .then((employeeData) => {  
        if(employeeData == null){res.status(500).render('auth/signupEmployee', {errorMessage: 'The email does not exist, please Sign Up'})}       
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



//----------------------------------EMPLOYER LOG IN-----------------------------------//


router.post('/loginEmployer', (req, res) => {
  const { emailEmployer, password} = req.body
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
    res.status(500).render('auth/loginEmployer.hbs', {errorMessage: 'Password must be 6 characters and must have a number and a string'})
    return;
  }
  
  employerModel.findOne({emailEmployer})
      .then((employerData) => {    
          if(employerData==null){res.status(500).render('auth/signupEmployer', {errorMessage: 'The email does not exist, please Sign Up'})}
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



//--------------------LOGOUT SESSION----------------------------//

router.get("/logout", (req, res, next)=>{
  req.session.destroy((err) =>{
    res.redirect("/")
  })
})


module.exports = router;
