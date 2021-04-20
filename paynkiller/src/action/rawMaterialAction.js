import Axios from 'axios'

export const getRawMaterial = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/rawmaterial/displayrawmaterial')

            dispatch({
                type: 'GET_RAW_MATERIAL',
                payload: res.data
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
            const res = await Axios.get('http://localhost:2000/rawmaterial/displayrawmaterial')

            const dataSelectPickerRawMaterial = res.data.map(item => {
                return{
                    label: item.nama_bahan_baku,
                    value: item.id_bahan_baku
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

export const addRawMaterial = (data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/rawmaterial/addrawmaterial', data)

            const res2 = await Axios.get('http://localhost:2000/rawmaterial/displayrawmaterial')

            dispatch({
                type: 'GET_RAW_MATERIAL',
                payload: res2.data
            })
        }
        catch(err){
            dispatch({ type: 'RAW_MATERIAL_ERR', payload: err.response.data })
        }
    }
}

export const editRawMaterial = (id,data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/rawmaterial/editrawmaterial/${id}`,data)

            const res2 = await Axios.get('http://localhost:2000/rawmaterial/displayrawmaterial')

            dispatch({
                type: 'GET_RAW_MATERIAL',
                payload: res2.data
            })
        }
        catch(err){
            dispatch({ type: 'RAW_MATERIAL_ERR', payload: err.response.data })
        }
    }
}

export const deleteRawMaterial = (id) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/rawmaterial/deleterawmaterial/${id}`)

            const res2 = await Axios.get('http://localhost:2000/rawmaterial/displayrawmaterial')

            dispatch({
                type: 'GET_RAW_MATERIAL',
                payload: res2.data
            })
        }
        catch(err){
            dispatch({ type: 'RAW_MATERIAL_ERR', payload: err.response.data })
        }
    }
}



export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}