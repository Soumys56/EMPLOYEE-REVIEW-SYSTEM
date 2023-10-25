const mongoose=require('mongoose');
const AssignReviewSchema=new mongoose.Schema({
    fromUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    toUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
const AssignReview= mongoose.model('AssignReview' , AssignReviewSchema);
module.exports = AssignReview;
