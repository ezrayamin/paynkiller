let INITIAL_STATE = {
    dataProduct: [],
    dataSelectPickerProduct: [],
    errLogin: ""
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_PRODUCT':
            return{
                ...state,
                dataProduct: action.payload
            }
        case 'PRODUCT_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'SELECT_PICKER_PRODUCT':
            return {
                ...state,
                dataSelectPickerProduct: action.payload
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

export default productReducer