import Axios from 'axios'

export const getStockProducts = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/stokproduk/stokproducts')

            dispatch({
                type: 'GET_STOCK_PRODUCT',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const addStockProduct = (data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/stokproduk/addstokproduct',data)

            const res2 = await Axios.get('http://localhost:2000/stokproduk/stokproducts')

            dispatch({
                type: 'GET_STOCK_PRODUCT',
                payload: res2.data
            })
        }
        catch(err){
            dispatch({ type: 'STOCK_PRODUCT_ERR', payload: err.response.data })
        }
    }
}

export const filteringProductList = (body) => {
    return async(dispatch) => {
        try{
            console.log(body)
            const res = await Axios.post('http://localhost:2000/stokproduk/searchprodukfilter', body)

            dispatch({
                type: 'GET_STOCK_PRODUCT',
                payload: res.data
            })
        }
        catch(err){
            dispatch({ type: 'STOCK_PRODUCT_ERR', payload: err.response.data })
        }
    }
}

export const deleteStockProduct = (id) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/stokproduk/deletestokproduk/${id}`)

            const res2 = await Axios.get('http://localhost:2000/stokproduk/stokproducts')

            dispatch({
                type: 'GET_STOCK_PRODUCT',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
        }
    } 
}

export const tambahStockProduct = (id,data) => {
    return async(dispatch) => {
        try{

            const res = await Axios.post(`http://localhost:2000/stokproduk/editstokproduk/${id}`,data)

            const res2 = await Axios.get('http://localhost:2000/stokproduk/stokproducts')

            dispatch({
                type: 'GET_STOCK_PRODUCT',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const decreaseProductStock = (body) => {
    return async(dispatch) => {
        try{
    
            const res = await Axios.patch('http://localhost:2000/stokproduk/decreaseProductStock', body)
            console.log(res)
    
            const res2 = await Axios.get('http://localhost:2000/stokproduk/stokproducts')
    
            dispatch({
                type: 'GET_STOCK_PRODUCT',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
        }
    }

}

export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}