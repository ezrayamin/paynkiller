import React from 'react'
import axios from 'axios'
import Navbar from "../components/TopNavigation"
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Table, Modal, Button } from 'rsuite'
import { ReuploadTransactionEvidence } from '../action'
const { Column, HeaderCell, Cell } = Table

const UserHistoryScreen = () => {
    const dispatch = useDispatch()
    const [Data, setData] = React.useState([])
    const [Data2, setData2] = React.useState([])
    const [show, setShow] = React.useState(false)
    const [showCancel, setShowCancel] = React.useState(false)
    const [showConfirm, setShowConfirm] = React.useState(false)
    const [showRes, setShowRes] = React.useState(false)
    const [showErr, setShowErr] = React.useState(false)
    const [showUpload, setShowUpload] = React.useState(false)
    const [orderNumber, setOrderNumber] = React.useState(null)
    const [gocheckout, setgocheckout] = React.useState(false)
    const [image, setImage] = React.useState({})
    const [cancel, setCancel] = React.useState('')
    const [confirm, setConfirm] = React.useState('')

    const { id_customer, res, errRes } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer,
            res: state.historyUserReducer.resUpload,
            errRes: state.historyUserReducer.errUpload
        }
    })
    React.useEffect(() => {
        if (id_customer) {
            axios.get(`http://localhost:2000/history/userHistory/${id_customer}`)
                .then((res) => setData(res.data))
                .catch((err) => console.log(err))
        }
    }, [id_customer])
    React.useEffect(() => {
        if (orderNumber) {
            axios.get(`http://localhost:2000/history/getDetailHistory/${orderNumber}`)
                .then((res) => setData2(res.data))
                .catch((err) => console.log(err))
        }
    }, [orderNumber])

    React.useEffect(() => {
        if (res) {
            setShowRes(true)
        }
        if (errRes) {
            setShowErr(true)
        }
    }, [res, errRes])

    React.useEffect(() => {
        if(cancel) {
            setShowCancel(true)
        }
    }, [cancel])

    const goToCheckout = () => {
        setgocheckout(true)
    }
    console.log(gocheckout)

    if (gocheckout) {
        return (
            <Redirect to='/checkout' />
        )
    }

    const handleChoose = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const doneShow = () => {
        const data = new FormData()
        data.append('IMG', image)
        dispatch(ReuploadTransactionEvidence(data, orderNumber))

        setShowUpload(false)
    }


    console.log(Data)
    console.log('res', showRes)
    return (
        <div style={{ height: '100vh', backgroundColor: '#b2bec3' }}>
            <Navbar />
            <div style={{ width: '100%', paddingTop: 40 }}>
                <Table
                    height={550}
                    data={Data}
                    // onRowClick={(data) => showDetail(data.order_number)}
                    rowHeight={70}
                    headerHeight={50}
                >
                    <Column width={150} align="center" fixed >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Order Number</HeaderCell>
                        <Cell dataKey="order_number" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={150} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price</HeaderCell>
                        <Cell>
                            {(rowData) => {
                                return (
                                    <p style={{ fontSize: 16 }}>{rowData.grandTotal_checkout ? `${rowData.grandTotal_checkout.toLocaleString()}` : rowData.grandTotal_checkout}</p>
                                )
                            }}
                        </Cell>
                    </Column>

                    <Column width={150} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Payment</HeaderCell>
                        <Cell dataKey="jenis_pembayaran" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={200} align="center" resizable>
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Annotation</HeaderCell>
                        <Cell dataKey="keterangan" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={170} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Transaction Date</HeaderCell>
                        <Cell>
                            {(rowData) => {
                                return (
                                    <p style={{ fontSize: 16 }}>{rowData.tanggal_transaksi ? `${rowData.tanggal_transaksi.substring(0, 10)}` : rowData.tanggal_transaksi}</p>
                                )
                            }}
                        </Cell>
                    </Column>

                    <Column width={150} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Pay Date</HeaderCell>
                        <Cell>
                            {(rowData) => {
                                return (
                                    <p style={{ fontSize: 16 }}>{rowData.tanggal_bayar ? `${rowData.tanggal_bayar.substring(0, 10)}` : rowData.tanggal_bayar}</p>
                                )
                            }}
                        </Cell>
                    </Column>

                    <Column width={150} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Status</HeaderCell>
                        <Cell dataKey="status" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={400} align="center" fixed='right' >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Action</HeaderCell>
                        <Cell>
                            {rowData => {
                                const btnshowUpload = (data) => {
                                    setOrderNumber(data)
                                    setShowUpload(true)
                                }
                                const showDetail = (data) => {
                                    console.log(data)
                                    setOrderNumber(data)
                                    setShow(true)
                                }
                                const btnCancel = (data, email, total_bayar) => {
                                    console.log(data)
                                    axios.post(`http://localhost:2000/history/cancelOrder/${data}`, {email, total_bayar})
                                    .then((res) => setCancel(res.data))
                                    .catch((err) => console.log(err))
                                }
                                const confirmArrived = (data, email, id_status) => {
                                    axios.post(`http://localhost:2000/history/confirmArrived/${data}`, {email, id_status})
                                    .then((res) => setConfirm(res.data))
                                    .catch((err) => console.log(err))
                                }
                                const id_status = rowData.id_status
                                return (
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={() => btnshowUpload(rowData.order_number)} style={{ width: '100%', backgroundColor: id_status === 8 ? '#04BF8A' : '#2d3436', color: 'white' }} disabled={id_status === 1 || id_status === 3 || id_status === 4 | id_status === 5 || id_status === 6 || id_status === 7 || id_status === 2}> Upload </Button>
                                        <Button onClick={() => btnCancel(rowData.order_number, rowData.email, rowData.grandTotal_checkout)} color='red' style={{ marginLeft: 5, marginRight: 5, width: '100%' }} disabled={id_status === 1 || id_status === 2 || id_status === 4 | id_status === 5 || id_status === 6 || id_status === 7 || id_status === 8}> Cancel </Button>
                                        <Button onClick={() => showDetail(rowData.order_number)} style={{ width: '100%' }}> Detail </Button>
                                        <Button onClick={goToCheckout} color='blue' style={{ marginLeft: 5, width: '100%' }} disabled={id_status === 1 || id_status === 3 || id_status === 4 | id_status === 5 || id_status === 6 || id_status === 7 || id_status === 8}> Checkout </Button>
                                        <Button onClick={() => confirmArrived(rowData.order_number, rowData.email, rowData.id_status)} color='green' style={{ marginLeft: 5, width: '100%' }} disabled={id_status === 1 || id_status === 3 || id_status === 4 | id_status === 5 || id_status === 2 || id_status === 7 || id_status === 8}> Confirm </Button>
                                    </div>

                                );
                            }}
                        </Cell>
                    </Column>
                </Table>
            </div>
            <Modal backdrop={true} show={show} onHide={() => setShow(false)} full={true}>
                <Modal.Header>
                    <Modal.Title>Custom Order Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table
                        height={490}
                        data={Data2}
                        headerHeight={50}
                    >
                        <Column width={250} align="center" fixed>
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Nama Barang</HeaderCell>
                            <Cell dataKey="nama_produk" style={{ fontSize: 16 }} />
                        </Column>

                        <Column width={250} align="center" >
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Kode Racik Obat</HeaderCell>
                            <Cell dataKey='kode_custom_order' style={{ fontSize: 16 }} />
                        </Column>

                        <Column width={140} align="center">
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Brand</HeaderCell>
                            <Cell dataKey="nama_brand" style={{ fontSize: 16 }} />
                        </Column>

                        <Column width={200} align="center">
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Category</HeaderCell>
                            <Cell dataKey='nama_category' />
                        </Column>
                        <Column width={180} align="center">
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Jumlah Beli</HeaderCell>
                            <Cell dataKey="qty" style={{ fontSize: 16 }} />
                        </Column>
                        <Column width={200}>
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Total Harga</HeaderCell>
                            <Cell>
                                {(rowData) => {
                                    return (
                                        <p style={{ fontSize: 16 }}>{rowData.total_harga ? `Rp. ${rowData.total_harga.toLocaleString()}` : rowData.total_harga}</p>
                                    )
                                }}
                            </Cell>
                        </Column>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 100 }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal backdrop={true} show={showUpload} onHide={doneShow}>
                <Modal.Header>
                    <Modal.Title>Reupload Transaction Evidence</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={doneShow} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 100 }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal backdrop={true} show={showErr} onHide={() => setShowErr(false)}>
                <Modal.Header>
                    <Modal.Title>Error Re-Upload Transaction Evidence</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errRes}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowErr(false)} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 100 }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal backdrop={true} show={showRes} onHide={() => setShowRes(false)}>
                <Modal.Header>
                    <Modal.Title>Success Re-Upload Transaction Evidence</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {res}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowRes(false)} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 100 }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal backdrop={true} show={showCancel} onHide={() => setShowCancel(false)}>
                <Modal.Header>
                    <Modal.Title>Success Cancel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cancel}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowCancel(false)} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 100 }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal backdrop={true} show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header>
                    <Modal.Title>Success Cancel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {confirm}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowConfirm(false)} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 100 }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserHistoryScreen