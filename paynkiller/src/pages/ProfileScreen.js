import React, { useEffect } from 'react'
import Axios from 'axios'
import Navbar from '../components/TopNavigation'
import '../css/pages/profile.css'
import { Button, Avatar, Form, FormGroup, FormControl, ControlLabel, Input, Modal } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'

import { logout, showProfile } from '../action'

import { Link } from 'react-router-dom'

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
            let token = props.location.search.substring(1)
            await Axios.post('http://localhost:2000/user/verify', { token })
            dispatch(showProfile())
            console.log(biodata)
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
            await Axios.patch(`http://localhost:2000/user/editProfile/${id_customer}`, formValue)
            setEditProfile(false)
            dispatch(showProfile())
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
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{ flexGrow: 1 }}>
                    {biodata.id_status == 1
                        ?
                        <div>
                            <p style={{ fontSize: '14px' }}>username</p>
                            <h5 style={{ fontSize: '16 px' }}>{biodata.username}</h5>
                            <p style={{ fontSize: '14px', marginTop: 15 }}>email</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '20vw' }}>
                                <h5 style={{ fontSize: '16px' }}>{biodata.email}</h5>
                                <div>
                                    <h5 style={{ fontSize: '12px', color: '#51bea5' }}>verified</h5>
                                </div>
                            </div>
                        </div>
                        :
                        biodata.id_status === 0
                            ?
                            <div>
                                <p style={{ fontSize: '14px' }}>username</p>
                                <h5 style={{ fontSize: '16 px' }}>{biodata.username}</h5>
                                <p style={{ fontSize: '14px', marginTop: 15 }}>email</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '20vw' }}>
                                    <h5 style={{ fontSize: '16px' }}>{biodata.email}</h5>
                                    <Button style={{ fontSize: '12px', color: '#51bea5', backgroundColor: 'white', fontWeight: 'bold', marginTop: '-3px' }}
                                        onClick={resend}>
                                        resend verification
                                </Button>
                                </div>
                            </div>
                            :
                            <div>
                                <p style={{ fontSize: '14px' }}>username</p>
                                <h5 style={{ fontSize: '16 px' }}>{username}</h5>
                            </div>
                    }
                </div>
                <div style={{
                    border: '1px solid gray', padding: '20px 30px 20px 30px',
                    borderRadius: '10px', flexGrow: 2, maxWidth: '30vw'
                }}>
                    {!biodata.firstname || !biodata.lastname || !biodata.alamat || !biodata.phone
                        ?
                        <>
                            <h5 style={{ fontSize: '14px', color: 'red', marginBottom:10 }}>add now to personalize your account</h5>
                            <h5 style={{ fontSize: '14px' }}>first name:</h5>
                            <h5 style={{ fontSize: '14px' }}> {biodata.firstname ? biodata.firstname : ''}</h5>
                            <h5 style={{ fontSize: '14px', marginTop: 10 }}>last name:</h5>
                            <h5 style={{ fontSize: '14px' }}> {biodata.lastname ? biodata.lastname : ''}</h5>
                            <h5 style={{ fontSize: '14px', marginTop: 10 }}>adrress: </h5>
                            <h5 style={{ fontSize: '14px' }}> {biodata.alamat ? biodata.alamat : ''}</h5>
                            <h5 style={{ fontSize: '14px', marginTop: 10 }}>phone: </h5>
                            <h5 style={{ fontSize: '14px', marginBottom:10 }}> {biodata.phone ? biodata.phone : ''}</h5>
                            <Button style={{ backgroundColor: '#04BF8A', color: 'white', width: '100%' }} onClick={() => setEditProfile(true)}>Edit</Button>
                        </>
                        :
                        <>
                        <h5 style={{ fontSize: '14px' }}>first name:</h5>
                        <h5 style={{ fontSize: '14px' }}> {biodata.firstname ? biodata.firstname : ''}</h5>
                        <h5 style={{ fontSize: '14px', marginTop: 10 }}>last name:</h5>
                        <h5 style={{ fontSize: '14px' }}> {biodata.lastname ? biodata.lastname : ''}</h5>
                        <h5 style={{ fontSize: '14px', marginTop: 10 }}>adrress: </h5>
                        <h5 style={{ fontSize: '14px' }}> {biodata.alamat ? biodata.alamat : ''}</h5>
                        <h5 style={{ fontSize: '14px', marginTop: 10 }}>phone: </h5>
                        <h5 style={{ fontSize: '14px' }}> {biodata.phone ? biodata.phone : ''}</h5>
                        <Button style={{ backgroundColor: '#04BF8A', color: 'white', width: '100%' }} onClick={() => setEditProfile(true)}>Edit</Button>
                        </>

                    }
                </div>
            </div>
        )
    }


    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {/* backgroundColor: 'white', height: '70vh', width: '56vw', border: '2px solid gray', padding: '20px 30px 20px 30px', borderRadius: '20px', marginTop:40  */}
                <div style={{ backgroundColor: 'white', height: '75vh', width: '56vw', border: '2px solid gray', padding: '20px 30px 20px 30px', borderRadius: '20px', marginTop: 40 }}>
                    <h1 style={{ color: '#51bea5' }}>Account Details</h1>
                    <p style={{ fontSize: '12px', marginBottom: 20 }}>You can update your account anytime you like</p>
                    <FormProfile />
                </div>
                <div style={{
                    width: '20vw', height: '30vh', display: 'flex', flexDirection: 'column', border: '2px solid gray',
                    padding: '20px 30px 20px 30px', borderRadius: '20px', marginTop: 40
                }}>
                    <Link to='/ShowCustomOrder'>
                        <Button style={{ backgroundColor: '#04BF8A', color: 'white', width: '100%' }} id="Button">My Custom Order</Button>
                    </Link>
                    <Link to='/historyUser'>
                        <Button style={{ backgroundColor: '#04BF8A', color: 'white', width: '100%' }} id="Button">My Orders</Button>
                    </Link>
                    <Link to='/'>
                        <Button style={{ width: '100%' }} onClick={btnlogout} color='red' id="Button">LOGOUT</Button>
                    </Link>
                </div>
            </div>
            <Modal show={editProfile} onHide={() => setEditProfile(false)}>
                <Modal.Body style={{ marginTop: '0px' }}>
                    <div>
                        <p>first name</p>
                        <Input
                            value={formValue.firstname}
                            onChange={value => setFormValue({ ...formValue, firstname: value })}
                        />
                        <p>last name</p>
                        <Input
                            value={formValue.lastname}
                            onChange={value => setFormValue({ ...formValue, lastname: value })}
                        />
                        <p>address</p>
                        <Input
                            value={formValue.alamat}
                            onChange={value => setFormValue({ ...formValue, alamat: value })}
                        />
                        <p>phone number</p>
                        <Input
                            value={formValue.phone}
                            onChange={value => setFormValue({ ...formValue, phone: value })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ width: '30%' }} onClick={() => setEditProfile(false)}>Cancel</Button>
                    <Button style={{ backgroundColor: '#04BF8A', color: 'white', width: '30%' }} onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfileScreen