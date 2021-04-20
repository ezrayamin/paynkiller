import React from 'react'
import { Row, Col, IconButton, Icon, Form, InputGroup, Input, Button, Modal } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import { ChangePass, FpassRes } from '../action'
import { Link } from 'react-router-dom'
import LoginImage from '../images/Resources/LoginImage.png'

const ChangePassScreen = (props) => {
    const [password, setPassword] = React.useState('')
    const [confpassword, setConfPassword] = React.useState('')
    const [showPass1, setShowPass1] = React.useState(false)
    const [showPass2, setShowPass2] = React.useState(false)
    const token = props.location.search.substring(1)

    const dispatch = useDispatch()

    const [res, setRes] = React.useState(false)
    const [err, setErr] = React.useState(false)
    const [err2, setErr2] = React.useState(false)

    const { responses, errRes } = useSelector((state) => {
        return {
            responses: state.userReducer.FpassRes,
            errRes: state.userReducer.errFpass
        }
    })

    const btnSend = () => {
        if (confpassword !== password) return setErr(true)
        const data = {
            password: password,
            token: token
        }
        console.log(data)
        dispatch(ChangePass(data))
    }

    React.useEffect(() => {
        if (responses) return setRes(true)
        if (errRes) return setErr2(true)
    }, [responses, errRes])

    return (
        <div>
            <Col md={8} style={{ height: "100vh" }}>
                <Row style={{ marginTop: 20 }}>
                    <Col md={24} style={{ paddingTop: "20px", paddingLeft: "25px" }}>
                        <h1>Change Password</h1>
                    </Col>
                    <Col md={24} style={{ paddingTop: "20px", paddingLeft: "40px", marginBottom: 10 }}>
                        <h3>Input your New Password</h3>
                    </Col>
                    <Form>
                        <InputGroup style={{ height: '45px', margin: '45px 0px', }}>
                            <InputGroup.Button style={{ width: '40px', backgroundColor: '#04BF8A', color: 'white' }} onClick={() => setShowPass1(!showPass1)}>
                                <Icon icon={showPass1 ? "unlock" : "unlock-alt"} />
                            </InputGroup.Button>
                            <Input value={password} onChange={(value, event) => setPassword(value)} type={showPass1 ? "text" : "password"} placeholder="New Password" style={{ color: '#04BF8A' }} />
                        </InputGroup>
                        <Col md={24} style={{ paddingTop: "20px", paddingLeft: "40px", marginBottom: 10 }}>
                        <h3>Confirm Your Password</h3>
                    </Col>
                        <InputGroup style={{ height: '45px', margin: '45px 0px', }}>
                            <InputGroup.Button style={{ width: '40px', backgroundColor: '#04BF8A', color: 'white' }} onClick={() => setShowPass2(!showPass2)}>
                                <Icon icon={showPass2 ? "unlock" : "unlock-alt"} />
                            </InputGroup.Button>
                            <Input value={confpassword} onChange={(value, event) => setConfPassword(value)} type={showPass2 ? "text" : "password"} placeholder="Confirm Password" style={{ color: '#04BF8A' }} />
                        </InputGroup>
                    </Form>
                    <Col md={24} style={{ padding: '0px 100px', marginTop: 20 }}>
                        <Button id="button-submit" onClick={() => btnSend()} style={{width: 300}}>Change Password Now</Button>
                    </Col>
                </Row>
            </Col>
            <Col md={16} style={{ height: "100vh", padding: "0px" }}>
                <img
                    alt=""
                    src={LoginImage}
                    width="100%"
                    height="100%"
                />
            </Col>

            <Modal backdrop="static" show={err === true} onHide={err === false} size="xs">
                <Modal.Body>
                    <p>make sure the password confirmation is the same as the password</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={() => setErr(false)}>Ok</Button>
                </Modal.Footer>
            </Modal>
            <Modal backdrop="static" show={res === true} onHide={res === false} size="xs">
                <Modal.Body>
                    <p>Your Password Changed</p>
                </Modal.Body>
                <Modal.Footer>
                    <Link to='/'>
                        <Button appearance="primary" onClick={() => {
                            dispatch(FpassRes())
                            setRes(false)
                        }}>Ok</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
            <Modal backdrop="static" show={err2 === true} onHide={err2 === false} size="xs">
                <Modal.Body>
                    <p>{errRes}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={() => {
                        dispatch(FpassRes())
                        setErr2(false)
                    }}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ChangePassScreen