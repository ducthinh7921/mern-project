import React, { useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import logo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'



const Menu = () => {
    const {authState:{user:{username}}} = useContext(AuthContext)
    const {logoutUser} = useContext(AuthContext)

  

    const logout = () => logoutUser()

    return (
        <Navbar expand="lg" bg="primary"  variant="dark" className="shadow" >
            <Navbar.Brand className="font-weight-bolder text-white menu-left"> 
                <img src={logo} alt="learn" width="32" height="32"  className="mr-2" />
                LearnIt
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="nav-menu">
                <Nav className="mr-auto ">
                    <Nav.Link   className="font-weight-bolder text-white" to="/dashboard" as={Link} >
                        DashBoard
                    </Nav.Link>
                    <Nav.Link   className="font-weight-bolder text-white" to="/about" as={Link} >
                        About
                    </Nav.Link>
                </Nav>
                <Nav className="menu-right">
                    <Nav.Link className="font-weight-bolder text-white" disabled >
                        Wellcome {username}
                    </Nav.Link>
                    <Button variant="secondary" className="font-weight-bolder text-white" onClick={logout} >
                        <img src={logoutIcon} alt="logout" width="32" height="32" className="mr-2" />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu
