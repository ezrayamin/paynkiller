import React from 'react'
import Axios from 'axios'
import { Grid, Row, Col, Button, IconButton, Icon, Form, InputGroup, Input, FormControl, Modal, Alert } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import { register, removeError } from '../action'
import TinyGuys from '../images/Resources/TinyGuys.jpg'

import '../css/pages/register.css'

import { Redirect } from 'react-router-dom'


const RegisterScreen = () => {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confpass, setconfpass] = React.useState('')
    const [show1, setShow1] = React.useState(false)
    const [show2, setShow2] = React.useState(false)
    const [showModal, setShowModal] = React.useState([false, ''])
    const [modalAcc, setModalAcc] = React.useState([false, ''])
    const [sameAccount, setSameAccount] = React.useState(false)
    const [toHome, setToHome] = React.useState(false)

    const dispatch = useDispatch()

    const { loginError, usernameCust } = useSelector((state) => {
        return {
            loginError: state.userReducer.errLogin,
            usernameCust: state.userReducer.username
        }
    })

    const buttonRegis = () => {

        let sym = /[?><:;"'.,!@#$%^*]/
        let cek = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let numb = /[0-9]/
        let uppercase = /^[A-Z]/
        if (username === "" || email === "" || password === "" || confpass === "") return setShowModal([true, "please input each form"])
        if (sym.test(username) || username.length < 6) return setShowModal([true, 'username cannot have symbol, and must have at least 6 characters'])
        if (!cek.test(email)) return setShowModal([true, 'your email is not valid'])
        if (!numb.test(password) || !sym.test(password) || !uppercase.test(password) || password.length < 8) return setShowModal([true, 'password must include symbols & numbers, with min. 8 characters & 1 uppercase'])

        const user = { username, email, password }
        // Axios.get(`http://localhost:2000/user/cek`, user)
        //     .then((res) => setShowModal[true, res.data])
        //     .catch(err => console.log(err))

        dispatch(register(user))
        Alert.info('May take a few sec to check existing account', 5000)
        // if (!loginErr) {
        //     setShowModal([true, 'a verification request has been sent to your email'])
        //     console.log(loginErr)
        // } else {
        //     setShowModal([true, loginErr])

    }

    const notError = () => {
        setSameAccount(false)
        dispatch(removeError())
    }

    const closeRedirect = () => {
        setModalAcc([false, ''])
        setToHome(true)
    }

    React.useEffect(() => {
        if (loginError) {
            Alert.close()
            setSameAccount(true)
            setModalAcc([false, ''])
        }
        
        if (usernameCust) return setModalAcc([true, 'Welcome to Paynkiller, a verification request has been sent to your email'])
        Alert.close()
    }, [loginError, usernameCust])

    if (toHome) return <Redirect to="/" />

    return (
        <div id="containerRegister">
            <Grid fluid style={{ padding: "0px" }}>
                <Row style={{ margin: "0px" }}>
                    <Col md={10} style={{ height: "100vh" }}>
                        {/* <Row>
                            <Col md={24} style={{ paddingTop: "20px", paddingLeft: "25px" }}>
                            <Link to='/'>
                            <IconButton id="back-menu-button" icon={<Icon icon="angle-left" id="icon-menu-button" />}>
                                        Back To Home
                                    </IconButton>
                                </Link>
                            </Col>
                        </Row> */}
                        <div style={{ border: '3px solid  #E0E0E0', padding: '24px 0 32px 0', borderRadius: 20, margin: '40px 70px', width: '30vw', justifyContent: 'center' }}>
                            <Row >
                                <Col md={24} style={{ padding: '0 10px 30px' }}>
                                    <p style={styles.title}>
                                        Register Now
                                </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={24} style={{ padding: '0px 80px', justifyContent: 'center' }}>
                                    <Form>
                                        <InputGroup style={{ height: '45px' }}>
                                            <InputGroup.Addon style={styles.icon}>
                                                <span className="material-icons">person</span>
                                            </InputGroup.Addon>
                                            <Input
                                                type="text"
                                                placeholder="Username"
                                                style={{ color: '#2d5a7e' }}
                                                value={username}
                                                onChange={username => setUsername(username)}
                                            />
                                        </InputGroup>
                                        {/* < p style={{ textAlign: "left", color: "red", fontSize: '10px' }}>
                                            {usernameErr[1]}
                                        </ p> */}
                                        <InputGroup style={{ height: '45px', marginTop: '30px' }}>
                                            <InputGroup.Addon style={styles.icon}>
                                                <span className="material-icons">email</span>
                                            </InputGroup.Addon>
                                            <Input
                                                type="text"
                                                placeholder="email"
                                                style={{ color: '#2d5a7e' }}
                                                value={email}
                                                onChange={email => setEmail(email)}
                                            />
                                        </InputGroup>
                                        {/* < p style={{ textAlign: "left", color: "red", fontSize: '10px' }}>
                                            {emailErr[1]}
                                        </ p> */}
                                        <InputGroup style={{ height: '45px', marginTop: '30px' }}>
                                            <InputGroup.Button style={styles.icon} onClick={() => setShow1(!show1)}>
                                                <span className="material-icons">{show1 ? "lock_open" : "lock"}</span>
                                            </InputGroup.Button>
                                            <Input
                                                type={show1 ? "text" : "password"}
                                                placeholder="Password"
                                                style={{ color: '#2d5a7e' }}
                                                value={password}
                                                onChange={password => setPassword(password)}
                                            />
                                        </InputGroup>
                                        {/* < p style={{ textAlign: "left", color: "red", fontSize: '10px' }}>
                                            {passErr[1]}
                                        </ p> */}
                                        <InputGroup style={{ height: '45px', marginTop: '30px' }}>
                                            <InputGroup.Button style={styles.icon} onClick={() => setShow2(!show2)}>
                                                <span className="material-icons">{show2 ? "lock_open" : "lock"}</span>
                                            </InputGroup.Button>
                                            <Input
                                                type={show2 ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                style={{ color: '#2d5a7e' }}
                                                value={confpass}
                                                onChange={confpass => setconfpass(confpass)}
                                            />
                                        </InputGroup>
                                    </Form>
                                </Col>
                                <Col md={24} style={{ margin: '30px 97px' }}>
                                    <Button id="button-register" onClick={buttonRegis}>Sign Up</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={14} style={{ height: "100vh" }}>
                        <img
                            alt=""
                            src={TinyGuys}
                            width="70%"
                            height="80%"
                            style={{ margin: '70px 80px' }}
                        />
                    </Col>
                </Row>
            </Grid>
            <Modal show={showModal[0]} onHide={() => setShowModal([false, ''])} style={{ width: '300px', justifySelf: 'center', position: 'fixed', top: '35%', left: '40%' }}>
                <Modal.Header closeButton={false}>{showModal[1]}</Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal([false, ''])}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={modalAcc[0]} onHide={closeRedirect} style={{ width: '300px', justifySelf: 'center', position: 'fixed', top: '35%', left: '40%' }}>
                <Modal.Header closeButton={false}>{modalAcc[1]}</Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeRedirect}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={sameAccount === true} onHide={() => notError()} size="xs">
                <Modal.Body>
                    <p>{loginError}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => notError()} appearance="primary">
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const styles = {
    title: {
        textAlign: 'center',
        fontSize: '34px',
        color: '#2d5a7e',
        fontWeight: 'bold'
    },
    icon: {
        width: '40px',
        backgroundColor: '#95d9c7',
        color: 'white',
        justifyContent: 'center'
    }
}

export default RegisterScreen
