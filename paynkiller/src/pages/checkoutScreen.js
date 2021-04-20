import React from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    Button, Panel, Modal, Grid, Row, Col,
    Alert, InputPicker, FormGroup, ControlLabel, Input
} from 'rsuite'
import { getOrdersInCheckout, showProfile, editProfile, getMaterialsCheckout, uploadPaymentProof,
        decreaseProductStock, decreaseStockMaterial
} from '../action'

const URL_IMG = 'http://localhost:2000/'

const CheckoutScreen = () => {
    const [payments, setPayments] = React.useState([])
    const [modalBiodata, setModalBiodata] = React.useState({
        show: false,
        firstname: '',
        lastname: '',
        alamat: '',
        phone: ''
    })
    const [modalPayments, setModalPayments] = React.useState(false)
    const [modalSelectedPay, setModalSelectedPay] = React.useState({
        show: false,
        jenis_pembayaran: '',
        nomor_rekening: '',
        bukti_bayar: ''
    })
    const [cekProofModal, setCeckProofModal] = React.useState(false)
    const [toHome, setToHome] = React.useState(false)

    console.log(payments)
    const { id_customer, checkoutOrders, biodata, materialsCheckout } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer,
            checkoutOrders: state.cartReducer.checkout,
            biodata: state.userReducer.biodata,
            materialsCheckout: state.customOrderReducer.materialsCheckout
        }
    })

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getOrdersInCheckout(id_customer))
        dispatch(showProfile())
        dispatch(getMaterialsCheckout(id_customer))
        console.log(checkoutOrders)
        console.log(materialsCheckout)
      
        Axios.get(`http://localhost:2000/order/paymentMethods`)
            .then(res => setPayments(res.data))
    }, [id_customer])

    const openBiodataModal = () => {
        setModalBiodata({
            show: true,
            firstname: biodata.firstname,
            lastname: biodata.lastname,
            alamat: biodata.alamat,
            phone: biodata.phone
        })
    }

    const saveBiodata = () => {
        const perantara = {
            firstname: modalBiodata.firstname,
            lastname: modalBiodata.lastname,
            alamat: modalBiodata.alamat,
            phone: modalBiodata.phone
        }
        console.log('perantara', perantara)
        dispatch(editProfile(id_customer, perantara))

        setModalBiodata({
            show: false,
            firstname: '',
            lastname: '',
            alamat: '',
            phone: ''
        })

        Alert.info('the data is automatically saved on your profile page, you could change it anytime you like', 5000)
    }

    const closeBiodataModal = () => {
        // if (!modalBiodata.firstname || !modalBiodata.lastname || !modalBiodata.alamat || !modalBiodata.phone) return Alert.error('please input each form', 5000)
        setModalBiodata({
            show: false,
            firstname: '',
            lastname: '',
            alamat: '',
            phone: ''
        })
    }

    const openModalPayment = () => {
        if (!biodata.firstname || !biodata.lastname || !biodata.alamat || !biodata.phone) return Alert.info('please input each shipping info', 5000)
        setModalPayments(true)
    }

    const openModalFinal = (jenis_pembayaran, nomor_rekening) => {
        // console.log(payments)
        // const findSelected = payments.find(e => e.jenis_pembayaran = jenis_pembayaran)
        // console.log(findSelected)

        setModalPayments(false)

        setModalSelectedPay({
            show: true,
            jenis_pembayaran: jenis_pembayaran,
            nomor_rekening: parseInt(nomor_rekening),
            bukti_bayar: ''
        })
    }

    const closeModalFinal = () => {
        setModalPayments(true)
        setModalSelectedPay({
            show: false,
            jenis_pembayaran: '',
            nomor_rekening: '',
            bukti_bayar: ''
        })
    }



    const totalQty = () => {
        let counter = 0
        if (checkoutOrders.length !== 0) {
            checkoutOrders.forEach(item => counter += item.qty)
        }
        return counter
    }

    const grandTotal = () => {
        let counter = 0
        checkoutOrders ? checkoutOrders.forEach(item => counter += item.total_harga) : counter = 0

        return counter
    }

    const totalPriceIngredients = () => {
        let n = 0
        materialsCheckout ? materialsCheckout.forEach(item => n += item.total_harga) : n = 0
        return n

    }
    
    const handleChange = (e) => {
        console.log(e.target.files)
        setModalSelectedPay({
            ...modalSelectedPay,
            bukti_bayar: e.target.files[0]
        })
    }
    const paid = () => {
        if (!modalSelectedPay.bukti_bayar) return Alert.error('please input payment proof', 5000)
        const data = new FormData()
        console.log(data)
        console.log('sebelom append', modalSelectedPay.bukti_bayar)
        data.append('IMG', modalSelectedPay.bukti_bayar)
        console.log('data, setelah append', data)
      
        const body = {
            order_number: checkoutOrders.length !==0 ? checkoutOrders[0].order_number : materialsCheckout[0].order_number,
            jenis_pembayaran: modalSelectedPay.jenis_pembayaran,
            email: biodata.email
        }
        console.log(body.order_number)

        dispatch(uploadPaymentProof(data, body))
        dispatch(decreaseStockMaterial(body))
        dispatch(decreaseProductStock(body))
        Alert.success(`your purchase will be processed soon`, 5000)
        setToHome(true)
    }

    if (toHome) return <Redirect to="/" />

    const Render = () => {
        return (
            checkoutOrders.map((item, index) => {
                return (
                    <div key={index} style={{ backgroundColor: 'white', height: '160px', width: '400px', border: '1px solid gray', margin: '10px 0 0 10px', display: 'flex', flexDirection: 'row', borderRadius: '20px' }}>
                        <div style={{ flexGrow: 3, width: '40vw', padding: '40px 0 0 30px', display: 'flex', flexDirection: 'row' }}>
                            <img src={URL_IMG + item.gambar_obat} style={{ height: '80px', width: '100px' }} />
                            <div style={{ width: 200 }}>
                                <h1 style={{ fontSize: '15px', fontWeight: 600, margin: '-15px 0 0 20px', lineHeight: '2' }}>{item.nama_produk}</h1>
                                <p style={{ marginLeft: 20 }}>{item.qty}</p>
                                <h1 style={{ fontSize: '15px', fontWeight: 600, margin: '15px 0 0 20px' }}>Rp {item.harga_produk.toLocaleString()}</h1>
                            </div>
                        </div>
                        <div style={{ flexGrow: 3, width: '30vw', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flexGrow: 10 }}>

                            </div>
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                {/*  */}
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    const CekBiodata = () => {
        if (!biodata.firstname || !biodata.lastname || !biodata.alamat || !biodata.phone) return (
            <div>
                <h6 style={{ color: 'red', fontSize:'14px' }}>please fill up your data</h6>
            </div>
        )
        return (
            <div></div>
        )
    }

    const RenderPayments = () => {
        return (
            payments.map((item, index) => {
                return (
                    <div key={index} style={{ border: '1px solid gray' }}>
                        <Button onClick={() => openModalFinal(item.jenis_pembayaran, item.nomor_rekening)} block style={{ fontSize: '14px' }}>{item.jenis_pembayaran}</Button>
                    </div>
                )
            })
        )
    }

    const ShowMaterials = () => {
        return (
            materialsCheckout.map((item, index) => {
                return (
                    <div key={index} style={{ backgroundColor: 'white', height: '80px', width: '200px', border: '1px solid gray', margin: '10px 10px 10px', display: 'flex', borderRadius: '20px', padding: '10px 20px 10px 20px' }}>
                        <p>{item.nama_bahan_baku}</p>
                        <p style={{ marginTop: '20px' }}>{item.total_beli_satuan + item.nama_uom}</p>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            <h1 style={{ margin: '17px 40px', fontSize: '34px' }}>Checkout</h1>
            <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
                <div style={{ borderTop: '4px solid #51bea5', flexGrow: 2, padding: '30px 0 0 40px', maxWidth: '65vw', flexDirection: 'column' }}>
                    <div>
                        <h1 style={{ fontSize: '30px' }}>Shipping Address</h1>
                        <h4>full name: {biodata.firstname + ' ' + biodata.lastname}</h4>
                        <h4>address: {biodata.alamat}</h4>
                        <h4>phone: {biodata.phone} </h4>
                        <CekBiodata />
                        <Button onClick={openBiodataModal} appearance="ghost" style={{ color: 'gray', borderColor: '#d3d3d3' }}>Change Address</Button>
                    </div>
                    <div style={{ marginTop: 15, borderTop: '4px solid #d3d3d3' }}>
                        <p style={{ fontSize: '18px' }}>Products</p>
                        <Render />
                        <p style={{ fontSize: '18px', marginTop: '25px' }}>Active Ingredients</p>
                        <div style={{ display: 'flex' }}>
                            <ShowMaterials />
                        </div>
                    </div>
                </div>
                <div style={{ flexGrow: 1, position: 'relative' }}>
                    <Panel shaded={true} style={{ backgroundColor: 'white', height: '350px', width: '280px', position: 'fixed', margin: '50px 0 0 40px', border: '3px solid #d3d3d3', borderRadius: '20px', padding: '20px 10px 20px 10px' }}>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Shopping</p>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '16px', marginTop: '30px' }}>Total Price ({totalQty()} items)</p>
                            <p style={{ fontSize: '18px', textAlign: 'end', marginTop: '28px' }}>Rp {grandTotal().toLocaleString('id-ID')}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                            <p style={{ fontSize: '16px', marginTop: '10px' }}>Active Ingredients</p>
                            <p style={{ fontSize: '16px', textAlign: 'center' }}>Rp {totalPriceIngredients().toLocaleString('id-ID')}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                            <p style={{ fontSize: '16px', marginTop: '10px' }}>Shipping</p>
                            <p style={{ fontSize: '16px', textAlign: 'center', color: '#51bea5', fontWeight: 'bold' }}>ALWAYS FREE</p>
                        </div>
                        <div style={{ borderBottom: '4px solid gray', marginTop: '20px' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', }}>
                            <p style={{ marginTop: '10px' }}>Grand Total</p>
                            <p style={{ fontSize: '18px', textAlign: 'center' }}>Rp {(grandTotal() + totalPriceIngredients()).toLocaleString('id-ID')}</p>
                            {/* <p style={{ textAlign: 'center' }}>Rp {checkoutOrders['showGrandTotal'].toLocaleString('id-ID')}</p> */}
                        </div>
                        <Button onClick={openModalPayment} style={{ height: '8vh', width: '80%', backgroundColor: '#51bea5', color: 'white', fontWeight: 'bold', margin: '25px 0 0 27px' }}>Choose Payment Method</Button>
                    </Panel>
                </div>
            </div>
            <Modal backdrop="static" show={modalBiodata.show} onHide={closeBiodataModal} size="sm">
                <Modal.Body style={{ marginTop: '0px' }}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{ paddingBottom: '20px' }}>
                                <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Input Details</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <p>first name</p>
                                <Input
                                    value={modalBiodata.firstname}
                                    onChange={value => setModalBiodata({ ...modalBiodata, firstname: value })}
                                />
                                <p>last name</p>
                                <Input
                                    value={modalBiodata.lastname}
                                    onChange={value => setModalBiodata({ ...modalBiodata, lastname: value })}
                                />
                                <p>address</p>
                                <Input
                                    value={modalBiodata.alamat}
                                    onChange={value => setModalBiodata({ ...modalBiodata, alamat: value })}
                                />
                                <p>phone number</p>
                                <Input
                                    value={modalBiodata.phone}
                                    onChange={value => setModalBiodata({ ...modalBiodata, phone: value })}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={saveBiodata}>
                        Add Data
                    </Button>
                    <Button onClick={() => setModalBiodata(false)} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal backdrop="static" show={modalPayments} onHide={() => setModalPayments(false)}>
                <Modal.Header>
                    select payment
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <RenderPayments />
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
            <Modal backdrop="static" show={modalSelectedPay.show} onHide={closeModalFinal}>
                <Modal.Header>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h6 style={{ fontSize: '18px', textAlign: 'center', color: '#51bea5' }}>Upload Payment Proof</h6>
                        <h6 style={{ fontSize: '14px' }}>{modalSelectedPay.jenis_pembayaran}</h6>
                        <h6 style={{ fontSize: '14px' }}>Transfer to: {modalSelectedPay.nomor_rekening}</h6>

                        <div style={{ display: 'flex', fontSize: '14px' }}>
                            <p style={{ margin: '8px 5px' }}>bank account:  </p>
                            <p style={{ color: '#51bea5' }}>  PaynKiller Indonesia</p>
                        </div>
                        <h6 style={{ fontSize: '14px' }}>Rp {(grandTotal() + totalPriceIngredients()).toLocaleString('id-ID')}</h6>
                        <h6 style={{ fontSize: '12px', marginTop: '20px' }}>please input jpg/png file</h6>
                        {/* <img src={URL_IMG + modalSelectedPay.bukti_bayar} style={{ height: '60px', width: '60px' }} /> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <div>
                        <form encType="multipart/form-data">
                            <input
                                type="file"
                                accept="image/*"
                                name="IMG"
                                onChange={(e) => handleChange(e)}
                            />
                        </form>
                    </div>
                    <Button style={{ backgroundColor: '#51bea5', color: 'white', fontWeight: '600', marginLeft: 15 }} onClick={() => setCeckProofModal(true)}>submit</Button>
                </Modal.Footer>
            </Modal>
            <Modal backdrop="static" show={cekProofModal} onHide={() => setCeckProofModal(false)}>
                <Modal.Header>Are your sure your payment proof is correct?</Modal.Header>
                <Modal.Footer>
                    <Button onClick={() => setCeckProofModal(false)}>No</Button>
                    <Button onClick={paid}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default CheckoutScreen