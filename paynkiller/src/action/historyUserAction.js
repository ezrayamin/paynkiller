import axios from 'axios'

export const ReuploadTransactionEvidence = (Data, order_number) => {
    return async(dispatch) => {
        try{
            const option = {
                headers: {'Content-Type' : 'multipart/form-data'}
            }
            const res = await axios.post(`http://localhost:2000/history/reupload/${order_number}`, Data, option)
            dispatch({ type: 'RES_UPLOAD', payload:res.data})
        }
        catch(err){
            dispatch({type: 'ERR_UPLOAD', payload: err.response.data})
        }
    }
}