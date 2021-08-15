const express = require('express')
const router = express.Router()

const Post = require('../models/post')
const verifyToken = require('../middleware/AuthMiddleware')
// const { findOneAndUpdate } = require('../models/post')

// [GET] api/post/
router.get('/', verifyToken, async (req, res) =>{
    try {
        const posts = await Post.find({user: req.userId}).populate('user',['username'])
        res.json({success: true, posts})
    }catch (error) {
        console.log('error')
        res.status(500).json({success: false, message:'Server error'})

    }
})

// [POST] api/post/
router.post('/',verifyToken ,async(req , res) => {
    const{title, description, url, status} =req.body
    if(!title) 
        return res.status(400).json({success: false, message:'Missing title'})
    try {
        const newPost = new Post({
            title, 
            description, 
            url: url.startsWith('https://') ? url : `https://${url}`, 
            status: status || 'To Learn',
            user: req.userId
        })
        await newPost.save()
        return res.json({success: true, message:'create successfully', post: newPost})

    }catch(error) {
        console.log('error')
        return res.status(500).json({success: false, message:'Server Error'})
        
    }
})

// [PUT] api/post/{id}
router.put('/:id',verifyToken, async(req , res) =>{
    const{title, description, url, status} =req.body

    if(!title) 
        return res.status(400).json({success: false, message:'Missing title'})
    try {
        let updatePost = {
            title, 
            description: description || '', 
            url: (url.startsWith('https://') ? url : `https://${url}`) || "", 
            status: status || 'To Learn',
        }
        const condition = { _id: req.params.id, user: req.userId } 

        updatePost = await Post.findOneAndUpdate(condition, updatePost, {new: true})
        if(!updatePost)
            return res.status(400).json({success: false, message:'post not found'})
        res.json({success: true, message:"update successfully!", post: updatePost})
    }catch(error) {
        console.log('error')
        return res.status(500).json({success: false, message:'Server Error'})
        
    }

})

// [DELETE] api/post/{id}
router.delete('/:id', verifyToken, async(req , res) =>{
    try {
        const condition = { _id: req.params.id, user: req.userId } 
        const deletePost = await Post.deleteOne(condition)
        if(!deletePost)
            return res.status(400).json({success: false, message:'post not found'})
        res.json({success: true, message:"delete successfully!"})
        
    }   
    catch(error) {
        console.log('error')
        return res.status(500).json({success: false, message:'Server Error'})
        
    }

})


module.exports = router