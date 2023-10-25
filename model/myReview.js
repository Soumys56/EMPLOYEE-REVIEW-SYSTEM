const mongoose=require('mongoose');
const myReviewSchema=new mongoose.Schema({
    message:{
        type:String
    },
    fromUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    toUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})
const myReview= mongoose.model('myReview' , myReviewSchema);
module.exports = myReview;
