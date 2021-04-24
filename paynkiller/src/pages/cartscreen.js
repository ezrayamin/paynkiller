import React from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Panel, IconButton, Button, Input, InputGroup, Alert } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart, editCartQty, deleteCartItem, keeplogin, getMaterialsInCart } from '../action'

import Navbar from '../components/TopNavigation'
import '../css/pages/cart-checkout.css'
import '../css/components/fonts.css'

const URL_IMG = 'http://localhost:2000/'

const CartScreen = () => {
    const [toCheckout, setToCheckout] = React.useState(false)
    const [showDetails, setShowDetails] = React.useState(false)

    const { id_customer, cart, materialsinCart } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer,
            cart: state.cartReducer.cart,
            materialsinCart: state.customOrderReducer.materialsinCart
        }
    })

    const dispatch = useDispatch()

    React.useEffect(() => {
        console.log('id', id_customer)
        dispatch(getUserCart(id_customer))
        dispatch(getMaterialsInCart(id_customer))
        console.log(cart)
    }, [id_customer])

    const del = async (index) => {
        dispatch(deleteCartItem(cart[index], () => {
            dispatch(keeplogin())
        }
        ))
    }

    const minus = async (id, index) => {
        // if (cart[index].qty > 1) {
        const tempProduk = cart.find(e => e.id_details == id && (e.qty = e.qty - 1, true) && (e.total_harga = e.qty * e.harga_produk, true))
        console.log('minus', tempProduk)
        await dispatch(editCartQty(tempProduk, id_customer))
        // }

    }

    const plus = async (id, index) => {
        // if (cart[index].qty < cart[index].stock) {
        const tempProduk = cart.find(e => e.id_details === id && (e.qty = parseInt(e.qty) + 1, true) && (e.total_harga = e.qty * e.harga_produk, true))
        console.log('plus', tempProduk)

        await dispatch(editCartQty(tempProduk, id_customer))
        // } else {
        //     Alert.error(`there are only ${cart[index].stock + ' ' + cart[index].nama_produk} available`, 5000)
        // }
    }

    const totalPriceProducts = () => {
        console.log(cart)
        let counter = 0
        cart.length !== 0 ? cart.forEach(item => counter += item.total_harga) : counter = 0
        // if (cart.length !== 0) {
        //     cart.forEach(item => counter += item.total_harga)
        // }
        return counter
    }


    const totalPriceIngredients = () => {
        let n = 0
        materialsinCart.length !== 0 ? materialsinCart.forEach(item => n += item.total_harga) : n = 0
        return n

    }

    const continueCheckout = async () => {
        try {
            let products = 0
            if (cart.length !== 0) {
                cart.forEach(item => products += item.total_harga)
            }

            let ingredients = 0
            if (materialsinCart.length !== 0) {
                materialsinCart.forEach(item => ingredients += item.total_harga)
            }

            let grandTotal = products + ingredients
            console.log(grandTotal)

            const body = {
                grandTotal,
                order_number: cart.length !== 0 ? cart[0].order_number : materialsinCart[0].order_number
            }
            console.log(body)

            await Axios.patch(`http://localhost:2000/order/toCheckout`, body)
            setToCheckout(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (toCheckout) return <Redirect to="/checkout" />
    const Render = () => {
        return (
            cart.map((item, index) => {
                return (
                    <div key={index} className='container-products'>
                        <div className='product-details'>
                            <img id="product-image" src={URL_IMG + item.gambar_obat} />
                            <div>
                                <h1 id="product-name" className="text">{item.nama_produk}</h1>
                                <h1 id="product-price" className="text" >Rp {item.harga_produk.toLocaleString()}</h1>
                            </div>
                        </div>
                        <div className="edit-products">
                            <div className="edit-up">

                            </div>
                            <div className="edit-down">
                                <div id="container-delete">
                                    <div id="border-delete"></div>
                                    <Button onClick={() => del(index)} id="button-delete">
                                        <span color='gray' className="material-icons">delete</span>
                                    </Button>
                                </div>
                                <InputGroup id="input-group">
                                    <Button className="button-qty" style={{ color: '#51bea5' }} disabled={item.qty === 1} onClick={() => minus(item.id_details)}>
                                        <span className="material-icons">remove</span>
                                    </Button>
                                    <Input
                                        id="qty"
                                        type="number"
                                        defaultValue={item.qty}
                                        disabled={true}
                                    // onChange={e => change(e)}
                                    />
                                    <Button className="button-qty" style={{ color: '#51bea5' }} disabled={item.qty >= item.stock} onClick={() => plus(item.id_details)}>
                                        <span className="material-icons">add</span>
                                    </Button>
                                </InputGroup>
                            </div>
                        </div>
                    </div>

                )
            })
        )
    }

    const IngredientsCode = () => {
        return (
            <div>
                {materialsinCart.length !== 0
                    ?
                    <div className="container-code">
                        <div>
                            <p id="text-code">{materialsinCart[0].kode_custom_order}</p>
                            <Button id="button-details" onClick={() => setShowDetails(true)}>click for details</Button>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        )
    }

    const ShowMaterials = () => {
        return (
            materialsinCart.map((item, index) => {
                if (showDetails) return (
                    <div key={index} className="box-material">
                        <p>{item.nama_bahan_baku}</p>
                        <p id="dose">{item.total_beli_satuan + item.nama_uom}</p>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            <Navbar />
            <h1 className="heading" id="yours-heading">Your Cart</h1>
            <div className="main-container">
                <div className="maincontainer-products">
                    <p className="sub-heading" id="subhead-products">Products</p>
                    <Render />
                    <p className="sub-heading" id="subhead-ingredients">Active Ingredients</p>
                    <IngredientsCode />
                    <div className="container-materials">
                        <ShowMaterials />
                        {showDetails
                            ?
                            <Button id="close-details" onClick={() => setShowDetails(false)}>X</Button>
                            :
                            <></>
                        }
                    </div>
                </div>
                <div className="container-price">
                    <Panel className="panel-price" shaded={true}>
                        <p className="sub-heading" id="subhead-panel">Shopping</p>
                        <div className="container-priceeach">
                            <p className="text" id="prod">Products</p>
                            <p className="text" id="prodprice">Rp {totalPriceProducts().toLocaleString('id-ID')}</p>
                        </div>
                        <div className="container-priceeach" id="container-ingre">
                            <p className="text" id="ingre">Active Ingredients</p>
                            <p className="text" id="ingreprice">Rp {totalPriceIngredients().toLocaleString('id-ID')}</p>
                        </div>
                        <div id="border-inprice"></div>
                        <div className="container-priceeach">
                            <p className="text" id="grand">Grand Total</p>
                            <p className="text" id="grandnominal">Rp {(totalPriceProducts() + totalPriceIngredients()).toLocaleString('id-ID')}</p>
                        </div>
                        <Button id="button-checkout" onClick={continueCheckout}>Continue</Button>
                    </Panel>
                </div>
            </div>
        </div>
    )

}
export default CartScreen