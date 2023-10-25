const express=require('express');
const router=express.Router();
const passport=require('passport')
const userController=require('../controller/usercontroller');

router.get('/signup',userController.signUp);
router.get('/signin',userController.signIn);
router.post('/create',userController.Create);
// It will create new seeion for the particular user, and also it chaeck the authorization
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
), userController.createSession);

router.post('/addEmployee',passport.checkAuthentication ,userController.addEmployee);

router.post('/makeAdmin',passport.checkAuthentication , userController.makeAdmin);


module.exports=router;