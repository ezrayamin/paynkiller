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
  Avatar,
  InputGroup,
  SelectPicker
} from "rsuite";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomOrder,
  getCustomOrderDetail,
  acceptCustomOrder,
  rejectCustomOrder,
  removeError,
  addCustomOrderDetail,
  addCustomOrderToCart
} from "../action/customOrderAction";

import {
  selectPickerRawMaterial,
  getStockRawMaterials,
} from "../action/stokRawMaterialAction";



import MaterialTable from "material-table";

import swal from "sweetalert";

const URL_IMG = "http://localhost:2000/";

export default function CustomOrderAdmin() {
  // const [tempIdCategory,setTempIdCategory] = useState(null)
  const [textError, setTextError] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalGambar, setOpenModalGambar] = useState(false);
  const [openModalAlasan, setOpenModalAlasan] = useState(false);
  const [openModalTambahBahan, setOpenModalTambahBahan] = useState(false);
  const [textCustomOrderNumber, setTexCustomOrderNumber] = useState("");
  const [gambarResep, setGambarResep] = useState("");
  const [tempStatus, setTempStatus] = useState(null);
  const [idCustomOrder, setCustomOrder] = useState(null);
  const [keterangan, setKeterangan] = useState("");
  const [idBahanBaku, setIdBahanBaku] = useState(null);
  const [kuantitasBahan, setKuantitasBahan] = useState(null);
  const [idUser,setUserId] = useState(null)

  const { loginError, customOrderData, rawMaterialData, customOrderDetailData, stockRawMaterialData } = useSelector(
    (state) => {
      return {
        loginError: state.customOrderReducer.errLogin,
        customOrderData: state.customOrderReducer.dataCustomOrder,
        customOrderDetailData: state.customOrderReducer.dataCustomOrderDetail,
        stockRawMaterialData: state.stockRawMaterialReducer.dataStockRawMaterial,
        rawMaterialData:
          state.stockRawMaterialReducer.dataSelectPickerRawMaterial,
      };
    }
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.style.backgroundColor = "#f4f3f3";
    dispatch(getAllCustomOrder());
    dispatch(selectPickerRawMaterial());
    dispatch(getStockRawMaterials());
    if (loginError) {
      setTextError(true);
    }
  }, [loginError, customOrderData.length]);

  const handleModalError = () => {
    setTextError(false);
    dispatch(removeError());
  };

  const handleAcceptRecipe = async () => {
    await dispatch(acceptCustomOrder(idCustomOrder));
    swal("Yeah!", "Recipe sudah di accept !", "success");
    setOpenModalGambar(false);
    setCustomOrder(null);
  };

  const handleRejectRecipe = async () => {
    const data = { keterangan };
    await dispatch(rejectCustomOrder(idCustomOrder, data));
    swal("Yeah!", "Recipe sudah di reject !", "success");
    setOpenModalGambar(false);
    setKeterangan("");
    setCustomOrder(null);
    setOpenModalAlasan(false);
  };

  const handleOpenDetail = async (
    id_custom_order,
    status,
    kode_custom_order,
    id_user
  ) => {
    if (status === 1)
      return swal("Opps!", "Silahkan Konfirmasi Custom Order !", "error");

    if (status === 3)
      return swal("Opps!", "Custom Order Sudah Di Rejected !", "error");

    await dispatch(getCustomOrderDetail(id_custom_order));
    setCustomOrder(id_custom_order)
    setTempStatus(status)
    setUserId(id_user)
    setTexCustomOrderNumber(kode_custom_order);
    setOpenModalDetail(true);
  };

  const handleAddCustomOrderToCart = async () => {
    let id_custom_order = idCustomOrder
    let body = {id_custom_order}

    await dispatch(addCustomOrderToCart(idUser,body))
    swal("Yeah!", "Custom Order Sudah masuk ke Cart !", "success");
    setOpenModalDetail(false)
    setCustomOrder(null)
    setUserId(null)
  }

  const handleOpenModalGambar = (gambarResep, status, id_custom_order) => {
    if (status != 1) return swal("Opps!", "Resep Sudah Direview !", "error");
    setGambarResep(gambarResep);
    setCustomOrder(id_custom_order);
    setOpenModalGambar(true);
  };

  const tambahBahanRacikan = async() => {
    console.log(idBahanBaku)
    console.log(idCustomOrder)
    console.log(parseFloat(kuantitasBahan))
    
    let dataStok = 0
    let checkBahan = 0

    for(let x in stockRawMaterialData){
      if(parseInt(idBahanBaku) === parseInt(stockRawMaterialData[x].id_stok_bahan)){
        dataStok = parseFloat(stockRawMaterialData[x].total_bahan)
      }
    }

    if(kuantitasBahan > dataStok) return swal("Oops!", "Kuantitas melebihi stok !", "error");

    for(let x in customOrderDetailData){
      if(parseInt(idBahanBaku) === parseInt(customOrderDetailData[x].id_bahan_baku)){
        checkBahan = parseInt(customOrderDetailData[x].id_bahan_baku)
      }
    }

    if(idBahanBaku === checkBahan) return swal("Oops!", "Bahan sudah pernah di order !", "error");


    let body = {idBahanBaku,kuantitasBahan}

    await dispatch(addCustomOrderDetail(idCustomOrder,body))

    swal("Yeah!", "Bahan Racikan berhasil ditambah !", "success");
    setIdBahanBaku(null)
    setKuantitasBahan(null)
    setOpenModalTambahBahan(false)
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
                        Custom Order Customer
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
                          {
                            title: "Kode Custom Order",
                            field: "kode_custom_order",
                          },
                          { title: "User", field: "username" },
                          {
                            title: "Status",
                            field: "nama_status_custom_order",
                          },
                        ]}
                        data={customOrderData}
                        actions={[
                          {
                            icon: "helpicon",
                            tooltip: "Detail Order",
                            onClick: (event, rowData) =>
                              handleOpenDetail(
                                rowData.id_custom_order,
                                rowData.status,
                                rowData.kode_custom_order,
                                rowData.id_user
                              ),
                          },
                          {
                            icon: "check",
                            tooltip: "Review",
                            onClick: (event, rowData) =>
                              handleOpenModalGambar(
                                rowData.gambar_resep,
                                rowData.status,
                                rowData.id_custom_order
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
              <Col md={16}>
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "#04BF8A",
                  }}
                >
                  Detail Racikan #{textCustomOrderNumber}
                </p>
              </Col>
              <Col md={4}>
                <Button
                  style={{
                    backgroundColor: "#e84545",
                    color: "white",
                    width: "100%",
                  }}
                  disabled={tempStatus !== 2 ? true : false}
                  onClick={() => handleAddCustomOrderToCart()}
                >
                  Lock Racikan
                </Button>
              </Col>
              <Col md={4}>
                <Button
                  style={{
                    backgroundColor: "#04BF8A",
                    color: "white",
                    width: "100%",
                  }}
                  disabled={tempStatus !== 2 ? true : false}
                  onClick={() => setOpenModalTambahBahan(true)}
                >
                  Tambah Bahan Baku
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <MaterialTable
                  columns={[
                    { title: "Kode Bahan", field: "kode_bahan_baku" },
                    { title: "Nama Bahan", field: "nama_bahan_baku" },
                    { title: "Satuan", field: "nama_uom" },
                    { title: "Harga Per Satuan", field: "harga_bahan_baku" },
                    { title: "Jumlah Beli", field: "total_beli_satuan" },
                    { title: "Total Harga", field: "total_harga" },
                  ]}
                  data={customOrderDetailData}
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
        show={openModalGambar}
        onHide={() => setTextError(setOpenModalGambar)}
        size="sm"
      >
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col md={24}>
                <Avatar
                  style={{
                    width: "100%",
                    height: "250px",
                    backgroundImage: `url(${URL_IMG + gambarResep})`,
                    backgroundPosition: "center",
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button
            appearance="primary"
            color="green"
            onClick={() => handleAcceptRecipe()}
          >
            Accept
          </Button>
          <Button
            appearance="primary"
            color="red"
            onClick={() => setOpenModalAlasan(true)}
          >
            Reject
          </Button>
          <Button
            appearance="primary"
            color="yellow"
            onClick={() => setOpenModalGambar(false)}
          >
            Exit
          </Button>
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
                      value={keterangan}
                      onChange={(value, event) => setKeterangan(value)}
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
                  onClick={() => handleRejectRecipe()}
                  style={{ width: "100%" }}
                >
                  Change Status
                </Button>
              </Col>
            </Row>
          </Grid>
        </Modal.Footer>
      </Modal>

      <Modal
        backdrop="static"
        show={openModalTambahBahan}
        onHide={() => setTextError(setOpenModalTambahBahan)}
        size="sm"
      >
        <Modal.Body style={{marginTop: '0px'}}>
          <Grid fluid>
            <Row>
              <Col md={24} style={{marginBottom: '25px'}}>
                <p style={{textAlign: 'center', fontSize: '30px'}}>Tambah Bahan Racikan</p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form fluid>
                  <FormGroup>
                    <ControlLabel>Pilih Bahan Baku</ControlLabel>
                    <SelectPicker value={idBahanBaku} onChange={(value, event) => setIdBahanBaku(value)} data={rawMaterialData} style={{ width: '100%' }} />
                  </FormGroup>
                </Form>
              </Col>
              <Col md={12}>
                <Form fluid>
                  <FormGroup>
                    <ControlLabel>Jumlah Dosis</ControlLabel>
                    <InputNumber style={{width: '100%'}} onChange={(value, event) => setKuantitasBahan(value)} value={kuantitasBahan}/>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Button appearance="primary" color="green" style={{width: '100%'}} onClick={() => tambahBahanRacikan()}>
                  Tambah Data
                </Button>
              </Col>
              <Col md={12}>
                <Button appearance="primary" color="red" style={{width: '100%'}} onClick={() => setOpenModalTambahBahan(false)}>
                  Close
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
