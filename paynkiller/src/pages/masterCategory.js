import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, addCategory, editCategory, deleteCategory } from '../action'

import SideNav from '../components/sideNavigation'
import { Grid, Row, Col, Panel, Button, Modal, Input, IconButton } from 'rsuite'
import MaterialTable from 'material-table'
import swal from 'sweetalert'

const MasterCategory = () => {
    const [showModal, setShowModal] = React.useState({
        title: '',
        muncul: false,
        isi: '',
        id: null
    })
    const [modalDel, setModalDel] = React.useState({
        title: '',
        muncul: false,
        isi: '',
        id: null
    })

    const { categories } = useSelector((state) => {
        return {
            categories: state.categoryReducer.cate
        }
    })

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getCategory())
        console.log(categories)
    }, [])

    const add = () => {
        setShowModal({
            title: 'add',
            muncul: true,
            isi: '',
            id: null
        })
    }

    const save = () => {
        if (!showModal.isi) return swal("Oops!", "Input Form cannot be empty", "error")
        if (showModal.title === 'add') {
            console.log(showModal.isi)
            dispatch(addCategory(showModal.isi))
        } else if (showModal.title === 'edit') {
            console.log(showModal)
            dispatch(editCategory(showModal.isi, showModal.id))
        }

        setShowModal({
            title: '',
            muncul: false,
            isi: '',
            id: null
        })
    }

    const saveDel = () => {
        console.log(modalDel.id)
        dispatch(deleteCategory(modalDel.id))
        setModalDel({
            title: '',
            muncul: false,
            isi: '',
            id: null
        })
    }

    const edit = async (id_category, nama_category) => {
        await setShowModal({
            title: 'edit',
            muncul: true,
            isi: nama_category,
            id: id_category
        })
    }

    const del = (id_category, nama_category) => {
        setModalDel({
            title: 'delete',
            muncul: true,
            isi: `are you sure you want to delete '${nama_category}' ?`,
            id: id_category
        })

        console.log(modalDel)
    }

    const close = () => {
        setShowModal({
            title: '',
            muncul: false,
            isi: '',
            id: null
        })
    }

    const closeDel = () => {
        setModalDel({
            title: '',
            muncul: false,
            isi: '',
            id: null
        })
    }

    return (
        <div>
            <Grid fluid style={{ margin: "0px", padding: "0px" }}>
                <Row style={{ margin: "0px", padding: "0px" }}>
                    <SideNav />
                    <Col md={3}>
                    
                    </Col>
                    <Col md={21}>
                        <Row style={{ padding: "60px 40px" }}>
                            <Col md={24}>
                                <Panel shaded style={{padding: '20px'}}>
                                    <Row>
                                        <Col md={21}>
                                            <p style={{ fontSize: "25px", color: "#04BF8A" }}>Master Category</p>
                                        </Col>
                                        <Col md={3}>
                                            <Button color="cyan" style={{ width: "100%" }} onClick={add}>
                                                Tambah Data
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: "25px" }}>
                                        <Col md={24}>
                                            <MaterialTable
                                                columns={[
                                                    { title: 'Nama Kategori', field: 'nama_category' }
                                                ]}
                                                data={categories}
                                                actions={[
                                                    {
                                                        icon: 'edit',
                                                        tooltip: 'Edit',
                                                        onClick: (event, rowData) => edit(rowData.id_category, rowData.nama_category)
                                                    },
                                                    {
                                                        icon: 'delete',
                                                        tooltip: 'Delete',
                                                        onClick: (event, rowData) => del(rowData.id_category, rowData.nama_category)
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

            <Modal show={showModal.muncul} onHide={close} style={{ width: '300px', justifySelf: 'center', position: 'fixed', top: '35%', left: '40%' }}>
                <Modal.Header>{showModal.title} category</Modal.Header>
                <Modal.Body>
                    <p>name</p>
                    <Input
                        value={showModal.isi}
                        onChange={value => setShowModal({ ...showModal, isi: value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: '#40e0d0', color: 'white' }} onClick={save}>
                        save
                    </Button>
                    <Button variant="secondary" onClick={close}>
                        cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={modalDel.muncul} onHide={closeDel} style={{ width: '300px', justifySelf: 'center', position: 'fixed', top: '35%', left: '40%' }}>
                <Modal.Header>{modalDel.title} category</Modal.Header>
                <Modal.Body>
                    <p>{modalDel.isi}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveDel}>
                        yes
                    </Button>
                    <Button style={{ backgroundColor: '#40e0d0', color: 'white' }} onClick={closeDel}>
                        cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MasterCategory