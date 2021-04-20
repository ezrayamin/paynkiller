import Axios from 'axios'

export const getStockRawMaterials = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/stokrawmaterial/stokrawmaterials')

            dispatch({
                type: 'GET_STOCK_RAW_MATERIAL',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const addStockRawMaterial = (data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/stokrawmaterial/addstokrawmaterial',data)

            const res2 = await Axios.get('http://localhost:2000/stokrawmaterial/stokrawmaterials')


            dispatch({
                type: 'GET_STOCK_RAW_MATERIAL',
                payload: res2.data
            })
        }
        catch(err){
            dispatch({ type: 'RAW_MATERIAL_ERR', payload: err.response.data })
        }
    }
}

export const deleteStockRawMaterial = (id) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/stokrawmaterial/deletestokrawmaterial/${id}`)

            const res2 = await Axios.get('http://localhost:2000/stokrawmaterial/stokrawmaterials')

            dispatch({
                type: 'GET_STOCK_RAW_MATERIAL',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
        }
    } 
}

export const tambahStockBahan = (id,data) => {
    return async(dispatch) => {
        try{

            const res = await Axios.post(`http://localhost:2000/stokrawmaterial/editstokrawmaterial/${id}`,data)

            const res2 = await Axios.get('http://localhost:2000/stokrawmaterial/stokrawmaterials')

            dispatch({
                type: 'GET_STOCK_RAW_MATERIAL',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const selectPickerRawMaterial = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/stokrawmaterial/selectpickerrawmaterial')

            const dataSelectPickerRawMaterial = res.data.map(item => {
                return{
                    label: item.bahan_baku_keterangan,
                    value: item.id_stok_bahan
                }
            })

            dispatch({
                type: 'SELECT_PICKER_RAW_MATERIAL',
                payload: dataSelectPickerRawMaterial
            })

        }
        catch(err){
            console.log(err)
        }
    }
}


export const decreaseStockMaterial = (body) => {
    return async(dispatch) => {
        try{
    
            const res = await Axios.patch('http://localhost:2000/stokrawmaterial/decreaseMaterialsStock', body)
            console.log(res)
    
            const res2 = await Axios.get('http://localhost:2000/stokrawmaterial/stokrawmaterials')

            dispatch({
                type: 'GET_STOCK_RAW_MATERIAL',
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