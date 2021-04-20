import React, { useState } from "react";

import SideNav from "../components/sideNavigation";
import { Row, Col, Container, Panel, Icon } from "rsuite";

import { useDispatch, useSelector } from "react-redux";

import {getProfitData,getBestProductData,getBestRacikanData} from '../action/reportAction'

import "../css/pages/dashboard.css";

export default function Dashboard() {

      const dispatch = useDispatch();

      const {profitData,bestProductData,bestRacikanData} = useSelector((state) => {
        return {
          profitData: state.reportReducer.dataProfit,
          bestProductData: state.reportReducer.dataBestProduct,
          bestRacikanData: state.reportReducer.dataBestRacik
        };
      });

      React.useEffect(() => {
        document.body.style.backgroundColor = "#f4f3f3";
        const fetchData = async () => {
            await dispatch(getProfitData())
            await dispatch(getBestProductData())
            await dispatch(getBestRacikanData())

        }
        fetchData()
        
      }, []);

  return (
    <div>
      <Container style={{ margin: "0px", padding: "0px" }}>
        <Row style={{ margin: "0px", padding: "0px" }}>
          <SideNav />
          <Col md={3}></Col>
          <Col md={21} style={{ padding: "60px 60px" }}>
            <Row>
              <Col md={8} style={{ padding: "0px 5px" }}>
                <Panel className="Panel-Layout" shaded>
                  <Row>
                    <Col md={16}>
                      <Row>
                        <Col md={24} style={{marginBottom: '10px'}}>
                          <p className="title1">Total Profits</p>
                        </Col>
                        <Col md={24}>
                          <p className="title2">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(profitData)}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={8} style={{ padding: "10px 30px" }}>
                      <Icon className="Icon-Dashboard" icon="credit-card-alt" size="4x" />
                    </Col>
                  </Row>
                </Panel>
              </Col>
              <Col md={8} style={{ padding: "0px 5px" }}>
                <Panel className="Panel-Layout" shaded>
                  <Row>
                    <Col md={16}>
                      <Row>
                        <Col md={24} style={{marginBottom: '10px'}}>
                          <p className="title1">Product Best Seller</p>
                        </Col>
                        <Col md={24}>
                          <p className="title2">{bestProductData}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={8} style={{ padding: "10px 30px" }}>
                      <Icon className="Icon-Dashboard" icon="shopping-cart" size="4x" />
                    </Col>
                  </Row>
                </Panel>
              </Col>
              <Col md={8} style={{ padding: "0px 5px" }}>
                <Panel className="Panel-Layout" shaded>
                  <Row>
                    <Col md={16}>
                      <Row>
                        <Col md={24} style={{marginBottom: '10px'}}>
                          <p className="title1">Racikan Most Used</p>
                        </Col>
                        <Col md={24}>
                          <p className="title2">{bestRacikanData}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={8} style={{ padding: "10px 30px" }}>
                      <Icon className="Icon-Dashboard" icon="user-md" size="4x" />
                    </Col>
                  </Row>
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
