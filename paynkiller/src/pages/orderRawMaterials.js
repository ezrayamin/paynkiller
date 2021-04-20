import React from 'react'
import Axios from 'axios'
import {
    Row, Col, Panel, Button, Modal, Grid, Header,
    Form, FormGroup, ControlLabel, FormControl, InputNumber, Input, InputPicker, Alert
} from 'rsuite'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRawMaterial, getMaterialsInCart } from '../action'
import MaterialTable from 'material-table'
import Navbar from '../components/TopNavigation'

const OrderRawMaterials = () => {
    const [SelectedMaterials, setSelectedMaterials] = React.useState([])
    const [toCart, setToCart] = React.useState(false)
    const [showAcc, setShowAcc] = React.useState(false)

    const { id_customer, rawMaterialData, materialsinCart } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer,
            rawMaterialData: state.rawMaterialReducer.dataRawMaterial,
            materialsinCart: state.customOrderReducer.materialsinCart
        }
    })

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getRawMaterial())
        dispatch(getMaterialsInCart(id_customer))
        setSelectedMaterials(SelectedMaterials)
        console.log(SelectedMaterials)
        console.log(rawMaterialData)
    }, [SelectedMaterials, id_customer])

    const add = (id_bahan_baku, nama_bahan_baku, harga_bahan_baku, nama_uom) => {
        setSelectedMaterials(pre => [...pre, { id_bahan_baku, nama_bahan_baku, harga_bahan_baku, nama_uom, qty: 0, total_harga: 0 }])
    }

    const del = (index) => {
        const temp = SelectedMaterials
        temp.splice(index, 1)
        console.log(temp)
        setSelectedMaterials(temp)
    }

    const changeQty = (e, index) => {
        // const tempQty = e
        const temp = SelectedMaterials
        // temp[index].qty = parseInt(e)

        if (e> 0 && e< 1) {
            temp[index].qty = e
            temp[index].total_harga = temp[index].harga_bahan_baku
        } else {
            temp[index].qty = e
            temp[index].total_harga = Math.round(e) * temp[index].harga_bahan_baku
        }
        // let totalHarga = parseFloat(jumlahBeli * hargaBahanBaku)
        // temp[index].total_harga = parseInt(e) * temp[index].harga_bahan_baku
        console.log(Math.ceil(e))
        // console.log(index)
        console.log(temp)
        setSelectedMaterials(temp)
        // console.log(SelectedMaterials)
        // setSelectedMaterials
    }

    const open = () => {
        if (SelectedMaterials.length === 0) return Alert.info('please pick a raw material before continuing your order', 5000)
        if (materialsinCart.length !== 0) return Alert.error('your ingredients purchase cannot be edited')
        console.log(SelectedMaterials)
        SelectedMaterials.map((item, index) => {
            if (item.qty <= 0) {
                Alert.error('dose is not vaid', 5000)
                setShowAcc(false)
            } else {
                setShowAcc(true)
            }
        })
    }

    const addToCart = () => {
        console.log(SelectedMaterials)

        const total_harga = grandTotal()


        Axios.post(`http://localhost:2000/customorder/addNewOrder/${id_customer}`, { total_harga })
            .then((res) => {
                console.log(res.data)
                SelectedMaterials.map(item => {
                    Axios.post(`http://localhost:2000/customorder/addMaterialsCart/${id_customer}`, item)
                        .then(res => console.log(res.data))
                })
            })
        
        Alert.success('your items have been added to your cart (and cannot be edited)', 5000)
        // setToCart(true)
        setSelectedMaterials([])
        setShowAcc(false)
    }

    const grandTotal = () => {
        let counter = 0
        if (SelectedMaterials.length !== 0) {
            SelectedMaterials.forEach(item => counter += item.total_harga)
        }
        return counter
    }

    const Render = () => {
        return (
            SelectedMaterials.map((item, index) => {
                return (
                    <div key={index} style={{ display: 'flex', height: '15vh', padding: '5px 10px 0 10px' }}>
                        <div style={{ flexGrow: 1 }}>
                            <p>{item.nama_bahan_baku}</p>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                {/* <Button onClick={() => minus(item.qty, index)}>-</Button> */}
                                <input
                                    // value={item.qty} 
                                    min={1}
                                    onChange={e => changeQty(e.target.value, index)}
                                    // onChange={e => setInputQty(e)}  
                                    type="number"
                                    style={{ width: 70 }}
                                    placeholder="dose"
                                />
                                <p style={{ margin: '8px 0 0 6px', fontSize: '14px' }}>{item.nama_uom}</p>
                                {/* <Button onClick={() => plus(item.qty, index)}>+</Button> */}
                            </div>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <span onClick={() => del(index)} style={{ float: 'right', color: '#d5d5d5' }} className="material-icons">delete</span>
                        </div>
                    </div>
                )
            })
        )
    }

    // if (toCart) return <Redirect to="/cart" />
    return (
        <div>
            <Navbar/>
            <Grid fluid style={{ margin: "0px", padding: "0px" }}>
                <Row style={{ margin: "0px", padding: "0px" }}>
                    <Col md={18}>
                        <Row style={{ padding: "60px 40px" }}>
                            <Col md={24}>
                                <Panel shaded style={{ padding: '20px 10px 20px 10px' }}>
                                    <Row>
                                        <Col md={21}>
                                            <p style={{ fontSize: "25px", color: "#04BF8A", fontWeight: 700 }}>Custom Order</p>
                                        </Col>
                                        <Col md={3}>
                                            <p style={{ fontSize: '14px' }}>Have a receipt?</p>
                                            {/* <span ><Link style={{ color: '#51bea5', fontWeight: '700' }}>Click Here</Link></span> */}
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: "25px" }}>
                                        <Col md={20} style={{ paddingLeft: 50 }}>
                                            <MaterialTable
                                                columns={[
                                                    { title: 'Materials', field: 'nama_bahan_baku' },
                                                    { title: 'Descriptions', field: 'deskripsi_bahan' },
                                                    { title: 'UoM', field: 'nama_uom' }
                                                ]}
                                                data={rawMaterialData}
                                                actions={[
                                                    {
                                                        icon: 'AddShoppingCart',
                                                        tooltip: 'Add to Cart',
                                                        onClick: (event, rowData) => add(rowData.id_bahan_baku, rowData.nama_bahan_baku, rowData.harga_bahan_baku, rowData.nama_uom)
                                                    }
                                                ]}
                                                title=""
                                                options={{
                                                    actionsColumnIndex: -1
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Panel>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={1}>
                        <Panel header="Review" shaded={true} style={{ backgroundColor: 'white', maxHeight: '80vh', width: '280px', margin: '80px 0 0 0', border: '2px solid #4f79c5', borderRadius: '10px' }}>
                            <p style={{ fontSize: '16px', marginTop: '10px' }}>Materials</p>
                            <Render />
                            <Button onClick={open} style={{ width: '70%', backgroundColor: '#51bea5', color: 'white', fontWeight: 'bold', margin: '10px 0 10px 45px' }}>Continue</Button>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
            <Modal backdrop="static" show={showAcc} onHide={() => setShowAcc(false)} style={{ width: '400px', justifySelf: 'center', position: 'fixed', top: '25%', left: '35%' }}>
                <Modal.Header style={{ textAlign: 'center', fontSize: "18px", fontWeight: 700, color: '#51bea5' }}>Details</Modal.Header>
                {SelectedMaterials.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item.nama_bahan_baku} {item.qty + item.nama_uom}</p>
                        </div>
                    )
                })}
                <Modal.Body>
                    <p style={{ fontSize: '16px' }}>Price</p>
                    <p style={{ color: '#51bea5', fontWeight: 700 }}>Rp {grandTotal().toLocaleString('id-ID')}</p>
                    <p style={{ fontSize: '16px', color: 'red' }}>ONCE YOU ADD THIS TO YOUR CART, YOU CANNOT DELETE IT</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addToCart} style={{ backgroundColor: '#51bea5', fontWeight: 'bold', color: 'white' }}>Add to Cart</Button>
                    <Button onClick={() => setShowAcc(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}
export default OrderRawMaterials
