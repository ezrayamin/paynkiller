import Axios from 'axios'

export const register = (body) => {
    return async (dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/user/register', body)
            console.log(res.data)

            await localStorage.setItem('token', res.data.token)

            dispatch({type: 'LOGIN', payload: res.data})
        } catch (err) {
            dispatch({ type: 'LOGIN_ERR', payload: err.response.data })
            console.log(err)
        }
    }
} 

export const login = (data) => {
    return async (dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/user/login', data)

            localStorage.token = res.data.token
            console.log(res.data)

            dispatch({
                type: 'LOGIN',
                payload: res.data
            })

        }
        catch(err){
            dispatch({ type: 'LOGIN_ERR', payload: err.response.data })
        }
    }
}

export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}

export const logout = () => {
    return{
        type: 'LOGOUT'
    }
}

export const keeplogin = () => {
    return async(dispatch) => {
        try{
            const token = localStorage.getItem('token')
            const res = await Axios.post('http://localhost:2000/user/keeplogin', {token})
            console.log(token)
            console.log(res.data)
            dispatch({
                type: 'LOGIN',
                payload: res.data
            })
        }
        catch(err){
            localStorage.removeItem('token')
            dispatch({type: 'LOG_OUT'})
        }
    }
}

export const forgotpass = (data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/user/forgotPass', data)
            dispatch({
                type: 'FORGOT_PASS',
                payload: res.data
            })
        }
        catch(err){
            dispatch({
                type: 'Err_FORGOT_PASS',
                payload: err.response.data
            })
        }
    }
}

export const FpassRes = () => {
    return {
        type: 'REMOVE_RES'
    }
}

export const ChangePass = (data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/user/changepass', data)
            console.log(res)
            dispatch({
                type: 'FORGOT_PASS',
                payload: res.data
            })
        }
        catch(err){
            dispatch({
                type: 'Err_FORGOT_PASS',
                payload: err.response.data
            })
        }
    }
}

export const showProfile = () => {
    return async(dispatch) => {
        try {
            const token = localStorage.getItem('token')
            console.log('token di profile action', {token})
            const res = await Axios.post('http://localhost:2000/user/showProfile', {token})
            // console.log('profile di action', res.data)
            dispatch({
                type: 'GET_PROFILE',
                payload: res.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const editProfile = (id_customer, body) => {
    return async(dispatch) => {
        try {
            const res = await Axios.patch(`http://localhost:2000/user/editProfile/${id_customer}`, body)
            console.log(res.data)

            const token = localStorage.getItem('token')
            console.log('token di profile action', {token})
            const res2 = await Axios.post('http://localhost:2000/user/showProfile', {token})
            // console.log('profile di action', res.data)
            dispatch({
                type: 'GET_PROFILE',
                payload: res2.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const verification = () => {
    return {
        type: 'VERIFICATION'
    }
}