import React, {useState} from 'react'

import SideNav from '../components/sideNavigation'
import {Row, Col, Panel, Button, Modal, Grid, Form, FormGroup, ControlLabel, FormControl, Input} from 'rsuite'


import {useDispatch, useSelector} from 'react-redux'
import {addUom, getUoms,removeError, deleteUom, editUom} from '../action/uomAction'

import MaterialTable from 'material-table'

import swal from 'sweetalert'

export default function MasterUom() {


    const[openModalAdd,setOpenModalAdd] = useState(false)
    const[openModalEdit,setOpenModalEdit] = useState(false)
    
    const[namaUom,setNamaUom] = useState("")
    const[keterangan,setKeterangan] = useState("")
    
    const[editNamaUom,setEditNamaUom] = useState("")
    const[editKeterangan,setEditKeterangan] = useState("")
    const[tempId,setTempId] = useState(null)
    
    const[textError,setTextError] = useState(false)



    const {loginError,uomData} = useSelector((state) => {
        return {
            loginError: state.uomReducer.errLogin,
            uomData: state.uomReducer.dataUom,
        }
      })

    const dispatch = useDispatch()

    React.useEffect(() => {
        document.body.style.backgroundColor = "#f4f3f3";
        dispatch(getUoms())
        if(loginError){
            setTextError(true)
        }
    }, [loginError,uomData.length])

    const handleAddUom = () => {

        if(!namaUom && !keterangan) return swal("Opps!", "Inputan tidak boleh kosong !", "error");
        
        let nama_uom = namaUom

        const data = {nama_uom, keterangan}

        dispatch(addUom(data))
        

        setOpenModalAdd(false)
        setNamaUom("")
        setKeterangan("")
    }

    const handleOpenModalEdit = (id_brand,nama_brand,kode_brand) => {
        setTempId(id_brand)
        setEditNamaUom(nama_brand)
        setEditKeterangan(kode_brand)
        setOpenModalEdit(true)
    }

    const handleSaveEditUom = async(id_uom) => {

        let nama_uom = editNamaUom
        let keterangan = editKeterangan
        let data = {nama_uom,keterangan}

        await dispatch(editUom(id_uom,data))

        setOpenModalEdit(false)
        setEditNamaUom("")
        setEditKeterangan("")
    }

    const handleModalError = () => {
        setTextError(false)
        dispatch(removeError())
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false)
        setNamaUom("")
        setKeterangan("")
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
        setEditNamaUom("")
        setEditKeterangan("")
    }
    
    return (
        <div style={{backgroundColor: "#f4f3f3"}}>
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
                                        <p style={{fontSize: "25px", color: "#04BF8A"}}>Master Unit Of Measurements</p>
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
                                                { title: 'Nama UOM', field: 'nama_uom' },
                                                { title: 'Keterangan', field: 'keterangan' }
                                            ]}
                                            data={uomData}
                                            actions={[
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit',
                                                    onClick: (event, rowData) => handleOpenModalEdit(rowData.id_uom,rowData.nama_uom,rowData.keterangan)
                                                },
                                                {
                                                    icon: 'delete',
                                                    tooltip: 'Delete',
                                                    onClick: (event, rowData) => dispatch(deleteUom(rowData.id_uom))
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
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Add Data Uom</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <FormGroup>
                                        <ControlLabel>Nama UOM</ControlLabel>
                                        <FormControl value={namaUom} onChange={(value, event) => setNamaUom(value)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Keterangan</ControlLabel>
                                        <FormControl value={keterangan} onChange={(value, event) => setKeterangan(value)}/>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleAddUom()}>
                    Add Data
                    </Button>
                    <Button onClick={() => handleCloseModalAdd(false)} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal backdrop="static" show={openModalEdit} onHide={() => setOpenModalEdit(false)} size="sm">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Edit Data UOM</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <FormGroup>
                                        <ControlLabel>Nama UOM</ControlLabel>
                                        <Input type="text" defaultValue={editNamaUom} onChange={(value, event) => setEditNamaUom(value)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Nama Brand</ControlLabel>
                                        <Input type="text" defaultValue={editKeterangan} onChange={(value, event) => setEditKeterangan(value)}/>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleSaveEditUom(tempId)}>
                    Add Data
                    </Button>
                    <Button onClick={() => handleCloseModalEdit(false)} appearance="subtle">
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
