const User = require('../model/admin');
const AssignedReview = require('../model/AssignReview');
const MyReview = require('../model/myReview')
const reviewMailer=require('../mailers/review_mailer');

module.exports.home= async function(req,res)
{

    try {

        let user =await User.findById(req.user.id).populate({
            path: 'assignedReviews',
            populate:
                {
                    path: 'toUser'
                }}).populate({
                    path: 'myReviews',
                    populate:
                        {
                            path: 'fromUser'
                        }})

                        console.log(user)


        res.render('./home',{
            title:"ERS/home",
            user:user
        }
        )
        
    } catch (error) {
        console.log('Error', error);
    }
}

module.exports.completeReview= async function(req,res)
{
    try {

        let review = await AssignedReview.findOne({ fromUser: req.user,toUser: req.body.toUser}).populate('toUser');
        
        await User.findByIdAndUpdate(req.user, { $pull: { assignedReviews: review.id } });

        await AssignedReview.findByIdAndDelete(review.id);


        review=await MyReview.create({
            fromUser: req.user,
            toUser: req.body.toUser,
            message:req.body.message
        })
        
        let user = await User.findById(req.body.toUser);
        
        user.myReviews.push(review);
        user.save();
    
        reviewMailer.newComment( req.user,req.body.toUser)

             
            return res.redirect('back');

        
    } catch (error) {
        console.log('Error', error);
    }
}

