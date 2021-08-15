import React,{ useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import { Toast } from 'react-bootstrap'
import UpdatePostModal from '../components/posts/UpdatePostModal'


const Dashboard = () => {
   
    // Contexts
	const {authState: {user: { username }}} = useContext(AuthContext)
    const {postState: {post, posts, postsLoading },
	getPosts,
	setShowAddPost,
	showToast:{show,message,type},
	setShowToast
} = useContext(PostContext)

    
    
    // get post
    useEffect(() => getPosts(), [])

    let body = null

    if (postsLoading) {
        body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
    }else if (posts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to LearnIt</Card.Title>
						<Card.Text>
							Click the button below to track your first skill to learn
						</Card.Text>
						<Button variant='primary' onClick={setShowAddPost.bind(this, true)}>
							LearnIt!
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	}
    else {
        body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 edit-row'>
					{posts.map(post => (
						<Col key={post._id} className='my-2'>
							<SinglePost post={post} />
						</Col>
					))}
				</Row>
				
				{/* Modal */}
				<Button className="btn-floating" onClick={setShowAddPost.bind(this, true)} >
						<img src={addIcon} alt="add" width="60" height="60"/>
				</Button>


			</>
		)
    }

    return <>
	{body}
	<AddPostModal />
	{ post !== null && <UpdatePostModal />}
	<Toast show={show} style={{position: "fixed", top:"20%", right:"5%"}} 
	className={`bg-${type} text-white`} 
	onClose={setShowToast.bind(this, {show:false, message:"", type:null})}
	delay={3000} autohide
	 >
		
		<Toast.Body>
			<strong>{message}</strong>
		</Toast.Body>
	</Toast>

	</>
}

export default Dashboard
