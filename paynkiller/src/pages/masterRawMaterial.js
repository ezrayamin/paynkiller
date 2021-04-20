import React, {useState, useReducer} from 'react'

import SideNav from '../components/sideNavigation'
import {Row, Col, Panel, Button, Modal, Grid, Header, Form, FormGroup, ControlLabel, FormControl, InputNumber, Input, InputPicker} from 'rsuite'


import {useDispatch, useSelector} from 'react-redux'
import {addRawMaterial, getRawMaterial,removeError,deleteRawMaterial,editRawMaterial} from '../action/rawMaterialAction'
import {selectPickerUom} from '../action/uomAction'

import MaterialTable from 'material-table'

import swal from 'sweetalert'

import '../css/pages/masterRawMaterial.css'

export default function MasterRawMaterial() {


    const[openModalAdd,setOpenModalAdd] = useState(false)
    const[openModalEdit,setOpenModalEdit] = useState(false)
    
    const[tempId,setTempId] = useState(null)
    const[namaBahanBaku, setNamaBahanBaku] = useState("")
    const[hargaBahanBaku, setHargaBahanBaku] = useState(null)
    const[deskripsiBahanBaku, setDeskripsiBahanBaku] = useState("")
    const[totalKapasitas,setTotalKapasitas] = useState(null)
    const[idUom,setIdUom] = useState(null)
    
    
    const[textError,setTextError] = useState(false)


    const {loginError,rawMaterialData,dataUom} = useSelector((state) => {
        return {
            loginError: state.rawMaterialReducer.errLogin,
            rawMaterialData: state.rawMaterialReducer.dataRawMaterial,
            dataUom: state.uomReducer.selectPickerUom
        }
      })

    const dispatch = useDispatch()

    React.useEffect(() => {
        document.body.style.backgroundColor = "#f4f3f3";
        dispatch(getRawMaterial())
        dispatch(selectPickerUom())
        if(loginError){
            setTextError(true)
        }
    }, [loginError,rawMaterialData.length,dataUom.length])

    const handleAddRawMaterial = () => {
        // console.log(namaBrand,kodeBrand)

        if(!namaBahanBaku && !hargaBahanBaku && !deskripsiBahanBaku && !totalKapasitas && !idUom) return swal("Opps!", "Inputan tidak boleh kosong !", "error");
        
        let nama_bahan_baku = namaBahanBaku
        let harga_bahan_baku = hargaBahanBaku
        let deskripsi_bahan = deskripsiBahanBaku
        let total_kapasitas = totalKapasitas
        let id_uom = idUom

        const data = {nama_bahan_baku, harga_bahan_baku, deskripsi_bahan, total_kapasitas, id_uom}

        dispatch(addRawMaterial(data))
        

        setOpenModalAdd(false)
        setNamaBahanBaku("")
        setHargaBahanBaku(null)
        setDeskripsiBahanBaku("")
        setTotalKapasitas(null)
        setIdUom(null)
    }

    const handleOpenModalEdit = (id_bahan_baku,
        nama_bahan_baku,
        harga_bahan_baku,
        total_kapasitas,
        id_uom,
        deskripsi_bahan) => {
        
        setTempId(id_bahan_baku)
        setNamaBahanBaku(nama_bahan_baku)
        setHargaBahanBaku(harga_bahan_baku)
        setTotalKapasitas(total_kapasitas)
        setIdUom(id_uom)
        setDeskripsiBahanBaku(deskripsi_bahan)
        
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

    const handleEditRawMaterial = () => {

        
        let nama_bahan_baku = namaBahanBaku
        let harga_bahan_baku = hargaBahanBaku
        let deskripsi_bahan = deskripsiBahanBaku
        let total_kapasitas = totalKapasitas
        let id_uom = idUom

        for(let x in rawMaterialData){
            console.log(rawMaterialData[x].nama_bahan_baku)
            if(nama_bahan_baku === rawMaterialData[x].nama_bahan_baku && 
                harga_bahan_baku === rawMaterialData[x].harga_bahan_baku &&
                deskripsi_bahan === rawMaterialData[x].deskripsi_bahan &&
                total_kapasitas === rawMaterialData[x].total_kapasitas &&
                id_uom === rawMaterialData[x].id_uom 
                ){
                return swal("Opps!", "Data Bahan Baku Tidak Boleh Sama !", "error");
            }
        }

        const data = {nama_bahan_baku, harga_bahan_baku, deskripsi_bahan, total_kapasitas, id_uom}

        dispatch(editRawMaterial(tempId,data))

        setOpenModalEdit(false)
        setTempId(null)
        setNamaBahanBaku("")
        setHargaBahanBaku(null)
        setDeskripsiBahanBaku("")
        setTotalKapasitas(null)
        setIdUom(null)

    }

    const handleModalError = () => {
        setTextError(false)
        dispatch(removeError())
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
        setTempId(null)
        setNamaBahanBaku("")
        setHargaBahanBaku(null)
        setDeskripsiBahanBaku("")
        setTotalKapasitas(null)
        setIdUom(null)
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false)
        setNamaBahanBaku("")
        setHargaBahanBaku(null)
        setDeskripsiBahanBaku("")
        setTotalKapasitas(null)
        setIdUom(null)
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
                            <Panel shaded style={{padding: '20px'}} >
                                <Row>
                                    <Col md={21}>
                                        <p style={{fontSize: "25px", color: "#04BF8A"}}>Master Bahan Baku</p>
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
                                                { title: 'Kode Bahan Baku', field: 'kode_bahan_baku' },
                                                { title: 'Nama Bahan Baku', field: 'nama_bahan_baku' },
                                                { title: 'Harga per satuan', field: 'harga_bahan_baku' },
                                                { title: 'Isi Botol', field: 'total_kapasitas' },
                                                { title: 'Satuan Botol', field: 'nama_uom' },
                                                { title: 'Deskripsi', field: 'deskripsi_bahan' },
                                            ]}
                                            data={rawMaterialData}
                                            actions={[
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit',
                                                    onClick: (event, rowData) => handleOpenModalEdit(
                                                        rowData.id_bahan_baku,
                                                        rowData.nama_bahan_baku,
                                                        rowData.harga_bahan_baku,
                                                        rowData.total_kapasitas,
                                                        rowData.id_uom,
                                                        rowData.deskripsi_bahan
                                                    )
                                                },
                                                {
                                                    icon: 'delete',
                                                    tooltip: 'Delete',
                                                    onClick: (event, rowData) => dispatch(deleteRawMaterial(rowData.id_bahan_baku))
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

            <Modal backdrop="static" show={openModalAdd} onHide={() => setOpenModalAdd(true)} size="md">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Add Data Bahan Baku</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Nama Bahan Baku</ControlLabel>
                                                <FormControl className="fieldStyle" value={namaBahanBaku} onChange={(value, event) => setNamaBahanBaku(value)}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Harga Bahan Baku</ControlLabel>
                                                <InputNumber className="fieldStyle"  style={{marginTop: "11px",width: "100%"}} prefix="Rp" value={hargaBahanBaku} onChange={(value, event) => setHargaBahanBaku(value)}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Total Kapasitas Botol</ControlLabel>
                                                <InputNumber className="fieldStyle" style={{marginTop: "11px",width: "100%"}} value={totalKapasitas} onChange={(value, event) => setTotalKapasitas(value)}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Satuan</ControlLabel>
                                                <InputPicker className="fieldStyle" value={idUom} data={dataUom} style={{ width: "100%" }} onChange={(value, event) => setIdUom(value)}  />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24}>
                                            <FormGroup>
                                                <ControlLabel>Deskripsi</ControlLabel>
                                                <Input className="fieldStyle" componentClass="textarea" value={deskripsiBahanBaku} rows={3} onChange={(value, event) => setDeskripsiBahanBaku(value)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleAddRawMaterial()}>
                    Add Data
                    </Button>
                    <Button onClick={() => handleCloseModalAdd(false)} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal backdrop="static" show={openModalEdit} onHide={() => setOpenModalEdit(true)} size="md">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Edit Data Bahan Baku</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Nama Bahan Baku</ControlLabel>
                                                <FormControl className="fieldStyle" defaultValue={namaBahanBaku} value={namaBahanBaku} onChange={(value, event) => setNamaBahanBaku(value)}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Harga Bahan Baku</ControlLabel>
                                                <InputNumber className="fieldStyle" defaultValue={hargaBahanBaku}  style={{marginTop: "11px",width: "100%"}} prefix="Rp" value={hargaBahanBaku} onChange={(value, event) => setHargaBahanBaku(value)}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Total Kapasitas Botol</ControlLabel>
                                                <InputNumber className="fieldStyle" defaultValue={totalKapasitas} style={{marginTop: "11px",width: "100%"}} value={totalKapasitas} onChange={(value, event) => setTotalKapasitas(value)}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Satuan</ControlLabel>
                                                <InputPicker className="fieldStyle" defaultValue={idUom} value={idUom} data={dataUom} style={{ width: "100%" }} onChange={(value, event) => setIdUom(value)}  />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24}>
                                            <FormGroup>
                                                <ControlLabel>Deskripsi</ControlLabel>
                                                <Input className="fieldStyle" defaultValue={deskripsiBahanBaku} componentClass="textarea" value={deskripsiBahanBaku} rows={3} onChange={(value, event) => setDeskripsiBahanBaku(value)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleEditRawMaterial()}>
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
