
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form  from 'react-bootstrap/Form'
import { useContext,useState,useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
    // context
    const {postState:{post},
        showUpdatePost,
        setShowUpdatePost,
        updatePost,
        setShowToast} = useContext(PostContext)

    // state
    const [updatedPost,setUpdatedPost] = useState(post)

    const {title, description, url,status} = updatedPost

    useEffect(() => setUpdatedPost(post),[post] )

    const onChangeNewPostForm = event => setUpdatedPost({...updatedPost,[event.target.name]: event.target.value })

    const updateForm = async event => {
        event.preventDefault()
        const {success, message} = await updatePost(updatedPost)
        setShowUpdatePost(false)
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
        
        // setNewPost({title:"",description:"",url:"",status:"To Learn"})
        // setShowAddPost(false)

    }

    // close Dialog
    const closeDialog = () => {
        setUpdatedPost(post)
        setShowUpdatePost(false)

    }


    return (    
        <Modal show={showUpdatePost}  onHide={closeDialog}  >
            <Modal.Header closeButton >
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={updateForm} >
                <Modal.Body>
                    <Form.Group className="gr-top" >
                        <Form.Control type="text" placeholder="title" name="title" required  value={title} onChange={onChangeNewPostForm} />
                    </Form.Group>
                    <Form.Group className="gr-top" >
                        <Form.Control as="textarea" rows={3}  placeholder="description" name="description" required value={description} onChange={onChangeNewPostForm} />
                    </Form.Group>
                    <Form.Group className="gr-top" >
                        <Form.Control type="text"   placeholder="Tutorial URL" name="url" required value={url} onChange={onChangeNewPostForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={status} name="status" onChange={onChangeNewPostForm} >
                            <option value="To Learn" >To Learn</option>
                            <option value="Learning" >Learning</option>
                            <option value="Learned" >Learned</option>

                        </Form.Control>
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

export default UpdatePostModal
