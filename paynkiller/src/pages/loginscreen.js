import React, {useState} from 'react'

import {Grid, Row, Col, Button, IconButton, Icon, Form, InputGroup, Input, Modal} from 'rsuite'

import swal from 'sweetalert';

import LoginImage from '../images/Resources/LoginImage.png'

import '../css/pages/login.css'

import {Link} from 'react-router-dom'

import {login,removeError,logout} from '../action'

import {useDispatch, useSelector} from 'react-redux'


export default function Loginscreen() {
    
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[textError,setTextError] = useState(false)

    const[showPass,setShowPass] = useState(false)

    const dispatch = useDispatch()

    const {usernameCust,loginError} = useSelector((state) => {
        return {
            usernameCust : state.userReducer.username,
            loginError: state.userReducer.errLogin
        }
      })

    const handleLogin = () => {
        
        if(username === "" || password === "") return swal("Oops!", "Inputan tidak boleh kosong", "error");

        const body = {
            username,
            password
        }

        dispatch(login(body))

        setUsername("")
        setPassword("")
    }

    const handleModalError = () => {
        setTextError(false)
        dispatch(removeError())
    }

   
    React.useEffect(() => {
        if(loginError){
            setTextError(true)
        }
    }, [usernameCust,loginError])
    
    return (

        <div id="containerLogin">
            <Grid fluid style={{padding: "0px"}}>
                <Row style={{margin: "0px"}}>
                    <Col md={8} style={{height: "100vh"}}>
                        <Row>
                            <Col md={24} style={{paddingTop: "20px", paddingLeft: "25px"}}>
                                <Link to='/'>
                                    <IconButton id="back-menu-button" icon={<Icon icon="angle-left" id="icon-menu-button"/>}>Back To Home</IconButton>                            
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} style={{padding: '50px 10px'}}>
                                <p style={{textAlign: 'center', fontSize: '40px', color: '#04BF8A', fontWeight: 'bold'}}>SIGN IN</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} style={{padding: '0px 80px'}}>
                                <Form>
                                    <InputGroup style={{height: '45px'}}>
                                        <InputGroup.Addon style={{width: '40px', backgroundColor: '#04BF8A', color: 'white'}}>
                                            <Icon icon="avatar"/>
                                        </InputGroup.Addon>
                                        <Input value={username} onChange={(value, event) => setUsername(value)} type="text" placeholder="Username" style={{color: '#04BF8A'}}/>
                                    </InputGroup>
                                    <InputGroup style={{height: '45px', margin: '45px 0px', }}>
                                        <InputGroup.Button style={{width: '40px', backgroundColor: '#04BF8A', color: 'white'}} onClick={() => setShowPass(!showPass)}>
                                            <Icon icon={showPass ? "unlock" : "unlock-alt"}/>
                                        </InputGroup.Button>
                                        <Input value={password} onChange={(value, event) => setPassword(value)} type={showPass ? "text" : "password"} placeholder="Password" style={{color: '#04BF8A'}}/>
                                    </InputGroup>
                                </Form>
                            </Col>
                            <Col md={24} style={{textAlign: 'center'}}>
                                <Button id="button-submit" onClick={() => handleLogin()}>Lets Go !</Button>                            
                            </Col>
                            <Row>
                                <Col md={24} style={{padding: '30px 90px', paddingBottom: '10px'}}>
                                    <p style={{textAlign: 'center', fontSize: '14px'}}>Dont have an account ? <span ><Link to='/register' id="linkRegister">Click Here</Link></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={24} style={{padding: '0px 90px'}}>
                                    <p style={{textAlign: 'center', fontSize: '14px'}}>Forgot your Password ? <span ><Link to='/forgotpass' id="linkRegister">Change Password</Link></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={24} style={{padding: '0px 90px', paddingTop: '20px'}}>
                                    <p style={{textAlign: 'center', fontSize: '14px'}}>Are You Admin ? <span ><Link to='/loginadmin' id="linkRegister">Click Here</Link></span></p>
                                </Col>
                            </Row>
                        </Row>
                        
                    </Col>
                    <Col md={16} style={{height: "100vh", padding: "0px"}}>
                        <img
                        alt=""
                        src={LoginImage}
                        width="100%"
                        height="100%"
                        />
                    </Col>
                </Row>
            </Grid>

            <Modal backdrop="static" show={textError === true} onHide={textError === false} size="xs">
                <Modal.Body>
                   <p>{loginError}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleModalError()} appearance="primary">
                    Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal backdrop="static" show={Boolean(usernameCust) === true} onHide={Boolean(usernameCust) === false} size="xs">
                <Modal.Body>
                   <p>Anda Berhasil Login</p>
                </Modal.Body>
                <Modal.Footer>
                    <Link to='/'>
                        <Button appearance="primary">
                        Ok
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
