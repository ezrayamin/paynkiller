import React, {useState} from 'react'

import {Grid, Row, Col, Button, IconButton, Icon, Form, InputGroup, Input, Modal} from 'rsuite'

import swal from 'sweetalert';

import LoginImage from '../images/Resources/LoginImage.png'

import '../css/pages/login.css'

import {Link, Redirect} from 'react-router-dom'

import {loginAdmin,removeError} from '../action/adminAction'

import {useDispatch, useSelector} from 'react-redux'


export default function Loginscreen() {
    
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[textError,setTextError] = useState(false)
    const [redirectTo, setRedirectTo] = useState(false)

    const[showPass,setShowPass] = useState(false)

    const dispatch = useDispatch()

    const {usernameAdmin,loginError} = useSelector((state) => {
        return {
            usernameAdmin : state.adminReducer.usernameAdmin,
            loginError: state.adminReducer.errLogin
        }
      })

    const handleLogin = async() => {
        
        if(username === "" || password === "") return swal("Oops!", "Inputan tidak boleh kosong", "error");

        const body = {
            username,
            password
        }

        await dispatch(loginAdmin(body))

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
        if(usernameAdmin){
            setRedirectTo(true)
        }
    }, [loginError,usernameAdmin])


    if(redirectTo){
        return <Redirect to={'/admin/dashboard'}/>
      }else{
          console.log('Gagal Jhon')
      }

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
                                <p style={{textAlign: 'center', fontSize: '40px', color: '#04BF8A', fontWeight: 'bold'}}>SIGN IN ADMIN</p>
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

            <Modal backdrop="static" show={textError} onHide={() => setTextError(false)} size="xs">
                <Modal.Body>
                   <p>{loginError}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleModalError()} appearance="primary">
                    Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            

        </div>
    )
}
