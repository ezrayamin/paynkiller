import React, { useEffect } from 'react'
import Axios from 'axios'
import Navbar from '../components/TopNavigation'
import '../css/pages/profile.css'
import { Button, Avatar, Form, FormGroup, FormControl, ControlLabel, Input, Modal } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'

import { logout, showProfile } from '../action'

import { Link } from 'react-router-dom'

import '../css/components/fonts.css'

const ProfileScreen = (props) => {
    // const [verified, setVerified] = React.useState(false)
    const [editProfile, setEditProfile] = React.useState(false)
    const [formValue, setFormValue] = React.useState({
        firstname: '',
        lastname: '',
        alamat: '',
        phone: ''
    })

    const dispatch = useDispatch()
    const { id_customer, biodata, username } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer,
            biodata: state.userReducer.biodata,
            username: state.userReducer.username
        }
    })

    React.useEffect(async () => {
        try {
            dispatch(showProfile())
            let token = props.location.search.substring(1)
            await Axios.post('http://localhost:2000/user/verify', { token })
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    const btnlogout = () => {
        dispatch(logout())

        localStorage.removeItem('token')
    }

    const handleSave = async () => {
        console.log(formValue)
        try {
            // dispatch(showProfile())
            await Axios.patch(`http://localhost:2000/user/editProfile/${id_customer}`, formValue)
            setEditProfile(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        setEditProfile(false)
        setFormValue({
            firstname: '',
            lastname: '',
            alamat: '',
            phone: ''
        })
    }


    const resend = async () => {
        try {
            const body = {
                username: biodata.username,
                email: biodata.email
            }
            await Axios.post('http://localhost:2000/user/resendVerification', body)
        }
        catch (err) {
            console.log(err)
        }
    }

    const FormProfile = () => {
        return (
            <div className="container-form">
                <div className="username-email">
                    <div>
                        <p className="text">username</p>
                        <h5 className="text">{biodata.username}</h5>
                        <p className="email-text">email</p>
                        <div className="container-email">
                            <h5 className="text">{biodata.email}</h5>
                            {biodata.id_status == 1
                                ?
                                <h5 className="verif-status">verified</h5>
                                :
                                biodata.id_status === 0
                                ?
                                <Button className="verif-status" id="button-resend" onClick={resend}>
                                    resend email
                                </Button>
                                :
                                <div></div>
                            }                           
                        </div>
                    </div>
                </div>
                <div className="biodata">
                    {!biodata.firstname || !biodata.lastname || !biodata.alamat || !biodata.phone
                        ?
                        <h5 className="alert" id="reminder-add">add now to personalize your account</h5>
                        :
                        <></>
                    }
                    <div>
                        <h5 className="text">first name:</h5>
                        <h5 className="text"> {biodata.firstname ? biodata.firstname : ''}</h5>
                        <h5 className="biodata-text">last name:</h5>
                        <h5 className="text"> {biodata.lastname ? biodata.lastname : ''}</h5>
                        <h5 className="biodata-text">adrress: </h5>
                        <h5 className="text"> {biodata.alamat ? biodata.alamat : ''}</h5>
                        <h5 className="biodata-text">phone: </h5>
                        <h5 className="text" id="phone"> {biodata.phone ? biodata.phone : ''}</h5>
                        <Button className="buttons" id="button-edit" onClick={() => setEditProfile(true)}>Edit</Button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <Navbar />
            <div className="main-container">
                <div className="containers" id="account-container">
                    <h1 className="heading" id="account-header">Account Details</h1>
                    <p className="small-detail" id="update-reminder">You can update your account anytime you like</p>
                    <FormProfile />
                </div>
                <div className="containers" id="buttons-container">
                    <Link to='/ShowCustomOrder'>
                        <Button className="buttons" id="button-co">My Custom Order</Button>
                    </Link>
                    <Link to='/historyUser'>
                        <Button className="buttons" id="button-order">My Orders</Button>
                    </Link>
                    <Link to='/'>
                        <Button onClick={btnlogout} id="logout-button">LOGOUT</Button>
                    </Link>
                </div>
            </div>
            <Modal id="modal-form" show={editProfile} onHide={() => setEditProfile(false)}>
                <Modal.Body id="modal-body">
                    <div>
                        <p className="text">first name</p>
                        <Input
                            value={formValue.firstname}
                            onChange={value => setFormValue({ ...formValue, firstname: value })}
                        />
                        <p className="biodata-text">last name</p>
                        <Input
                            value={formValue.lastname}
                            onChange={value => setFormValue({ ...formValue, lastname: value })}
                        />
                        <p className="biodata-text">address</p>
                        <Input
                            value={formValue.alamat}
                            onChange={value => setFormValue({ ...formValue, alamat: value })}
                        />
                        <p className="biodata-text">phone number</p>
                        <Input
                            value={formValue.phone}
                            onChange={value => setFormValue({ ...formValue, phone: value })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="button-cancel" onClick={() => setEditProfile(false)}>Cancel</Button>
                    <Button id="button-save" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfileScreen