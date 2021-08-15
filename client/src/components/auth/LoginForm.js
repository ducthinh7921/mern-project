import React,{Fragment, useState, useContext}  from 'react'
import Button  from 'react-bootstrap/Button'
import Form from  'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMes from '../layout/AlertMes'

const LoginForm = () => {

    // context
    const {loginUser} = useContext(AuthContext)

    // local state
    const [loginForm, setLoginForm] = useState({
        username:"",
        password:""
    })
    const [alert, setAlert] = useState(null)

    const {username, password} = loginForm

    const onchangeLoginForm = event => setLoginForm({
        ...loginForm,[event.target.name]: event.target.value
    })

  
    const login = async event => {
        event.preventDefault()
        try{
            const loginData = await loginUser(loginForm)
            if(!loginData.success){
                setAlert({type:'danger', message: loginData.message })
                setTimeout(() => setAlert(null),4000)
            }
        }catch(error) {
            console.log(error)
        }
    }
  

    return (
        <Fragment>
            <AlertMes info={alert} />
            <Form onSubmit={login} >
                <Form.Group className="gr-top" >
                    <Form.Control type="text" placeholder="Username" name="username" required value={username} onChange={onchangeLoginForm}/>
                </Form.Group>
                <Form.Group className="gr-top">
                    <Form.Control type="password" placeholder="Password" name="password" required value={password} onChange={onchangeLoginForm}/>
                </Form.Group>
                <Button variant="success" type="submit" >Login</Button>
            </Form>
            <p>don't have an account? 
                <Link to="/register" >
                    <Button variant="info" size="sm" className="ml-2" > Register</Button>
                </Link>
            </p>
        </Fragment>
    )
}

export default LoginForm
