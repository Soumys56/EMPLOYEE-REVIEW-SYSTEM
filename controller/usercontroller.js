const User=require('../model/admin');
module.exports.signUp=function(req,res){
    return res.render('sign_up',{
        title:"signUp"
    })
}
module.exports.signIn=function(req,res){
    return res.render('sign_in',{
        title:"signIn"
    })
}
module.exports.Create=async function(req,res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        req.flash('success' , 'user create sucessfully');
        return res.redirect('/user/signin');
    }
    return res.redirect('back');
}
module.exports.createSession=async function(req,res){
    req.flash('success',"sign in  sucessfully")
    return res.redirect('/');
}

module.exports.addEmployee=async function(req,res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        req.flash("success","add employee sucessfully")
        return res.redirect('/');
    }
    return res.redirect('back');
}
module.exports.makeAdmin=async function(req,res){
    try {
        if (req.body.admin_password == 'key') {
            let user = await User.findById(req.user.id );
            user.isAdmin = true;
            user.save();
            req.flash("success","add admin sucessfully")
            return res.redirect('back');
        } else {
            req.flash("error","key is wrong")
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error', error);
        return;
    }
    
}