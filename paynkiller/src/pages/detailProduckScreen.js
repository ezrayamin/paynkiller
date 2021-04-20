import React from 'react'
import Axios from 'axios'
import swal from 'sweetalert';
import { Grid, Row, Col, Button, IconButton, Icon, Form, InputGroup, Input, Modal, Alert } from 'rsuite'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, getUserCart } from '../action'
import '../css/pages/detailProduk.css'
import TopNavigation from '../components/TopNavigation'
const DetailProdukScreen = (props) => {
  const URL_IMG = 'http://localhost:2000/'

  const [Data, setData] = React.useState({})
  const id_produk = props.location.search.substring(1)
  const [angka, setAngka] = React.useState(0)

  console.log(id_produk)
  console.log(angka)
  console.log(Data)


  const dispatch = useDispatch()
  const { id_customer, cart } = useSelector((state) => {
    return {
      id_customer: state.userReducer.id_customer,
      cart: state.cartReducer.cart
    }
  })

  React.useEffect(() => {
    Axios.post(`http://localhost:2000/produk/getProduk?${id_produk}`)
      .then((res) => setData(res.data[0]))
    dispatch(getUserCart(id_customer))
    console.log(cart)
  }, [id_customer])
  
  
  const btnBuy = async () => {
    console.log(angka)
    if (angka === 0) return swal("Oops!", 'please add the qty before taking the product to your cart', "error")
    if (angka >= Data.jumlah_produk) return swal("Oops!", `there are only ${Data.jumlah_produk} stocks available`, "error");
    if (!id_customer) return swal("Oops!", "you need to login first to continue your payment", "error");
    console.log(cart)
    
    try {
      let tempProduk
      cart.map(item => {
        if (item.id_produk == Data.id_produk) {
          tempProduk = item
        }
      })
      console.log(tempProduk)
      if (tempProduk) {
        if (tempProduk.qty + angka > Data.jumlah_produk) return swal("Oops!", `you have already added ${tempProduk.qty} products to your cart`, "error");
      }
      
      const sendCart = { ...Data, qty: angka, total_harga: angka * parseInt(Data.harga_produk) }
      console.log(sendCart)

      await Axios.post(`http://localhost:2000/order/addCart/${id_customer}`, sendCart)
      // dispatch(addCart(id_customer, sendCart))
      
      Alert.success(`${Data.nama_produk} has been added to your cart`, 5000)
      setAngka(0)
    }
    catch (err) {
      dispatch(getUserCart(id_customer))
      console.log(err)
    }
  }

  console.log(Data)
  return (
    <div>
      <TopNavigation />
      <Col md={24} style={{ paddingTop: "20px", paddingLeft: "50px" }}>
        <Link to="/products">
          <IconButton
            id="back-menu-button"
            icon={<Icon icon="angle-left" id="icon-menu-button" />}
          >
            Back To Products
          </IconButton>
        </Link>
      </Col>
      <Col md={24} style={{ paddingTop: "20px", paddingLeft: "50px" }}>
        <div id="container2">
          <div id="container2_1">
            <div id="Box">
              <img
                src={
                  Data.gambar_obat
                    ? URL_IMG + Data.gambar_obat
                    : "https://dimarta.com/wp-content/uploads/2019/09/Cara-Memperbaiki-Error-404-Wordpress-Dengan-Mudah.png"
                }
                style={{ height: 313, width: 313 }}
                id="gambarProduk"
              />
            </div>
          </div>
          <div id="container2_2">
            <div id="container1">
              <h1 id="judulDetailProduk">{Data.nama_produk}</h1>
              <h1 id="hargaDetailProduk">
                Rp. {Data.harga_produk ? Data.harga_produk.toLocaleString() : 0}
              </h1>
            </div>
            <p id="minititle">Indikasi Umum</p>
            <p id="minitext">{Data.indikasi_umum}</p>
            <p id="minititle">Aturan Pakai</p>
            <p id="minitext">{Data.aturan_pakai}</p>
            <p id="minititle">Komposisi</p>
            <p id="minitext">{Data.komposisi}</p>
            <p id="minititle">Keterangan Obat</p>
            <p id="minitext">{Data.keterangan_obat}</p>
            <p id="minititle">Brand</p>
            <p id="minitext">{Data.nama_brand}</p>
            <p id="minititle">Category</p>
            <p id="minitext">{Data.nama_category}</p>
          </div>
          <div id="container2_3">
            <Grid fluid>
              <Row>
                <Col md={4}>
                  <Button

                    onClick={() => setAngka((prev) => parseInt(prev) - 1)}
                    disabled={angka === 0}
                    style={{ backgroundColor: angka !== 0 ? '#dfe6e9' : '#636e72' }}
                  >
                    ➖
                  </Button>
                </Col>
                <Col md={16}>
                  <InputGroup style={{ height: "100%", width: '100%' }}>
                    <Input
                      value={angka}
                      onChange={(value, event) => setAngka(parseInt(value))}
                      type="number"
                      style={{ color: "#04BF8A", textAlign: 'center', fontSize: '20px' }}
                    />
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <Button

                    onClick={() => setAngka((prev) => parseInt(prev) + 1)}
                    disabled={angka >= Data.jumlah_produk}
                    style={{ backgroundColor: angka >= Data.jumlah_produk ? '#636e72' : '#dfe6e9' }}
                  >
                    ➕
                  </Button>
                </Col>
                <Col md={24} style={{ padding: '0px 50px' }}>
                  <p id='minititle' style={{ marginTop: 10, marginLeft: 10 }}>Stock : {Data.jumlah_produk}</p>
                  <Button
                    color="green"
                    style={{ width: "100%", marginTop: '20px', }}
                    onClick={btnBuy}
                  >
                    Buy
                  </Button>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </Col>
    </div>
  );
};

export default DetailProdukScreen
