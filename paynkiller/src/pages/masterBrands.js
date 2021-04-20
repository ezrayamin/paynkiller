import React, {useState} from 'react'

import SideNav from '../components/sideNavigation'
import {Row, Col, Panel, Button, Modal, Grid, Form, FormGroup, ControlLabel, FormControl, Input} from 'rsuite'


import {useDispatch, useSelector} from 'react-redux'
import { addBrand, removeError, getBrands, deleteBrand, getSpecificBrand, editBrand} from '../action/brandAction'

import MaterialTable from 'material-table'

import swal from 'sweetalert'

export default function MasterBrands() {


    const[openModalAdd,setOpenModalAdd] = useState(false)
    const[openModalEdit,setOpenModalEdit] = useState(false)
    
    const[namaBrand,setNamaBrand] = useState("")
    const[kodeBrand,setKodeBrand] = useState("")
    
    const[editNamaBrand,setEditNamaBrand] = useState("")
    const[editKodeBrand,setEditKodeBrand] = useState("")

    
    const[textError,setTextError] = useState(false)



    const {loginError,brandData,brandDataSpecific} = useSelector((state) => {
        return {
            loginError: state.brandReducer.errLogin,
            brandData: state.brandReducer.dataBrand,
            brandDataSpecific: state.brandReducer.getDataBrand
        }
      })

    const dispatch = useDispatch()

    React.useEffect(() => {
        document.body.style.backgroundColor = "#f4f3f3";
        dispatch(getBrands())
        if(loginError){
            setTextError(true)
        }
    }, [loginError,brandData.length,brandDataSpecific.length])

    const handleAddBrand = () => {
        console.log(namaBrand,kodeBrand)

        if(!namaBrand && !kodeBrand) return swal("Opps!", "Inputan tidak boleh kosong !", "error");
        
        let nama_brand = namaBrand
        let kode_brand = kodeBrand

        const data = {nama_brand, kode_brand}

        dispatch(addBrand(data))
        

        setOpenModalAdd(false)
        setNamaBrand("")
        setKodeBrand("")
    }

    const handleOpenModalEdit = async(id_brand,nama_brand,kode_brand) => {
        setEditNamaBrand(nama_brand)
        setEditKodeBrand(kode_brand)
        await dispatch(getSpecificBrand(id_brand))
        setOpenModalEdit(true)
    }

    const handleSaveEditBrand = async(id_brand) => {

        console.log(id_brand,editNamaBrand,editKodeBrand)

        let nama_brand = editNamaBrand
        let kode_brand = editKodeBrand
        let data = {nama_brand,kode_brand}

        await dispatch(editBrand(id_brand,data))

        setOpenModalEdit(false)
        setEditNamaBrand("")
        setEditKodeBrand("")
    }

    const handleModalError = () => {
        setTextError(false)
        dispatch(removeError())
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false)
        setNamaBrand("")
        setKodeBrand("")
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
        setEditNamaBrand("")
        setEditKodeBrand("")
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
                                        <p style={{fontSize: "25px", color: "#04BF8A"}}>Master Brand</p>
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
                                                { title: 'Kode Brand', field: 'kode_brand' },
                                                { title: 'Nama Brand', field: 'nama_brand' }
                                            ]}
                                            data={brandData}
                                            actions={[
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit',
                                                    onClick: (event, rowData) => handleOpenModalEdit(rowData.id_brand,rowData.nama_brand,rowData.kode_brand)
                                                },
                                                {
                                                    icon: 'delete',
                                                    tooltip: 'Delete',
                                                    onClick: (event, rowData) => dispatch(deleteBrand(rowData.id_brand))
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
                                        <ControlLabel>Kode Brand</ControlLabel>
                                        <FormControl value={kodeBrand} onChange={(value, event) => setKodeBrand(value)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Nama Brand</ControlLabel>
                                        <FormControl value={namaBrand} onChange={(value, event) => setNamaBrand(value)}/>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleAddBrand()}>
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
