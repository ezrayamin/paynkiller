import React, { useState } from "react";
import {
  Grid,
  Row,
  Col,
  Panel,
  Avatar,
  Button,
  Form,
  CheckPicker,
  FormGroup,
  ControlLabel,
  InputPicker,
} from "rsuite";

import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/TopNavigation";

import {
  getStockProducts,
  filteringProductList,
} from "../action/stokProdukAction";

import { selectPickerCategory } from "../action/categoryAction";

import {Redirect} from 'react-router-dom'

import Pagination from "../components/Pagination";

import swal from "sweetalert";

import "../css/pages/productList.css";

import AOS from 'aos';


const URL_IMG = "http://localhost:2000/";

export default function ProductListScreen() {

  const[tempId,setTempId] = useState(null)
  const [redirectTo, setRedirectTo] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [selectCategory, setSelectCategory] = useState([]);
  const [sortingPrice, setSortingPrice] = useState("");

  const dispatch = useDispatch();

  const sortingCheck = [
    {
      label: "Ascending",
      value: "ASC",
    },
    {
      label: "Descending",
      value: "DESC",
    },
  ];

  const {stockProductData, dataCategory, idUser} = useSelector(
    (state) => {
      return {
        stockProductData: state.stockProdukReducer.dataStokProduct,
        dataCategory: state.categoryReducer.selectPickerCategory,
        idUser: state.userReducer.id_customer
      };
    }
  );

  //#region PAGINATE
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;

    let paginate = (pageNumber) => setCurrentPage(pageNumber);

    let currentPosts = Array.from(stockProductData).slice(indexOfFirstPost, indexOfLastPost);
  //#endregion


  const searchDataProduct = () => {
    if (!selectCategory && !sortingPrice) return swal("Opps!", "Inputan tidak boleh kosong !", "error");
    let body = {selectCategory, sortingPrice};
    dispatch(filteringProductList(body));
    setSortingPrice("");
    setSelectCategory([]);
  };

  React.useEffect(() => {
    document.body.style.backgroundColor = "#f4f3f3";
    
       dispatch(getStockProducts());
       dispatch(selectPickerCategory());
       AOS.init({
        duration : 1500
      });
  }, [dataCategory.length,tempId,redirectTo]);

  const handleToDetailProduk = (id_produk) => {
    if(!idUser) return swal("Opps!", "Login Terlebih Dahulu !", "error");

    setTempId(id_produk)
    setRedirectTo(true)
  }

  if(redirectTo){
    return <Redirect to={`/detailproduk?id=${tempId}`}/>
  }else{
      console.log('Gagal Jhon')
  }

  
  return (
    <div>
      <Navbar />
      <Grid fluid style={{ margin: "0px 10px" }}>
        <Row>
          <Col md={4} style={{ padding: "15px", paddingTop: "45px" }} >
            <Panel shaded style={{ backgroundColor: "white" }} data-aos="flip-right">
              <Row>
                <Col
                  md={24}
                  style={{ padding: "20px 0px", backgroundColor: "#038C73" }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Filtering
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{ padding: "20px 20px" }}>
                  <Form fluid>
                    <FormGroup>
                      <ControlLabel
                        style={{
                          color: "#038C73",
                          fontWeight: "bold",
                          fontSize: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        Pilih Category
                      </ControlLabel>
                      <CheckPicker
                        data={dataCategory}
                        value={selectCategory}
                        style={{ width: "100%" }}
                        onChange={(value, event) => setSelectCategory(value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel
                        style={{
                          color: "#038C73",
                          fontWeight: "bold",
                          fontSize: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        Sorting Harga
                      </ControlLabel>
                      <InputPicker
                        data={sortingCheck}
                        value={sortingPrice}
                        style={{ width: "100%" }}
                        onChange={(value, event) => setSortingPrice(value)}
                      />
                    </FormGroup>
                  </Form>
                  <Button
                    style={{
                      margin: "25px 0px",
                      backgroundColor: "#038C73",
                      color: "white",
                      width: "100%",
                    }}
                    onClick={() => searchDataProduct()}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Panel>
          </Col>
          <Col md={20} style={{ padding: "20px" }} >
            <Row>
              {currentPosts.map((item, index) => {
                return (
                  <Col md={5} key={index}>
                    <Panel
                      shaded
                      style={{
                        margin: "30px 10px",
                        padding: "0px",
                        backgroundColor: "white",
                      }}
                    >
                      <Row>
                        <Col md={24}>
                          <Avatar
                            style={{
                              width: "100%",
                              height: "220px",
                              backgroundImage: `url(${
                                URL_IMG + item.gambar_obat
                              })`,
                              objectFit: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row
                        style={{
                          padding: "5px",
                          paddingTop: "10px",
                          height: "60px",
                        }}
                      >
                        <Col md={24}>
                          <p
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "15px",
                            }}
                          >
                            {item.nama_produk}
                          </p>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          padding: "10px 5px",
                          backgroundColor: "#038C73",
                        }}
                      >
                        <Col md={24}>
                          <p
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "17px",
                              textTransform: "capitalize",
                              color: "white",
                            }}
                          >
                            {item.nama_category}
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ padding: "30px 10px" }}>
                        <Col md={14}>
                          <p
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "17px",
                              textTransform: "capitalize",
                            }}
                          >
                            Rp. {item.harga_produk},00
                          </p>
                        </Col>
                        <Col md={10}>
                          <Button
                            style={{
                              backgroundColor: "#04BF8A",
                              width: "100%",
                              color: "white",
                            }}
                            onClick={() => handleToDetailProduk(item.id_produk)}
                          >
                            Details
                          </Button>
                        </Col>
                      </Row>
                    </Panel>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col md={24} style={{ paddingLeft: "20px" }}>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={stockProductData.length}
                  paginate={paginate}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
