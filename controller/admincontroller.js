const Users=require('../model/admin');
const AssignReview=require('../model/AssignReview');
const myReview=require('../model/myReview')
module.exports.addEmployee = function(req, res){
    return res.render('addEmployee', {
        title : 'ERS | Add Employee'
    });
}

// This function will show the list of employee woking in the company.
module.exports.showEmployeeList = async function(req, res){
    if(!req.isAuthenticated()){
        req.flash('error' , 'You are not Authorized !');
        return res.redirect('/users/sign-in');
    }
    if(req.user.isAdmin == false){
        req.flash('error' , 'You are not Authorized');
        return res.redirect('/');
    }
    let employeList = await Users.find({});

    return res.render('employee', {
        title : "ERS | Employe-List",
        employes : employeList
    });
}

module.exports.deleteEmployee= async function(req,res){
    try{
        // Authentication and Authoriztion chekcing
        if(!req.isAuthenticated()){
            // flash Messages
            
            return res.redirect('user/signin');
        }

        if(!req.user.isAdmin){
            // flash Messages
            req.flash('error' , 'You are not admin !')
            return res.redirect('/');
        }
        // Deleting the user.
        let employee = await Users.deleteOne({_id : req.params.id});
        let assignReview=await  AssignReview.deleteMany({fromUser:req.params.id});
        let MyRiviewIDS = await myReview.find({fromUser:req.params.id})


        for(let review of MyRiviewIDS)
        {
            let userid= review.toUser
            await Users.findByIdAndUpdate(userid, { $pull: { myReviews: review.id } });
            await review.deleteOne();

        }
        // flash Messages
        // req.flash('success' , 'User Deleted!')
        return res.redirect('back');

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.adminWork=async function(req,res){
    let employee= await Users.find({});
    return res.render("work",{
        title:"Asign Task",
        employee:employee
    })
}
module.exports.setReview=async function(req,res){
    try{
        // first checking if the req is made correct or not.
        if(!req.isAuthenticated()){
            // flash messages
          
            // console.log("Please logIn");
            return res.redirect('/user/signin');
        }else{
            let employee = await Users.findById(req.user.id);
    
            if(employee.isAdmin == false){
                // flash Messages
               
                // console.log('User is not admin');
                return res.redirect('/user/signin');
            }
        
            else if(req.body.sender == req.body.reciver){
                // flash messages
                // console.log("sender === reciver")
               
                return res.redirect('back');
            }
            // After checking all the authentication , part the main part start from here.
            else{
                let sender = await Users.findById(req.body.sender);
                let reciver = await Users.findById(req.body.reciver);

                let review = await AssignReview.findOne({ fromUser: sender,toUser: reciver});
                if (review) {
                    
                    return res.redirect('back');
                }
                review=await AssignReview.create({
                    fromUser: sender,
                    toUser: reciver
                })

                let user = await Users.findById(req.body.sender);
                user.assignedReviews.push(review);
                user.save();
                return res.redirect('back');

               
             
               
            }
        }
    
        
    }catch(err){
        console.log("Errror in setting up the user " + err);
    }

}
module.exports.newAdmin=async function(req,res){
    try{
        if(!req.isAuthenticated()){
        
            // flash Messages
            req.flash('error',"user is not authenticated")
            return res.redirect('/user/signin');
        }
        // Checking for authorization
        if(req.user.isAdmin == false){
            // flash messages
             
            return res.redirect('/');
        }
        // Making the user admin.
        if(req.user.isAdmin){
            let user = await Users.findById(req.body.newuser);
            if(!user){
                // flash Messages
                 
                return res.redirect('back');
            }
         
            user.isAdmin = "true";
            user.save();
            return res.redirect('back');
        }

    }catch(err){
          console.log(err)
    }
}

module.exports.destroySession=async function(req,res){
    try{
        if(!req.isAuthenticated()){
        
            // flash Messages
              req.flash('error',"user is not authenticated")
            return res.redirect('/user/signin');
        }
        req.logout(function (error) {
            if (error) {
               console.log('Error while signing out');
               return res.redirect('back');
            }
             // flash Messages
             req.flash('success',"log out sucessfully")
      
            return res.redirect('/user/signin');
         });
      

    }
    catch{
     console.log(err)
    }

}