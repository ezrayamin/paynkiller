let INITIAL_STATE = {
    dataRawMaterial: [],
    dataSelectPickerRawMaterial: [],
    errLogin: ""
}

const rawMaterialReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_RAW_MATERIAL':
            return{
                ...state,
                dataRawMaterial: action.payload
            }
        case 'RAW_MATERIAL_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'SELECT_PICKER_RAW_MATERIAL':
            return{
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

export default rawMaterialReducer