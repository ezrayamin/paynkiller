import React, { useState, useEffect } from "react";

import Navbar from "../components/TopNavigation";

import { Button, Grid, Row, Col, Panel, Avatar } from "rsuite";

import CoverHome from "../images/Resources/CoverHome.png";
import LogoPayNkiller from "../images/logo/PaynKiller.svg";
import Lottie from "react-lottie";

import animationData from "../images/animation/9888-money-money-money.json";
import animationData2 from "../images/animation/47137-doctor-and-health-symbols.json";
import animationData3 from "../images/animation/27519-shipping-complete-page-animation.json";

import gambarTestimoni1 from '../images/Resources/Image1.jpg'
import gambarTestimoni2 from '../images/Resources/Image2.jpg'
import gambarTestimoni3 from '../images/Resources/Image3.jpg'

import Footer from '../components/footer'

import AOS from 'aos';



import "../css/pages/homeScreen.css";

export default function Homescreen() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration : 1500
    });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: animationData3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div id="ContainerHome">
      <Navbar />
      <Grid
        fluid
        style={{
          backgroundImage: `url(${CoverHome})`,
          width: "100%",
          height: "600px",
          marginBottom: "15%",
        }}
      >
        <Row>
          <Col md={14} style={{ padding: "50px", paddingTop: "200px" }} data-aos="fade-right">
            <p style={{ color: "white", fontSize: "60px", fontWeight: "bold" }}>
              Health is a relationship between you and your body
            </p>
            <p
              style={{ color: "#52de97", fontSize: "35px", fontWeight: "bold" }}
            >
              PaynKiller.io
            </p>
          </Col>
          <Col md={10}></Col>
        </Row>
      </Grid>
      <Grid fluid style={{ marginBottom: "25%" }} data-aos="fade-up">
        <Row>
          <Col md={10}>
            <Row>
              <Col md={24}>
                <img
                  src={LogoPayNkiller}
                  style={{ width: "100%", height: "280px" }}
                />
              </Col>
            </Row>
          </Col>
          <Col md={14} style={{ padding: "0px 100px" }}>
            <Row>
              <Col md={24} style={{ marginBottom: "3%" }}>
                <p className="TitleHeader">
                  Apa itu
                  <span style={{ color: "#0D8C5D" }}> PaynKiller.io</span> ?
                </p>
              </Col>
              <Col md={24}>
                <p className="DescriptionText">
                  PaynKiller.io adalah sebuah ecommerce yang bergerak di bidang
                  kesehatan yang dikhususkan untuk jual beli obat.
                </p>
                <p className="DescriptionText">
                  Dibentuk pada tahun 2020, PaynKiller.io akan selalu siap untuk
                  melayani customer dengan sebaik mungkin.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
      <Grid
        fluid
        style={{
          marginBottom: "10%",
        }}
        data-aos="fade-up"
      >
        <Row>
          <Col md={24} style={{ padding: "0px" }}>
            <svg
              className="wavesStyle"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#038C73"
                fill-opacity="1"
                d="M0,256L48,229.3C96,203,192,149,288,160C384,171,480,245,576,234.7C672,224,768,128,864,90.7C960,53,1056,75,1152,112C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </Col>
        </Row>

        <Row style={{ backgroundColor: "#038C73" }} >
          <Col md={24} data-aos="zoom-in">
            <p className="TitleHeader2">Mengapa Harus PaynKiller.io ?</p>
          </Col>
        </Row>
        <Row style={{ backgroundColor: "#038C73" }}>
          <Col md={12} style={{ padding: "110px" }} data-aos="flip-left">
            <Lottie options={defaultOptions} style={{ width: "100%" }} />
          </Col>
          <Col md={12}>
            <Row>
              <Col md={24} style={{ padding: "200px 70px" }} data-aos="zoom-in">
                <p className="TitleHeader2">
                  Harga yang jauh lebih murah dibanding toko lain
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ backgroundColor: "#038C73" }}>
          <Col md={12}>
            <Row>
              <Col md={24} style={{ padding: "160px 70px" }} data-aos="zoom-in">
                <p className="TitleHeader2">
                  Racik obatmu sendiri sesuai yang kamu inginkan
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={12} style={{ padding: "50px" }} data-aos="flip-left">
            <Lottie options={defaultOptions2} style={{ width: "100%" }} />
          </Col>
        </Row>
        <Row style={{ backgroundColor: "#038C73" }}>
          <Col md={12} style={{ padding: "30px" }} data-aos="flip-left">
            <Lottie options={defaultOptions3} style={{ width: "100%" }} />
          </Col>
          <Col md={12}>
            <Row>
              <Col md={24} style={{ padding: "200px 70px" }} data-aos="zoom-in">
                <p className="TitleHeader2">
                  Always Free Shipping For Our Lovely Customers !
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={24} style={{ padding: "0px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#038c73"
                fill-opacity="1"
                d="M0,64L48,85.3C96,107,192,149,288,186.7C384,224,480,256,576,240C672,224,768,160,864,149.3C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </Col>
        </Row>
      </Grid>

      <Grid fluid style={{ margin: '10% 0%'}}>
        <Row style={{marginBottom: '3%'}}>
          <Col md={24} data-aos="zoom-in-down">
            <p className="TitleHeader3">Apa Kata Mereka ?</p>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Panel className="BoxTestimoni" shaded data-aos="flip-up">
              <Row>
                <Col md={24} style={{height: '150px'}}>
                  <p className="TextTestimoni">
                    PaynKiller.io sangat membantu saya dalam memenuhi kebutuhan
                    kesehatan saya !
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{textAlign: 'center'}}>
                  <Avatar
                  circle
                  src={gambarTestimoni1}
                  size="lg"
                  />
                </Col>
              </Row>
              <Row style={{marginTop : '10px'}}>
                <Col md={24}>
                  <p className="TestimoniName">Luke Santoso</p>
                </Col>
              </Row>
            </Panel>
          </Col>
          <Col md={8}>
            <Panel className="BoxTestimoni" shaded data-aos="flip-up">
              <Row>
                <Col md={24} style={{height: '150px'}}>
                  <p className="TextTestimoni"> 
                    Pelayanan sangat memuaskan, tidak sabar untuk melakukan order selanjutnya
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{textAlign: 'center'}}>
                  <Avatar
                  circle
                  src={gambarTestimoni2}
                  size="lg"
                  />
                </Col>
              </Row>
              <Row style={{marginTop : '10px'}}>
                <Col md={24}>
                  <p className="TestimoniName">Mila Thompson</p>
                </Col>
              </Row>
            </Panel>
          </Col>
          <Col md={8}>
            <Panel className="BoxTestimoni" shaded data-aos="flip-up">
              <Row>
                <Col style={{height: '150px'}}>
                  <p md={24} className="TextTestimoni">
                    Saya sangat suka dengan fitur racik obat yang disediakan, dengan fitur itu saya bisa meracik obat sendiri sesuai resep dokter !
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{textAlign: 'center'}}>
                  <Avatar
                  circle
                  src={gambarTestimoni3}
                  size="lg"
                  />
                </Col>
              </Row>
              <Row style={{marginTop : '10px'}}>
                <Col md={24}>
                  <p className="TestimoniName">Ronald Fagundez</p>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      </Grid>
      <Footer/>
    </div>
  );
}
