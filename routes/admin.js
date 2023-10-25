const express=require('express');
const router=express.Router();
const passport=require('passport')
const admincontroller=require('../controller/admincontroller')
 router.get('/addEmployee',admincontroller.addEmployee);
 // THis is help to view the employee
router.get('/view-employee' , passport.checkAuthentication , admincontroller.showEmployeeList);
// It will delete the employee
router.get('/deleteEmployee/:id', passport.checkAuthentication ,  admincontroller.deleteEmployee);
router.get('/adminWork',passport.checkAuthentication,admincontroller.adminWork);
router.post('/newAdmin', passport.checkAuthentication,admincontroller.newAdmin)
router.post('/setReviewes',passport.checkAuthentication,admincontroller.setReview);
router.get('/destroysession',passport.checkAuthentication,admincontroller.destroySession);
module.exports=router;