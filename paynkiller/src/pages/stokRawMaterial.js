import React, {useState} from 'react'

import SideNav from '../components/sideNavigation'
import {Row, Col, Panel, Button, Modal, Grid, Form, FormGroup, ControlLabel, InputPicker, InputNumber} from 'rsuite'


import {useDispatch, useSelector} from 'react-redux'
import {getStockRawMaterials, removeError, addStockRawMaterial, deleteStockRawMaterial, tambahStockBahan} from '../action/stokRawMaterialAction'
import {selectPickerRawMaterial} from '../action/rawMaterialAction'

import '../css/pages/stokRawMaterial.css'

import MaterialTable from 'material-table'

import swal from 'sweetalert'

export default function StokRawMaterial() {


    const[openModalAdd,setOpenModalAdd] = useState(false)
    const[openModalEdit,setOpenModalEdit] = useState(false)
    
    const[jumlahBotol,setJumlahBotol] = useState(null)
    const[bahanId,setBahanId] = useState(null)
    const[tempId,setTempId] = useState(null)
    
    const[textError,setTextError] = useState(false)


    
    const {loginError,stockRawMaterialData,dataBahan} = useSelector((state) => {
        return {
            loginError: state.stockRawMaterialReducer.errLogin,
            stockRawMaterialData: state.stockRawMaterialReducer.dataStockRawMaterial,
            dataBahan: state.rawMaterialReducer.dataSelectPickerRawMaterial
        }
      })

    const dispatch = useDispatch()

    React.useEffect(() => {
        document.body.style.backgroundColor = "#f4f3f3";
        dispatch(getStockRawMaterials())
        dispatch(selectPickerRawMaterial())
        if(loginError){
            setTextError(true)
        }
    }, [loginError,stockRawMaterialData.length,dataBahan.length])

    const handleAddStokBahan = () => {
        
        if(!bahanId && !jumlahBotol) return swal("Opps!", "Inputan tidak boleh kosong !", "error");
        
        let id_bahan = bahanId
        let jumlah_botol = jumlahBotol

        const data = {id_bahan, jumlah_botol}
        console.log(data)

        dispatch(addStockRawMaterial(data))
        
        setOpenModalAdd(false)
        setBahanId(null)
        setJumlahBotol(null)
    }

    const handleOpenModalEdit = async(id_brand) => {
        setTempId(id_brand)
        setOpenModalEdit(true)
    }

    const handleTambahStok = () => {
        if(!jumlahBotol && jumlahBotol == null) return swal("Opps!", "Data tidak boleh kosong dan 0 !", "error")
        let jumlah_botol = jumlahBotol
        let data = {jumlah_botol}

        dispatch(tambahStockBahan(tempId,data))

        setOpenModalEdit(false)
        setJumlahBotol(null)
        setBahanId(null)

    }

    const handleModalError = () => {
        setTextError(false)
        dispatch(removeError())
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false)
        setBahanId(null)
        setJumlahBotol(null)
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
        setJumlahBotol(null)
        setTempId(null)
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
                                        <p style={{fontSize: "25px", color: "#04BF8A"}}>Stock Raw Materials</p>
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
                                                { title: 'Kode Bahan', field: 'kode_bahan_baku' },
                                                { title: 'Nama Bahan', field: 'nama_bahan_baku' },
                                                { title: 'Kapasitas Botol', field: 'total_kapasitas' },
                                                { title: 'Satuan', field: 'nama_uom' },
                                                { title: 'Jumlah Botol', field: 'jumlah_botol' },
                                                { title: 'Total Stok', field: 'total_bahan' },
                                                
                                            ]}
                                            data={stockRawMaterialData}
                                            actions={[
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit',
                                                    onClick: (event, rowData) => handleOpenModalEdit(rowData.id_stok_bahan)
                                                },
                                                {
                                                    icon: 'delete',
                                                    tooltip: 'Delete',
                                                    onClick: (event, rowData) => dispatch(deleteStockRawMaterial(rowData.id_stok_bahan))
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

            <Modal backdrop="static" show={openModalAdd} onHide={() => setOpenModalAdd(false)} size="md">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Add Stock Raw Material</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <FormGroup>
                                        <ControlLabel>Bahan Baku</ControlLabel>
                                        <InputPicker className="fieldStyle" value={bahanId} data={dataBahan} style={{ width: "100%" }} onChange={(value, event) => setBahanId(value)}  />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Jumlah Botol</ControlLabel>
                                        <InputNumber className="fieldStyle"  style={{marginTop: "11px",width: "100%"}} value={jumlahBotol} onChange={(value, event) => setJumlahBotol(value)}/>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleAddStokBahan()}>
                    Add Data
                    </Button>
                    <Button onClick={() => handleCloseModalAdd(false)} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal backdrop="static" show={openModalEdit} onHide={() => setOpenModalEdit(false)} size="xs">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Tambah Stock Bahan</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <FormGroup>
                                        <ControlLabel>Jumlah Botol</ControlLabel>
                                        <InputNumber className="fieldStyle"  style={{marginTop: "11px",width: "100%"}} value={jumlahBotol} onChange={(value, event) => setJumlahBotol(value)}/>
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
                    <Button onClick={() => handleCloseModalEdit()} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            

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
