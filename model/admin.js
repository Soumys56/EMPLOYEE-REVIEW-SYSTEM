const mongoose = require('mongoose');

// It is the schema for the User, and it contains the all the basic imformation of the user
// It also contains, two array, one will tell the person to which I have to review, and the second 
// one will contain the list of review, which the person had recived.

const UserSchema = new mongoose.Schema({
    name :{
        type : 'String',
        required: true
    },
    email : {
        type : 'String',
        required : true,
        unique : true
    },
    password : {
        type : 'String',
        required : true
    },
    isAdmin : {
        type : 'Boolean',
        required : true
    },
    assignedReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AssignReview'
        
    }],
    myReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'myReview'
    }]
}, 
{
    timestamps : true
}
);

const User = mongoose.model('User' , UserSchema);
module.exports = User;