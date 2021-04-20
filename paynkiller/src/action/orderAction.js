import Axios from 'axios'

export const getAllOrder = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/order/getallorder')

            dispatch({
                type: 'GET_ORDER_ALL',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getOrderDetailSpecific = (orderNumber) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/order/getorderdetailspecific/${orderNumber}`)

            dispatch({
                type: 'GET_DATA_ORDER_DETAIL_SPECIFIC',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const acceptOrderPayment = (order_number, data) => {
    return async(dispatch) => {
        try{
            console.log(order_number, data)
            const res = await Axios.post(`http://localhost:2000/order/acceptpayment/${order_number}`, data)

            const res2 = await Axios.get('http://localhost:2000/order/getallorder')

            dispatch({
                type: 'GET_ORDER_ALL',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
            dispatch({ type: 'ORDER_ERR', payload: err.response.data })
        }
    }
}

export const rejectOrderPayment = (order_number, data) => {
    return async(dispatch) => {
        try{
            console.log(order_number, data)
            const res = await Axios.post(`http://localhost:2000/order/rejectpayment/${order_number}`, data)

            const res2 = await Axios.get('http://localhost:2000/order/getallorder')

            dispatch({
                type: 'GET_ORDER_ALL',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
            dispatch({ type: 'ORDER_ERR', payload: err.response.data })        }
    }
}

export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}