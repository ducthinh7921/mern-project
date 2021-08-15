import React,{Fragment}  from 'react'
import Button  from 'react-bootstrap/Button'
import Form from  'react-bootstrap/Form'
import { Link } from 'react-router-dom' 
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMes from '../layout/AlertMes'

const RegisterForm = () => {

     // context
     const {registerUser} = useContext(AuthContext)

     // local state
     const [registerForm, setRegisterForm] = useState({
         username:"",
         password:"",   
         confirmpassword:""
     })

     const [alert, setAlert] = useState(null)
 
     const {username, password,confirmpassword} = registerForm
 
     const onchangeRegisterForm = event => 
     setRegisterForm({...registerForm,[event.target.name]: event.target.value})  
 
     const register = async event => {
         event.preventDefault()

         if (password !== confirmpassword) {
            setAlert({type:'danger', message: "Password do not match" })
            setTimeout(() => setAlert(null),4000)
            return
         }


         try{
             const registerData = await registerUser(registerForm)
             if(!registerData.success){
                setAlert({type:'danger', message: registerData.message})
                setTimeout(() => setAlert(null),4000)
             } 
         }catch(error) {
             console.log(error)
         }
     }


    return (    
        <Fragment>
            <AlertMes info={alert} />

            <Form onSubmit={register} >
                <Form.Group className="gr-top" >
                    <Form.Control type="text" placeholder="Username" name="username" required  
                    value={username} onChange={onchangeRegisterForm} />
                </Form.Group>
                <Form.Group className="gr-top">
                    <Form.Control type="password" placeholder="Password" name="password" required 
                    value={password} onChange={onchangeRegisterForm}/>
                </Form.Group>
                <Form.Group className="gr-top">
                    <Form.Control type="password" placeholder="Comfirm Password" name="confirmpassword" required
                    value={confirmpassword} onChange={onchangeRegisterForm} />
                </Form.Group>
                <Button variant="success" type="submit" >Register</Button>
            </Form>
            <p>Already have an account? 
                <Link to="/login" >
                    <Button variant="info" size="sm" className="ml-2" > Login</Button>
                </Link>
            </p>
        </Fragment>
    )
}

export default RegisterForm
