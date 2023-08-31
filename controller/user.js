const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

// const asyncHandler = require('ex')
const User = require('../models/userModel')


// @desc Register user
// @route POST/data/auth/signup
// @access PUBLIC
const registerUser = async (req,res) =>{
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        res.status(400).json({error:`please fill all fields `})
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400).json({error:'user already exists'})
    }

    const salt = await bcrypt.genSalt(10)

    //hashed password
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400).json({error:'invalid user data'})
    }
}

// @desc Login user
// @route POST/data/auth/login
// @access PUBLIC
const loginUser = async (req,res) =>{
    const {email, password} = req.body

    //Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({error:'Invalid credentials'})
    }
}

// @desc Get user data
// @route POST/data/me
// @access PUBLIC
const getMe = async (req,res) =>{
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email 
    })
}

// Generate token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn:'30d'})
}

module.exports = {loginUser, registerUser,getMe}