import React from 'react'
import { Navbar, Nav, Icon, Dropdown, Button } from 'rsuite'

import logoNavbar from '../images/logo/PaynKiller.svg'

import { Redirect, Link } from 'react-router-dom'

import { useSelector } from 'react-redux'



export default function TopNavigation() {

    const { usernameCust } = useSelector((state) => {
        return {
            usernameCust: state.userReducer.username,
        }
    })

    return (
        <div>
            <Navbar style={{ padding: '15px 50px' }}>
                <Navbar.Header style={{ paddingRight: '50px' }}>
                    <img
                        alt=""
                        src={logoNavbar}
                        width=""
                        height="100%"
                    />
                </Navbar.Header>
                <Navbar.Body>
                    <Nav>
                        {
                            usernameCust
                                ?
                                <>
                                    <Link to='/'>
                                        <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                                    </Link>
                                    <Link to='/profile'>
                                        <Nav.Item>Profile</Nav.Item>
                                    </Link>
                                    <Link to ='/products'>
                                        <Nav.Item>Products</Nav.Item>
                                    </Link>
                                    <Link to ='/customOrder'>
                                        <Nav.Item>Custom Order</Nav.Item>
                                    </Link>
                                </>
                                :
                                <>
                                    <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                                    <Link to ='/products'>
                                        <Nav.Item>Products</Nav.Item>
                                    </Link>
                                </>
                        }
                    </Nav>
                    <Nav pullRight>
                        {
                            usernameCust
                                ?
                                <>
                                    <Link to='/cart'>
                                        <Nav.Item><span style={{color:'#51bea5', marginRight: 20}} className="material-icons">shopping_cart</span></Nav.Item>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to='/login'>
                                        <Button style={{backgroundColor:"#51bea5", borderRadius: 20, fontWeight: 'bold', color: 'white', margin: '10px 10px 0 0', width:'8vw'}}>Sign In</Button>
                                    </Link>
                                </>
                        }
                    </Nav>
                </Navbar.Body>
            </Navbar>
        </div>
    )
}
