const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    transactions:{
        type:Array,
        // required: true,
    },
    email:{
        type:String,
        // required: true,
    },
    notifications:{
        type:Array,
        // required: true,
    },
    balance:{
        type: String,
        // required: true,
    },

    text:{
        type: String,
        // required: true,
    },
    plan:{
        type:String,
        // required: true,
    },
    refs:{
        type: Number,
        // required: true,
    },
    totalFunding:{
        type:Number,
        // required: true,
    },
    totalSpent:{
        type:Number,
        // required: true,
    },
    refBonus:{
        type:Number,
        // required: true,
    },
}
,
{
    timestamps: true
})

module.exports = mongoose.model('Post', Post)