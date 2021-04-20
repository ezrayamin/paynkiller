import Axios from 'axios'

export const getBrands = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/brand/brands')

            dispatch({
                type: 'GET_BRAND',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const selectPickerBrand = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/brand/brands')

            const dataSelectPickerBrand = res.data.map(item => {
                return{
                    label: item.nama_brand,
                    value: item.id_brand
                }
            })

            dispatch({
                type: 'SELECT_PICKER_BRAND',
                payload: dataSelectPickerBrand
            })

        }
        catch(err){
            console.log(err)
        }
    }
}

export const addBrand = (data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/brand/addbrand', data)

            const res2 = await Axios.get('http://localhost:2000/brand/brands')

            dispatch({
                type: 'GET_BRAND',
                payload: res2.data
            })
        }
        catch(err){
            dispatch({ type: 'BRAND_ERR', payload: err.response.data })
        }
    }
}

export const deleteBrand = (id) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/brand/deletebrand/${id}`)

            const res2 = await Axios.get('http://localhost:2000/brand/brands')


            dispatch({
                type: 'GET_BRAND',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getSpecificBrand = (id) => {
    return async(dispatch) => {
        try{
            const res = await Axios.get(`http://localhost:2000/brand/getbrand/${id}`)

            dispatch({
                type: 'GET_BRAND_SPECIFIC',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const editBrand = (id, data) => {
    return async(dispatch) => {
        try{
            console.log(data)
            const res = await Axios.post(`http://localhost:2000/brand/editbrand/${id}`, data)

            const res2 = await Axios.get('http://localhost:2000/brand/brands')

            
            dispatch({
                type: 'GET_BRAND',
                payload: res2.data
            })
        }
        catch(err){
            dispatch({ type: 'BRAND_ERR', payload: err.response.data })
        }
    }
}

export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}