import Axios from 'axios'

export const getCategory = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get('http://localhost:2000/category/getAll')
            console.log(res.data)
            dispatch({type: 'GET_CATEGORY', payload: res.data})
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const addCategory = (isi) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('http://localhost:2000/category/add', {isi})
            console.log({isi})
            console.log(res.data)
            dispatch({type: 'GET_CATEGORY', payload: res.data})
        }
        catch (err) {
            dispatch({ type: 'CATEGORY_ERR', payload: err.response.data })
            console.log(err)
        }
    }
}

export const selectPickerCategory = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/category/getAll')

            const dataSelectPickerCategory = res.data.map(item => {
                return{
                    label: item.nama_category,
                    value: item.id_category
                }
            })

            dispatch({
                type: 'SELECT_PICKER_CATEGORY',
                payload: dataSelectPickerCategory
            })

        }
        catch(err){
            console.log(err)
        }
    }
}

export const deleteCategory = (id) => {
    return async (dispatch) => {
        try {
            const res = await Axios.delete(`http://localhost:2000/category/delete/${id}`)
            console.log(res.data)
            dispatch({type: 'GET_CATEGORY', payload: res.data})
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const editCategory = (nama_category, id) => {
    return async (dispatch) => {
        console.log({nama_category})
        console.log(id)
        try {
            const res  = await Axios.patch(`http://localhost:2000/category/edit/${id}`, {nama_category})
            console.log(res.data)
            dispatch({type: 'GET_CATEGORY', payload: res.data})
        }
        catch (err) {
            dispatch({ type: 'CATEGORY_ERR', payload: err.response.data })
            console.log(err)
        }
    }
}

export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}