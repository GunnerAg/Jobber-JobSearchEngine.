const express = require('express');
const employerModel = require('../models/employer.Model');
const employeeModel = require('../models/employee.Model');
const offerModel = require('../models/offer.Model');
const router  = express.Router();
const data = require('../bin/data');


router.get('/employerProfile', (req, res, next)=>{
  if (req.session.loggedInUser && req.session.loggedInUser.type === 'employer' ){
    next()
  }
  else {
    res.redirect('/loginEmployer')
  }
})

//-----------------------------EMPLOYEE LOGGED IN----------------------------------//
///-------GET------///
router.get('/employerProfile', (req, res) => {
  res.render('users/employerProfile.hbs', {loggedInUser: req.session.loggedInUser})
})







//-----------------------------EMPLOYEE EDIT PROFILE-------------------------------//
///-------GET------///
router.get('/employerProfile/edit', (req, res, next) => {
  employerModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/editEmployerProfile',{loggedInUser})
  })
  })

///-------POST------///
router.post('/employerProfile/edit', (req, res, next) =>{
  let {nameEmployer, location, info, emailEmployer, adress} = req.body
  console.log(req.session.loggedInUser)
  employerModel.findByIdAndUpdate(req.session.loggedInUser._id, {$set:{nameEmployer, location, info, emailEmployer, adress}})
    .then(()=>{
      employerModel.findById(req.session.loggedInUser._id)
        .then((loggedInUser) => {
          console.log(loggedInUser)
          req.session.loggedInUser=loggedInUser
          res.redirect('/employerProfile')
        })
    })
    .catch((err)=>{
        console.log('err', err)
    })
})






//--------------------------------SEARCH EMPLOYEES----------------------------//
//---------------------SEARCH FORM-----------------//

///-------GET------///
router.get('/employerProfile/recruit', (req, res, next) => {
  res.render('users/recruit', {data})
})


///-------GET DATA FROM LOGGED COMPANY------///
router.get('/employerProfile/search', (req, res, next) => {
  employerModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/recruit',{loggedInUser, data})
  })
})


///-----POST-----///
router.post('/employerProfile/recruit', (req, res, next) => {
  let {keywords} = req.body
  employeeModel.find({'keywords': { $in: keywords }})
  .then((employeeData)=>{
    offerModel.find({companyId: req.session.loggedInUser._id})
    .then((offerData)=>{
      const newEmployeeData = JSON.parse(JSON.stringify(employeeData))
      offerData.forEach(e => newEmployeeData.forEach(e2 => {
        console.log(e.employeeId, e2._id)
        console.log(e.employeeId === e2._id)
        if (e.employeeId.toString() === e2._id.toString()) {
          console.log("it's a match")
          e2.match = true
        }
      }))
      console.log(newEmployeeData)
      res.render('users/recruitResults', {employeeData: newEmployeeData})
    })
   
  })
})






//--------------------------------OFFER FORM----------------------------//
///-------GET------///
router.get('/employerProfile/offer', (req, res, next) => {
  res.render('users/offer/:id')
})


///-----------GET DATA FROM LOGGED COMPANY-------------///
router.get('/employerProfile/offer/:id', (req, res)=> {
  employeeModel.findById(req.params.id)
    .then((result) => {
      res.render('users/offer.hbs', {result})
    })
    .catch((err) => {
      console.log('TARUGO!', err)
    })
})


///------POST------///
router.post('/employerProfile/offer/:id', (req, res)=> {
  let data ={
    employeeId:req.params.id , 
    companyId:req.session.loggedInUser._id, 
    offerMessage:req.body.offerMessage,
    status:'PENDING'
   }
   offerModel.find({companyId: req.session.loggedInUser._id})
   .then((offerData)=>{
       offerModel.create(data)
       .then((result) => {
         res.redirect('/employerProfile/hiringPropositions')
       })
       .catch((err) => {
         console.log('TARUGO!', err)
       })
     // }
   })
})


///--------GET DATA FROM OFFER IN THE SENT PROPOSALS PAGE----------///
router.get('/employerProfile/hiringPropositions', (req, res, next) => {
  offerModel.find({companyId: req.session.loggedInUser._id})
  .populate('employeeId')
    .then((offerData) => {
      offerData = offerData.map((myObj) => {
        myObj.isAccepted = myObj.status == 'ACCEPTED'
        return myObj
      })
     
      res.render('users/hiringPropositions', {offerData});
    })
});
//------------------delete-----------//
router.post('/employerProfile/hiringPropositions/:id/delete',(req, res, next)=>{
  offerModel.findOne({_id:req.params.id})
    .populate('employeeId')
    .then((offerData)=>{
      console.log(offerData)
      if(offerData.status=='PENDING'|| offerData.status=='REJECTED' ){
        console.log('Inside delete if')
        offerModel.findByIdAndDelete(offerData._id)
          .then(()=>{
            res.redirect('/employerProfile/hiringPropositions')
          })
          .catch((err)=>{
            console.log('error',err)
          })
      }
    })
    .catch((err)=>{
      console.log('error',err)
    })
})



module.exports = router;