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
import { getReportTransactionAll, removeError, getReportTransactionByDate } from "../action/reportAction";

import MaterialTable from "material-table";

import moment from "moment";

import jsPDF from "jspdf";

import "jspdf-autotable";


export default function ReportTransaction() {
  const reportRef = useRef();

  const [textError, setTextError] = useState(false);
  const [openModalFilterDate, setOpenModalFilterDate] = useState(false);
  const [startDate,setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)

  const { loginError, dataReportTransaction } = useSelector((state) => {
    return {
      loginError: state.reportReducer.errLogin,
      dataReportTransaction: state.reportReducer.dataReportTransaction,
    };
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.style.backgroundColor = "#f4f3f3";
    dispatch(getReportTransactionAll());
    if (loginError) {
      setTextError(true);
    }
  }, [loginError]);

  const filterByDate = async() => {
      console.log(startDate,endDate)
      
      let body = {startDate,endDate}

      await dispatch(getReportTransactionByDate(body))
      setOpenModalFilterDate(false)
      setStartDate(null)
      setEndDate(null)
  }

  const printReport = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Cetak Recap Transaction";
    const headers = [["Tanggal Transaksi", "Order Number", "Total Bayar"]];

    const data = dataReportTransaction.map((elt) => [
      moment(elt.tanggal_bayar).format("D MMM YYYY"),
      elt.order_number,
      elt.grandTotal_checkout,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
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
          <Col md={21}>
            <Row style={{ padding: "60px 40px" }}>
              <Col md={24}>
                <Panel shaded style={{ padding: "20px" }}>
                  <Row>
                    <Col md={18}>
                      <p style={{ fontSize: "25px", color: "#04BF8A" }}>
                        Recap Transaction
                      </p>
                    </Col>
                    <Col md={3}>
                      <Button
                        color="green"
                        style={{ width: "100%" }}
                        onClick={() => setOpenModalFilterDate(true)}
                      >
                        Pilih Hari
                      </Button>
                    </Col>
                    <Col md={3}>
                      <Button
                        color="cyan"
                        style={{ width: "100%" }}
                        onClick={() => printReport()}
                      >
                        Cetak Recap
                      </Button>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "25px" }}>
                    <Col md={24}>
                      <MaterialTable
                        columns={[
                          {
                            title: "Tanggal Transaksi",
                            field: "tanggal_bayar",
                            render: (rowData) => (
                              <p>
                                {moment(rowData.tanggal_bayar).format(
                                  "D MMM YYYY"
                                )}
                              </p>
                            ),
                          },
                          { title: "Order Number", field: "order_number" },
                          {
                            title: "Total Bayar",
                            field: "grandTotal_checkout",
                          },
                        ]}
                        data={dataReportTransaction}
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
        show={openModalFilterDate}
        onHide={() => setOpenModalFilterDate(false)}
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
          <Button appearance="primary" onClick={() => filterByDate()}>Filter</Button>
          <Button
            onClick={() => setOpenModalFilterDate(false)}
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
