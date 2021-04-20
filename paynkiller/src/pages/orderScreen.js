import React, { useState, useReducer } from "react";

import SideNav from "../components/sideNavigation";
import {
  Row,
  Col,
  Panel,
  Button,
  Modal,
  Grid,
  Header,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  InputNumber,
  Input,
  InputPicker,
  Avatar
} from "rsuite";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  removeError,
  getOrderDetailSpecific,
  acceptOrderPayment,
  rejectOrderPayment
} from "../action/orderAction";

import MaterialTable from "material-table";

import swal from "sweetalert";

import "../css/pages/masterRawMaterial.css";

const URL_IMG = "http://localhost:2000/";


export default function OrderScreen() {
  const [tempIdCategory, setTempIdCategory] = useState(null);
  const [textError, setTextError] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [textOrderNumber, setTextOrderNumber] = useState("");
  const [openModalBukti, setOpenModalBukti] = useState(false);
  const [gambarBukti, setGambarBukti] = useState("")
  const [tempStatus, setTempStatus] = useState(null)
  const [tempIdCustomer, setTempIdCustomer] = useState(null)
  const [idOrderNumber, setIdOrderNumber] = useState(null)
  const [keteranganReject, setKeteranganReject] = useState("")
  const [openModalAlasan, setOpenModalAlasan] = useState(false)


  const { loginError, orderData, orderDetailData } = useSelector((state) => {
    return {
      loginError: state.orderReducer.errLogin,
      orderData: state.orderReducer.dataOrder,
      orderDetailData: state.orderReducer.dataOrderDetailSpecific,
    };
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.style.backgroundColor = "#f4f3f3";
    dispatch(getAllOrder());
    if (loginError) {
      setTextError(true);
    }
  }, [loginError]);

  const handleModalError = () => {
    setTextError(false);
    dispatch(removeError());
  };

  const handleOpenBukti = (order_number, bukti_bayar, id_status, id_customer) => {
    
    if(id_status != 3) return swal("Oops!", "Status Order bukan Paid !", "error");

    setTempIdCustomer(id_customer)
    setGambarBukti(bukti_bayar)
    setIdOrderNumber(order_number)
    setTempStatus(id_status)
    setOpenModalBukti(true)
  
  }

  const handleOpenDetail = async (order_number, id_category) => {
    await dispatch(getOrderDetailSpecific(order_number));
    setTempIdCategory(id_category);
    setTextOrderNumber(order_number);
    setOpenModalDetail(true);
  };

  const acceptPayment = async() => {
    
    let id_customer = tempIdCustomer

    let body = {id_customer}
    
    await dispatch(acceptOrderPayment(idOrderNumber, body))
    swal("Yeah!", "Payment berhasil di Accept !", "success");


    setTempIdCustomer(null)
    setGambarBukti("")
    setIdOrderNumber(null)
    setTempStatus(null)
    setOpenModalBukti(false)

  }

  const rejectPayment = async() => {

    let id_customer = tempIdCustomer

    let body = {id_customer, keteranganReject}
    
    await dispatch(rejectOrderPayment(idOrderNumber, body))
    swal("Yeah!", "Payment berhasil di reject !", "success");

    setTempIdCustomer(null)
    setGambarBukti("")
    setIdOrderNumber(null)
    setTempStatus(null)
    setOpenModalBukti(false)
    setOpenModalAlasan(false)

  }

  return (
    <div>
      <Grid fluid style={{ margin: "0px", padding: "0px" }}>
        <Row style={{ margin: "0px", padding: "0px" }}>
          <SideNav />
          <Col md={3}></Col>
          <Col md={21}>
            <Row style={{ padding: "60px 40px" }}>
              <Col md={24}>
                <Panel shaded style={{ padding: "20px" }}>
                  <Row>
                    <Col md={24}>
                      <p style={{ fontSize: "25px", color: "#04BF8A" }}>
                        Order Customer
                      </p>
                    </Col>
                    {/* <Col md={3}>
                                    <Button color="cyan" style={{width: "100%"}} onClick={() => setOpenModalAdd(true)}>
                                        Tambah Data
                                    </Button>
                                    </Col> */}
                  </Row>
                  <Row style={{ paddingTop: "25px" }}>
                    <Col md={24}>
                      <MaterialTable
                        columns={[
                          { title: "Order Number", field: "order_number" },
                          { title: "User", field: "username" },
                          {
                            title: "Total Bayar",
                            field: "grandTotal_checkout",
                          },
                          { title: "Via Transfer", field: "jenis_pembayaran" },
                          { title: "Keterangan", field: "keterangan" },
                          { title: "Status", field: "status" },
                        ]}
                        data={orderData}
                        actions={[
                          {
                            icon: "helpicon",
                            tooltip: "Detail Order",
                            onClick: (event, rowData) =>
                              handleOpenDetail(
                                rowData.order_number,
                                rowData.id_status
                              ),
                          },
                          {
                            icon: "preview",
                            tooltip: "Lihat Bukti",
                            onClick: (event, rowData) =>
                              handleOpenBukti(
                                rowData.order_number,
                                rowData.bukti_bayar,
                                rowData.id_status,
                                rowData.id_customer
                              ),
                          },
                        ]}
                        title=""
                        options={{
                          actionsColumnIndex: -1,
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

      <Modal
        backdrop="static"
        show={openModalDetail}
        onHide={() => setOpenModalDetail(true)}
        full
        style={{ padding: "0px 80px" }}
      >
        <Modal.Body style={{ marginTop: "0px" }}>
          <Grid fluid>
            <Row style={{ marginBottom: "30px" }}>
              <Col md={24}>
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "#04BF8A",
                  }}
                >
                  Detail Order #{textOrderNumber}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <MaterialTable
                  columns={[
                    { title: "Nama Barang", field: "nama_produk" },
                    { title: "Kode Racik Obat", field: "kode_custom_order" },
                    { title: "Brand", field: "nama_brand" },
                    { title: "Category", field: "nama_category" },
                    { title: "Jumlah Beli", field: "qty" },
                    { title: "Total Harga", field: "total_harga" },
                  ]}
                  data={orderDetailData}
                  actions={
                    [
                      // {
                      //   icon: "helpicon",
                      //   tooltip: "Detail Order",
                      //   onClick: (event, rowData) =>
                      //     handleOpenDetail(rowData.order_number),
                      // },
                    ]
                  }
                  title=""
                  options={{
                    actionsColumnIndex: -1,
                  }}
                />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer style={{ padding: "0px 450px" }}>
          <Button
            onClick={() => setOpenModalDetail(false)}
            style={{
              backgroundColor: "#04BF8A",
              color: "white",
              width: "100%",
              marginBottom: "15px",
              fontSize: "20px",
            }}
          >
            Exit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        backdrop="static"
        show={openModalBukti}
        onHide={() => setOpenModalBukti(true)}
        size="lg"
        style={{ padding: "0px 80px" }}
      >
        <Modal.Body style={{ marginTop: "0px" }}>
          <Grid fluid>
            <Row style={{ marginBottom: "30px" }}>
              <Col md={16}>
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "#04BF8A",
                  }}
                >
                  Bukti Transfer #{textOrderNumber}
                </p>
              </Col>
              <Col md={4}>
              <Button
                style={{
                  backgroundColor: "#04BF8A",
                  color: "white",
                  width: "100%",
                }}
                onClick={() => acceptPayment()}
              >
                Accept Payment
              </Button>
              </Col>
              <Col md={4}>
              <Button
                style={{
                  backgroundColor: "#e84545",
                  color: "white",
                  width: "100%",
                }}
                onClick={() => setOpenModalAlasan(true)}
              >
                Reject Payment
              </Button>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
              <Avatar
                  style={{
                    width: "100%",
                    height: "400px",
                    backgroundImage: `url(${URL_IMG + gambarBukti})`,
                    backgroundPosition: "center",
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer style={{padding: '0px 200px'}}>
          <Grid fluid>
          <Row>
            <Col md={24}>
              <Button
                style={{
                  backgroundColor: "#e84545",
                  color: "white",
                  width: "100%",
                }}
                onClick={() => setOpenModalBukti(false)}
              >
                Exit
              </Button>
            </Col>
          </Row>
          </Grid>
        </Modal.Footer>
      </Modal>

      <Modal
        backdrop="static"
        show={openModalAlasan}
        onHide={() => setTextError(setOpenModalAlasan)}
        size="sm"
      >
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col md={24}>
                <Form fluid>
                  <FormGroup>
                    <ControlLabel>Alasan</ControlLabel>
                    <Input
                      value={keteranganReject}
                      onChange={(value, event) => setKeteranganReject(value)}
                      componentClass="textarea"
                      rows={3}
                      placeholder="Textarea"
                    />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Grid fluid>
            <Row>
              <Col md={24}>
                <Button
                  appearance="primary"
                  color="red"
                  onClick={() => rejectPayment()}
                  style={{ width: "100%" }}
                >
                  Reject Payment
                </Button>
              </Col>
            </Row>
          </Grid>
        </Modal.Footer>
      </Modal>

      <Modal
        backdrop="static"
        show={textError}
        onHide={() => setTextError(false)}
        size="xs"
      >
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
  );
}
