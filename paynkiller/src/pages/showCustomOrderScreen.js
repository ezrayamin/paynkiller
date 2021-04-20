import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Modal, Button } from 'rsuite'

import Navbar from "../components/TopNavigation"

const URL_IMG = "http://localhost:2000/";
const { Column, HeaderCell, Cell } = Table


const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0, height: 300 }}>
        <div
            style={{
                width: '100%',
                height: 100
            }}
        >
            <img src={URL_IMG + rowData[dataKey]} width="100%" height='220' />
        </div>
    </Cell>
)



const ShowCustomOrderScreen = () => {
    const dispatch = useDispatch()
    const [Data, setData] = React.useState([])
    const [Data2, setData2] = React.useState([])
    const [show, setShow] = React.useState(false)
    const [idCO, setIdCO] = React.useState(null)
    const { id_customer } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer
        }
    })
    React.useEffect(() => {
        if (id_customer) {
            axios.get(`http://localhost:2000/customorder/ShowCustomOrder/${id_customer}`)
                .then((res) => setData(res.data))
                .catch((err) => console.log(err))
        }
    }, [id_customer])
    React.useEffect(() => {
        if (idCO) {
            axios.get(`http://localhost:2000/customorder/getcustomorderdetail/${idCO}`)
            .then((res) => setData2(res.data))
        }
    }, [idCO])
    console.log(Data)

    const showDetail = (data) => {
        console.log(data)
        setIdCO(data)
        setShow(true)
    }
    return (
        <div style={{ backgroundColor: ' #04BF8A', height: '100vh' }}>
            <Navbar />
            <div style={{ width: 720, margin: 'auto', paddingTop: 20 }}>
                <Table
                    height={630}
                    data={Data}
                    onRowClick={(data) => showDetail(data.id_custom_order)}
                    rowHeight={(rowData) => {
                        return 220
                    }}
                    headerHeight={50}
                >
                    <Column width={70} align="center" fixed>
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Id</HeaderCell>
                        <Cell dataKey="id_custom_order" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={250}  >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Gambar resep</HeaderCell>
                        <ImageCell dataKey='gambar_resep' />
                    </Column>

                    <Column width={200}>
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Kode Custom Order</HeaderCell>
                        <Cell dataKey="kode_custom_order" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={200}>
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Status</HeaderCell>
                        <Cell dataKey="status" style={{ fontSize: 16 }} />
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
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Kode Bahan</HeaderCell>
                        <Cell dataKey="kode_bahan_baku" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={250}  >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Nama Bahan</HeaderCell>
                        <Cell dataKey='nama_bahan_baku'  style={{ fontSize: 16 }}/>
                    </Column>

                    <Column width={140}>
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Satuan</HeaderCell>
                        <Cell dataKey="nama_uom" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={200}>
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Harga per satuan</HeaderCell>
                        <Cell>
                            {(rowData) => {
                                return(
                                    <p style={{ fontSize: 16 }}>Rp. {rowData.harga_bahan_baku}</p>
                                )
                            }}
                        </Cell>
                    </Column>
                    <Column width={180}>
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Jumlah Beli</HeaderCell>
                        <Cell dataKey="total_beli_satuan" style={{ fontSize: 16 }} />
                    </Column>
                    <Column width={200}>
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Total Harga</HeaderCell>
                        <Cell>
                        {(rowData) => {
                                return(
                                    <p style={{ fontSize: 16 }}>Rp. {rowData.total_harga}</p>
                                )
                            }}
                        </Cell>
                    </Column>
                </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)} style={{backgroundColor: '#04BF8A', color:'white', fontWeight:'bold', width:100}}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ShowCustomOrderScreen
