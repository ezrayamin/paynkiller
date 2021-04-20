let INITIAL_STATE = {
    dataBrand: [],
    getDataBrand: [],
    selectPickerBrand: [],
    errLogin: ""
}

const brandReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_BRAND':
            return{
                ...state,
                dataBrand: action.payload
            }
        case 'BRAND_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'REMOVE_ERR':
            return {
                ...state,
                errLogin: ""
            }
        case 'GET_BRAND_SPECIFIC':
            return{
                ...state,
                getDataBrand: action.payload
            }
        case 'SELECT_PICKER_BRAND':
            return{
                ...state,
                selectPickerBrand: action.payload
            }
        default:
            return state
    }
}

export default brandReducer