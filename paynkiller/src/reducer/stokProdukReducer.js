let INITIAL_STATE = {
    dataStokProduct: [],
    testProduct:[],
    errLogin: ""
}

const stokProdukReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_STOCK_PRODUCT':
            return{
                ...state,
                dataStokProduct: action.payload
            }
        case 'STOCK_PRODUCT_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'TEST':
        return {
            ...state,
            testProduct: action.payload
        }
        case 'REMOVE_ERR':
            return {
                ...state,
                errLogin: ""
            }
        default:
            return state
    }
}

export default stokProdukReducer