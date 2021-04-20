import Axios from 'axios'

export const getUoms = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/uom/displayuom')

            dispatch({
                type: 'GET_UOM',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const addUom = (data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/uom/adduom', data)

            dispatch({
                type: 'GET_UOM',
                payload: res.data
            })
        }
        catch(err){
            dispatch({ type: 'UOM_ERR', payload: err.response.data })
        }
    }
}

export const deleteUom = (id) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/uom/deleteuom/${id}`)

            dispatch({
                type: 'GET_UOM',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const editUom = (id, data) => {
    return async(dispatch) => {
        try{
            console.log(data)
            const res = await Axios.post(`http://localhost:2000/uom/edituom/${id}`, data)

            dispatch({
                type: 'GET_UOM',
                payload: res.data
            })
        }
        catch(err){
            dispatch({ type: 'UOM_ERR', payload: err.response.data })
        }
    }
}

export const selectPickerUom = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/uom/displayuom')

            const dataSelectPickerUom = res.data.map(item => {
                return{
                    label: item.nama_uom,
                    value: item.id_uom
                }
            })

            dispatch({
                type: 'SELECT_PICKER_UOM',
                payload: dataSelectPickerUom
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