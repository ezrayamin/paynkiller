import Axios from 'axios'

export const getProducts = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/product/displayproduk')

            dispatch({
                type: 'GET_PRODUCT',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const selectPickerProduct = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/product/displayproduk')

            const dataSelectPickerProduct = res.data.map(item => {
                return{
                    label: item.nama_produk,
                    value: item.id_produk
                }
            })

            dispatch({
                type: 'SELECT_PICKER_PRODUCT',
                payload: dataSelectPickerProduct
            })

        }
        catch(err){
            console.log(err)
        }
    }
}

export const addProduct =(dataObat, data) => {
    return async(dispatch) => {
        try{
            console.log(dataObat)
            console.log(data)

            const option = {
                headers: {'Content-Type' : 'multipart/form-data'}
            }

            const res = await Axios.post('http://localhost:2000/product/addproduk', dataObat)

            const res2 = await Axios.get('http://localhost:2000/product/getmaxid')

            let max_id = parseInt(res2.data.id_max)

            const res3 = await Axios.post(`http://localhost:2000/product/uploadgambar/${max_id}`, data, option)

            const res4 = await Axios.get('http://localhost:2000/product/displayproduk')
            
            dispatch({
                type: 'GET_PRODUCT',
                payload: res4.data
            })
        }
        catch(err){
            dispatch({ type: 'PRODUCT_ERR', payload: err.response.data })
        }
    }
}

export const editProduct = (id,data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/product/editproduct/${id}`,data)

            const res2 = await Axios.get('http://localhost:2000/product/displayproduk')

            dispatch({
                type: 'GET_PRODUCT',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const editGambarProduct = (id, data) => {
    return async(dispatch) => {
        try{

            const option = {
                headers: {'Content-Type' : 'multipart/form-data'}
            }

            const res = await Axios.post(`http://localhost:2000/product/uploadgambar/${id}`, data, option)
            
            const res2 = await Axios.get('http://localhost:2000/product/displayproduk')

            dispatch({
                type: 'GET_PRODUCT',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const deleteProduct = (id) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/product/deleteproduct/${id}`)

            const res2 = await Axios.get('http://localhost:2000/product/displayproduk')

            dispatch({
                type: 'GET_PRODUCT',
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