import React, { useState, useRef } from "react";

import SideNav from "../components/sideNavigation";
import {
  Row,
  Col,
  Panel,
  Button,
  Modal,
  Grid,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Input,
  DatePicker,
} from "rsuite";

import { useDispatch, useSelector } from "react-redux";
import { getReportTransactionAll, removeError, getReportProductSaleAll, getReportBahanBakuSaleAll, getReportProductSaleByDate, getReportBahanBakuSaleByDate } from "../action/reportAction";

import MaterialTable from "material-table";

import moment from "moment";

import jsPDF from "jspdf";

import "jspdf-autotable";


export default function ReportSaleProduct() {

  const [textError, setTextError] = useState(false);
  const [openModalFilterDateProduct, setOpenModalFilterDateProduct] = useState(false);
  const [openModalFilterDateBahanRacik, setopenModalFilterDateBahanRacik] = useState(false);
  const [startDate,setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)

  const { loginError, dataReportTransaction, dataReportProdukSale, dataReportBahanBakuSale } = useSelector((state) => {
    return {
      loginError: state.reportReducer.errLogin,
      dataReportProdukSale: state.reportReducer.dataReportJualProduct,
      dataReportBahanBakuSale: state.reportReducer.dataReportJualBahanBaku
    };
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.style.backgroundColor = "#f4f3f3";
    dispatch(getReportTransactionAll());
    dispatch(getReportBahanBakuSaleAll())
    dispatch(getReportProductSaleAll())
    if (loginError) {
      setTextError(true);
    }
  }, [loginError]);

  const filterByDateProductSales = async() => {
      
      let body = {startDate,endDate}

      await dispatch(getReportProductSaleByDate(body))

      setOpenModalFilterDateProduct(false)
      setStartDate(null)
      setEndDate(null)
  }

  const filterByDateBahanBakuSales = async() => {
    
    let body = {startDate,endDate}

    await dispatch(getReportBahanBakuSaleByDate(body))
    setopenModalFilterDateBahanRacik(false)
    setStartDate(null)
    setEndDate(null)
}

  const printReportProduct = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Recapitulation Product Sales";
    const headers = [["Product Name", "Total Jual"]];

    const data = dataReportProdukSale.map((elt) => [
      elt.nama_produk,
      elt.TotalJual,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("RecapProductSales.pdf");
  };

  const printReportBahanBaku = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Recapitulation Bahan Racikan Sales";
    const headers = [["Bahan Baku", "Total Jual"]];

    const data = dataReportBahanBakuSale.map((elt) => [
      elt.nama_bahan_baku,
      elt.TotalJual,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("RecapRacikanSales.pdf");
  };

  const handleModalError = () => {
    setTextError(false);
    dispatch(removeError());
  };

  return (
    <div style={{ backgroundColor: "#f4f3f3" }}>
      <Grid fluid style={{ margin: "0px", padding: "0px" }}>
        <Row style={{ margin: "0px", padding: "0px" }}>
          <SideNav />
          <Col md={3}></Col>
          <Col md={10}>
            <Row style={{ padding: "60px 40px" }}>
              <Col md={24}>
                <Panel shaded style={{ padding: "20px" }}>
                  <Row>
                    <Col md={16}>
                      <p style={{ fontSize: "25px", color: "#04BF8A" }}>
                        Product Sales
                      </p>
                    </Col>
                    <Col md={4}>
                      <Button
                        color="green"
                        style={{ width: "100%" }}
                        onClick={() => setOpenModalFilterDateProduct(true)}
                      >
                        Pilih Hari
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        color="cyan"
                        style={{ width: "100%" }}
                        onClick={() => printReportProduct()}
                      >
                        Cetak Recap
                      </Button>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "25px" }}>
                    <Col md={24}>
                      <MaterialTable
                        columns={[
                          { title: "Product Name", field: "nama_produk" },
                          {
                            title: "Total Jual",
                            field: "TotalJual",
                          },
                        ]}
                        data={dataReportProdukSale}
                        actions={
                          [
                            // {
                            //     icon: 'edit',
                            //     tooltip: 'Edit',
                            //     onClick: (event, rowData) => handleOpenModalEdit(rowData.id_uom,rowData.nama_uom,rowData.keterangan)
                            // },
                            // {
                            //     icon: 'delete',
                            //     tooltip: 'Delete',
                            //     onClick: (event, rowData) => dispatch(deleteUom(rowData.id_uom))
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
                </Panel>
              </Col>
            </Row>
          </Col>
          <Col md={10}>
            <Row style={{ padding: "60px 40px" }}>
              <Col md={24}>
                <Panel shaded style={{ padding: "20px" }}>
                  <Row>
                    <Col md={16}>
                      <p style={{ fontSize: "25px", color: "#04BF8A" }}>
                        Bahan Racikan Sales
                      </p>
                    </Col>
                    <Col md={4}>
                      <Button
                        color="green"
                        style={{ width: "100%" }}
                        onClick={() => setopenModalFilterDateBahanRacik(true)}
                      >
                        Pilih Hari
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        color="cyan"
                        style={{ width: "100%" }}
                        onClick={() => printReportBahanBaku()}
                      >
                        Cetak Recap
                      </Button>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "25px" }}>
                    <Col md={24}>
                      <MaterialTable
                        columns={[
                          { title: "Bahan Baku", field: "nama_bahan_baku" },
                          {
                            title: "Total Jual",
                            field: "TotalJual",
                          },
                        ]}
                        data={dataReportBahanBakuSale}
                        actions={
                          [
                            // {
                            //     icon: 'edit',
                            //     tooltip: 'Edit',
                            //     onClick: (event, rowData) => handleOpenModalEdit(rowData.id_uom,rowData.nama_uom,rowData.keterangan)
                            // },
                            // {
                            //     icon: 'delete',
                            //     tooltip: 'Delete',
                            //     onClick: (event, rowData) => dispatch(deleteUom(rowData.id_uom))
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
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>

      <Modal
        backdrop="static"
        show={openModalFilterDateProduct}
        onHide={() => setOpenModalFilterDateProduct(false)}
        size="xs"
      >
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Form fluid>
                <Col md={12}>
                  <FormGroup>
                    <ControlLabel>From</ControlLabel>
                    <DatePicker  oneTap value={startDate} style={{width: '100%'}} onChange={(value, event) => setStartDate(value)}/>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <ControlLabel>To</ControlLabel>
                    <DatePicker  oneTap value={endDate} style={{width: '100%'}} onChange={(value, event) => setEndDate(value)} />
                  </FormGroup>
                </Col>
              </Form>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" onClick={() => filterByDateProductSales()}>Filter</Button>
          <Button
            onClick={() => setOpenModalFilterDateProduct(false)}
            appearance="subtle"
          >
            close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        backdrop="static"
        show={openModalFilterDateBahanRacik}
        onHide={() => setopenModalFilterDateBahanRacik(false)}
        size="xs"
      >
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Form fluid>
                <Col md={12}>
                  <FormGroup>
                    <ControlLabel>From</ControlLabel>
                    <DatePicker  oneTap value={startDate} style={{width: '100%'}} onChange={(value, event) => setStartDate(value)}/>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <ControlLabel>To</ControlLabel>
                    <DatePicker  oneTap value={endDate} style={{width: '100%'}} onChange={(value, event) => setEndDate(value)} />
                  </FormGroup>
                </Col>
              </Form>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" onClick={() => filterByDateBahanBakuSales()}>Filter</Button>
          <Button
            onClick={() => setopenModalFilterDateBahanRacik(false)}
            appearance="subtle"
          >
            close
          </Button>
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
