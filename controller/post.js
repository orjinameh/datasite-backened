const mongoose = require('mongoose')
const Goal = require('../models/post')


// @desc POST user text
// @route POST/data/me/post
// @access PRIVATE
const Post = async (req,res) =>{
    // if (!req.body.text){
    //     res.status(401)
    //     throw Error('Please input a text field')
    // }

    const goal = await Goal.create({
        user:req.user.id,
        transactions: req.body.transactions,
        notifications: req.body.notifications,
        balance: req.body.balance,
        plan: req.body.plan,
        refs: req.body.refs,
        totalFunding: req.body.totalFunding,
        totalSpent: req.body.totalSpent,
        refBonus: req.body.refBonus,
    })

    res.status(200).json(goal)
}


// @desc GET user text
// @route POST/data/me/post
// @access PRIVATE
const Get = async (req,res)=>{

    const goal = await Goal.find({user: req.user.id})

    res.status(200).json(goal)
}


// @desc UPDATE user data
// @route POST/data/me/post
// @access PRIVATE
const Patch = async (req,res)=>{
    const update = {...req.body}
    const goal = await Goal.findOneAndUpdate({user: req.user.id}, update)

    res.status(200).json(goal)
}

module.exports = {Post, Get, Patch}