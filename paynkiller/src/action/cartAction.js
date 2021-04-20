import Axios from 'axios'

export const getUserCart = (id_customer) => {
    return async (dispatch) => {
        try {
            console.log('id di action', id_customer)

            const res = await Axios.get(`http://localhost:2000/order/userCart/${id_customer}`)
            console.log(res.data)
            dispatch({ type: 'GET_CART', payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}
export const addCart = (id_customer, body) => {
    return async (dispatch) => {
        try {
            console.log('body di action', body)
            const res = await Axios.post(`http://localhost:2000/order/addCart/${id_customer}`, body)
            console.log(res.data)

            const res2 = await Axios.get(`http://localhost:2000/order/userCart/${id_customer}`)
            console.log(res2.data)
            dispatch({ type: 'GET_CART', payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const editCartQty = (body, idCust) => {
    return async (dispatch) => {
        try {
            console.log('tempproduk di action', body)
            const res = await Axios.patch(`http://localhost:2000/order/editQty/`, body)
            console.log(res.data)
            
            const res2 = await Axios.get(`http://localhost:2000/order/userCart/${idCust}`)
            console.log(res2.data)
            dispatch({ type: 'GET_CART', payload: res2.data })
            
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const deleteCartItem = (body) => {
    return async (dispatch) => {
        try {
            // console.log('del di action', body.order_number)
            console.log('row delete', body)
            // let order = body.order_number
            // console.log({order})
            const res = await Axios.delete(`http://localhost:2000/order/delete/${body.id_details}`)
            console.log(res.data)

            const res2 = await Axios.get(`http://localhost:2000/order/userCart/${body.id_customer}`)
            // console.log(res2.data)
            dispatch({ type: 'GET_CART', payload: res2.data })
            
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const getOrdersInCheckout = (id_customer) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(`http://localhost:2000/order/ordersCheckout/${id_customer}`)
            dispatch({type: 'GET_CHECKOUT', payload: res.data})
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const uploadPaymentProof = (data, body) => {
    return async (dispatch) => {
        try{
            const option = {
                headers: {'Content-Type' : 'multipart/form-data'}
            }
            console.log('action', data, option)
            console.log(body.order_number)
            const res = await Axios.post(`http://localhost:2000/order/paymentProof/${body.order_number}`, data, option )
            console.log(res.data)

            const res2 = await Axios.post('http://localhost:2000/order/detailsPayment', body)
            console.log(res2.data)
            dispatch({type: 'PAYMENT_PROOF', payload: res2.data})
        }
        catch(err){
            console.log(err)
        }
    }
}
