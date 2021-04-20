import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/TopNavigation'
import { Button, Modal } from 'rsuite'
import { RemoveResUpload, UploadMedPrescription } from '../action'
import { Redirect } from 'react-router-dom'

const CustomOrderScreen = () => {
    const [show, setShow] = React.useState(false)
    const [showErr, setShowErr] = React.useState(false)
    const [image, setImage] = React.useState({})
    const [direct, setDirect] = React.useState(0)
    const { id_customer, res, errRes } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer,
            res: state.customOrderReducer.res,
            errRes: state.customOrderReducer.errRes
        }
    })

    React.useEffect(() => {
        if (res) {
            setShow(true)
            setDirect(1)
        }
        if (errRes) {
            setShowErr(true)
            setDirect(1)
        }
    }, [res, errRes])

    const dispatch = useDispatch()

    const handleChoose = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const btnSubmit = () => {
        const data = new FormData()
        data.append('IMG', image)
        dispatch(UploadMedPrescription(data, id_customer))
    }

    const doneShow = () => {
        dispatch(RemoveResUpload())
        setDirect(2)
        setShow(false)

    }
    const doneShowErr = () => {
        dispatch(RemoveResUpload())
        setDirect(0)
        setShowErr(false)

    }
    if (direct === 2) return <Redirect to='/ShowCustomOrder' />
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto', justifyContent: 'space-around', marginTop: 50 }}>
                <div style={{backgroundColor: '#04BF8A', height: 200, width: 500 }} id='Box'>
                    <p style={{ textAlign: 'center', fontSize: 26, fontWeight: 'bold', marginTop: 20, color: 'white' }}>Order Manually</p>
                    <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Link to='/ordermaterials'>
                        <Button style={{ width: '100%' }} id="Button">Click Here</Button>
                    </Link>
                    </div>
                </div>
                <div style={{ backgroundColor: '#04BF8A', height: 200, width: 500 }} id='Box'>
                    <p style={{ textAlign: 'center', fontSize: 26, fontWeight: 'bold', marginTop: 20, color: 'white' }}>Upload Medical Prescription</p>
                    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ border: '3px solid black', borderRadius: 5, width: 300, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                            <div style={{ marginTop: 10 }}>
                                <form encType="multipart/form-data">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="IMG"
                                        onChange={(e) => handleChoose(e)}
                                    />
                                </form>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 10 }}>
                                <Button onClick={btnSubmit} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 200 }}>Click here to Upload</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal backdrop={true} show={show} onHide={doneShow}>
                <Modal.Header>
                    <Modal.Title>Success Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {res}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={doneShow} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 100 }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal backdrop={true} show={showErr} onHide={doneShowErr}>
                <Modal.Header>
                    <Modal.Title>Error Upload Medical Prescription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errRes}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={doneShowErr} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 100 }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default CustomOrderScreen