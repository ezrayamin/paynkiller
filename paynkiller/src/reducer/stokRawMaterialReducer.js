let INITIAL_STATE = {
    dataStockRawMaterial: [],
    dataSelectPickerRawMaterial: [],
    errLogin: ""
}

const stockRawMaterialReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_STOCK_RAW_MATERIAL':
            return{
                ...state,
                dataStockRawMaterial: action.payload
            }
        case 'RAW_MATERIAL_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'SELECT_PICKER_RAW_MATERIAL':
            return {
                ...state,
                dataSelectPickerRawMaterial: action.payload
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

export default stockRawMaterialReducer