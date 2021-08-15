import React, {createContext, useReducer, useState } from 'react'
import { PostReducer } from '../reducers/PostReducer'
import { apiUrl,POSTS_LOADED_FAIL,POSTS_LOADED_SUCCESS,ADD_POST,DELETE_POST,UPDATE_POST,FIND_POST } from './const'
import axios from 'axios'



export const PostContext = createContext()
const PostContextProvider = ({ children }) => {
	// reducer
	const [postState, dispatch] = useReducer(PostReducer, {
		post: null,
		posts: [],
		postsLoading: true
	})

	// state
	const [showAddPost, setShowAddPost] = useState(false)
	const [showUpdatePost, setShowUpdatePost] = useState(false)

	const [showToast, setShowToast] = useState({
		show:false,
		message:"",
		type:null
	})


	// Get all posts
	const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			if (response.data.success) {
				dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: POSTS_LOADED_FAIL })
		}
	}

	// Add post
	const addPost = async newPost => {
		try {
			const res = await axios.post(`${apiUrl}/posts`,newPost)
			if(res.data.success) {
				dispatch({type: ADD_POST,payload: res.data.post })
				return res.data
			}
		}catch(error) {
			return error.res.data  ? error.res.data : {success:false, message:"Server error"}
		}
	}

	// Delete post
	const deletePost = async postId => {
		try {
			const response = await axios.delete(`${apiUrl}/posts/${postId}`)
			if (response.data.success)
				dispatch({ type: DELETE_POST, payload: postId })
		} catch (error) {
			console.log(error)
		}
	}

	// Update Post
	const updatePost = async updatedPost => {
		try {
			const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`,updatedPost)
			if(response.data.success) {
				dispatch({type:UPDATE_POST, payload: response.data.post})
				return response.data
			}

		}catch (error) {
			return error.res.data  ? error.res.data : {success:false, message:"Server error"}
		}
	}

	// Find post update	
	const findPost = postId => {
		const post =postState.posts.find(post => post._id === postId)
		dispatch({type:FIND_POST,payload:post})
	}

	// Post context data
	const postContextData = {postState,
		getPosts,
		showAddPost,
		setShowAddPost,
		addPost,
		showToast,
		setShowToast,
		deletePost,
		updatePost,
		findPost,
		showUpdatePost,
		setShowUpdatePost
	}

	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider
