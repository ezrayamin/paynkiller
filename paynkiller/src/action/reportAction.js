import Axios from 'axios'

export const getReportTransactionAll = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/report/displaylaporankeuanganall')

            dispatch({
                type: 'GET_REPORT_TRANSACTION',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getReportProductSaleAll = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/report/displayjualprodukall')

            dispatch({
                type: 'GET_REPORT_JUAL_PRODUCT',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getReportBahanBakuSaleAll = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/report/displayjualbahanbakuall')

            dispatch({
                type: 'GET_REPORT_JUAL_BAHAN_BAKU',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getProfitData = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/report/displayprofit')

            dispatch({
                type: 'GET_PROFIT_DATA',
                payload: res.data[0].profits
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getBestProductData = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/report/displaynamebestproduct')

            dispatch({
                type: 'GET_BEST_PRODUCT',
                payload: res.data.productName
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getBestRacikanData = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/report/displaynamebestbahanbaku')

            dispatch({
                type: 'GET_BEST_RACIKAN',
                payload: res.data.nama_bahan_baku
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getReportTransactionByDate = (body) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/report/displaylaporankeuanganbydate', body)

            dispatch({
                type: 'GET_REPORT_TRANSACTION',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getReportProductSaleByDate = (body) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/report/displayjualprodukbydate', body)

            dispatch({
                type: 'GET_REPORT_JUAL_PRODUCT',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getReportBahanBakuSaleByDate = (body) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/report/displayjualbahanbakubydate', body)

            dispatch({
                type: 'GET_REPORT_JUAL_BAHAN_BAKU',
                payload: res.data
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