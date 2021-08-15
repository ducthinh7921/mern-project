import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form  from 'react-bootstrap/Form'
import { useContext,useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
    // context
    const {showAddPost,setShowAddPost,addPost,setShowToast} = useContext(PostContext)

    // state
    const [newPost,setNewPost] = useState({
        title:"",
        description:"",
        url:"",
        status:"To Learn"
    })

    const {title, description, url} = newPost

    const onChangeNewPostForm = event => setNewPost({...newPost,[event.target.name]: event.target.value })

    const addForm = async event => {
        event.preventDefault()
        const {success, message} = await addPost(newPost)
        setNewPost({title:"",description:"",url:"",status:"To Learn"})
        setShowAddPost(false)
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })

    }

    // close Dialog
    const closeDialog = () => {
        setNewPost({title:"",description:"",url:"",status:"To Learn"})
        setShowAddPost(false)
    }



    return (    
        <Modal show={showAddPost}  onHide={closeDialog}  >
            <Modal.Header closeButton >
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={addForm} >
                <Modal.Body>
                    <Form.Group className="gr-top" >
                        <Form.Control type="text" placeholder="title" name="title" required  value={title} onChange={onChangeNewPostForm} />
                    </Form.Group>
                    <Form.Group className="gr-top" >
                        <Form.Control as="textarea" rows={3}  placeholder="description" name="description" required value={description} onChange={onChangeNewPostForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text"   placeholder="Tutorial URL" name="url" required value={url} onChange={onChangeNewPostForm} />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}  >Cancel</Button>
                    <Button variant="primary"  type="submit" >learnIt</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal
