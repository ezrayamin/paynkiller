import React from 'react'
import { Row, Col, IconButton, Icon, Form, InputGroup, Input, Button, Modal, Grid } from 'rsuite'
import { Link } from 'react-router-dom'
import LoginImage from '../images/Resources/LoginImage.png'
import '../css/pages/forgotpass.css'
import { forgotpass, FpassRes } from '../action/userAction'

import { useDispatch, useSelector } from 'react-redux'

const FPassScreen = () => {
    const [email, setEmail] = React.useState('')
    const [res, setRes] = React.useState(false)
    const [err, setErr] = React.useState(false)

    const dispatch = useDispatch()

    const btnSendReq = () => {
        const data = { email: email }
        console.log(data)
        dispatch(forgotpass(data))
    }

    const { responses, errRes } = useSelector((state) => {
        return {
            responses: state.userReducer.FpassRes,
            errRes: state.userReducer.errFpass
        }
    })

    React.useEffect(() => {
        if (responses) return setRes(true)
        if (errRes) return setErr(true)
    }, [responses, errRes])

    return (
        <div>
            <Grid fluid>
                <Row>
                    <Col md={16} style={{ height: "100vh", padding: "0px" }}>
                        <img
                            alt=""
                            src={LoginImage}
                            width="100%"
                            height="100%"
                        />
                    </Col>
                    <Col md={8} style={{ height: "100vh" }}>
                        <Row>
                            <Col md={24} style={{ paddingTop: "20px", paddingLeft: "25px" }}>
                                <Link to='/'>
                                    <IconButton id="back-menu-button" icon={<Icon icon="angle-left" id="icon-menu-button" />}>Back To Home</IconButton>
                                </Link>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col md={24} style={{ paddingTop: "20px", paddingLeft: "25px" }}>
                                <h1>Forgot Password</h1>
                            </Col>
                            <Col md={24} style={{ paddingTop: "20px", paddingLeft: "40px", marginBottom: 10 }}>
                                <h3>Input your Email Account</h3>
                            </Col>
                            <Form style={{paddingLeft: 25, paddingRight: 25}}>
                                <InputGroup style={{ height: '45px' }}>
                                    <InputGroup.Addon style={{ width: '40px', backgroundColor: '#04BF8A', color: 'white' }}>
                                        <Icon icon="envelope" />
                                    </InputGroup.Addon>
                                    <Input value={email} onChange={(value, event) => setEmail(value)} type="text" placeholder="Email" style={{ color: '#04BF8A' }} />
                                </InputGroup>
                            </Form>
                            <Col md={24} style={{ padding: '0px 155px', marginTop: 20 }}>
                                <Button id="button-submit" onClick={() => btnSendReq()} style={{width:'100%'}}>Send Request</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>

            <Modal backdrop="static" show={res === true} onHide={res === false} size="xs">
                <Modal.Body>
                    <p>Email Sent, Check your inbox now</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={() => {
                        dispatch(FpassRes())
                        setRes(false)
                    }}>Ok</Button>
                </Modal.Footer>
            </Modal>

            <Modal backdrop="static" show={err === true} onHide={err === false} size="xs">
                <Modal.Body>
                    <p>{errRes}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={() => {
                        dispatch(FpassRes())
                        setErr(false)
                    }}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default FPassScreen