let INITIAL_STATE = {
    dataOrder: [],
    dataOrderDetailSpecific: [],
    errLogin: ""
}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_ORDER_ALL':
            return{
                ...state,
                dataOrder: action.payload
            }
        case 'GET_DATA_ORDER_DETAIL_SPECIFIC':
            return{
                ...state,
                dataOrderDetailSpecific: action.payload
            }
        case 'ORDER_ERR':
            return {
                ...state,
                errLogin: action.payload
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

export default orderReducer