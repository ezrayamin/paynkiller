import React from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    Button, Panel, Modal, Grid, Row, Col,
    Alert, InputPicker, FormGroup, ControlLabel, Input
} from 'rsuite'
import {
    getOrdersInCheckout, showProfile, editProfile, getMaterialsCheckout, uploadPaymentProof,
    decreaseProductStock, decreaseStockMaterial
} from '../action'

import '../css/pages/cart-checkout.css'
import '../css/components/fonts.css'

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
            order_number: checkoutOrders.length !== 0 ? checkoutOrders[0].order_number : materialsCheckout[0].order_number,
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
                    <div key={index} className='container-products'>
                        <div className='product-details'>
                            <img src={URL_IMG + item.gambar_obat} id="product-image" />
                            <div style={{ width: 200 }}>
                                <h1 id="product-name" className="text">{item.nama_produk} ({item.qty})</h1>
                                {/* <p style={{ margin: '0 0 -30px 20px'}}>{item.qty}</p> */}
                                <h1 id="product-price" className="text">Rp {item.harga_produk.toLocaleString()}</h1>
                            </div>
                        </div>
                        <div className="edit-products">
                        </div>
                    </div>
                )
            })
        )
    }

    const CekBiodata = () => {
        if (!biodata.firstname || !biodata.lastname || !biodata.alamat || !biodata.phone) {
            return (
                <div>
                    <h6 className="alert">please fill up your data</h6>
                    <Button onClick={openBiodataModal} appearance="ghost" style={{ color: '#51bea5', borderColor: '#d3d3d3' }}>Change Address</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button onClick={openBiodataModal} appearance="ghost" style={{ color: '#51bea5', borderColor: '#d3d3d3' }}>Change Address</Button>
                </div>
            )

        }
    }

    const RenderPayments = () => {
        return (
            payments.map((item, index) => {
                return (
                    <div key={index} className="button-selection">
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
                    <div key={index} className="box-material">
                        <p>{item.nama_bahan_baku}</p>
                        <p id="dose">{item.total_beli_satuan + item.nama_uom}</p>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            <h1 className="heading" id="yours-heading">Checkout</h1>
            <div className="main-container">
                <div className="maincontainer-products">
                    <h1 className="sub-heading">Shipping Address</h1>
                    <h4 className="text">full name: {biodata.firstname ? biodata.firstname + ' ' + biodata.lastname : ''}</h4>
                    <h4 className="text" id="margin-address">address: {biodata.alamat}</h4>
                    <h4 className="text" id="margin-phone">phone: {biodata.phone} </h4>
                    <CekBiodata />
                    <div id="border-biodata">
                        <p className="sub-heading" id="subhead-products">Products</p>
                        <Render />
                        <p className="sub-heading" id="subhead-ingredients">Active Ingredients</p>
                        <div className="container-materials">
                            <ShowMaterials />
                        </div>
                    </div>
                </div>
                <div className="container-price">
                    <Panel shaded={true} className="panel-price">
                        <p className="sub-heading">Shopping</p>
                        <div className="container-priceeach">
                            <p className="text" id="prod">Total Price ({totalQty()} items)</p>
                            <p className="text" id="prodprice">Rp {grandTotal().toLocaleString('id-ID')}</p>
                        </div>
                        <div className="container-priceeach">
                            <p className="text" id="ingre">Active Ingredients</p>
                            <p className="text" id="ingreprice">Rp {totalPriceIngredients().toLocaleString('id-ID')}</p>
                        </div>
                        <div className="container-priceeach">
                            <p className="text" id="shipping">Shipping</p>
                            <p className="text" id="free">ALWAYS FREE</p>
                        </div>
                        <div id="border-inprice"></div>
                        <div className="container-priceeach">
                            <p className="text" id="grand">Grand Total</p>
                            <p className="text" id="grandnominal">Rp {(grandTotal() + totalPriceIngredients()).toLocaleString('id-ID')}</p>
                        </div>
                        <Button onClick={openModalPayment} id="button-checkout">Choose Payment Method</Button>
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
            <Modal className="modal-payments" backdrop="static" show={modalPayments} onHide={() => setModalPayments(false)}>
                <Modal.Header>
                    <h4 className="sub-heading" id="header-payment">
                        select payment
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <RenderPayments />
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
            <Modal className="modal-payments" backdrop="static" show={modalSelectedPay.show} onHide={closeModalFinal}>
                <Modal.Header>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h6 className="text" id="header-upload">Upload Payment Proof</h6>
                        <h6 className="text">{modalSelectedPay.jenis_pembayaran}</h6>
                        <h6 className="text">Transfer to: {modalSelectedPay.nomor_rekening}</h6>
                        <div className="text" id="container-details">
                            <p id="bank">bank account:  </p>
                            <p id="account">  PaynKiller Indonesia</p>
                        </div>
                        <h6 className="text">Rp {(grandTotal() + totalPriceIngredients()).toLocaleString('id-ID')}</h6>
                        <h6 className="small-detail" >please input jpg/png file</h6>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="container-upload">
                        <div>
                            <div className="input-proof">
                                <form encType="multipart/form-data">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="IMG"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </form>
                            </div>
                        </div>
                        <Button id="button-submit" onClick={() => setCeckProofModal(true)}>submit</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal className="modal-conf" backdrop="static" show={cekProofModal} onHide={() => setCeckProofModal(false)}>
                <Modal.Header>Are your sure your payment proof is correct?</Modal.Header>
                <Modal.Footer style={{marginTop:20}}>
                    <Button onClick={() => setCeckProofModal(false)}>No</Button>
                    <Button onClick={paid}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default CheckoutScreen