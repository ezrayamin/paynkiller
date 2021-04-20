import React, {useState} from 'react'
import { Dropdown, Sidenav, Nav, Icon, Container, Sidebar, Col, Row, Button} from 'rsuite'
import {Link, Redirect} from 'react-router-dom'

import {logout} from '../action/adminAction'

import {useDispatch, useSelector} from 'react-redux'

export default function SideNavigation() {


    const dispatch = useDispatch()
    const[redirectTo,setRedirectTo] = useState(false)

    const {usernameAdmin} = useSelector((state) => {
        return {
          usernameAdmin : state.adminReducer.usernameAdmin,
        }
    })

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('tokenAdmin')
        setRedirectTo(true)
    }

    if(redirectTo){
      return <Redirect to={'/'}/>
    }else{
        console.log('Gagal Jhon')
    }


  return (
    <div style={{backgroundColor: "#f4f3f3"}}>
      {/* <Col md={3} style={{padding: "0px", margin: "0px", position: "sticky", left: 0}}> */}
          <Sidenav style={{height: "100vh", width: "13.5%", position: "fixed"}}>
            <Sidenav.Header style={{backgroundColor: "#038C73", padding: "45px 5px"}}>
              <Row>
                <Col md={24}>
                 <p style={{color: "white", fontSize: "25px", textAlign: "center"}}>Hello, {usernameAdmin}</p>
                </Col>
                <Col md={24} style={{textAlign: 'center', paddingTop: '30px'}}>
                  <Button style={{textAlign: 'center'}} onClick={() => handleLogout()}>
                    Logout
                  </Button>
                </Col>
              </Row>
            </Sidenav.Header>
            <Sidenav.Body style={{paddingTop: "15px"}}>
              <Nav>
                  <Link to="/admin/dashboard">
                    <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
                      Dashboard
                    </Nav.Item>
                  </Link>
                <Dropdown eventKey="2" title="Data Master" icon={<Icon icon="dropbox" />}>
                  <Link to="/admin/master/brand">
                    <Dropdown.Item eventKey="2-1">Brands</Dropdown.Item>
                  </Link>
                  <Link to="/admin/master/category">
                    <Dropdown.Item eventKey="2-1">Categories</Dropdown.Item>
                  </Link>
                  <Link to="/admin/master/uom">
                    <Dropdown.Item eventKey="2-2">UOM</Dropdown.Item>
                  </Link>
                  <Link to="/admin/master/rawmaterial">
                    <Dropdown.Item eventKey="2-3">Raw Material</Dropdown.Item>
                  </Link>
                  <Link to="/admin/master/product">
                    <Dropdown.Item eventKey="2-4">Products</Dropdown.Item>
                  </Link>
                </Dropdown>
                <Dropdown eventKey="3" title="Management Stock" icon={<Icon icon="archive" />}>
                  <Link to="/admin/stock/product">
                    <Dropdown.Item eventKey="3-1">Stock Product</Dropdown.Item>
                  </Link>
                  <Link to="/admin/stock/rawmaterial">
                    <Dropdown.Item eventKey="3-2">Stock Raw Material</Dropdown.Item>
                  </Link>
                </Dropdown>
                  <Link to="/admin/order/allorder">
                    <Nav.Item eventKey="4" icon={<Icon icon="credit-card" />}>
                      Order
                    </Nav.Item>
                  </Link>
                  <Link to="/admin/order/customorder">
                    <Nav.Item eventKey="5" icon={<Icon icon="cart-arrow-down" />}>
                      Custom Order
                    </Nav.Item>
                  </Link>
                  <Link to="/admin/master/admin">
                    <Nav.Item eventKey="6" icon={<Icon icon="people-group" />}>
                      Management Admin
                    </Nav.Item>
                  </Link>
                  <Dropdown eventKey="7" title="Management Recap" icon={<Icon icon="print" />}>
                  <Link to="/admin/report/transaction">
                    <Dropdown.Item eventKey="7-1">Report Keuangan</Dropdown.Item>
                  </Link>
                  <Link to="/admin/report/stocksale">
                    <Dropdown.Item eventKey="7-1">Report Stock Sell</Dropdown.Item>
                  </Link>
                  </Dropdown>
                  
              </Nav>
          </Sidenav.Body>
        </Sidenav>
      {/* </Col> */}
    </div>
  )
}

