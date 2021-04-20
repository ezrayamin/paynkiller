import React, {useState} from 'react'

import SideNav from '../components/sideNavigation'
import {Row, Col, Panel, Button, Modal, Grid, Form, FormGroup, ControlLabel, FormControl, Input} from 'rsuite'


import {useDispatch, useSelector} from 'react-redux'

import {getAdmin,removeError,addAdmin,deactiveAdmin} from '../action/adminAction'

import MaterialTable from 'material-table'

import swal from 'sweetalert'

export default function MasterAdmin() {


    const[openModalAdd,setOpenModalAdd] = useState(false)
    const[openModalEdit,setOpenModalEdit] = useState(false)
    
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    

    const[textError,setTextError] = useState(false)



    const {loginError, adminData} = useSelector((state) => {
        return {
            loginError: state.adminReducer.errLogin,
            adminData: state.adminReducer.dataAdmin,
        }
      })

    const dispatch = useDispatch()

    React.useEffect(() => {
        document.body.style.backgroundColor = "#f4f3f3";
        dispatch(getAdmin())
        if(loginError){
            setTextError(true)
        }
    }, [loginError])


    const handleAddAdmin = () => {
        console.log(username,password)
        let body = {username,password}
        dispatch(addAdmin(body))

        setOpenModalAdd(false)
        setUsername("")
        setPassword("")
    }

    const handleDeactiveAccount = async(id_admin,status) => {
        if(status === 2) return swal("Opps!", "Akun sudah tidak aktif !", "error");

        await dispatch(deactiveAdmin(id_admin))

        swal("Yeah!", "Akun berhasil dinonaktifkan !", "success");

    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false)
        setUsername("")
        setPassword("")
    }

    const handleModalError = () => {
        setTextError(false)
        dispatch(removeError())
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
                                        <p style={{fontSize: "25px", color: "#04BF8A"}}>Management Admin</p>
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
                                                { title: 'Username', field: 'username' },
                                                { title: 'Status', field: 'nama_status'}
                                            ]}
                                            data={adminData}
                                            actions={[
                                                // {
                                                //     icon: 'edit',
                                                //     tooltip: 'Edit',
                                                //     onClick: (event, rowData) => handleOpenModalEdit(rowData.id_brand,rowData.nama_brand,rowData.kode_brand)
                                                // },
                                                {
                                                    icon: 'highlight_off',
                                                    tooltip: 'Delete',
                                                    onClick: (event, rowData) => handleDeactiveAccount(rowData.id_admin,rowData.status)
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
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Add Data Admin</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <FormGroup>
                                        <ControlLabel>Username</ControlLabel>
                                        <FormControl value={username} onChange={(value, event) => setUsername(value)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl value={password} onChange={(value, event) => setPassword(value)}/>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleAddAdmin()}>
                    Add Data
                    </Button>
                    <Button onClick={() => handleCloseModalAdd(false)} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <Modal backdrop="static" show={openModalEdit} onHide={() => setOpenModalEdit(false)} size="sm">
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
