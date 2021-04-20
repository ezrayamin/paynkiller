import Axios from 'axios'

export const getAdmin = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/admin/admins')

            dispatch({
                type: 'GET_ADMIN',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const addAdmin = (body) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/admin/adminadd', body)

            const res2 = await Axios.get('http://localhost:2000/admin/admins')

            dispatch({
                type: 'GET_ADMIN',
                payload: res2.data
            })
        }
        catch(err){
            dispatch({ type: 'ADMIN_ERR', payload: err.response.data })
        }
    }
}

export const deactiveAdmin = (id_admin) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/admin/deactiveaccount/${id_admin}`)

            const res2 = await Axios.get('http://localhost:2000/admin/admins')

            dispatch({
                type: 'GET_ADMIN',
                payload: res2.data
            })
        }
        catch(err){
            dispatch({ type: 'ADMIN_ERR', payload: err.response.data })
        }
    }
}

export const loginAdmin = (data) => {
    return async (dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/admin/loginadmin', data)

            localStorage.tokenAdmin = res.data.token
            console.log(res.data)

            dispatch({
                type: 'LOGIN_ADMIN',
                payload: res.data
            })

        }
        catch(err){
            dispatch({ type: 'LOGIN_ADMIN_ERR', payload: err.response.data })
        }
    }
}

export const logout = () => {
    return{
        type: 'LOGOUT_ADMIN'
    }
}

export const keepLoginAdmin = () => {
    return async(dispatch) => {
        try{
            const tokenAdmin = localStorage.getItem('tokenAdmin')
            const res = await Axios.post('http://localhost:2000/admin/keeplogin', {tokenAdmin})
            console.log(tokenAdmin)
            console.log(res.data)
            dispatch({
                type: 'LOGIN_ADMIN',
                payload: res.data
            })
        }
        catch(err){
            localStorage.removeItem('tokenAdmin')
            dispatch({type: 'LOGOUT_ADMIN'})        
        }
    }
}


export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}