const express = require('express'); // requiring expresss
const router = express.Router(); // router
const passport=require('passport')
const homeController=require('../controller/homecontroler');
router.get('/', passport.checkAuthentication, homeController.home);
router.post('/completeReview',passport.checkAuthentication,homeController.completeReview);
// all the request with the suffix /admin , will require the admin file to compute
router.use('/admin' , require('./admin'));
router.use('/user',require('./user'))


module.exports = router;