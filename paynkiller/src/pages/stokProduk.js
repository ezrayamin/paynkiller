import React, {useState} from 'react'

import SideNav from '../components/sideNavigation'
import {Row, Col, Panel, Button, Modal, Grid, Header, Form, FormGroup, ControlLabel, FormControl, InputPicker, InputNumber} from 'rsuite'


import {useDispatch, useSelector} from 'react-redux'

import {getStockProducts, removeError, addStockProduct, deleteStockProduct, tambahStockProduct} from '../action/stokProdukAction'
import {selectPickerProduct} from '../action/productAction'

import MaterialTable from 'material-table'

import swal from 'sweetalert'

import '../css/pages/stokProduct.css'

export default function StokProduk() {


    const[openModalAdd,setOpenModalAdd] = useState(false)
    const[openModalEdit,setOpenModalEdit] = useState(false)
    
    const[jumlahProduk,setJumlahProduk] = useState(null)
    const[produkId,setProdukId] = useState(null)
    const[tempId,setTempId] = useState(null)
    
    const[textError,setTextError] = useState(false)

    const {loginError,stockProductData, productData} = useSelector((state) => {
        return {
            loginError: state.stockProdukReducer.errLogin,
            stockProductData: state.stockProdukReducer.dataStokProduct,
            productData: state.productReducer.dataSelectPickerProduct
        }
      })

    const dispatch = useDispatch()

    React.useEffect(() => {
        document.body.style.backgroundColor = "#f4f3f3";
        dispatch(getStockProducts())
        dispatch(selectPickerProduct())
        if(loginError){
            setTextError(true)
        }
    }, [loginError,stockProductData.length,productData.length])

    const handleAddStokProduk = () => {
        // console.log(namaBrand,kodeBrand)

        if(!produkId && !jumlahProduk) return swal("Opps!", "Inputan tidak boleh kosong !", "error");
        
        let id_produk = produkId
        let jumlah_produk = jumlahProduk

        const data = {id_produk, jumlah_produk}

        dispatch(addStockProduct(data))
        
        setOpenModalAdd(false)
        setJumlahProduk(null)
        setProdukId(null)
    }

    const handleTambahStok = () => {

        if(!jumlahProduk && jumlahProduk == null) return swal("Opps!", "Data tidak boleh kosong dan 0 !", "error")

        let jumlah_produk = jumlahProduk
        let data = {jumlah_produk}

        dispatch(tambahStockProduct(tempId,data))

        setOpenModalEdit(false)
        setJumlahProduk(null)
        setProdukId(null)

    }

    const handleOpenModalEdit = (id_stok_produk) => {
        setTempId(id_stok_produk)
        setOpenModalEdit(true)
    }

    // const handleSaveEditBrand = async(id_brand) => {

    //     console.log(id_brand,editNamaBrand,editKodeBrand)

    //     let nama_brand = editNamaBrand
    //     let kode_brand = editKodeBrand
    //     let data = {nama_brand,kode_brand}

    //     await dispatch(editBrand(id_brand,data))

    //     setOpenModalEdit(false)
    //     setEditNamaBrand("")
    //     setEditKodeBrand("")
    // }

    const handleModalError = () => {
        setTextError(false)
        dispatch(removeError())
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false)
        setJumlahProduk(null)
        setProdukId(null)
    }

    
    
    return (
        <div>
            <Grid fluid style={{margin: "0px", padding: "0px"}}>
                <Row style={{margin: "0px", padding: "0px"}}>
                    <SideNav/>
                    <Col md={3}>
                    
                    </Col>
                    <Col md={21}>
                        <Row style={{padding: "60px 40px"}}>
                            <Col md={24}>
                            <Panel shaded style={{padding: '20px'}}>
                                <Row>
                                    <Col md={21}>
                                        <p style={{fontSize: "25px", color: "#04BF8A"}}>Stock Products</p>
                                    </Col>
                                    <Col md={3}>
                                    <Button color="cyan" style={{width: "100%"}} onClick={() => setOpenModalAdd(true)}>
                                        Tambah Data
                                    </Button>
                                    </Col>
                                </Row>
                                <Row style={{paddingTop: "25px"}}>
                                    <Col md={24}>
                                        <MaterialTable
                                            columns={[
                                                { title: 'Kode Product', field: 'kode_produk' },
                                                { title: 'Nama Product', field: 'nama_produk' },
                                                { title: 'Jumlah Product', field: 'jumlah_produk' },

                                            ]}
                                            data={stockProductData}
                                            actions={[
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit',
                                                    onClick: (event, rowData) => handleOpenModalEdit(rowData.id_stok_produk)
                                                },
                                                {
                                                    icon: 'delete',
                                                    tooltip: 'Delete',
                                                    onClick: (event, rowData) => dispatch(deleteStockProduct(rowData.id_stok_produk))
                                                },
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
                </Row>
            </Grid>

            <Modal backdrop="static" show={openModalAdd} onHide={() => setOpenModalAdd(false)} size="sm">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Add Data Brands</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <FormGroup>
                                        <ControlLabel>Product</ControlLabel>
                                        <InputPicker className="fieldStyle" value={produkId} data={productData} style={{ width: "100%" }} onChange={(value, event) => setProdukId(value)}  />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Total Stok</ControlLabel>
                                        <InputNumber className="fieldStyle"  style={{marginTop: "11px",width: "100%"}} value={jumlahProduk} onChange={(value, event) => setJumlahProduk(value)}/>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleAddStokProduk()}>
                    Add Data
                    </Button>
                    <Button onClick={() => handleCloseModalAdd()} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal backdrop="static" show={openModalEdit} onHide={() => setOpenModalEdit(false)} size="sm">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Tambah Stok</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <FormGroup>
                                        <ControlLabel>Total Stok</ControlLabel>
                                        <InputNumber className="fieldStyle"  style={{marginTop: "11px",width: "100%"}} value={jumlahProduk} onChange={(value, event) => setJumlahProduk(value)}/>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleTambahStok()}>
                    Add Data
                    </Button>
                    <Button onClick={() => setOpenModalEdit(false)} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <Modal backdrop="static" show={openModalEdit === true} onHide={openModalEdit === false} size="sm">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Edit Data Brands</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <FormGroup>
                                        <ControlLabel>Kode Brand</ControlLabel>
                                        <Input type="text" defaultValue={editKodeBrand} onChange={(value, event) => setEditKodeBrand(value)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Nama Brand</ControlLabel>
                                        <Input type="text" defaultValue={editNamaBrand} onChange={(value, event) => setEditNamaBrand(value)}/>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleSaveEditBrand(brandDataSpecific.id_brand)}>
                    Add Data
                    </Button>
                    <Button onClick={() => handleCloseModalEdit(false)} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal> */}

            <Modal backdrop="static" show={textError} onHide={() => setTextError(false)} size="xs">
                <Modal.Body>
                   <p>{loginError}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleModalError()} appearance="primary">
                    Ok
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
