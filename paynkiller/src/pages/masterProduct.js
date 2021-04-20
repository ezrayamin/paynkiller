import React, {useState} from 'react'

import SideNav from '../components/sideNavigation'

import {Row, Col, Panel, Button, Modal, Grid, Form, FormGroup, ControlLabel, FormControl, InputNumber, Input, InputPicker, Avatar, } from 'rsuite'

import {useDispatch, useSelector} from 'react-redux'

import {getProducts, removeError, addProduct, editProduct, editGambarProduct, deleteProduct} from '../action/productAction'

import {selectPickerBrand} from '../action/brandAction'
import {selectPickerCategory} from '../action/categoryAction'

import MaterialTable from 'material-table'

import swal from 'sweetalert'

import '../css/pages/masterProduct.css'

const URL_IMG = 'http://localhost:2000/'

export default function MasterProduct() {

    
    const[openModalAdd,setOpenModalAdd] = useState(false)
    const[openModalEdit,setOpenModalEdit] = useState(false)
    const[openModalDetail,setOpenModalDetail] = useState(false)
    const[openModalEditGambar, setOpenModalEditGambar] = useState(false)
    
    const[namaProduk,setNamaProduk] = useState("")
    const[hargaProduk,setHargaProduk] = useState(null)
    const[indikasiUmum, setIndikasiUmum] = useState("")
    const[komposisi, setKomposisi] = useState("")
    const[aturanPakai, setAturanPakai] = useState("")
    const[keteranganObat, setKeteranganObat] = useState("")
    const[gambarObat, setGambarObat] = useState("")
    const[brandId,setBrandId] = useState(null)
    const[categoryId,setCategoryId] = useState("")
    
    const[tempId,setTempId] = useState(null)
    const[namaBrandDetail,setNamaBrandDetail] = useState("")
    const[namaCategoryDetail,setCategoryDetail] = useState("")
    const[kodeProdukDetail,setKodeProdukDetail] = useState("")
    const[editNamaProduk,setEditNamaProduk] = useState("")
    const[editHargaProduk,setEditHargaProduk] = useState(null)
    const[editIndikasiUmum, setEditIndikasiUmum] = useState("")
    const[editKomposisi, setEditKomposisi] = useState("")
    const[editAturanPakai, setEditAturanPakai] = useState("")
    const[editKeteranganObat, setEditKeteranganObat] = useState("")
    const[editGambarObat, setEditGambarObat] = useState("")
    const[editBrandId,setEditBrandId] = useState(null)
    const[editCategoryId,setEditCategoryId] = useState(null)
    
    const[textError,setTextError] = useState(false)



    const {loginError,productData,brandData,cate} = useSelector((state) => {
        return {
            loginError: state.productReducer.errLogin,
            productData: state.productReducer.dataProduct,
            brandData: state.brandReducer.selectPickerBrand,
            cate: state.categoryReducer.selectPickerCategory
        }
    })
    
    const dispatch = useDispatch()
    
    React.useEffect(() => {
        document.body.style.backgroundColor = "#f4f3f3";
        dispatch(getProducts())
        dispatch(selectPickerBrand())
        dispatch(selectPickerCategory())
        if(loginError){
            setTextError(true)
        }
    }, [loginError])

    const handleAddProduk = () => {
        
        if(!namaProduk || !hargaProduk || !indikasiUmum || !komposisi || !aturanPakai || !keteranganObat || !brandId || !categoryId || !gambarObat) return swal("Opps!", "Inputan tidak boleh kosong !", "error");
        
        let data = new FormData()
        data.append('IMG', gambarObat)
        console.log(data.get('IMG'))
        console.log(namaProduk,hargaProduk,indikasiUmum,komposisi,aturanPakai,keteranganObat,brandId,categoryId)

        let nama_produk = namaProduk
        let harga_produk = hargaProduk
        let indikasi_umum = indikasiUmum
        let aturan_pakai = aturanPakai
        let keterangan_obat = keteranganObat
        let id_brand = brandId
        let id_kategori = categoryId

        const dataObat = {nama_produk,harga_produk,indikasi_umum,komposisi,aturan_pakai,keterangan_obat,id_brand,id_kategori}

        dispatch(addProduct(dataObat,data))

        setOpenModalAdd(false)
        setNamaProduk("")
        setHargaProduk(null)
        setIndikasiUmum("")
        setKomposisi("")
        setAturanPakai("")
        setKeteranganObat("")
        setGambarObat("")
        setBrandId(null)
        setCategoryId(null)
    }

    const handleOpenModalDetail = (id_produk,kode_produk,nama_produk,harga_produk,indikasi_umum,komposisi,aturan_pakai,keterangan_obat,gambar_obat,id_brand,id_kategori,nama_category,nama_brand) => {

            setTempId(id_produk)
            setKodeProdukDetail(kode_produk)
            setEditNamaProduk(nama_produk)
            setEditHargaProduk(harga_produk)
            setEditIndikasiUmum(indikasi_umum)
            setEditKomposisi(komposisi)
            setEditAturanPakai(aturan_pakai)
            setEditKeteranganObat(keterangan_obat)
            setEditGambarObat(gambar_obat)
            setEditBrandId(id_brand)
            setEditCategoryId(id_kategori)
            setNamaBrandDetail(nama_brand)
            setCategoryDetail(nama_category)
            
            setOpenModalDetail(true)
            
    }

    const handleSaveGambarEdit = () => {
        let data = new FormData()
        data.append('IMG', gambarObat)
        dispatch(editGambarProduct(tempId,data))

        setOpenModalEditGambar(false)
        setOpenModalDetail(false)
        setGambarObat("")
        setTempId(null)
        setKodeProdukDetail("")
        setEditNamaProduk("")
        setEditHargaProduk(null)
        setEditIndikasiUmum("")
        setEditKomposisi("")
        setEditAturanPakai("")
        setEditKeteranganObat("")
        setEditGambarObat("")
        setEditBrandId(null)
        setEditCategoryId(null)
        setNamaBrandDetail("")
        setCategoryDetail("")

    }

    const handleCloseModalGambarEdit = () => {

        setOpenModalEditGambar(false)
        setOpenModalDetail(false)
        setGambarObat("")
        setTempId(null)
        setKodeProdukDetail("")
        setEditNamaProduk("")
        setEditHargaProduk(null)
        setEditIndikasiUmum("")
        setEditKomposisi("")
        setEditAturanPakai("")
        setEditKeteranganObat("")
        setEditGambarObat("")
        setEditBrandId(null)
        setEditCategoryId(null)
        setNamaBrandDetail("")
        setCategoryDetail("")
    }

    
    const handleSaveEditProduct = () => {

        let kode_produk = kodeProdukDetail
        let nama_produk = editNamaProduk
        let harga_produk = editHargaProduk
        let indikasi_umum = editIndikasiUmum
        let aturan_pakai = editAturanPakai
        let keterangan_obat = editKeteranganObat
        let id_brand = editBrandId
        let id_kategori = editCategoryId
        
        for(let x in productData){
            console.log(productData[x].nama_produk)
            if(nama_produk === productData[x].nama_produk &&
                harga_produk === productData[x].harga_produk &&
                indikasi_umum === productData[x].indikasi_umum &&
                aturan_pakai === productData[x].aturan_pakai &&
                keterangan_obat === productData[x].keterangan_obat &&
                id_brand === productData[x].id_brand &&
                id_kategori === productData[x].id_kategori                
                ){
                return swal("Opps!", "Data Produk Tidak Boleh Sama !", "error");
            }
        }

        const dataObat = {kode_produk,nama_produk,harga_produk,indikasi_umum,komposisi,aturan_pakai,keterangan_obat,id_brand,id_kategori}


        dispatch(editProduct(tempId,dataObat))

        setTempId(null)
        setKodeProdukDetail("")
        setEditNamaProduk("")
        setEditHargaProduk(null)
        setEditIndikasiUmum("")
        setEditKomposisi("")
        setEditAturanPakai("")
        setEditKeteranganObat("")
        setEditGambarObat("")
        setEditBrandId(null)
        setEditCategoryId(null)
        setNamaBrandDetail("")
        setCategoryDetail("")
        setOpenModalEdit(false)
        setOpenModalDetail(false)

    }

    const handleModalError = () => {
        setTextError(false)
        dispatch(removeError())
    }

    const handleCloseModalDetail = () => {

            setTempId(null)
            setKodeProdukDetail("")
            setEditNamaProduk("")
            setEditHargaProduk(null)
            setEditIndikasiUmum("")
            setEditKomposisi("")
            setEditAturanPakai("")
            setEditKeteranganObat("")
            setEditGambarObat("")
            setEditBrandId(null)
            setEditCategoryId(null)
            setNamaBrandDetail("")
            setCategoryDetail("")

            setOpenModalDetail(false)
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false)
        setNamaProduk("")
        setHargaProduk(null)
        setIndikasiUmum("")
        setKomposisi("")
        setAturanPakai("")
        setKeteranganObat("")
        setGambarObat("")
        setBrandId(null)
        setCategoryId(null)
    }

    const handleCloseModalEdit = () => {
            setOpenModalEdit(false)
            setOpenModalDetail(false)
            setTempId(null)
            setKodeProdukDetail("")
            setEditNamaProduk("")
            setEditHargaProduk(null)
            setEditIndikasiUmum("")
            setEditKomposisi("")
            setEditAturanPakai("")
            setEditKeteranganObat("")
            setEditGambarObat("")
            setEditBrandId(null)
            setEditCategoryId(null)
            setNamaBrandDetail("")
            setCategoryDetail("")
    }

    let handleChoose = (e) => {
        setGambarObat(e.target.files[0])
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
                                        <p style={{fontSize: "25px", color: "#04BF8A"}}>Master Products</p>
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
                                                { title: 'Product Code', field: 'kode_produk' },
                                                { title: 'Product Name', field: 'nama_produk' },
                                                { title: 'Category', field: 'nama_category' },
                                                { title: 'Brands', field: 'nama_brand' },
                                                { title: 'Price', field: 'harga_produk'}

                                            ]}
                                            data={productData}
                                            actions={[
                                                {
                                                    icon: 'helpicon',
                                                    tooltip: 'Detail',
                                                    onClick: (event, rowData) => handleOpenModalDetail(
                                                        rowData.id_produk,
                                                        rowData.kode_produk,
                                                        rowData.nama_produk,
                                                        rowData.harga_produk,
                                                        rowData.indikasi_umum,
                                                        rowData.komposisi,
                                                        rowData.aturan_pakai,
                                                        rowData.keterangan_obat,
                                                        rowData.gambar_obat,
                                                        rowData.id_brand,
                                                        rowData.id_kategori,
                                                        rowData.nama_category,
                                                        rowData.nama_brand                                                    
                                                    )
                                                },
                                                {
                                                    icon: 'delete',
                                                    tooltip: 'Delete',
                                                    onClick: (event, rowData) => dispatch(deleteProduct(rowData.id_produk))
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

            <Modal backdrop="static" show={openModalAdd} onHide={() => setOpenModalAdd(false)} size="lg">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Add Data Product</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <Row>
                                        <Col md={12}>
                                        <FormGroup>
                                            <ControlLabel>Nama Produk</ControlLabel>
                                            <Input className="fieldStyle" value={namaProduk} onChange={(value, event) => setNamaProduk(value)} />
                                        </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                        <FormGroup>
                                            <ControlLabel>Harga Produk</ControlLabel>
                                            <InputNumber className="fieldStyle"  style={{marginTop: "11px",width: "100%"}} prefix="Rp" value={hargaProduk} onChange={(value, event) => setHargaProduk(value)}/>
                                        </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Indikasi Umum</ControlLabel>
                                                <Input className="fieldStyle" componentClass="textarea" value={indikasiUmum} rows={3} onChange={(value, event) => setIndikasiUmum(value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Komposisi</ControlLabel>
                                                <Input className="fieldStyle" componentClass="textarea" value={komposisi} rows={3} onChange={(value, event) => setKomposisi(value)}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Aturan Pakai</ControlLabel>
                                                <Input className="fieldStyle" componentClass="textarea" value={aturanPakai} rows={3} onChange={(value, event) => setAturanPakai(value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Keterangan Umum</ControlLabel>
                                                <Input className="fieldStyle" componentClass="textarea" value={keteranganObat} rows={3} onChange={(value, event) => setKeteranganObat(value)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Brand</ControlLabel>
                                                <InputPicker className="fieldStyle" value={brandId} data={brandData} style={{ width: "100%" }} onChange={(value, event) => setBrandId(value)}  />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Kategori</ControlLabel>
                                                <InputPicker className="fieldStyle" value={categoryId} data={cate} style={{ width: "100%" }} onChange={(value, event) => setCategoryId(value)}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                                    <Row>
                                        <Col md={6}>
                                            <form encType="multipart/form-data" >
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="IMG"
                                                    onChange={(e) => handleChoose(e)}
                                                />
                                            </form>
                                        </Col>
                                    </Row>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleAddProduk()}>
                    Add Data
                    </Button>
                    <Button onClick={() => handleCloseModalAdd(false)} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <Modal backdrop="static" show={openModalDetail} onHide={() => setOpenModalDetail(false)} size="lg">
                <Modal.Body>
                    <Grid fluid>
                        <Row style={{paddingBottom: '20px'}}> 
                            <Col md={16}>
                                <p style={{fontSize: '20px', fontWeight: 'bold'}}>{editNamaProduk}</p>
                            </Col>
                            <Col md={4}>
                                <Button color="green" style={{width: "100%"}} onClick={() => setOpenModalEditGambar(true)}>Edit Gambar</Button>
                            </Col>
                            <Col md={4}>
                                <Button color="cyan" style={{width: "100%"}} onClick={() => setOpenModalEdit(true)}>Edit Data</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <Avatar style={{
                                    width: '100%',
                                    height: '250px',
                                    backgroundImage: `url(${URL_IMG + editGambarObat})`,
                                    backgroundPosition: 'center'
                                }} />
                            </Col>
                            <Col md={16} style={{padding: "0px 20px"}}>
                                <Row>
                                    <Col md={24}>
                                        <p className="titleInfo">Harga :</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="subTitleInfo">{editHargaProduk} Rupiah</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="titleInfo">Kategori Obat :</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="subTitleInfo">{namaCategoryDetail}</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="titleInfo">Brand :</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="subTitleInfo">{namaBrandDetail}</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="titleInfo">Indikasi Umum :</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="subTitleInfo">{editIndikasiUmum}</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="titleInfo">Komposisi :</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="subTitleInfo">{editKomposisi}</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="titleInfo">Aturan Pakai :</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="subTitleInfo">{editAturanPakai}</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="titleInfo">Keterangan :</p>
                                    </Col>
                                    <Col md={24}>
                                        <p className="subTitleInfo">{editKeteranganObat}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleCloseModalDetail()} appearance="primary">
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal backdrop="static" show={openModalEdit} onHide={() => setOpenModalEdit(false)} size="lg">
            <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Edit Data Product</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Form fluid>
                                    <Row>
                                        <Col md={12}>
                                        <FormGroup>
                                            <ControlLabel>Nama Produk</ControlLabel>
                                            <Input className="fieldStyle" defaultValue={editNamaProduk} onChange={(value, event) => setEditNamaProduk(value)} />
                                        </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                        <FormGroup>
                                            <ControlLabel>Harga Produk</ControlLabel>
                                            <InputNumber className="fieldStyle"  style={{width: "100%"}} prefix="Rp" defaultValue={editHargaProduk} onChange={(value, event) => setEditHargaProduk(value)}/>
                                        </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Indikasi Umum</ControlLabel>
                                                <Input className="fieldStyle" componentClass="textarea" defaultValue={editIndikasiUmum} rows={3} onChange={(value, event) => setEditIndikasiUmum(value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Komposisi</ControlLabel>
                                                <Input className="fieldStyle" componentClass="textarea" defaultValue={editKomposisi} rows={3} onChange={(value, event) => setEditKomposisi(value)}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Aturan Pakai</ControlLabel>
                                                <Input className="fieldStyle" componentClass="textarea" defaultValue={editAturanPakai} rows={3} onChange={(value, event) => setEditAturanPakai(value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Keterangan Umum</ControlLabel>
                                                <Input className="fieldStyle" componentClass="textarea" defaultValue={editKeteranganObat} rows={3} onChange={(value, event) => setEditKeteranganObat(value)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Brand</ControlLabel>
                                                <InputPicker className="fieldStyle" defaultValue={editBrandId} data={brandData} style={{ width: "100%" }} onChange={(value, event) => setEditBrandId(value)}  />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Kategori</ControlLabel>
                                                <InputPicker className="fieldStyle" defaultValue={editCategoryId} data={cate} style={{ width: "100%" }} onChange={(value, event) => setEditCategoryId(value)}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button  appearance="primary" onClick={() => handleSaveEditProduct()}>
                    Save Data
                    </Button>
                    <Button  appearance="subtle" onClick={() => handleCloseModalEdit()}>
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

            <Modal backdrop="static" show={openModalEditGambar} onHide={() => setOpenModalEditGambar(false)} size="xs">
                <Modal.Body style={{marginTop: '0px'}}>
                    <Grid fluid>
                        <Row>
                            <Col md={24} style={{paddingBottom: '20px'}}>
                                <p style={{fontSize: '25px', fontWeight: 'bold'}}>Edit Gambar</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                            <form encType="multipart/form-data" >
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="IMG"
                                    onChange={(e) => handleChoose(e)}
                                />
                            </form>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleSaveGambarEdit()} appearance="primary">
                    upload
                    </Button>
                    <Button onClick={() => handleCloseModalGambarEdit()} appearance="subtle">
                    close
                    </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}
