const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/AuthMiddleware')

const User = require('../models/user')


// [GET] api/auth  // Check user login 
router.get('/',verifyToken, async (req ,res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if(!user)
            return res.status(400).json({success:false, message:'User not found '})
        res.json({success:true, user})
    }catch(error) {
        console.log('error')
        res.status(500).json({success: false, message:'Server error'})
    }
})

// [POST] api/auth/register
router.post('/register', async(req , res) => {
    const {username, password }= req.body

    if(!username || !password) {
        return res.status(400).json({success: false, message:'Missing username or password'}
    )}
    try {
        const user = await User.findOne({username})

        if(user) 
            res.status(400).json({success: false, message: 'Username already'})
        
        const hashPassword = await argon2.hash(password)
        const newUser = new User({username, password:hashPassword})
        await newUser.save()

        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({success: true, message: 'Register Successfully',accessToken})

    }catch(error) {
        console.log('error')
        res.status(500).json({success: false, message:'Server Error'})
    }
})
// [POST] api/auth/login
router.post('/login', async(req, res) => {
    const { username, password} = req.body
    if(!username || !password) 
        res.status(400).json({success: false, message:'Missing username or password'})
    try {
        const user = await User.findOne({username})
        if(!user)
           return res.status(400).json({success:false,message:'Incorrect username or password' })
        
        const passwordValidate = await argon2.verify(user.password, password)

        if(!passwordValidate )
             return  res.status(400).json({success:false,message:'Incorrect username or password' })

        
            
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).json({success: true, message: 'Login Successfully',accessToken})
        

    }catch(error) {
        console.log('error')
        res.status(500).json({success: false, message:'Server error'})
    }

})

module.exports = router


