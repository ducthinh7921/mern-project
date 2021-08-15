import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ActionButtons from './ActionButtons'



const SinglePost = ({ post: { _id, status, title, description, url } }) => (
	<Card className='shadow' border={status === 'Learned'? 'success'
				: status === 'Learning'? 'warning'
				: 'danger'}>
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
                        <p className='post-title'>{title}</p>
                        <h1 pill="true" className="status" >{status}</h1>
					</Col>
					<Col className='text-right'>
                        <ActionButtons url={url} _id={_id} />
					</Col>
				</Row>
			</Card.Title>
			<Card.Text>{description}</Card.Text>
		</Card.Body>
	</Card>
)

export default SinglePost